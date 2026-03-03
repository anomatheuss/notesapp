import React from 'react';

export const Sparkle = ({ color = "#ADDEFE", size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <path 
      d="M50 0C50 35 65 50 100 50C65 50 50 65 50 100C50 65 35 50 0 50C35 50 50 35 50 0Z" 
      fill={color} 
      stroke="#29314D" 
      strokeWidth="4"
    />
  </svg>
);

export const Flower = ({ color = "#D1FFD7", size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <path 
      d="M50 50C50 20 70 0 90 20C110 40 80 50 50 50ZM50 50C80 50 100 70 80 90C60 110 50 80 50 50ZM50 50C50 80 30 100 10 80C-10 60 20 50 50 50ZM50 50C20 50 0 30 20 10C40 -10 50 20 50 50Z" 
      fill={color} 
      stroke="#29314D" 
      strokeWidth="4"
    />
  </svg>
);

export const Star8 = ({ color = "#FF611E", size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <path 
      d="M50 0L60 35L100 40L70 65L80 100L50 80L20 100L30 65L0 40L40 35L50 0Z" 
      fill={color} 
      stroke="#29314D" 
      strokeWidth="4"
    />
  </svg>
);

export const Circle = ({ color = "#E0C3FC", size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <circle 
      cx="50" cy="50" r="45" 
      fill={color} 
      stroke="#29314D" 
      strokeWidth="4"
    />
  </svg>
);

export const Diamond = ({ color = "#FFB347", size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <path 
      d="M50 5L95 50L50 95L5 50Z" 
      fill={color} 
      stroke="#29314D" 
      strokeWidth="4"
    />
  </svg>
);
