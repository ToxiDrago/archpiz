import Loadable from 'react-loadable';
import React from 'react';
import { Routes, Route } from 'react-router';

import './scss/app.scss';
import Home from './pages/Home.tsx';
import MainLayout from './layouts/MainLayout.tsx';

const FullPizza = React.lazy(() => import(/* webpackChunkname: "FullPizza" */'./pages/FullPizza.tsx'));
const Cart = React.lazy(() => import(/* webpackChunkname: "Cart" */'./pages/Cart.tsx'));


const NotFound = React.lazy(() => import(/* webpackChunkname: "NotFound" */'./pages/NotFound.tsx'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
         path="/cart"
          element={
            <React.Suspense fallback={<div>Идёт загрузка...</div>}>
          <Cart />
          </React.Suspense>
          }
           />
        <Route path="/pizza/:id" element={
          <React.Suspense fallback={<div>Идёт загрузка...</div>}>
          <FullPizza />
          </React.Suspense>
          }
           />
        <Route path="*" element={
          <React.Suspense fallback={<div>Идёт загрузка...</div>}>
          <NotFound />
          </React.Suspense>
          }
           />
      </Route>
    </Routes>
  );
}

export default App;
