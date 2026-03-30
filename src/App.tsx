import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/shared/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </ContentProvider>
    </ThemeProvider>
  );
}
