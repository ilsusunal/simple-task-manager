export default function Header() {
  return (
    <header className="h-16 bg-background text-text flex items-center p-8">
      <div className="flex flex-grow gap-8">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-2 py-1 focus:outline-none w-4/6"
        />
        <button className="bg-primary text-white rounded-md py-2 px-6">
          + Add New
        </button>
      </div>
      <div className="px-8">
        <button className="ml-4">Profile</button>
      </div>
    </header>
  );
}
