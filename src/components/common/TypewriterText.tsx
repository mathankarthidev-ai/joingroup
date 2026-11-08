'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  words,
  typingSpeed = 75,
  deletingSpeed = 35,
  pauseDuration = 2000,
  className = '',
  cursorClassName = '',
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor toggle
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex % words.length];

    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        // Natural slight typing jitter (±15ms)
        const jitter = Math.floor(Math.random() * 25) - 10;
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, Math.max(30, typingSpeed + jitter));
      } else {
        // Full word typed, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (text.length > 0) {
        // Deleting characters
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-block relative">
      <span className={className}>{text}</span>
      <span
        aria-hidden="true"
        className={`inline-block w-[3px] h-[0.85em] ml-1 bg-current align-baseline rounded-full transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        } ${cursorClassName}`}
      />
    </span>
  );
};
