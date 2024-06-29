// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import BlogEditor from './components/BlogEditor';
import ThemeProviderWrapper from './components/ThemeProviderWrapper';
import NavBar from './components/NavBar';
import AuthPage from './components/AuthPage';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProviderWrapper>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="/auth" />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/blogs/:id" element={<BlogPage />} />
              <Route path="/create" element={<BlogEditor />} />
            </Routes>
          </Router>
        </ThemeProviderWrapper>
      </PersistGate>
    </Provider>
  );
}

export default App;
