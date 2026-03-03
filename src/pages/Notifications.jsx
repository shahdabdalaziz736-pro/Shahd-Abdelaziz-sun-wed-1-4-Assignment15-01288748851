import { useEffect, useState } from 'react';
import { notificationsAPI } from '../api/endpoints';
import toast from 'react-hot-toast';

export default function Notifications() {
  const [notifs, setNotifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    notificationsAPI.getAll()
      .then(res => {
        if (res.data && res.data.notifications) {
          setNotifs(res.data.notifications);
        }
      })
      .catch(err => {
        console.error("Error loading notifications:", err);
        toast.error("Could not load notifications");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-[600px] mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        <span className="bg-blue-100 text-[#002f95] text-xs font-bold px-2.5 py-1 rounded-full">
          {notifs.length} New
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 items-center animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {notifs.length > 0 ? (
            notifs.map(n => (
              <div key={n._id} className="py-4 flex gap-4 items-center hover:bg-gray-50 px-2 rounded-xl transition cursor-pointer">
                <div className="relative">
                  <img 
                    src={n.fromUser?.image || 'https://via.placeholder.com/150'} 
                    className="w-12 h-12 rounded-full object-cover border border-gray-100" 
                    alt="user"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="text-[14px] text-gray-800 leading-tight">
                    <span className="font-bold hover:underline">{n.fromUser?.name}</span> {n.content}
                  </p>
                  <span className="text-[11px] text-gray-400 font-medium">Recently</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gray-300"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
              </div>
              <p className="text-gray-500 font-medium">No notifications yet</p>
              <p className="text-gray-400 text-sm">We'll let you know when something happens!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}