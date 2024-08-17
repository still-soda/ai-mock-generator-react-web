export default function TinyBtn({
   icon,
   title,
   func = () => {},
   dbFunc = () => {},
}: {
   icon: JSX.Element;
   title: string | JSX.Element;
   func?: () => void;
   dbFunc?: () => void;
}) {
   return (
      <>
         <div
            onClick={func}
            onDoubleClick={dbFunc}
            className='size-7 bg-secondary-200 flex items-center justify-center 
            rounded-lg opacity-80 text-secondary-600 hover:bg-secondary-300 
            active:scale-90 hover:cursor-pointer transition-all 
            active:bg-secondary-200 relative group text-sm'>
            {icon}
            <div
               className='absolute text-nowrap top-full p-2 text-sm opacity-0
               bg-secondary-200 mt-2 rounded-lg group-hover:opacity-100
               transition-all pointer-events-none group-hover:pointer-events-auto
               flex items-center justify-center'>
               <div
                  className='absolute bottom-full size-3 bg-secondary-200
                  rotate-45 translate-y-2 rounded-xs'></div>
               {title}
            </div>
         </div>
      </>
   );
}
