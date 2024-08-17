export default function CsImage({
   src,
   alt,
   width,
   height,
   className,
}: {
   src: string;
   alt?: string;
   width?: number;
   height?: number;
   className?: string;
}) {
   return (
      <img
         src={src}
         width={width}
         height={height}
         alt={alt}
         className={`w-full rounded-lg my-4 shadow-md shadow-secondary-300 ${className}`}
      />
   );
}
