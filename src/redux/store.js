// src/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null, // Add role to the state
        user_id: localStorage.getItem('user_id') || null,
        //display_name: localStorage.getItem("display_name") || null,
        //phone: localStorage.getItem("phone") || null,
        //address: localStorage.getItem("address") || null,
        //balance: localStorage.getItem("balance") || null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            state.role = null; // Clear role when token is cleared
            state.display_name = null;
            state.phone = null;
            state.address = null;
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user_id");
            // localStorage.removeItem("display_name");
            // localStorage.removeItem("phone");
            // localStorage.removeItem("address");
            // localStorage.removeItem("balance");
        },
        setRole: (state, action) => {
          state.role = action.payload;
          localStorage.setItem("role", action.payload);
        },
        setUserID: (state, action) => {
          state.user_id = action.payload;
          localStorage.setItem("user_id", action.payload);
        },
        // setDisplayName: (state, action) => {
        //   state.display_name = action.payload;
        //   localStorage.setItem("display_name", action.payload);
        // },
        // setPhone: (state, action) => {
        //   state.phone = action.payload;
        //   localStorage.setItem("phone", action.payload);
        // },
        // setAddress: (state, action) => {
        //   state.address = action.payload;
        //   localStorage.setItem("address", action.payload);
        // },
        // setBalance: (state, action) => {
        //   state.balance = action.payload;
        //   localStorage.setItem("balance", action.payload); // Save balance to localStorage
        // },
    },
});
const queueSongs = createSlice({
    name: 'queueSongs',
    initialState: {
        queueSongs: [],
    },
    reducers: {
        addTrackToQueue: (state, action) => {
            if (action.payload && action.payload.id) {
                state.queueSongs.push(action.payload.id);
            } else {
                console.error("Invalid payload for addTrackToQueue:", action.payload);
            }
        },
        removeTrackFromQueue: (state, action) => {
            state.queueSongs = state.queueSongs.filter(e => e !== action.payload);
        },
        clearQueue: (state) => {
            state.queueSongs = [];
        },
    },
});
const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    listFavorites: [],
  },
  reducers: {
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action) => {
      const track_id = action.payload;
      if (!track_id) return; // Bỏ qua nếu track_id không hợp lệ
      state.listFavorites = state.listFavorites.filter(
        (e) => e.track_id !== track_id
      );
    },
    addFavorite: (state, action) => {
      state.listFavorites = [
        ...state.listFavorites,
        { track_id: action.payload },
      ];
    },
  },
});
const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {
        playlists: [],
        tracksInPlaylist: [],
        playlistInfo: {},
    },
    reducers: {
        setPlaylists: (state, action) => {
            state.playlists = action.payload;
        },
        addPlaylist: (state, action) => {
            state.playlists = [...state.playlists, action.payload];
        },
        removePlaylist: (state, action) => {
            const playlist_id = action.payload;
            if (!playlist_id) return;
            state.playlists = state.playlists.filter(e => e.id !== playlist_id);
        },
        setTracksInPlaylist: (state, action) => {
            state.tracksInPlaylist = action.payload;
        },
        setPlaylistInfo: (state, action) => {
            state.playlistInfo = action.payload;
        },
        
    },
});
export const { setListFavorites, removeFavorite, addFavorite } =
  favoriteSlice.actions;

export const {   
  setToken,
  clearToken,
  setRole,
  setUserID,
  setDisplayName,
  setAddress,
  setPhone,
  setBalance
 } = authSlice.actions;
export const { addTrackToQueue, removeTrackFromQueue, clearQueue } = queueSongs.actions;
export const { setPlaylists, addPlaylist, removePlaylist, setTracksInPlaylist, setPlaylistInfo } = playlistSlice.actions;

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        favorite: favoriteSlice.reducer,
        queueSongs: queueSongs.reducer,
        playlist: playlistSlice.reducer,
  },
});

export default store;