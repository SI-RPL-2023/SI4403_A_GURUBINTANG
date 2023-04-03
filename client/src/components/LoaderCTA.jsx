import React from "react";
import Lottie from 'react-lottie';
import loading from '../asset/icon/loaderCta.json';

const LoaderCTA = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: loading,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return (
        <div className="loader-cta">
            <div className="lottie-cta">
                <Lottie 
                    options={defaultOptions}
                    height={'100%'}
                    width={'100%'}
                />
            </div>
        </div>
    )
}

export default LoaderCTA