import React from 'react';
import { useInView } from 'react-intersection-observer';
import './slider.css';

const Slider = ({ imageSrc, title, subtitle, flipped }) => {
    const { ref, inView } = useInView({
        threshold: 0.4,
        triggerOnce: true,
    });

    return (
        <div ref={ref} className={`slider ${inView ? "slider__zoom" : ""} ${flipped ? "slider__flipped" : ""}`}>
            {!flipped ? (
                <>
                    <img src={imageSrc} alt={title} className='slider__image' />
                    <div className='slider__content'>
                        <h1 className='slider__title'>{title}</h1>
                        <p className='slider__subtitle'>{subtitle}</p>
                    </div>
                </>
            ) : (
                <>
                    <div className='slider__content'>
                        <h1 className='slider__title'>{title}</h1>
                        <p className='slider__subtitle'>{subtitle}</p>
                    </div>
                    <img src={imageSrc} alt={title} className='slider__image' />
                </>
            )}
        </div>
    );
};

export default Slider;
