import React, { useEffect, useState, useRef } from "react";
import { useStore } from "../../store/store";
import Observer from "../intersection-observer";
import Axios from "axios";
import Loader from "../loader";

const All = (props) => {
  const { filterState } = useStore();
  const [showLoader, setShowLoader] = useState(true);
  const [imageList, setImageList] = useState([]);

  const apiLock = useRef(false);

  useEffect(() => {
    window.scroll(0, 0);
    setImageList([]);
  }, [filterState.activeTab]);

  const urlBinder = {
    cat: "file",
    dog: "url",
    fox: "image",
  };

  const urlObj = {
    cat: "https://aws.random.cat/meow",
    dog: "https://random.dog/woof.json",
    fox: "https://randomfox.ca/floof/",
  };

  const getRandomUrl = () => {
    const url = [
      "https://aws.random.cat/meow",
      "https://random.dog/woof.json",
      "https://randomfox.ca/floof/",
    ];

    return url[Math.floor(Math.random() * 3)];
  };

  const onLoadMoreIntersection = () => {
    setShowLoader(true);
    let url = "";
    if (filterState.activeTab !== "all") {
      url = urlObj[filterState.activeTab];
    } else {
      url = getRandomUrl();
    }
    if (apiLock.current) {
      return;
    }
    apiLock.current = true;
    Axios.get(url)
      .then((response) => {
        let img = response.data[urlBinder[filterState.activeTab]];
        if (filterState.activeTab === "all") {
          if (response.data.file) {
            img = response.data.file;
          }
          if (response.data.url) {
            img = response.data.url;
          }
          if (response.data.image) {
            img = response.data.image;
          }
        }
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

export default All;
