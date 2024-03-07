import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import Products from '../pages/Products';
import LoginRegister from '../pages/LoginRegister';

const Routers = () => {
    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/login-register' element={<LoginRegister />} />
    </Routes>
};

export default Routers;