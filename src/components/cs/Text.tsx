export default function CsText({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <div
         className={`shrink-0 text-sm md:text-md bold text-secondary-500 
         ${className}`}>
         {children}
      </div>
   );
}
