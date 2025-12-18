export default function MessageInput() {
  return (
    <form className="flex h-16 bg-gray-200 border-gray-400 border-t-2">
      <input type="text" className="flex-1 py-4 px-6" />
      <button className="py-4 px-6 bg-gray-200 border-l-2">Submit</button>
    </form>
  );
}
