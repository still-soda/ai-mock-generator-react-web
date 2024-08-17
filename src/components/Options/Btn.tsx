import { useRef } from 'react';

export default function OptionsBtn({
   onclick,
}: {
   onclick: (status?: boolean) => void;
}) {
   const ref = useRef<HTMLDivElement>(null);
   const clickEvent = (e: React.MouseEvent<HTMLDivElement>) => {
      if (
         e.target === ref.current ||
         ref.current?.contains(e.target as HTMLElement)
      ) {
         onclick();
      }
      const cb = (ev: MouseEvent) => {
         if (
            ev.target !== ref.current &&
            !ref.current?.contains(ev.target as HTMLElement)
         ) {
            removeEventListener('click', cb);
            onclick(false);
         }
      };
      window.addEventListener('click', cb);
   };
   return (
      <div
         onClick={clickEvent}
         ref={ref}
         className='size-9 flex items-center justify-center bg-background-50 
         rounded-xl hover:md:scale-125 hover:cursor-pointer transition-all
         shadow-md shadow-background-200 active:md:scale-100'>
         <i className='fas fa-bars transition-all mt-[1px]'></i>
      </div>
   );
}
