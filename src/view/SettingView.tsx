import { useEffect, useState } from 'react';
import Block from '../components/Block';
import Card from '../components/Card';
import Title from '../components/cs/Title';
import CsInput from '../components/cs/Input';
import CsLine from '../components/cs/Line';
import CsText from '../components/cs/Text';
import CsButton from '../components/cs/Button';
import { useMessage } from '../components/cs/message/MessageProvider';
import CsTrigger from '../components/cs/Trigger';

export default function SettingView({
   setView,
}: {
   setView: (view: string) => void;
}) {
   const [apiKey, setApiKey] = useState<string>('');
   const [appSecret, setAppSecret] = useState<string>('');
   const message = useMessage();

   useEffect(() => {
      const key = window.localStorage.getItem('api-key');
      const secret = window.localStorage.getItem('api-secret');
      key && setApiKey(key);
      secret && setAppSecret(secret);
   }, []);

   function save() {
      window.localStorage.setItem('api-key', apiKey);
      window.localStorage.setItem('api-secret', appSecret);
      message.success('保存成功 o(*￣▽￣*)ブ');
   }

   return (
      <Card className='w-[520px]'>
         <div className='flex flex-col gap-4'>
            <CsLine className='items-center'>
               <CsTrigger
                  onclick={() => setView('usage')}
                  className='size-9 p-0 flex items-center 
                  justify-center'>
                  <i className='fas fa-caret-left mt-[1px]'></i>
               </CsTrigger>
               <Title className='text-xl md:text-2xl'>API 设置</Title>
            </CsLine>
            <Block className='space-y-4'>
               <CsLine className='mx-1 flex-col md:flex-row md:items-center'>
                  <CsText className='w-[5.1rem] md:text-end'>
                     API Key &nbsp;
                  </CsText>
                  <CsInput
                     className='w-full'
                     value={apiKey}
                     onChange={setApiKey}
                     placeholder='请输入 API Key'
                  />
               </CsLine>
               <CsLine className='mx-1 flex-col md:flex-row md:items-center'>
                  <CsText className='w-[5.1rem] md:text-end'>
                     Secret Key &nbsp;
                  </CsText>
                  <CsInput
                     className='w-full'
                     value={appSecret}
                     onChange={setAppSecret}
                     placeholder='请输入 Secret Key'
                  />
               </CsLine>
               <CsLine>
                  <CsButton
                     className='w-full justify-center flex text-lg'
                     onclick={save}>
                     <div className='flex gap-2 items-center bold tracking-wider'>
                        <i className='fas fa-save mt-[1px]'></i>
                        保存
                     </div>
                  </CsButton>
               </CsLine>
            </Block>
         </div>
      </Card>
   );
}
