import Avatar from "../ui/Avatar";

export default function Header() {
  return (
    <header className="h-16 border-b-2 text-text flex items-center py-10 px-8">
      <div className="flex flex-grow gap-8">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-4 py-2 focus:outline-none bg-gray-100"
        />
      </div>
      <div className="flex items-center gap-2 px-8">
        <button className="ml-4">
          <i className="ri-settings-4-line text-2xl text-gray-400 hover:text-primary" />
        </button>
        <button className="ml-4">
          <i className="ri-notification-line text-2xl text-gray-400 hover:text-primary" />
        </button>
        <button className="flex gap-2 items-center ml-4">
          <Avatar src="/default-avatar.png" alt="Profile" />
          İlsu Sunal
        </button>
      </div>
    </header>
  );
}
