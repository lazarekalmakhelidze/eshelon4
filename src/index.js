import React, { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const Admin = lazy(() => import('./Admin'));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
const isAdmin = window.location.pathname.replace(/\/+$/, '') === '/admin';

root.render(
  <StrictMode>
    {isAdmin ? (
      <Suspense fallback={<div className="min-h-screen bg-[#0d0d0d]" />}>
        <Admin />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>
);
