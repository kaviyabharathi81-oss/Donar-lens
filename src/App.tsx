import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { DonorLayout } from './layouts/DonorLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { ExplorePage } from './pages/public/ExplorePage';
import { CampaignDetailPage } from './pages/public/CampaignDetailPage';
import { PublicVerifyPage } from './pages/public/PublicVerifyPage';
import { VerifyDetailPage } from './pages/public/VerifyDetailPage';
import { AboutPage } from './pages/public/AboutPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';

// Donor Portal Pages
import { DonorDashboardPage } from './pages/donor/DonorDashboardPage';
import { DonorExplorePage } from './pages/donor/DonorExplorePage';
import { DonorDonatePage } from './pages/donor/DonorDonatePage';
import { DonorDonationsPage } from './pages/donor/DonorDonationsPage';
import { DonorDonationDetailPage } from './pages/donor/DonorDonationDetailPage';
import { DonorUpcomingPage } from './pages/donor/DonorUpcomingPage';
import { DonorSavedPage } from './pages/donor/DonorSavedPage';
import { DonorNotificationsPage } from './pages/donor/DonorNotificationsPage';
import { DonorProfilePage } from './pages/donor/DonorProfilePage';
import { DonorSettingsPage } from './pages/donor/DonorSettingsPage';

// Admin Portal Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminCampaignsPage } from './pages/admin/AdminCampaignsPage';
import { AdminCreateCampaignPage } from './pages/admin/AdminCreateCampaignPage';
import { AdminCampaignDetailPage } from './pages/admin/AdminCampaignDetailPage';
import { AdminDonationVerificationPage } from './pages/admin/AdminDonationVerificationPage';
import { AdminExpensesPage } from './pages/admin/AdminExpensesPage';
import { AdminApprovalsPage } from './pages/admin/AdminApprovalsPage';
import { AdminTransactionsPage } from './pages/admin/AdminTransactionsPage';
import { AdminAuditPage } from './pages/admin/AdminAuditPage';
import { AdminVerificationCenterPage } from './pages/admin/AdminVerificationCenterPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="campaign/:id" element={<CampaignDetailPage />} />
            <Route path="verify" element={<PublicVerifyPage />} />
            <Route path="verify/:transactionId" element={<VerifyDetailPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Donor Portal Routes */}
          <Route path="/donor" element={<DonorLayout />}>
            <Route index element={<Navigate to="/donor/dashboard" replace />} />
            <Route path="dashboard" element={<DonorDashboardPage />} />
            <Route path="explore" element={<DonorExplorePage />} />
            <Route path="campaigns/:id" element={<CampaignDetailPage />} />
            <Route path="campaigns/:id/donate" element={<DonorDonatePage />} />
            <Route path="donations" element={<DonorDonationsPage />} />
            <Route path="donations/:id" element={<DonorDonationDetailPage />} />
            <Route path="upcoming" element={<DonorUpcomingPage />} />
            <Route path="saved" element={<DonorSavedPage />} />
            <Route path="notifications" element={<DonorNotificationsPage />} />
            <Route path="profile" element={<DonorProfilePage />} />
            <Route path="settings" element={<DonorSettingsPage />} />
          </Route>

          {/* Admin Portal Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="campaigns" element={<AdminCampaignsPage />} />
            <Route path="campaigns/new" element={<AdminCreateCampaignPage />} />
            <Route path="campaigns/:id" element={<AdminCampaignDetailPage />} />
            <Route path="campaigns/:id/donations" element={<AdminDonationVerificationPage />} />
            <Route path="campaigns/:id/expenses" element={<AdminExpensesPage />} />
            <Route path="campaigns/:id/approvals" element={<AdminApprovalsPage />} />
            <Route path="campaigns/:id/transactions" element={<AdminTransactionsPage />} />
            <Route path="campaigns/:id/audit" element={<AdminAuditPage />} />
            <Route path="verification" element={<AdminVerificationCenterPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="notifications" element={<AdminNotificationsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
