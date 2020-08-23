import React, { useEffect, useState, useRef } from "react";
import Observer from "../intersection-observer";
import Axios from "axios";
import Loader from "../loader";

const Dog = (props) => {
  const [showLoader, setShowLoader] = useState(true);
  const [imageList, setImageList] = useState([]);

  const apiLock = useRef(false);

  useEffect(() => {
    window.scroll(0, 0);
    setImageList([]);
  }, []);

  const onLoadMoreIntersection = () => {
    setShowLoader(true);
    let url = "https://random.dog/woof.json";
    if (apiLock.current) {
      return;
    }
    apiLock.current = true;
    Axios.get(url)
      .then((response) => {
        let img = response.data.url;
        if (img && imageList.indexOf(img) === -1) {
          const imgArray = [...imageList, img];
          setImageList(imgArray);
        }
        apiLock.current = false;
      })
      .catch((error) => {
        console.log(error);
        apiLock.current = false;
      });
  };

  const renderImages = () => {
    const template = imageList.map((item, index) => {
      return (
        <div className="img-wrapper">
          <div
            className="img-container"
            style={{ backgroundImage: `url(${item})` }}
            title={item}
          />
        </div>
      );
    });
    return template;
  };

  return (
    <div>
      <div className="iObserver-top"></div>
      <div className="container">{renderImages()}</div>
      <div className="spinner">
        {showLoader ? <Loader width={50} height={50} /> : null}
      </div>
      <Observer observerCallback={onLoadMoreIntersection} />
    </div>
  );
};

export default Dog;
