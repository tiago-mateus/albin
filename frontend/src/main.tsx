import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './pages/App';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateAlbumPage from './pages/CreateAlbumPage';
import UploadPage from './pages/UploadPage';
import PublicAlbumPage from './pages/PublicAlbumPage';
import BillingPage from './pages/BillingPage';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/albums/new" element={<CreateAlbumPage />} />
          <Route path="/albums/:id/upload" element={<UploadPage />} />
          <Route path="/a/:publicUrl" element={<PublicAlbumPage />} />
          <Route path="/billing" element={<BillingPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
