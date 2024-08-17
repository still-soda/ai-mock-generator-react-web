export default function CsDataInput({
   name = '',
   desc = '',
   type = 'string',
   enable = true,
   onEnableChange = () => {},
   onNameChange = () => {},
   onDescChange = () => {},
   onTypeChange = () => {},
   onRemove = () => {},
   className = '',
}: {
   name?: string;
   desc?: string;
   type?: string;
   enable?: boolean;
   onEnableChange?: (enable: boolean) => void;
   onNameChange?: (name: string) => void;
   onDescChange?: (desc: string) => void;
   onTypeChange?: (type: string) => void;
   onRemove?: () => void;
   className?: string;
}) {
   return (
      <div
         className={`flex gap-2 p-2 bg-secondary-50 ring-4 mx-1 relative
            ring-secondary-200 has-[input:focus]:ring-secondary-300
            rounded-lg transition-all items-center text-sm md:text-base 
            ${className}`}>
         <div
            onClick={() => onEnableChange(!enable)}
            className='cursor-pointer text-secondary-600 mx-1'>
            {enable && <i className='far fa-circle-check'></i>}
            {!enable && <i className='far fa-circle'></i>}
         </div>
         <input
            className='bg-transparent outline-none border-none tracking-wider
            placeholder:text-secondary-200 text-secondary-500 w-[50%]'
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder='属性名'></input>
         <div className='w-0.5 h-full border-l-2 border-secondary-200'>
            &nbsp;
         </div>
         <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            className='bg-transparent outline-none border-none
            tracking-wider text-secondary-600'>
            <option value='string'>字符串</option>
            <option value='number'>数字</option>
            <option value='boolean'>布尔值</option>
            <option value='array'>数组</option>
            <option value='object'>对象</option>
         </select>
         <div className='w-0.5 h-full border-l-2 border-secondary-200'>
            &nbsp;
         </div>
         <input
            className='bg-transparent outline-none border-none tracking-wider
            placeholder:text-secondary-200 text-secondary-500 w-full'
            value={desc}
            onChange={(e) => onDescChange(e.target.value)}
            placeholder='描述'></input>
         <i
            onClick={onRemove}
            className='fa fa-trash text-secondary-400 hover:text-secondary-500
            transition-all hover:cursor-pointer'></i>
      </div>
   );
}
