import { createContext, useContext, useState } from 'react';
import SMessage from './Message';
import generateUUID from '../../../utils/uuid';
import CsButton from '../Button';

export type MessageOption = {
   duration?: number;
   closeMethod?: 'auto' | 'manual' | 'both';
   provideCloseBtn?: boolean | JSX.Element;
   onClose?: () => void;
};

export type MessageContextType = typeof MessageContext;

type Resolver = (value: boolean | PromiseLike<boolean>) => void;

export type ActiveMessage = {
   type: 'success' | 'error' | 'warning' | 'info' | 'log' | 'help' | 'loading';
   message: string | JSX.Element;
   key: string;
   option?: MessageOption;
   active: boolean;
   close: () => void;
};

type MessageCreator = (
   message: string | JSX.Element,
   option?: MessageOption
) => ActiveMessage;

const MessageContext = createContext<{
   success: MessageCreator;
   error: MessageCreator;
   warning: MessageCreator;
   info: MessageCreator;
   log: MessageCreator;
   help: MessageCreator;
   loading: MessageCreator;
   confirm: (
      message: string | JSX.Element,
      option?: {
         [key: string]: (resolve: Resolver) => void;
      }
   ) => Promise<boolean>;
   close: (key: string) => void;
}>({
   success: () => ({}) as any,
   error: () => ({}) as any,
   warning: () => ({}) as any,
   info: () => ({}) as any,
   log: () => ({}) as any,
   help: () => ({}) as any,
   loading: () => ({}) as any,
   confirm: async () => false,
   close: () => {},
});

export function useMessage() {
   return useContext(MessageContext);
}

export default function CsMessageProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const [messages, setMessages] = useState<ActiveMessage[]>([]);

   function createMessage(
      type: Pick<ActiveMessage, 'type'>['type'],
      content: string | JSX.Element,
      option?: MessageOption
   ) {
      const key = generateUUID();
      const onClose = () => {
         setTimeout(() => {
            setMessages((prev) =>
               prev.filter((message) => message.key !== key)
            );
         }, 350);
      };
      const message = {
         key,
         type,
         active: true,
         message: content,
         option: { onClose, ...option },
         close: () => {
            setMessages((prev) => inactivateMessage(key, prev));
         },
      };

      setMessages((prev) => [...prev, message]);

      return message;
   }

   function inactivateMessage(key: string, msg: ActiveMessage[]) {
      const newMsg = msg.map((message) => ({
         ...message,
         active: message.active && message.key !== key,
      }));

      return newMsg;
   }

   function initFn(key: string, option?: MessageOption) {
      if (!option) return;

      if (option.closeMethod !== 'manual') {
         setTimeout(() => {
            setMessages((prev) => inactivateMessage(key, prev));
         }, option.duration ?? 3000);
      }
   }

   const success: MessageCreator = (message, option) => {
      return createMessage('success', message, option);
   };

   const error: MessageCreator = (message, option) => {
      return createMessage('error', message, option);
   };

   const warning: MessageCreator = (message, option) => {
      return createMessage('warning', message, option);
   };

   const info: MessageCreator = (message, option) => {
      return createMessage('info', message, option);
   };

   const help: MessageCreator = (message, option) => {
      return createMessage('help', message, option);
   };

   const loading: MessageCreator = (message, option) => {
      return createMessage('loading', message, option);
   };

   const log: MessageCreator = (message, option) => {
      return createMessage('log', message, option);
   };

   const confirm = async (
      message: string | JSX.Element,
      option?: {
         [key: string]: (resolve: Resolver) => void;
      }
   ) => {
      let content, resolve: Resolver;
      const promise = new Promise<boolean>((res) => (resolve = res));

      option ??= {
         取消: (resolve) => resolve(false),
         确定: (resolve) => resolve(true),
      };

      if (typeof message === 'string') {
         content = (
            <div className='flex flex-col gap-4 w-72'>
               {message}
               <div className='flex gap-3 ml-auto'>
                  {Object.entries(option).map(([key, fn]) => (
                     <CsButton
                        key={key}
                        className='bg-background-200 !py-1'
                        onclick={() => {
                           fn(resolve);
                           msg.close();
                        }}>
                        {key}
                     </CsButton>
                  ))}
               </div>
            </div>
         );
      } else {
         content = message;
      }

      const msg = log(content, {
         closeMethod: 'manual',
      });

      return promise;
   };

   const close = (key: string) => {
      setMessages((prev) => inactivateMessage(key, prev));
   };

   return (
      <MessageContext.Provider
         value={{
            success,
            error,
            warning,
            info,
            log,
            help,
            confirm,
            close,
            loading,
         }}>
         <div
            className='fixed w-screen flex flex-col items-center
            pointer-events-none top-0 z-50'>
            {messages.map((message) => (
               <SMessage
                  message={message}
                  key={message.key}
                  initFn={() => initFn(message.key, message.option)}
                  active={message.active}
                  className='pointer-events-auto'
                  closeBtn={message.option?.provideCloseBtn}
               />
            ))}
         </div>
         {children}
      </MessageContext.Provider>
   );
}
