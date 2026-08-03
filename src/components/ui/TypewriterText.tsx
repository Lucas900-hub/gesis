"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
  cursorClassName?: string;
}

export function TypewriterText({ text, delay = 0, className = "", cursorClassName = "bg-primary" }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const startTyping = () => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50); // Speed of typing
      return interval;
    };

    if (delay > 0) {
      timeout = setTimeout(() => {
        const interval = startTyping();
        return () => clearInterval(interval);
      }, delay * 1000);
    } else {
      const interval = startTyping();
      return () => clearInterval(interval);
    }

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className={`inline-block w-[3px] h-[1em] align-middle ml-1 -mt-1 ${cursorClassName}`}
      />
    </span>
  );
}
