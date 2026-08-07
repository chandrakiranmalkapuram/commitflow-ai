import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, LogOut, FileText, Bot, FolderGit2 } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';

export function Sidebar() {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Repositories', href: '/repositories', icon: FolderGit2 },
    { name: 'Generations', href: '/generations', icon: Bot },
    { name: 'Content Approval', href: '/content', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 shrink-0 items-center px-6">
        <h1 className="text-xl font-bold text-gray-900">CommitFlow AI</h1>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-800 font-medium text-sm">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
          Logout
        </button>
      </div>
    </div>
  );
}
