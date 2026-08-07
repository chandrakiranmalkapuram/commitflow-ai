"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLayout = AppLayout;
const react_router_dom_1 = require("react-router-dom");
const Sidebar_1 = require("./Sidebar");
function AppLayout() {
    return (<div className="flex h-screen w-full bg-gray-50">
      <Sidebar_1.Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <react_router_dom_1.Outlet />
        </div>
      </main>
    </div>);
}
