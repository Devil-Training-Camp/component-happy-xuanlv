import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const app = createRoot(document.getElementById('view-root')!);

app.render(<App />);
