import { ActiveMessage } from './MessageProvider';
import { useEffect, useRef } from 'react';

function preIcon(type: string) {
   let icon;

   switch (type) {
      case 'success':
         icon = <i className='fas fa-circle-check text-accent-400' />;
         break;
      case 'error':
         icon = <i className='fas fa-circle-xmark text-secondary-500' />;
         break;
      case 'info':
         icon = <i className='fas fa-circle-info text-background-300' />;
         break;
      case 'help':
         icon = <i className='fas fa-circle-question text-secondary-300' />;
         break;
      case 'loading':
         icon = (
            <i className='fas fa-circle-notch animate-spin text-background-300' />
         );
         break;
      default:
         icon = <i className='fas fa-circle-xmark text-secondary-500' />;
         break;
   }

   return icon;
}

export default function CsMessage({
   message,
   className,
   active,
   children,
   closeBtn,
   initFn,
}: {
   message: ActiveMessage;
   className?: string;
   active?: boolean;
   children?: React.ReactNode;
   closeBtn?: boolean | JSX.Element;
   initFn?: () => void;
}) {
   const body = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      initFn?.();
   }, []);

   useEffect(() => {
      if (!body.current) return;

      if (!active) {
         const height = body.current.clientHeight;

         body.current.style.marginTop = `-${height}px`;
         body.current.style.opacity = '0';

         setTimeout(() => {
            message?.option?.onClose?.();
         }, 350);
      } else {
         const height = body.current.clientHeight;

         body.current.style.transition = 'none';
         body.current.style.marginTop = `-${height}px`;
         body.current.style.opacity = '0';

         requestAnimationFrame(() => {
            if (!body.current) return;

            body.current.style.transition = 'all 0.35s ease-in-out';
            body.current.style.marginTop = '20px';
            body.current.style.opacity = '1';
         });
      }
   }, [active, body]);

   return (
      <div
         className={`text-text-800 p-4 bg-background-50 rounded-xl md:text-lg
         text-base items-center shadow-lg shadow-background-200 w-fit max-w-[90vw]
         opacity-0 duration-300 z-50 ${className}`}
         ref={body}>
         {!children && (
            <div
               className='flex gap-4 items-center max-w-[95vw] text-wrap 
               relative'>
               {message?.type !== 'log' && preIcon(message?.type ?? 'info')}
               <span
                  className={
                     typeof message?.message === 'string' ? 'w-64' : ''
                  }>
                  {message?.message ?? ''}
               </span>
               <span
                  className='hover:cursor-pointer ml-auto'
                  onClick={message.close}>
                  {closeBtn && <i className='fas fa-xmark' />}
               </span>
            </div>
         )}
         {children}
      </div>
   );
}
