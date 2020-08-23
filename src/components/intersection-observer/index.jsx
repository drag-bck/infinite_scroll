import React, { useEffect, useRef } from "react";

let observer;

const Observer = (props) => {
  const observerOptionsRef = useRef(null);

  useEffect(() => {
    observer = new IntersectionObserver(
      props.observerCallback,
      props.observerOptions || {
        threshold: [0, 1],
      }
    );
    const { current } = refContainer;
    if (current) {
      observer.observe(current);
    }

    observerOptionsRef.current = props.observerOptions;

    return () => {
      const { current } = refContainer;
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [props]);

  useEffect(() => {
    return () => {
      const { current } = refContainer;
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  const refContainer = useRef(null);
  const { className, style, children } = props;

  return (
    <div
      style={style || {}}
      className={`iobserver ${className || ""}`}
      ref={refContainer}
    >
      {children || null}
    </div>
  );
};

export default Observer;
