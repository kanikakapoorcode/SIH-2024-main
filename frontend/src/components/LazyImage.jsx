import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const LazyImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  placeholder = null,
  onLoad,
  onError,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = imgRef.current;
              if (img && img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              observerRef.current.disconnect();
            }
          });
        },
        {
          rootMargin: '200px', // Load images 200px before they come into view
          threshold: 0.01
        }
      );

      if (imgRef.current) {
        observerRef.current.observe(imgRef.current);
      }
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      const img = imgRef.current;
      if (img && img.dataset.src) {
        img.src = img.dataset.src;
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src]);

  const handleLoad = (e) => {
    setLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setError(true);
    if (onError) onError(e);
  };

  // If there's an error and a placeholder is provided, show the placeholder
  if (error && placeholder) {
    return (
      <img
        src={placeholder}
        alt={alt}
        className={`${className} object-cover`}
        width={width}
        height={height}
        {...props}
      />
    );
  }

  return (
    <>
      {!loaded && (
        <div 
          className={`${className} bg-gray-200 animate-pulse`}
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
      <img
        ref={imgRef}
        data-src={src}
        src="" // Start with empty src
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0 absolute'
        }`}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

export default React.memo(LazyImage);
