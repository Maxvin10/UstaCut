import { useState } from "react";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Book from "./components/Book";

function App() {
  function Layout({ children }) {
    return <>
    {children}
    </>;
  }
  return (
    <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book" element={<Book />} />
    </Routes>
    </Layout>
  );
}

export default App;
