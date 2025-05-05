import React, { useState, useEffect, useRef } from 'react';
import { Text, TextProps } from 'react-native';

type TypingTextProps = TextProps & {
  children?: string;
  speed?: number;
  startDelay?: number;
};

export default function TypingText({
  children = '',
  speed = 15,
  startDelay = 500,
  ...props
}: TypingTextProps) {
  const text = typeof children === 'string' ? children : '';
  const [displayedText, setDisplayedText] = useState('');
  const currentIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDisplayedText('');
    currentIndexRef.current = 0;

    if (!text) return;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setDisplayedText((prev) => {
          if (currentIndexRef.current < text.length) {
            const nextText = prev + text[currentIndexRef.current];
            currentIndexRef.current++;
            return nextText;
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return prev;
          }
        });
      }, speed);
    }, startDelay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [text, speed, startDelay]);

  return <Text {...props}>{displayedText}</Text>;
}
