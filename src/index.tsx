import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './store/store';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
} else {
  console.error("Failed to find the root element");
}
