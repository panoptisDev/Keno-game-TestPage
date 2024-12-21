"use client";

import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";

interface Ball {
  number: number;
  id: string;
}

const KenoBallBlower = () => {
  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {
    const initialBalls = Array.from({ length: 30 }, (_, i) => ({
      number: i + 1,
      id: `ball-${i + 1}`,
    }));
    setBalls(initialBalls);
  }, []);

  const generateWaypoints = (count: number, radius: number) => {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const randomRadius = radius * (0.9 + Math.random() * 0.8);
      points.push({
        x: Math.cos(angle) * randomRadius + (Math.random() - 0.5) * 40,
        y: Math.sin(angle) * randomRadius + (Math.random() - 0.5) * 40,
      });
    }
    return points;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Enhanced Glass Sphere */} {/* The sphere is 384x384 pixels (w-96 h-96 in Tailwind)*/}
      <div className="relative w-96 h-96 mx-auto">
        {/* Outer Glow */}
        <div className="absolute -inset-4 rounded-full" style={{ backgroundColor: 'rgba(96, 165, 250, 0.2)', filter: 'blur(20px)' }} />
        
        {/* Main Sphere Container */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Base Glass Layer */}
          <div className="absolute inset-0 rounded-full" style={{ 
            background: 'linear-gradient(to bottom right, rgba(235, 248, 255, 0.4), rgba(235, 248, 255, 0.2), rgba(235, 248, 255, 0.4))', 
            border: '4px solid rgba(255, 255, 255, 0.3)', 
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', 
            backdropFilter: 'blur(10px)' 
          }}>
            
            {/* Left Light Reflection */}
            <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2" style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2), transparent)', transform: 'rotate(45deg)' }} />
            
            {/* Surface Highlight */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.4), transparent, rgba(173, 216, 230, 0.2))' }} />
            
            {/* Inner Shadow */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, transparent, rgba(173, 216, 230, 0.05), rgba(173, 216, 230, 0.2))' }} />
            
            {/* Wind Effect Background */}
            <div className="absolute inset-0 animate-spin-slow" style={{ background: 'radial-gradient(circle, transparent, rgba(173, 216, 230, 0.1), rgba(173, 216, 230, 0.2))' }} />

            {/* White Spot for Sunlight */}
            <div className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent)', filter: 'blur(25px)' }} />

            {/* Balls */}
            {balls.map((ball) => (
              <motion.div
                key={ball.id}
                animate={{
                  scale: [1, 0.84, 1.16, 0.95, 1],
                  x: generateWaypoints(12, 120).map((p) => p.x),
                  y: generateWaypoints(12, 120).map((p) => p.y),
                }}
                transition={{
                  duration: 1 + Math.random() * 1,
                  repeat: Infinity,
                  ease: "linear",
                  scale: {
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
                className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-full h-full rounded-full shadow-md relative"
                >
                  {/* Ball Gradient */}
                  <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(to bottom right, #EF4444, #B91C1C)', boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)' }} />
                </motion.div>
                {/* Ball Number */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-bold text-sm z-10 text-white">
                    {ball.number}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Light Reflection */}
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1), transparent)', filter: 'blur(10px)' }} />
      </div>
    </div>
  );
};

export default memo(KenoBallBlower);
