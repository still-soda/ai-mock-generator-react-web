export default function Card({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <>
         <div
            className={`p-4 rounded-xl shadow-lg shadow-background-200 
            bg-secondary-50 max-w-[95vw] ${className}`}>
            {children}
         </div>
      </>
   );
}
