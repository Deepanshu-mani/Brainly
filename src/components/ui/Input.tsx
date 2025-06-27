export function Input({
  placeholder,
  reference,
}: {
  reference: any
  placeholder: string;
}) {
  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        type={"text"}
        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200 backdrop-blur-sm hover:bg-white/70"
        ref={reference}
      />
    </div>
  );
}