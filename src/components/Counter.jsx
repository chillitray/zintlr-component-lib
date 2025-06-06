import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export const Counter = ({ initialCount = 0, onCountChange }) => {
  const [count, setCount] = useState(initialCount);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Effect to track last update time
  useEffect(() => {
    setLastUpdate(new Date().toLocaleTimeString());

    // Notify parent component if provided
    if (onCountChange) {
      onCountChange(count);
    }

    // Show toast on milestone counts
    if (count !== 0 && count % 10 === 0) {
      toast.success(`Milestone reached: ${count}!`);
    }
  }, [count, onCountChange]);

  // Memoized increment function
  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  // Memoized decrement function
  const decrement = useCallback(() => {
    setCount((prevCount) => prevCount - 1);
  }, []);

  // Reset function with confirmation
  const reset = useCallback(() => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setCount(initialCount);
          resolve();
        }, 500);
      }),
      {
        loading: 'Resetting counter...',
        success: 'Counter reset successfully!',
        error: 'Failed to reset counter',
      }
    );
  }, [initialCount]);

  return (
    <div className="counter-container">
      <h2>Counter: {count}</h2>
      <p>Last updated: {lastUpdate}</p>
      <div className="counter-buttons">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};
