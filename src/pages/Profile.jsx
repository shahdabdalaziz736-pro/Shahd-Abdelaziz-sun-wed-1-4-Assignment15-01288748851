import { useEffect, useState } from 'react';
import { authAPI } from '../api/endpoints';
import toast from 'react-hot-toast';
import { MapPin, Calendar, Mail } from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authAPI.getProfile()
      .then(res => {
      
        setUser(res.data.user);
      })
      .catch(err => {
        console.error("Profile Load Error:", err);
        toast.error("Failed to load profile data");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-[#002f95]"></div>
        <p className="text-gray-400 font-medium">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-fadeIn">
  {}
      <div className="h-44 bg-gradient-to-br from-[#002f95] via-[#004dc7] to-blue-400 relative">
         <div className="absolute inset-0 opacity-20 pattern-grid-lg"></div>
      </div>
      {}
      <div className="px-8 pb-8">
        <div className="relative flex justify-center -mt-20 mb-6">
          <div className="p-1.5 bg-white rounded-full shadow-lg">
            <img 
              src={user?.photo || 'https://via.placeholder.com/150'} 
              className="w-36 h-36 rounded-full border-2 border-gray-50 object-cover bg-gray-100" 
              alt="profile" 
            />
          </div>
       {}
          <div className="absolute bottom-2 right-[38%] bg-green-500 w-5 h-5 border-4 border-white rounded-full shadow-sm" title="Online"></div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{user?.name || 'User Name'}</h2>
          
          <div className="flex items-center justify-center gap-4 text-gray-500 text-sm mt-3">
            <span className="flex items-center gap-1"><Mail size={14} /> {user?.email}</span>
            <span className="flex items-center gap-1 font-medium"><Calendar size={14} /> Joined 2026</span>
          </div>

          <div className="flex justify-center gap-8 border-t border-gray-50 mt-8 pt-6">
            <div className="text-center group cursor-pointer">
               <span className="block font-bold text-xl text-gray-900 group-hover:text-[#002f95] transition">10</span>
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Posts</span>
            </div>
            <div className="text-center border-x border-gray-100 px-8 group cursor-pointer">
               <span className="block font-bold text-xl text-gray-900 group-hover:text-[#002f95] transition">250</span>
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Friends</span>
            </div>
            <div className="text-center group cursor-pointer">
               <span className="block font-bold text-xl text-gray-900 group-hover:text-[#002f95] transition">42</span>
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Photos</span>
            </div>
          </div>

        {}
          <div className="mt-8">
            <button className="bg-gray-100 text-gray-800 px-10 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-200 transition-all active:scale-95 border border-gray-200">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}