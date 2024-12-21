"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ball {
  number: number;
  id: string;
  tubeIndex: number;
  position: number;
}

const KenoTubes = ({ drawnNumbers = [] }: { drawnNumbers?: number[] }) => {
  const [balls, setBalls] = useState<Ball[]>([]);
  
  useEffect(() => {
    const newBalls = drawnNumbers.map((number, index) => ({
      number,
      id: `ball-${number}`,
      tubeIndex: index < 10 ? 0 : 1,
      position: index < 10 ? index : index - 10
    }));
    setBalls(newBalls);
  }, [drawnNumbers]);

  return (
    <div className="relative w-64 h-96 mx-auto flex justify-center gap-8">
      {/* Glass Tubes */}
      {[0, 1].map((tubeIndex) => (
        <div key={`tube-${tubeIndex}`} className="relative w-24 h-full">
          {/* Glass Tube Container */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* Glass Effect Base */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
                backdropFilter: 'blur(8px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.5)'
              }}
            />
            
            {/* Left Reflection */}
            <div 
              className="absolute left-0 top-0 w-1/3 h-full"
              style={{
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0.4), transparent)'
              }}
            />
            
            {/* Right Shadow */}
            <div 
              className="absolute right-0 top-0 w-1/3 h-full"
              style={{
                background: 'linear-gradient(to left, rgba(0, 0, 0, 0.1), transparent)'
              }}
            />
          </div>

          {/* Balls Container */}
          <AnimatePresence>
            {balls
              .filter(ball => ball.tubeIndex === tubeIndex)
              .map((ball) => (
                <motion.div
                  key={ball.id}
                  initial={{ y: -100, opacity: 0 }}
                  animate={{
                    y: 320 - (ball.position * 32), // Adjusted to fall to the bottom and fill towards the top
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }
                  }}
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 -ml-4 w-8 h-8"
                >
                  {/* Ball Design */}
                  <div className="relative w-full h-full">
                    {/* Ball Background */}
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #EF4444, #B91C1C)',
                        boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.3)'
                      }}
                    />
                    
                    {/* Ball Number */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {ball.number}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default KenoTubes;
