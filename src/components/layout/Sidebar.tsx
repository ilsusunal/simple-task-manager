export default function Sidebar() {
  return (
    <section className="w-64 border-r-2 text-text flex flex-col">
      <div className="p-4 font-bold text-xl text-primary">
        Simple Task Manager
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 py-4 px-8">
          <li>Dashboard</li>
          <li>Projects</li>
          <li>Teams</li>
        </ul>
      </nav>
    </section>
  );
}
