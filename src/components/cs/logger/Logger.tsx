import hljs from 'highlight.js';
import { useEffect, useState } from 'react';
import Block from '../../Block';
import TinyBtn from './TinyBtn';

export default function CsLogger({
   content = '',
   setContent = () => {},
}: {
   content?: string;
   setContent?: (content: string) => void;
}) {
   const [editable, setEditable] = useState(false);
   const [copied, setCopied] = useState(false);
   const [highlighted, setHighlighted] = useState('');

   useEffect(() => {
      const highlightedContent = hljs.highlightAuto(content).value;
      setHighlighted(highlightedContent);
   }, [content]);

   return (
      <Block
         className='!bg-tranparent !p-0 border-4 border-secondary-200 
         border-dashed hover:border-secondary-300 transition-all relative 
         group/btns'>
         {/* BUTTON GROUP */}
         {content !== '' && (
            <div className='absolute top-2 right-2'>
               <div
                  className='group-hover/btns:opacity-0 opacity-100 text-sm
               transition-all bold absolute right-2 text-secondary-300'>
                  JSON
               </div>
               <div
                  className='flex gap-2 group-hover/btns:opacity-100 opacity-0
               transition-all'>
                  <TinyBtn
                     icon={<i className='fa fa-trash'></i>}
                     title='双击删除'
                     dbFunc={() => {
                        setContent('');
                     }}
                  />
                  <TinyBtn
                     icon={
                        editable ? (
                           <i className='fa fa-ban'></i>
                        ) : (
                           <i className='fa fa-edit'></i>
                        )
                     }
                     title={editable ? '退出编辑' : '编辑内容'}
                     func={() => {
                        setEditable(!editable);
                     }}
                  />
                  <TinyBtn
                     icon={
                        copied ? (
                           <i className='fa fa-check'></i>
                        ) : (
                           <i className='far fa-clipboard'></i>
                        )
                     }
                     title={copied ? '复制成功' : '复制内容'}
                     func={() => {
                        if (copied) return;
                        navigator.clipboard.writeText(content);
                        setCopied(true);
                        setTimeout(() => {
                           setCopied(false);
                        }, 2000);
                     }}
                  />
               </div>
            </div>
         )}
         {content === '' && (
            <div
               className='flex flex-col w-full items-center my-5 gap-1
               text-secondary-300'>
               <i className='fa fa-code text-4xl'></i>
               <span className='code-font'>no result</span>
            </div>
         )}
         {content !== '' && (
            <pre
               className='code-font outline-none m-4 overflow-x-auto 
               sec-scrollbar h-full text-sm md:text-base'
               contentEditable={editable}>
               <code
                  className='bg-transparent'
                  dangerouslySetInnerHTML={{ __html: highlighted }}></code>
            </pre>
         )}
      </Block>
   );
}
