export function Input({
  placeholder,
  reference,
}: {
  reference: any
  placeholder: string;
}) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={"text"}
        className="px-4 py-2 border border-gray-300 w-full my-2 rounded-md placeholder-gray-400 focus:outline-none focus:border-purple-200 focus:ring-1 focus:ring-purple-400"
        ref= {reference}
      ></input>
    </div>
  );
}
