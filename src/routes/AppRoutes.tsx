import {
  ALLOW_REGISTER,
  HAS_LANDING,
  HAS_WORKSPACES,
} from '@/config/consts/configConsts';
import DashboardLayout from '@/layouts/DashboardLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { RootLayout } from '@/layouts/RootLayout';
import { ForgotPassword } from '@/pages/public/ForgotPassword';
import { Home } from '@/pages/public/Home';
import { Login } from '@/pages/public/Login';
import { Register } from '@/pages/public/Register';
import { ResetPassword } from '@/pages/public/ResetPassword';
import { VerifyEmail } from '@/pages/public/VerifyEmail';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { AuthGuard } from './AuthGuard';
import { VerifyEmailInfo } from '@/pages/public/VerifyEmailInfo';
import { Sessions } from '@/pages/private/Sessions';
import { setNavigate } from '@/shared/utils/navigation';
import { Dashboard } from '@/pages/private/Dashboard';
import { SettingsLayout } from '@/layouts/SettingsLayout';
import { WorkspaceDashboard } from '@/pages/private/WorkspaceDashboard';

const Landing = () =>
  HAS_LANDING ? (
    <Home />
  ) : (
    <Navigate
      to={'/login'}
      replace
    />
  );

const AppRoutes = () => {
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route
            index
            element={<Landing />}
          />
          <Route
            path="login"
            element={<Login />}
          />
          {ALLOW_REGISTER && (
            <Route
              path="register"
              element={<Register />}
            />
          )}
          <Route
            path="email/verify"
            element={<VerifyEmailInfo />}
          />
          <Route
            path="email/verify/:code"
            element={<VerifyEmail />}
          />
          <Route
            path="password/forgot"
            element={<ForgotPassword />}
          />
          <Route
            path="password/reset"
            element={<ResetPassword />}
          />
        </Route>

        {/* PRIVATE ROUTES */}
        <Route element={<AuthGuard />}>
          <Route element={<DashboardLayout />}>
            {HAS_WORKSPACES ? (
              <Route path=":workspace">
                <Route
                  index
                  element={<WorkspaceDashboard />}
                />
              </Route>
            ) : (
              <Route
                path="dashboard"
                element={<Dashboard />}
              />
            )}
          </Route>
          <Route element={<SettingsLayout />}>
            <Route
              path="sessions"
              element={<Sessions />}
            />
            <Route
              path="settings"
              element={<div>Here you find some settings</div>}
            />
          </Route>
        </Route>

        {/* NOT_FOUND REDIRECT */}
        <Route
          path="*"
          element={
            <Navigate
              to={'/dashboard'}
              replace
            />
          }
        />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
