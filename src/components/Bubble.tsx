import { RigidBody, Vec, randDir, v } from '../utils/physics.ts';
import { useEffect, useRef } from 'react';

const posibbleColors = [
   'bg-primary-400',
   'bg-primary-500',
   'bg-secondary-400',
   'bg-secondary-500',
   'bg-accent-400',
   'bg-accent-500',
];
const posibbleSize = ['size-2', 'size-4', 'size-4.5'];
const posibbleShape = ['rounded-full', 'rounded-lg'];
const posibbleRotation = ['rotate-0', 'rotate-45', 'rotate-135', 'rotate-180'];

let onListening = false;

export default function BubbleEffectProvider({
   count = 8,
   speedRange = [20, 35],
   accelaration = -4,
   bubbleLiveTime = 370,
   rippleLiveTime = 340,
   threshold = 0.01,
   maxRippleSize = 80,
   enable = true,
   children,
}: {
   count?: number;
   speedRange?: [number, number];
   accelaration?: number;
   bubbleLiveTime?: number; // ms
   rippleLiveTime?: number; // ms
   threshold?: number;
   maxRippleSize?: number;
   enable?: boolean;
   children: React.ReactNode;
}) {
   const container = useRef<HTMLDivElement>(null);

   // 随机初速度
   function randomVelocity() {
      const speed =
         Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
      return randDir().mul(speed);
   }

   // 随机样式
   function randomStyle() {
      return [
         posibbleColors[Math.floor(Math.random() * posibbleColors.length)],
         posibbleSize[Math.floor(Math.random() * posibbleSize.length)],
         posibbleShape[Math.floor(Math.random() * posibbleShape.length)],
         posibbleRotation[Math.floor(Math.random() * posibbleRotation.length)],
      ].join(' ');
   }

   // 创建一个气泡
   function createBubble(pos: Vec) {
      const bubble = document.createElement('div');
      bubble.className = `absolute rounded-full z-10 animate-spin 
         ${randomStyle()}`;

      bubble.style.left = `${pos.x}px`;
      bubble.style.top = `${pos.y}px`;

      container.current?.appendChild(bubble);

      const bubbleBody = new RigidBody(pos, randomVelocity());
      const createTime = Date.now();

      // 移动处理
      bubbleBody.update = (dt) => {
         bubbleBody.move(dt);

         // 锁定处理
         const lock = {
            x: Math.abs(bubbleBody.position.x) < threshold,
            y: Math.abs(bubbleBody.position.y) < threshold,
         };

         const deltaV = bubbleBody.velocity
            .norm()
            .mul((accelaration * dt) / 1000);

         const velocity = bubbleBody.velocity.add(deltaV);

         // 速度限制
         lock.x && (velocity.x = 0);
         lock.y && (velocity.y = 0);

         bubbleBody.velocity = velocity;

         const opacity = 1 - (Date.now() - createTime) / bubbleLiveTime;

         if (opacity <= threshold) {
            bubbleBody.kill();
         }

         bubble.style.opacity = (opacity * 0.8).toString();
         bubble.style.left = `${bubbleBody.position.x}px`;
         bubble.style.top = `${bubbleBody.position.y}px`;
      };

      // 销毁处理
      bubbleBody.onKill = () => {
         bubble.remove();
      };
   }

   // 创建一个中心波纹
   function createRipple(pos: Vec) {
      const ripple = document.createElement('div');
      ripple.className = `absolute rounded-full bg-secondary-400 z-0`;

      container.current?.appendChild(ripple);

      ripple.style.top = `${pos.y}px`;
      ripple.style.left = `${pos.x}px`;

      const createTime = Date.now();

      const update = () => {
         const opacity = 1 - (Date.now() - createTime) / rippleLiveTime;
         ripple.style.opacity = opacity.toString();

         if (opacity <= threshold) {
            ripple.remove();
            return;
         }

         requestAnimationFrame(update);

         const size = (1 - opacity) * maxRippleSize;

         ripple.style.width = ripple.style.height = `${size}px`;
         ripple.style.top = `${pos.y - size / 2}px`;
         ripple.style.left = `${pos.x - size / 2}px`;
      };

      requestAnimationFrame(update);
   }

   useEffect(() => {
      if (onListening) return;
      onListening = true;

      const clickHandler = (e: MouseEvent, c: number = count + 1) => {
         if (!enable) return;
         createBubble(v(e.clientX - 5, e.clientY - 5));
         c > 0 && clickHandler(e, c - 1);
         c === 0 && createRipple(v(e.clientX, e.clientY));
      };

      window.addEventListener('mousedown', clickHandler);
   }, []);

   return (
      <>
         <div
            ref={container}
            className='fixed w-screen h-screen pointer-events-none z-50 top-0'></div>
         {children}
      </>
   );
}
