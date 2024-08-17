export default function CsInput({
   value,
   onChange,
   placeholder = '',
   className = '',
}: {
   value: string;
   onChange: (val: string) => void;
   placeholder?: string;
   className?: string;
}) {
   return (
      <div
         className={`flex flex-col gap-2 p-2 bg-secondary-50 ring-4 
            ring-secondary-200 has-[input:focus]:ring-secondary-300 
            rounded-lg transition-all ${className}`}>
         <input
            className='bg-transparent outline-none border-none tracking-wider
            placeholder:text-secondary-200 text-secondary-500'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}></input>
      </div>
   );
}
