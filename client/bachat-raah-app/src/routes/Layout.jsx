
import Home from '../pages/Home';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Home /> {/* Sidebar */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* Main Content */}
      </div>
    </div>
  );
}
