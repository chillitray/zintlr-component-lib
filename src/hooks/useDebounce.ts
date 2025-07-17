import { useEffect, useState, useRef } from 'react';

const useDebounce = <T>(value: T, delay: number): T => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => setDebounced(value), delay);
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [value, delay]);

    return debounced;
}

export { useDebounce };
