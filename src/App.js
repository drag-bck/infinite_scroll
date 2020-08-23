import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Cat from "./components/Image/Cat";
import Dog from "./components/Image/Dog";
import Fox from "./components/Image/Fox";
import All from "./components/Image/All";
import { useStore } from "./store/store";

const App = () => {
  const { filterState } = useStore();
  return (
    <div className="App">
      <Header />

      <div className="content">
        {filterState.activeTab === "all" ? <All /> : null}
        {filterState.activeTab === "cat" ? <Cat /> : null}
        {filterState.activeTab === "dog" ? <Dog /> : null}
        {filterState.activeTab === "fox" ? <Fox /> : null}
      </div>
    </div>
  );
};

export default App;
