import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Send } from './pages/Send';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
