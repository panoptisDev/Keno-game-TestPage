"use client";

import React, { useEffect, useState } from 'react';
import KenoBallBlower from './KenoBallBlower';
import KenoTubes from './KenoTubes';

const TestPage = () => {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);

  useEffect(() => {
    // Simulate drawing balls
    const interval = setInterval(() => {
      setDrawnNumbers((prev) => {
        if (prev.length >= 20) return prev;
        const nextNumber = Math.floor(Math.random() * 80) + 1;
        return [...prev, nextNumber];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-end bg-cover bg-center" style={{ backgroundImage: 'url(/App_bg.webp)' }}>
      <div className="flex gap-2 mr-8 mb-80"> {/* Adjust mt-16 to move down or use mb-16 to move up */}
        <KenoBallBlower />
        <KenoTubes drawnNumbers={drawnNumbers} />
      </div>
    </div>
  );
};

export default TestPage;