import React from 'react';
import { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { I18nProvider } from '../_metronic/i18n/i18nProvider';
import { LayoutProvider, LayoutSplashScreen } from '../_metronic/layout/core';
import { MasterInit } from '../_metronic/layout/MasterInit';
import { AuthInit, useAuth } from './modules/auth'; // Import useAuth hook

const App: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const { logout } = useAuth(); // Use the useAuth hook to get the logout function

  // Define a function to handle logout
  // const handleLogout = () => {
  //   logout(); // Call the logout function from useAuth
  //   navigate('/auth/login'); // Redirect to the login page after logout
  // };

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            {/* Your sidebar or navigation component with a Logout button */}
         
            
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
};

export { App };
