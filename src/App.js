import logo from './logo.svg';
import './Assets/css/Style.css';

import Router from './Router';
import React from "react";
import {LanguageProvider} from "./Assets/Languages/Language";

function App() {
  return (
      <LanguageProvider>
    <div className="App">
        <Router />
    </div>
      </LanguageProvider>
  );
}

export default App;
