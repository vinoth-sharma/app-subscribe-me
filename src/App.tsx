import React from 'react';
import './App.scss';
import { AppHeader } from "./components/header/header";
import { AppFooter } from "./components/footer/footer";
import { MainContainer } from "./components/main-container/main-container";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <MainContainer />
      <AppFooter />
    </div>
  );
}

export default App;
