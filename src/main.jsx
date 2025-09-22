import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust the import path as needed
import App from './App';
import './index.css'


// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Initial render
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);