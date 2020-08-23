import React from "react";
import "./Header.scss";
// import { useStore } from "../../store/store";

const Header = () => {
  // const { filterState, dispatch } = useStore();

  // const setActiveTab = (value) => {
  //   dispatch({
  //     type: "UPDATE",
  //     payload: {
  //       activeTab: value,
  //     },
  //   });
  // };
  return (
    <div className="header">
      <div>
        <div className="header-image"></div>
        <div className="title">Animals Ahoy!</div>
        {/* <div className="subtitle">
          <span
            className={filterState.activeTab === "all" ? "heighlight" : ""}
            onClick={() => setActiveTab("all")}
          >
            ALL
          </span>
          <span
            className={filterState.activeTab === "cat" ? "heighlight" : ""}
            onClick={() => setActiveTab("cat")}
          >
            CAT
          </span>
          <span
            className={filterState.activeTab === "dog" ? "heighlight" : ""}
            onClick={() => setActiveTab("dog")}
          >
            DOG
          </span>
          <span
            className={filterState.activeTab === "fox" ? "heighlight" : ""}
            onClick={() => setActiveTab("fox")}
          >
            FOX
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
