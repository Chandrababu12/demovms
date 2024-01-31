import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
// import {MenuTestPage} from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
// import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
// import  SequencePage  from '../pages/sequence/SequencePage'
import AnalyticsPage from '../pages/analytics/AnalyticsPage'
import LayoutsPage from '../pages/layouts/LayoutsPage'
// import  from '../pages/server/ServerPage'
import DevicePage from '../pages/device/DevicePage'
import CameraPage from '../pages/camera/CameraPage'
import KeyboardPage from '../pages/keyboard/KeyboardPage'
import MnvrPage from '../pages/mnvr/MnvrPage'
import RolePage from '../pages/role/RolePage'
import PermissionPage from '../pages/permissions/PermissionPage'
import RecordingPage from '../pages/recording/RecordingPage'
import RecordingPageAll from '../pages/recording/RecordingAll'
import SavedLayout from '../pages/layouts/savedLayout'
import { AuthPage } from '../modules/auth'
import ServerPage from '../pages/server/ServerPage'





const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../pages/users/UsersPage'))
  const CalculatorPage = lazy(() => import('../modules/mycalculator/CalculatorPage'))
  const SequencePage = lazy(() => import('../pages/sequence/SequencePage'))

  
  return (
    <Routes>
      <Route path='auth/*' element={<AuthPage />} />
      <Route element={<MasterLayout />}>

        {/* Redirect to Dashboard after success login/registartion */}

        <Route path='auth/*' element={<Navigate to='/login' />} />
        <Route path='auth/*' element={<Navigate to='/signup' />} />
        {/* Pages */}

        <Route path='/dashboard' element={<DashboardWrapper />} />
        <Route path='/sequence' element={<SequencePage />} />

        <Route path='/analytics' element={< AnalyticsPage />} />
        <Route path='/layouts' element={<LayoutsPage />} />
        <Route path="/savedLayout" element={<SavedLayout />} />
        <Route path='/sites' element={<ServerPage />} />
        <Route path='/device' element={<DevicePage />} />
        <Route path='/camera' element={<CameraPage />} />
        <Route path='/keyboard' element={<KeyboardPage />} />
        <Route path='/mnvr' element={<MnvrPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/role' element={<RolePage />} />
        <Route path='/permissions' element={<PermissionPage />} />


        <Route path='/recording' element={<RecordingPage />} />
        <Route path='/recordingall' element={<RecordingPageAll />} />


        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route path='/calculator' element={<CalculatorPage />} />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
