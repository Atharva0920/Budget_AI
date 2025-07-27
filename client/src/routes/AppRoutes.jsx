import { Routes, Route } from 'react-router-dom';
import About from '../pages/About';
import SignUpPage from '../pages/auth/SignupPage';
import LoginPage from '../pages/auth/LoginPage';
import NotFound from '../pages/NotFound';

import ProtectedRoute from './ProtectedRoute';
import Accounts from '../pages/Accounts';
import Budget from '../pages/Budget';
import Dashboard from '../pages/Dashboard';
import Investments from '../pages/Investments';
import Layout from './Layout';
import Recurring from '../pages/Recurring';
import Assistant from '../pages/Assistant';
import Reports from '../pages/Reports';
import Transactions from '../pages/Transactions';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="accounts" element={<Accounts />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="budget" element={<Budget />} />
                <Route path="investments" element={<Investments />} />
                <Route path="reports" element={<Reports />} />
                <Route path="recurring" element={<Recurring />} />
                <Route path="assistant" element={<Assistant />} />
            </Route>
            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
        </Routes >
    );

}