import { useEffect, useState } from 'react';
import './App.css';
import OptionsBtn from './components/Options/Btn';
import OptionsList from './components/Options/List';
import SettingView from './view/SettingView';
import UsageView from './view/UsageView';
import HelpView from './view/HelpView';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

function App() {
   const [btnTrigger, setBtnTrigger] = useState(false);
   const [route, setRoute] = useState('-');
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      setRoute(location.pathname.replace('/', ''));
   }, [location]);

   function setView(view: string) {
      setRoute(location.pathname.replace('/', ''));
      requestAnimationFrame(() => navigate(`/${view}`));
   }

   return (
      <div
         style={{
            alignItems: 'safe center',
         }}
         className='h-screen w-screen flex items-center justify-center 
         text-text-700 overflow-x-hidden prim-scrollbar'>
         <div className='fixed top-3 left-3 md:top-8 md:left-8 z-40'>
            <OptionsBtn
               onclick={(status?: boolean) => {
                  setBtnTrigger(status ?? !btnTrigger);
               }}
            />
            <div
               className={`
               transition-all
               ${btnTrigger ? 'opacity-100' : 'opacity-0'}
               ${btnTrigger ? 'scale-100 translate-y-0' : 'scale-0 -translate-y-5'}
               ${btnTrigger ? 'pointer-events-auto' : 'pointer-events-none absolute'}`}>
               <OptionsList
                  onclick={() => setBtnTrigger(!btnTrigger)}
                  setView={setView}
               />
            </div>
         </div>
         <div hidden={route !== '' && route !== 'usage'}>
            <UsageView />
         </div>
         <Routes>
            <Route
               path='/settings'
               element={<SettingView setView={setView} />}
            />
            <Route path='/help' element={<HelpView setView={setView} />} />
         </Routes>
      </div>
   );
}

export default App;
