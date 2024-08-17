export default function OptionsItem({
   name,
   icon,
}: {
   name: string;
   icon: JSX.Element;
}) {
   return (
      <div
         className='px-3 py-1.5 hover:bg-background-200 transition-all 
         bg-background-50 hover:cursor-pointer rounded-lg active:scale-90
         active:bg-background-300 select-none space-x-3 items-center flex'>
         {icon}
         <span>{name}</span>
      </div>
   );
}
