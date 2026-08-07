"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = Sidebar;
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const AuthProvider_1 = require("../../auth/AuthProvider");
function Sidebar() {
    const { pathname } = (0, react_router_dom_1.useLocation)();
    const { logout, user } = (0, AuthProvider_1.useAuth)();
    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: lucide_react_1.LayoutDashboard },
        { name: 'Repositories', href: '/repositories', icon: lucide_react_1.FolderGit2 },
        { name: 'Generations', href: '/generations', icon: lucide_react_1.Bot },
        { name: 'Content Approval', href: '/content', icon: lucide_react_1.FileText },
        { name: 'Settings', href: '/settings', icon: lucide_react_1.Settings },
    ];
    return (<div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 shrink-0 items-center px-6">
        <h1 className="text-xl font-bold text-gray-900">CommitFlow AI</h1>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (<react_router_dom_1.Link key={item.name} to={item.href} className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-500'}`} aria-hidden="true"/>
                {item.name}
              </react_router_dom_1.Link>);
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
        <button onClick={() => logout()} className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
          <lucide_react_1.LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
          Logout
        </button>
      </div>
    </div>);
}
