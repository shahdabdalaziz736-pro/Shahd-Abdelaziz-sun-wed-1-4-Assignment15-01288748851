import { Link, useNavigate } from 'react-router-dom';
import { Home, User, Bell, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 px-6 py-2 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-[#002f95] text-white p-1.5 rounded-md font-bold text-xs uppercase tracking-tighter">Route</div>
          <span className="font-bold text-2xl text-[#002f95] tracking-tighter">route</span>
        </Link>
      </div>

      <div className="flex gap-10 text-gray-500">
        <Link to="/" className="hover:text-blue-600 transition-colors">
          <Home size={26} />
        </Link>
        <Link to="/notifications" className="hover:text-blue-600 transition-colors">
          <Bell size={26} />
        </Link>
        <Link to="/profile" className="hover:text-blue-600 transition-colors">
          <User size={26} />
        </Link>
      </div>

      <button 
        onClick={handleLogout}
        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
        title="Logout"
      >
        <LogOut size={22} />
      </button>
    </nav>
  );
}