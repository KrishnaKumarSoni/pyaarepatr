import React, { useEffect, useRef } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const float = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
`;

const Heart = styled.div<{ delay: number; size: number; left: number }>`
  position: fixed;
  color: ${props => props.color || '#ff69b4'};
  font-size: ${props => props.size}px;
  left: ${props => props.left}%;
  bottom: -20px;
  opacity: 0;
  animation: ${float} 6s linear infinite;
  animation-delay: ${props => props.delay}s;
  z-index: 0;
  pointer-events: none;

  &::before {
    content: '❤';
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

export default function FloatingHearts() {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    size: Math.random() * 20 + 10,
    left: Math.random() * 100,
    color: ['#ff69b4', '#ff8da1', '#ffa8b6', '#ffccd5'][Math.floor(Math.random() * 4)]
  }));

  return (
    <Container>
      {hearts.map(heart => (
        <Heart
          key={heart.id}
          delay={heart.delay}
          size={heart.size}
          left={heart.left}
          color={heart.color}
        />
      ))}
    </Container>
  );
} 