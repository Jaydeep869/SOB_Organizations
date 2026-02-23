import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import Home from './pages/Home';
import OrgDetail from './pages/OrgDetail';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/org/:orgSlug" element={<OrgDetail />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
