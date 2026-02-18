import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import './index.css';

/**
 * Main App Component
 */
function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/company/:id" element={<CompanyDetailPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
