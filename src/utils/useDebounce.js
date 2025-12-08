import { useState, useEffect } from "react";

/**
 * Hook giúp trì hoãn việc cập nhật giá trị (debounce)
 * @param {any} value - Giá trị cần trì hoãn
 * @param {number} delay - Thời gian trì hoãn tính bằng ms (ví dụ: 500)
 * @returns {any} Giá trị đã được trì hoãn
 */
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Hủy bỏ timer nếu giá trị 'value' thay đổi hoặc component unmount
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Chạy lại khi 'value' hoặc 'delay' thay đổi

    return debouncedValue;
};

export default useDebounce;