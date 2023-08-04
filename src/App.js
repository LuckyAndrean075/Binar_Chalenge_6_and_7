import "./App.scss";
import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Detail from "./pages/detail/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RedirectIfProtected from "./pages/RedirectIfProtected";
import Protected from "./pages/Protected";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <RedirectIfProtected>
                <Login />
              </RedirectIfProtected>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectIfProtected>
                <Register />
              </RedirectIfProtected>
            }
          />
          <Route path="/:category" element={<Catalog />} />
          <Route path="/:category/search/:keyword" element={<Catalog />} />
          <Route path="/:category/:id" element={<Detail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
