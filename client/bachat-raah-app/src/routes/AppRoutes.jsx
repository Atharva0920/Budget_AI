import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home'; 
import About from '../pages/About';
import SignUpPage from '../pages/auth/SignupPage';
import LoginPage from '../pages/auth/LoginPage';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
        </Routes>
    );

}