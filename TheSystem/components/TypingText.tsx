import React, { useState, useEffect, useRef } from 'react';
import { Text, TextProps } from 'react-native';

type TypingTextProps = TextProps & {
  children?: string;
  speed?: number;
};

export default function TypingText({ children = '', speed = 50, ...props }: TypingTextProps) {
  const text = typeof children === 'string' ? children : '';
  const [displayedText, setDisplayedText] = useState('');
  const currentIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setDisplayedText('');
    currentIndexRef.current = 0;

    if (!text) return;

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

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, speed]);

  return <Text {...props}>{displayedText}</Text>;
}
