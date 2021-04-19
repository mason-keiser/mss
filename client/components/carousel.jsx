import React from 'react'
import { Carousel } from 'react-bootstrap'

const HomeCarousel = () => {
    return(
        <Carousel nextIcon={false} prevIcon={false}>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="/images/h1.jpg"
                alt="First slide"
                />
                <Carousel.Caption className='c1'>
                <h1>Find all of your surf needs here</h1>
                <p>We have a wide selection of wetsuits and surf equipment</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="/images/h2.jpg"
                alt="Second slide"
                />

            <Carousel.Caption className='c2'>
            <h1>We support ocean safe products</h1>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="/images/h3.jpg"
                alt="Third slide"
                />

                <Carousel.Caption className='c3'>
                <h1>Mas’s Surf Shop supports OneReef</h1>
                <p>A portion of the proceeds from each purchase will go towards rebuilding and preserving reefs around the world</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default HomeCarousel