export default function CsTrigger({
   children,
   onclick = () => {},
   className = '',
}: {
   children: React.ReactNode;
   onclick?: () => void;
   className?: string;
}) {
   return (
      <div
         onClick={onclick}
         className={`p-2 rounded-xl bg-primary-100 hover:bg-primary-200 
         text-primary-600 transition-all hover:cursor-pointer active:scale-90
        ${className}`}>
         {children}
      </div>
   );
}
