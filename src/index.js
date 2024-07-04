import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import App from './App.jsx';

// Load Font Awesome icons
library.add(fas);
library.add(fab);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>
);
