import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';

const Routers = () => {
    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<ProductDetails />} />
    </Routes>
};

export default Routers;