import { useEffect, useRef, RefObject } from 'react';

export const useIsMounted = (): RefObject<boolean> => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    return isMounted;
};
