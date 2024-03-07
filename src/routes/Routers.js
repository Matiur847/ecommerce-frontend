import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import Products from '../pages/Products';
import LoginRegister from '../pages/LoginRegister';
import Register from '../pages/Register';

const Routers = () => {
    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/login' element={<LoginRegister />} />
        <Route path='/register' element={<Register />} />
    </Routes>
};

export default Routers;