"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoute = ProtectedRoute;
const react_router_dom_1 = require("react-router-dom");
const AuthProvider_1 = require("../auth/AuthProvider");
function ProtectedRoute() {
    const { user, isLoading } = (0, AuthProvider_1.useAuth)();
    if (isLoading) {
        return (<div className="flex h-screen w-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>);
    }
    if (!user) {
        return <react_router_dom_1.Navigate to="/login" replace/>;
    }
    return <react_router_dom_1.Outlet />;
}
