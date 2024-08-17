export default function CsButton({
   children,
   className,
   onclick,
}: {
   children: React.ReactNode;
   className?: string;
   onclick?: () => void;
}) {
   return (
      <div
         onClick={onclick}
         className={`bg-accent-300 px-4 py-2 rounded-lg text-accent-700 
            hover:bg-accent-400 hover:text-accent-800 transition-all 
            active:bg-accent-300 active:scale-95 hover:cursor-pointer
            select-none
            ${className}`}>
         {children}
      </div>
   );
}
