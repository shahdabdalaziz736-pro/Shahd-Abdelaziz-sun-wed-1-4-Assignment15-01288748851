import { LayoutGrid, FileText, Users, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const menus = [
    { name: 'Feed', icon: LayoutGrid, path: '/', active: true },
    { name: 'My Posts', icon: FileText, path: '/profile' },
    { name: 'Community', icon: Users, path: '/' },
    { name: 'Saved', icon: Bookmark, path: '/' },
  ];

  return (
    <aside className="sticky top-20">
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        {menus.map((m) => (
          <Link 
            key={m.name} 
            to={m.path}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-1 transition-all ${
              m.active 
              ? 'bg-blue-50 text-blue-600 font-semibold' 
              : 'hover:bg-gray-50 text-gray-600'
            }`}
          >
            <m.icon size={22} />
            <span className="text-[15px]">{m.name}</span>
          </Link>
        ))}
      </div>
      
      <p className="text-[11px] text-gray-400 mt-4 px-4">
        Privacy · Terms · Advertising · Route © 2026
      </p>
    </aside>
  );
}