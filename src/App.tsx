import React from 'react';
import { ClerkProvider, useClerk, useUser, useAuth } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Refine, Authenticated } from '@refinedev/core';
import routerBindings, {
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from '@refinedev/react-router-v6';
import { RouticThemeProvider } from './theme/ThemeContext';
import { RouticClerkProvider, createClerkAuthProvider } from './auth/clerkAuth';
import { RouticLayout } from './components/layout/RouticLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { VerificationListPage } from './pages/verifications/VerificationListPage';
import { VerificationDetailPage } from './pages/verifications/VerificationDetailPage';
import { VehicleListPage } from './pages/vehicles/VehicleListPage';
import { VehicleDetailPage } from './pages/vehicles/VehicleDetailPage';
import { BookingListPage } from './pages/bookings/BookingListPage';
import { BookingDetailPage } from './pages/bookings/BookingDetailPage';
import { TransactionListPage } from './pages/finance/TransactionListPage';
import { PayoutListPage } from './pages/finance/PayoutListPage';
import { RentalListPage } from './pages/rentals/RentalListPage';
import { RentalDetailPage } from './pages/rentals/RentalDetailPage';
import { InspectionListPage } from './pages/inspections/InspectionListPage';
import { InspectionDetailPage } from './pages/inspections/InspectionDetailPage';
import { MessageModerationPage } from './pages/messages/MessageModerationPage';
import { IncidentListPage } from './pages/cases/IncidentListPage';
import { IncidentDetailPage } from './pages/cases/IncidentDetailPage';
import { DisputeListPage } from './pages/cases/DisputeListPage';
import { ReviewListPage } from './pages/reviews/ReviewListPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { UserListPage } from './pages/users/UserListPage';
import { UserDetailPage } from './pages/users/UserDetailPage';
import { AuditLogPage } from './pages/audit/AuditLogPage';
import { ReportListPage } from './pages/reports/ReportListPage';
import { LoginPage } from './pages/login/LoginPage';
import { UnauthorizedPage } from './pages/unauthorized/UnauthorizedPage';

const CLERK_PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder';

const RefineAppWithAuth: React.FC = () => {
  const clerk = useClerk();
  const { user } = useUser();
  const { getToken, isSignedIn } = useAuth();

  const authProvider = createClerkAuthProvider(clerk, user, getToken, isSignedIn);

  return (
    <Refine
      authProvider={authProvider}
      routerProvider={routerBindings}
      resources={[
        {
          name: 'dashboard',
          list: '/',
          meta: { label: 'Dashboard' },
        },
        {
          name: 'verifications',
          list: '/verifications',
          show: '/verifications/:id',
          meta: { label: 'Verifications' },
        },
        {
          name: 'vehicles',
          list: '/vehicles',
          show: '/vehicles/:id',
          meta: { label: 'Vehicles' },
        },
        {
          name: 'bookings',
          list: '/bookings',
          show: '/bookings/:id',
          meta: { label: 'Bookings' },
        },
        {
          name: 'finance',
          list: '/finance',
          meta: { label: 'Finance' },
        },
        {
          name: 'rentals',
          list: '/rentals',
          show: '/rentals/:id',
          meta: { label: 'Rentals' },
        },
        {
          name: 'inspections',
          list: '/inspections',
          show: '/inspections/:id',
          meta: { label: 'Inspections' },
        },
        {
          name: 'payouts',
          list: '/payouts',
          meta: { label: 'Payouts' },
        },
        {
          name: 'messages',
          list: '/messages',
          meta: { label: 'Messages' },
        },
        {
          name: 'cases',
          list: '/cases',
          show: '/cases/:id',
          meta: { label: 'Incidents' },
        },
        {
          name: 'disputes',
          list: '/disputes',
          meta: { label: 'Disputes' },
        },
        {
          name: 'reviews',
          list: '/reviews',
          meta: { label: 'Reviews' },
        },
        {
          name: 'notifications',
          list: '/notifications',
          meta: { label: 'Notifications' },
        },
        {
          name: 'users',
          list: '/users',
          show: '/users/:id',
          meta: { label: 'Users' },
        },
        {
          name: 'audit-logs',
          list: '/audit-logs',
          meta: { label: 'Audit Logs' },
        },
        {
          name: 'reports',
          list: '/reports',
          meta: { label: 'Reports' },
        },
      ]}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        projectId: 'routic-admin-portal',
      }}
    >
      <Routes>
        <Route
          element={
            <Authenticated
              key="authenticated-routes"
              fallback={<CatchAllNavigate to="/login" />}
            >
              <RouticLayout>
                <Outlet />
              </RouticLayout>
            </Authenticated>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="/verifications">
            <Route index element={<VerificationListPage />} />
            <Route path=":id" element={<VerificationDetailPage />} />
          </Route>
          <Route path="/vehicles">
            <Route index element={<VehicleListPage />} />
            <Route path=":id" element={<VehicleDetailPage />} />
          </Route>
          <Route path="/bookings">
            <Route index element={<BookingListPage />} />
            <Route path=":id" element={<BookingDetailPage />} />
          </Route>
          <Route path="/finance" element={<TransactionListPage />} />
          <Route path="/payouts" element={<PayoutListPage />} />
          <Route path="/rentals">
            <Route index element={<RentalListPage />} />
            <Route path=":id" element={<RentalDetailPage />} />
          </Route>
          <Route path="/inspections">
            <Route index element={<InspectionListPage />} />
            <Route path=":id" element={<InspectionDetailPage />} />
          </Route>
          <Route path="/messages" element={<MessageModerationPage />} />
          <Route path="/cases">
            <Route index element={<IncidentListPage />} />
            <Route path=":id" element={<IncidentDetailPage />} />
          </Route>
          <Route path="/disputes" element={<DisputeListPage />} />
          <Route path="/reviews" element={<ReviewListPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/users">
            <Route index element={<UserListPage />} />
            <Route path=":id" element={<UserDetailPage />} />
          </Route>
          <Route path="/audit-logs" element={<AuditLogPage />} />
          <Route path="/reports" element={<ReportListPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <UnsavedChangesNotifier />
      <DocumentTitleHandler handler={() => 'Routic Admin Operations'} />
    </Refine>
  );
};

export const App: React.FC = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <RouticClerkProvider>
        <RouticThemeProvider>
          <BrowserRouter>
            <RefineAppWithAuth />
          </BrowserRouter>
        </RouticThemeProvider>
      </RouticClerkProvider>
    </ClerkProvider>
  );
};
