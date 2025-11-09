'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

import { useSelector } from 'react-redux';

import CheckOffLayout from '../../components/layouts/CheckOffLayout';
import NewCheckOffInput from '../../components/Checkoff/NewCheckOffInput';
import CheckOffAthleteSelector from '../../components/Checkoff/CheckOffAthleteSelector';

import Checkoff from '../../api/modules/checkoff.api';
import Measurement from '../../api/modules/measurement.api'; // ✅ Import API lấy vận động viên

// Helper Label Group
const FormGroup = ({ label, children }) => (
  <Box sx={{ width: '100%', mb: 3 }}>
    <Typography
      variant="body1"
      sx={{
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
        mb: 1,
        fontFamily: 'Aptos, sans-serif',
      }}
    >
      {label}
    </Typography>
    {children}
  </Box>
);

function toMySQLTimestamp(dateInput) {
  if (!dateInput) return null;
  const d = new Date(dateInput);
  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

function todayMySQL() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} 00:00:00`;
}

export default function NewCheckOff() {
  const coachId = useSelector((state) => state?.auth?.user_id);
  const tokenFromRedux = useSelector((state) => state?.auth?.accessToken);
  const token =
    tokenFromRedux ||
    (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null);

  const [dueDate, setDueDate] = useState('');
  const [skill, setSkill] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedAthletes, setSelectedAthletes] = useState([]);

  const [athletesList, setAthletesList] = useState([]);
  const [loadingAthletes, setLoadingAthletes] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

useEffect(() => {
  const loadAthletes = async () => {
    if (!coachId) return;
    setLoadingAthletes(true);
    const raw = await Measurement.listAthletesOfCoach(coachId, token);

    const mapped = (raw || []).map(a => ({
      id: a.id || a.user_id || a.athlete_id,
      name: a.name || `${a.first_name ?? ''} ${a.last_name ?? ''}`.trim(),
      ...a,
    })).filter(x => x.id && x.name);

    console.log('athletes (mapped):', mapped);
    setAthletesList(mapped);
    setLoadingAthletes(false);
  };
  loadAthletes();
}, [coachId, token]);


  const handleSendCheckoff = async () => {
    if (!coachId) {
      alert('Thiếu coach_id. Vui lòng đăng nhập lại.');
      return;
    }
    if (!skill.trim()) {
      alert('Vui lòng nhập Skill / Assigned Task.');
      return;
    }
    if (!dueDate) {
      alert('Vui lòng chọn Due date.');
      return;
    }
    if (selectedAthletes.length === 0) {
      alert('Vui lòng chọn ít nhất 1 vận động viên.');
      return;
    }

    const payload = {
      assigned_date: todayMySQL(),
      due_date: toMySQLTimestamp(dueDate),
      status: 0,
      coach_id: coachId,
      assigned_task: skill.trim(),
      note: notes || null,
      receivers: selectedAthletes,
    };
    console.log('Sending checkoff with payload:', payload);

    try {
      setIsSubmitting(true);
      const res = await Checkoff.createNewCheckoff(payload, token);
      console.log('Response from createNewCheckoff:', res);
      if (res) {
        alert('Gửi checkoff thành công!');
        setDueDate('');
        setSkill('');
        setNotes('');
        setSelectedAthletes([]);
      } else {
        alert(res?.data?.error || 'Gửi checkoff thất bại.');
      }
    } catch (error) {
      console.error('Lỗi gửi checkoff:', error);
      alert('Đã xảy ra lỗi trong quá trình gửi checkoff.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CheckOffLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          width: '100%',
          fontFamily: 'Aptos, sans-serif',
          p: 3,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '600px' }}>
          {/* Form Input */}
          <NewCheckOffInput
            todayDate={todayMySQL().slice(0, 10)}
            dueDate={dueDate}
            setDueDate={setDueDate}
            skill={skill}
            setSkill={setSkill}
            notes={notes}
            setNotes={setNotes}
          />

          {/* Selector */}
          <FormGroup label="Who is this check off for?">
            {loadingAthletes ? (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <CircularProgress size={28} />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Đang tải danh sách vận động viên...
                </Typography>
              </Box>
            ) : (
              <CheckOffAthleteSelector
                athletesList={athletesList}
                selectedAthletes={selectedAthletes}
                onChange={setSelectedAthletes}
              />
            )}
          </FormGroup>

          {/* Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleSendCheckoff}
            disabled={isSubmitting || loadingAthletes}
            sx={{
              backgroundColor: '#257951',
              color: 'white',
              fontSize: '15px',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '10px',
              padding: '8px',
              marginTop: '10px',
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Checkoff'}
          </Button>
        </Box>
      </Box>
    </CheckOffLayout>
  );
}
