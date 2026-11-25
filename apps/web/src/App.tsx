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
import { PublicLayout } from './pages/PublicLayout';
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FaqPage } from './pages/FaqPage';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public marketing website */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/faq" element={<FaqPage />} />
            </Route>

            {/* Auth routes */}
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />

            {/* Protected authenticated application */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
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

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
