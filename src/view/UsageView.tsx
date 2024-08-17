import { useState } from 'react';
import Block from '../components/Block';
import Card from '../components/Card';
import Title from '../components/cs/Title';
import CsLine from '../components/cs/Line';
import CsText from '../components/cs/Text';
import CsButton from '../components/cs/Button';
import { useMessage } from '../components/cs/message/MessageProvider';
import CsLogger from '../components/cs/logger/Logger';
import CsDataInput from '../components/cs/DataInput';
import generateUUID from '../utils/uuid';
import { getApiData, requestApi } from '../services/requestApi';
import CsLink from '../components/cs/Link';

export type DataItem = {
   name: string;
   type: 'string' | 'number' | 'boolean' | 'array' | 'object' | string;
   desc: string;
   key: string;
   enable: boolean;
};

export type Data = DataItem[];

export default function UsageView() {
   const [count, _setCount] = useState(1);
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState<Data>([]);
   const [content, setContent] = useState('');
   const message = useMessage();

   const setCount = (val: number) => {
      if (val < 1) return;
      _setCount(val);
   };

   function copyData(): Data {
      return JSON.parse(JSON.stringify(data));
   }

   function changeData(func: (item: DataItem) => DataItem, key: string) {
      const newData = copyData();
      const index = newData.findIndex((i) => i.key === key);
      if (index === -1) return;
      newData[index] = func(newData[index]);
      setData(newData);
   }

   function addNewData() {
      setData([
         ...data,
         {
            name: '',
            type: 'string',
            desc: '',
            key: generateUUID(),
            enable: true,
         },
      ]);
   }

   async function generater() {
      if (loading) {
         return;
      }

      if (data.length === 0) {
         message.error('你还没有添加数据...');
         return;
      } else {
         const idx = data.findIndex((i) => i.enable && i.name === '');
         if (idx !== -1) {
            message.error(`第${idx + 1}条数据名称是空的`);
            return;
         }
      }

      setLoading(true);
      const msg = message.loading('正在生成数据...', {
         closeMethod: 'manual',
      });

      const result = await requestApi({ data, count });

      setLoading(false);
      setContent(result?.trim() || '');
      requestAnimationFrame(msg.close);

      if (!result || result.startsWith('[ERR]')) {
         const noToken = !getApiData();
         if (noToken) {
            const onclick = () => err.close();
            const err = message.error(
               <CsText>
                  你还没有完善API设置，请前往
                  <span onClick={onclick}>
                     <CsLink route='/settings'>
                        <i className='fas fa-gear mr-1'></i>
                        设置页面
                     </CsLink>
                  </span>
                  设置
               </CsText>,
               {
                  provideCloseBtn: true,
                  closeMethod: 'manual',
               }
            );
            return;
         }
         message.error('生成失败 QAQ');
         return;
      } else {
         setTimeout(() => {
            result && message.success('生成成功 o(*￣▽￣*)ブ');
         }, 300);
      }
   }

   return (
      <Card className='w-[570px] my-2'>
         <div className='flex flex-col gap-4 h-full relative'>
            <Title className='text-xl md:text-2xl'>
               <i className='fas fa-fire mr-2'></i>
               AI 虚假数据生成器
            </Title>
            {/* DATA */}
            <Block className='space-y-4'>
               <Title>数据</Title>
               {data.map((item) => (
                  <CsDataInput
                     name={item.name}
                     type={item.type}
                     desc={item.desc}
                     key={item.key}
                     enable={item.enable}
                     onEnableChange={(enable) =>
                        changeData((i) => ({ ...i, enable }), item.key)
                     }
                     onNameChange={(name) =>
                        changeData((i) => ({ ...i, name }), item.key)
                     }
                     onTypeChange={(type) =>
                        changeData((i) => ({ ...i, type }), item.key)
                     }
                     onDescChange={(desc) =>
                        changeData((i) => ({ ...i, desc }), item.key)
                     }
                     onRemove={() =>
                        setData(data.filter((i) => i.key !== item.key))
                     }
                  />
               ))}
               <CsLine>
                  <CsButton
                     className='w-full justify-center flex text-lg'
                     onclick={addNewData}>
                     <div className='flex gap-2 items-center bold tracking-wider'>
                        添加新数据
                        <i className='fas fa-plus mt-[1px]'></i>
                     </div>
                  </CsButton>
               </CsLine>
            </Block>
            {/* GENERATE NUMBER */}
            <Block className='space-y-3 md:space-y-4'>
               <Title>生成数量</Title>
               <CsLine className='justify-between items-center'>
                  <CsButton onclick={() => setCount(count - 1)}>
                     <span className='bold'>
                        减少
                        <i className='fas fa-minus ml-2'></i>
                     </span>
                  </CsButton>
                  <CsText className='text-xl'>{count}</CsText>
                  <CsButton onclick={() => setCount(count + 1)}>
                     <span className='bold'>
                        增加
                        <i className='fas fa-plus ml-2'></i>
                     </span>
                  </CsButton>
               </CsLine>
            </Block>
            {/* GENERATE RESULT */}
            <Block className='space-y-2'>
               <Title>生成结果</Title>
               <CsLogger content={content} setContent={setContent} />
            </Block>
            {/* GENERATE BUTTON */}
            <CsButton
               className='w-full justify-center flex text-lg text-primary-600
               bg-background-100 hover:bg-primary-200 transition-all
               active:bg-primary-100 hover:text-primary-700'
               onclick={generater}>
               <div className='flex gap-2 items-center bold tracking-wider'>
                  {!loading && <i className='fas fa-burger mt-[1px]'></i>}
                  {loading && (
                     <i className='fas fa-spinner animate-spin mt-[1px]'></i>
                  )}
                  {loading ? '生成中...' : '生成'}
               </div>
            </CsButton>
         </div>
      </Card>
   );
}
