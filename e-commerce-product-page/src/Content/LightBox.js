import React, { useState, useEffect } from 'react';
import './LightBox.css';

export default function LightBox({ toggled, images, Image, toggleLightBox, updateImage }) {
    const [galleryImage, setGalleryImage] = useState(Image);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setGalleryImage(Image);
        setActiveIndex(images.indexOf(Image.replace(".jpg", "-thumbnail.jpg")));
    }, [Image, images]);

    const close = () => {
        toggleLightBox();
    };

    const changeImage = (index) => {
        const newImage = images[index].replace("-thumbnail", "");
        setGalleryImage(newImage);
        updateImage(newImage);
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
        <div className={`light-box ${toggled ? 'active' : ''}`} onClick={(event) => {
            if (event.target === event.currentTarget) {
                close()
            }
        }}>
            <div className='light-box-container'>
                <button className='close' onClick={close}>
                    <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
                        <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#ff7d1a" fillRule="evenodd" />
                    </svg>
                </button>
                <div className='shoes-gallery'>
                    <div className="gallery-image">
                        <img src={galleryImage} alt="Main product" />
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
                            onClick={() => changeImage(index)}
                            className={`gallery-thumbnails ${index === activeIndex ? 'active' : ''}`}
                        >
                            <img src={image} alt={`Thumbnail ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
