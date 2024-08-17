import OptionsItem from './Item';

const options = [
   {
      icon: <i className='fas fa-meteor'></i>,
      name: '功能',
      view: 'usage',
   },
   {
      icon: <i className='fas fa-circle-question'></i>,
      name: '帮助',
      view: 'help',
   },
   {
      icon: <i className='fas fa-gear'></i>,
      name: '设置',
      view: 'settings',
   },
];

export default function OptionsList({
   onclick,
   setView,
}: {
   onclick: (e: React.MouseEvent<HTMLDivElement>) => void;
   setView: (view: string) => void;
}) {
   function clickHandler(e: React.MouseEvent<HTMLDivElement>, view: string) {
      onclick(e);
      setView(view);
   }

   return (
      <div
         className='p-2 bg-background-50 rounded-xl mt-2 shadow-md 
         shadow-background-200 flex flex-col gap-1 text-nowrap 
         whitespace-nowrap'>
         {options.map((item) => (
            <div onClick={(e) => clickHandler(e, item.view)} key={item.view}>
               <OptionsItem icon={item.icon} name={item.name} />
            </div>
         ))}
         <div
            onClick={() => {
               window.open('https://www.still-soda.top/home', '_blank');
            }}>
            <OptionsItem icon={<i className='fas fa-blog'></i>} name='博客' />
         </div>
      </div>
   );
}
