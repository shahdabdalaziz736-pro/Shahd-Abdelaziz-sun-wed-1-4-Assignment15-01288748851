import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {}
      <Navbar />

      <div className="max-w-[1200px] mx-auto flex gap-6 pt-6 px-4">
    {}
        <div className="hidden lg:block w-1/4">
          <Sidebar />
        </div>
{}
        <main className="flex-1 max-w-[600px] mx-auto pb-10">
          <Outlet />
        </main>
{}
        <div className="hidden xl:block w-1/4"></div>
      </div>
    </div>
  );
}