export default function CsLine({
   children,
   className = '',
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return <div className={`flex flex-row gap-2 ${className}`}>{children}</div>;
}
