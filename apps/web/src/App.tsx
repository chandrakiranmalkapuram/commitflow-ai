import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';
import { LoginView } from './auth/LoginView';
import { RegisterView } from './auth/RegisterView';
import { DashboardPage } from './dashboard/DashboardPage';
import { RepositoryPage } from './repositories/RepositoryPage';
import { GenerationDetailPage } from './generations/GenerationDetailPage';
import { GithubSettingsPage } from './github/GithubSettingsPage';
import { GithubCallbackPage } from './github/GithubCallbackPage';
import { LinkedinSettingsPage } from './linkedin/LinkedinSettingsPage';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/repositories" element={<RepositoryPage />} />
                <Route path="/generations" element={<div className="p-4">Generations coming soon</div>} />
                <Route path="/generations/:id" element={<GenerationDetailPage />} />
                <Route path="/content" element={<div className="p-4">Content Approval coming soon</div>} />
                <Route path="/settings" element={<Navigate to="/settings/github" replace />} />
                <Route path="/settings/github" element={<GithubSettingsPage />} />
                <Route path="/settings/github/callback" element={<GithubCallbackPage />} />
                <Route path="/settings/linkedin" element={<LinkedinSettingsPage />} />
              </Route>
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
