import React from 'react';

import { Routes, Route } from 'react-router';

import './scss/app.scss';

import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import FullPizza from './pages/FullPizza.tsx';
import Cart from './pages/Cart.tsx';
import MainLayout from './layouts/MainLayout.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
