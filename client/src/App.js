
import './App.css';
import SignUpPage from './pages/auth/SignupPage';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { NavigationTitleProvider } from './contexts/NavigationTitleContext';

function App() {
  return (
    <div className="App">
      <NavigationTitleProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </NavigationTitleProvider>
    </div>
  );
}

export default App;
