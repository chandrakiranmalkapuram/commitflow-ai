"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = App;
const react_query_1 = require("@tanstack/react-query");
const react_router_dom_1 = require("react-router-dom");
const AuthProvider_1 = require("./auth/AuthProvider");
const ProtectedRoute_1 = require("./components/ProtectedRoute");
const AppLayout_1 = require("./components/layout/AppLayout");
const LoginView_1 = require("./auth/LoginView");
const RegisterView_1 = require("./auth/RegisterView");
const DashboardPage_1 = require("./dashboard/DashboardPage");
const RepositoryPage_1 = require("./repositories/RepositoryPage");
const GenerationDetailPage_1 = require("./generations/GenerationDetailPage");
const GithubSettingsPage_1 = require("./github/GithubSettingsPage");
const GithubCallbackPage_1 = require("./github/GithubCallbackPage");
const queryClient = new react_query_1.QueryClient();
function App() {
    return (<react_query_1.QueryClientProvider client={queryClient}>
      <AuthProvider_1.AuthProvider>
        <react_router_dom_1.BrowserRouter>
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/login" element={<LoginView_1.LoginView />}/>
            <react_router_dom_1.Route path="/register" element={<RegisterView_1.RegisterView />}/>
            
            <react_router_dom_1.Route element={<ProtectedRoute_1.ProtectedRoute />}>
              <react_router_dom_1.Route element={<AppLayout_1.AppLayout />}>
                <react_router_dom_1.Route path="/" element={<react_router_dom_1.Navigate to="/dashboard" replace/>}/>
                <react_router_dom_1.Route path="/dashboard" element={<DashboardPage_1.DashboardPage />}/>
                <react_router_dom_1.Route path="/repositories" element={<RepositoryPage_1.RepositoryPage />}/>
                <react_router_dom_1.Route path="/generations" element={<div className="p-4">Generations coming soon</div>}/>
                <react_router_dom_1.Route path="/generations/:id" element={<GenerationDetailPage_1.GenerationDetailPage />}/>
                <react_router_dom_1.Route path="/content" element={<div className="p-4">Content Approval coming soon</div>}/>
                <react_router_dom_1.Route path="/settings" element={<react_router_dom_1.Navigate to="/settings/github" replace/>}/>
                <react_router_dom_1.Route path="/settings/github" element={<GithubSettingsPage_1.GithubSettingsPage />}/>
                <react_router_dom_1.Route path="/settings/github/callback" element={<GithubCallbackPage_1.GithubCallbackPage />}/>
              </react_router_dom_1.Route>
            </react_router_dom_1.Route>
            
            <react_router_dom_1.Route path="*" element={<react_router_dom_1.Navigate to="/" replace/>}/>
          </react_router_dom_1.Routes>
        </react_router_dom_1.BrowserRouter>
      </AuthProvider_1.AuthProvider>
    </react_query_1.QueryClientProvider>);
}
exports.default = App;
