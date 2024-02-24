import React, { useEffect, useState } from 'react';
import '../style/Home.css'
import Helmet from '../components/Helmet/Helmet'
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap'
import Carousel from './Carousel';
// import producctImg from '../download.jpg'
// import Carouse from './Carouse';

import Slider from "react-slick";

const Home = () => {

    const [products, setProducts] = useState([])
    // const product3 = products.slice(0, 3)

    console.log('Products', products)

    useEffect(() => {
        axios.get('http://localhost:4242/api/v1/products')
            .then((data) => {
                setProducts(data.data.allProduct)
            })
            .catch((error) => console.log('Error', error.message))
    }, [])

    const bannerData = [
        {
            logo: <i class="ri-truck-line"></i>,
            title: 'Fee Delivery',
            para: 'product all over price $25'
        },

        {
            logo: <i class="ri-text-wrap"></i>,
            title: '90 days return',
            para: 'For all users'
        },

        {
            logo: <i class="ri-secure-payment-line"></i>,
            title: 'Secure Payment',
            para: '100% secure payment'
        },

        {
            logo: <i class="ri-questionnaire-line"></i>,
            title: '24/7 support',
            para: 'Delivery support'
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoPlay: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Helmet title='Home'>
            <div className='home-container'>
                <Container>
                    <Carousel />
                    <Row>
                        {
                            bannerData.map((item, index) => (
                                <Col lg='3' md='4' sm='6' xs='6' key={index}>
                                    <div className="category-item d-flex align-items-center gap-3">
                                        <div className="category-img">
                                            {item.logo}
                                        </div>
                                        <div className="category-title">
                                            <h6>{item.title}</h6>
                                            {/* <p>{item.para}</p> */}
                                        </div>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>
        </Helmet>
    );
};

export default Home;