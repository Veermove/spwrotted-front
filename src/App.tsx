import React, { useState } from "react";
import './App.css';
import { AuthContext } from "./context/AuthContext";
import {LoginPanel} from './LoginPanel';

function App() {
  return (
    <div className="App">
      <p>
        <LoginPanel/>
      </p>   

    </div>
  );
}

export default App;
