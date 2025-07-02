import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ShowProducts from "./components/ShowProducts";
import { BrowserRouter, Router, Routes } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Login />
        <ShowProducts />
      </BrowserRouter>
    </>
  );
}

export default App;
