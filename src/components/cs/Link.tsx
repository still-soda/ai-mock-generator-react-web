import { useNavigate } from 'react-router-dom';

export default function CsLink({
   className = '',
   href = '',
   route,
   children,
}: {
   className?: string;
   href?: string;
   route?: string;
   children?: React.ReactNode;
}) {
   let onclick;
   const navigation = useNavigate();

   if (route) {
      onclick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
         e.preventDefault();
         navigation(route);
      };
   }

   return (
      <a
         href={href}
         onClick={onclick}
         className={`underline mx-1 text-text-500 hover:text-text-400 
         active:scale-90 transition-all ${className}`}>
         {children}
      </a>
   );
}
