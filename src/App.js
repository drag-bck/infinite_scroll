import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Image from "./components/Image/Image";

const App = () => {
  return (
    <div className="App">
      <Header />

      <div className="content">
        <Image />
      </div>
    </div>
  );
};

export default App;
