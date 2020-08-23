import React, { useEffect, useState } from "react";
// import { useStore } from "../../store/store";
import Observer from "../intersection-observer";
import Axios from "axios";
import Loader from "../loader";
import { throttle, debounce } from "throttle-debounce";

const Image = (props) => {
  // const { filterState, dispatch } = useStore();
  const [showLoader, setShowLoader] = useState(true);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);
    debounce(1000);
    setImageList([]);
  }, []);

  // const urlBinder = {
  //   cat: "file",
  //   dog: "url",
  //   fox: "image",
  // };

  // const urlObj = {
  //   cat: "https://aws.random.cat/meow",
  //   dog: "https://random.dog/woof.json",
  //   fox: "https://randomfox.ca/floof/",
  // };

  const getRandomUrl = () => {
    const url = [
      "https://aws.random.cat/meow",
      "https://random.dog/woof.json",
      "https://randomfox.ca/floof/",
    ];

    return url[Math.floor(Math.random() * 3)];
  };

  const onLoadMoreIntersection = throttle(25, () => {
    setShowLoader(true);
    let url = getRandomUrl();
    Axios.get(url)
      .then((response) => {
        let img;
        if (response.data.file) {
          img = response.data.file;
        }
        if (response.data.url) {
          img = response.data.url;
        }
        if (response.data.image) {
          img = response.data.image;
        }

        if (img && imageList.indexOf(img) === -1) {
          const imgArray = [...imageList, img];
          setImageList(imgArray);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

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

export default Image;
