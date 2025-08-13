import React, { useState, useEffect } from 'react';
import LightBox from './LightBox';

export default function Shoes() {
    const [Image, setImage] = useState("./images/image-product-1.jpg");
    const [lightBoxPopup, setPopup] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 450);

    const images = [];
    for (let index = 1; index <= 4; index++) {
        images.push(`./images/image-product-${index}-thumbnail.jpg`);
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 450);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const updateImage = (image) => {
        setImage(image);
        setActiveIndex(images.indexOf(image.replace(".jpg", "-thumbnail.jpg")));
    };

    const toggleLightBox = () => {
        setPopup(!lightBoxPopup);
    };

    const changeImage = (index) => {
        const newImage = images[index].replace("-thumbnail", "");
        setImage(newImage);
        setActiveIndex(index);
    };

    const nextImage = () => {
        const nextIndex = (activeIndex + 1) % images.length;
        changeImage(nextIndex);
    };

    const previousImage = () => {
        const prevIndex = (activeIndex - 1 + images.length) % images.length;
        changeImage(prevIndex);
    };

    return (
        <div className="shoes">
            <div className="item" onClick={toggleLightBox}>
                <img src={Image} alt="Main product" />

                <button className='next' onClick={nextImage}>
                    <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="m2 1 8 8-8 8" stroke="#1D2026" strokeWidth="3" fill="none" fillRule="evenodd" />
                    </svg>
                </button>
                <button className='previous' onClick={previousImage}>
                    <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 1 3 9l8 8" stroke="#1D2026" strokeWidth="3" fill="none" fillRule="evenodd" />
                    </svg>
                </button>

            </div>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`item1 ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => changeImage(index)}
                >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
            ))}
            {!isMobile && (
                <LightBox
                    toggled={lightBoxPopup}
                    toggleLightBox={toggleLightBox}
                    images={images}
                    Image={Image}
                    updateImage={updateImage}
                />
            )}
        </div>
    );
}
