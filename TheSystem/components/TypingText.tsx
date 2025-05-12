import React, { useState, useEffect, useRef } from 'react';
import { Text, TextProps } from 'react-native';

type TypingTextProps = TextProps & {
  children?: React.ReactNode;
  speed?: number;
  startDelay?: number;
};

export default function TypingText({
  children,
  speed = 15,
  startDelay = 500,
  ...props
}: TypingTextProps) {
  const fullText =
    typeof children === 'string'
      ? children
      : React.Children.toArray(children).join('');

  const [displayedText, setDisplayedText] = useState('');
  const currentIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDisplayedText('');
    currentIndexRef.current = 0;

    if (!fullText) return;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setDisplayedText((prev) => {
          if (currentIndexRef.current < fullText.length) {
            const nextText = prev + fullText[currentIndexRef.current];
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
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [fullText, speed, startDelay]);

  return (
    <Text {...props} style={[{ fontFamily: 'Orbitron' }, props.style]}>
      {displayedText}
    </Text>
  );
}
