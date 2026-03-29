import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import Admin from './pages/Admin';

export default function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </ContentProvider>
    </ThemeProvider>
  );
}
