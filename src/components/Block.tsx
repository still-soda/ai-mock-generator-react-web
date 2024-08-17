export default function Block({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <>
         <div
            className={`p-4 rounded-xl bg-secondary-100 max-w-[95vw] 
            ${className}`}>
            {children}
         </div>
      </>
   );
}
