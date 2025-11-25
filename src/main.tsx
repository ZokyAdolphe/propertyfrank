import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Login from './components/admin/Login.tsx';
import AdminLayout from './components/admin/AdminLayout.tsx';
import Dashboard from './components/admin/Dashboard.tsx';
import PropertiesList from './components/admin/PropertiesList.tsx';
import PropertyForm from './components/admin/PropertyForm.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<App />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/properties" element={<AdminLayout><PropertiesList /></AdminLayout>} />
        <Route path="/admin/properties/new" element={<AdminLayout><PropertyForm /></AdminLayout>} />
        <Route path="/admin/properties/edit/:id" element={<AdminLayout><PropertyForm /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
