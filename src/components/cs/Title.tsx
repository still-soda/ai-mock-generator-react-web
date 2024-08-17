export default function CsTitle({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <div
         className={` text-lg md:text-xl text-primary-600 ml-2 bold ${className}`}>
         {children}
      </div>
   );
}
