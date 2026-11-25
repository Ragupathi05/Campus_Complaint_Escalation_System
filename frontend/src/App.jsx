import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Student Pages
import { StudentDashboard } from './pages/StudentDashboard';
import { CampusFeedPage } from './pages/student/CampusFeedPage';
import { RaiseComplaintPage } from './pages/student/RaiseComplaintPage';
import { ComplaintHistoryPage } from './pages/student/ComplaintHistoryPage';
import { StudentFeedbackPage } from './pages/student/StudentFeedbackPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';

// Staff Pages
import { StaffWorkstationPage } from './pages/staff/StaffWorkstationPage';
import { StaffInventoryPage } from './pages/staff/StaffInventoryPage';
import { StaffScheduleCalendar } from './pages/staff/StaffScheduleCalendar';
import { StaffPerformanceScorecard } from './pages/staff/StaffPerformanceScorecard';

// Dept Head Pages
import { DeptHeadSmartDispatcher } from './pages/depthead/DeptHeadSmartDispatcher';
import { DeptHeadTriagePage } from './pages/depthead/DeptHeadTriagePage';
import { DeptHeadStaffMatrixPage } from './pages/depthead/DeptHeadStaffMatrixPage';
import { DeptHeadCategorySlaEditor } from './pages/depthead/DeptHeadCategorySlaEditor';
import { DeptHeadStaffRoster } from './pages/depthead/DeptHeadStaffRoster';
import { DeptHeadAnalyticsDeepDive } from './pages/depthead/DeptHeadAnalyticsDeepDive';

// Admin Pages
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLocationTreeBuilder } from './pages/admin/AdminLocationTreeBuilder';
import { AdminDepartmentsPage } from './pages/admin/AdminDepartmentsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';

// Executive Pages
import { ExecutiveBreachAudit } from './pages/executive/ExecutiveBreachAudit';
import { ExecutiveDepartmentLeaderboard } from './pages/executive/ExecutiveDepartmentLeaderboard';
import { ExecutiveInfrastructureHealth } from './pages/executive/ExecutiveInfrastructureHealth';

// Shared Detail Page
import { ComplaintDetails } from './pages/ComplaintDetails';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-100/70 flex flex-col w-full">
    <Navbar />
    <div className="flex flex-1 w-full">
      <Sidebar />
      <main className="flex-1 w-full p-6 lg:p-8 overflow-y-auto min-w-0">{children}</main>
    </div>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student/Faculty Portal */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_FACULTY']} />}>
            <Route path="/dashboard/student" element={<MainLayout><StudentDashboard /></MainLayout>} />
            <Route path="/dashboard/student/feed" element={<MainLayout><CampusFeedPage /></MainLayout>} />
            <Route path="/dashboard/student/raise" element={<MainLayout><RaiseComplaintPage /></MainLayout>} />
            <Route path="/dashboard/student/history" element={<MainLayout><ComplaintHistoryPage /></MainLayout>} />
            <Route path="/dashboard/student/feedback" element={<MainLayout><StudentFeedbackPage /></MainLayout>} />
            <Route path="/dashboard/student/profile" element={<MainLayout><StudentProfilePage /></MainLayout>} />
          </Route>

          {/* Staff Portal */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_STAFF']} />}>
            <Route path="/dashboard/staff" element={<Navigate to="/dashboard/staff/workstation" replace />} />
            <Route path="/dashboard/staff/workstation" element={<MainLayout><StaffWorkstationPage /></MainLayout>} />
            <Route path="/dashboard/staff/inventory" element={<MainLayout><StaffInventoryPage /></MainLayout>} />
            <Route path="/dashboard/staff/schedule" element={<MainLayout><StaffScheduleCalendar /></MainLayout>} />
            <Route path="/dashboard/staff/performance" element={<MainLayout><StaffPerformanceScorecard /></MainLayout>} />
          </Route>

          {/* Dept Head Portal */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_DEPT_HEAD']} />}>
            <Route path="/dashboard/dept-head" element={<Navigate to="/dashboard/dept-head/dispatcher" replace />} />
            <Route path="/dashboard/dept-head/dispatcher" element={<MainLayout><DeptHeadSmartDispatcher /></MainLayout>} />
            <Route path="/dashboard/dept-head/triage" element={<MainLayout><DeptHeadTriagePage /></MainLayout>} />
            <Route path="/dashboard/dept-head/staff" element={<MainLayout><DeptHeadStaffMatrixPage /></MainLayout>} />
            <Route path="/dashboard/dept-head/sla-editor" element={<MainLayout><DeptHeadCategorySlaEditor /></MainLayout>} />
            <Route path="/dashboard/dept-head/roster" element={<MainLayout><DeptHeadStaffRoster /></MainLayout>} />
            <Route path="/dashboard/dept-head/analytics" element={<MainLayout><DeptHeadAnalyticsDeepDive /></MainLayout>} />
          </Route>

          {/* Admin Portal */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
            <Route path="/dashboard/admin" element={<MainLayout><AdminDashboard /></MainLayout>} />
            <Route path="/dashboard/admin/locations" element={<MainLayout><AdminLocationTreeBuilder /></MainLayout>} />
            <Route path="/dashboard/admin/departments" element={<MainLayout><AdminDepartmentsPage /></MainLayout>} />
            <Route path="/dashboard/admin/users" element={<MainLayout><AdminUsersPage /></MainLayout>} />
            <Route path="/dashboard/admin/audit" element={<MainLayout><AdminAuditLogsPage /></MainLayout>} />
          </Route>

          {/* Higher Official Portal */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_HIGHER_OFFICIAL']} />}>
            <Route path="/dashboard/higher-official" element={<Navigate to="/dashboard/higher-official/breaches" replace />} />
            <Route path="/dashboard/higher-official/breaches" element={<MainLayout><ExecutiveBreachAudit /></MainLayout>} />
            <Route path="/dashboard/higher-official/leaderboard" element={<MainLayout><ExecutiveDepartmentLeaderboard /></MainLayout>} />
            <Route path="/dashboard/higher-official/infrastructure" element={<MainLayout><ExecutiveInfrastructureHealth /></MainLayout>} />
          </Route>

          {/* Shared Complaint Details */}
          <Route element={<ProtectedRoute />}>
            <Route path="/complaints/:id" element={<MainLayout><ComplaintDetails /></MainLayout>} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
