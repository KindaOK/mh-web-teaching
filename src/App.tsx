import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "./App.css";
import ComponentsAndHooksPage from "./pages/componentsAndHooks/ComponentsAndHooksPage";
import AsyncPage from "./pages/introToAsync/AsyncPage";
import ImageCarousel from "./pages/imageCarousel/imageCarousel";
import ImageCarouselPage from "./pages/imageCarousel/imageCarouselPage";

function App() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Router>
      <Switch>
        <Route path={"/default/"}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Counter />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <span>
                <span>Learn </span>
                <a
                  className="App-link"
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React
                </a>
                <span>, </span>
                <a
                  className="App-link"
                  href="https://redux.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Redux
                </a>
                <span>, </span>
                <a
                  className="App-link"
                  href="https://redux-toolkit.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Redux Toolkit
                </a>
                ,<span> and </span>
                <a
                  className="App-link"
                  href="https://react-redux.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React Redux
                </a>
              </span>
            </header>
          </div>
        </Route>
        <Route path={"/components-and-hooks/"}>
          <ComponentsAndHooksPage />
        </Route>
        <Route path={"/intro-to-async/"}>
          <AsyncPage />
        </Route>
        <Route path={"/image-carousel/"}>
          <ImageCarouselPage />
        </Route>
        <Route path={"/"}>
          <Redirect to={"/components-and-hooks/"} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
