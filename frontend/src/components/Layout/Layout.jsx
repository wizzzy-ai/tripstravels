import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Router from "../../router/Router";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <Router />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
