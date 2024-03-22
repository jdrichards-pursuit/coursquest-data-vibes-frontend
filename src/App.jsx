import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./Components/CommonComponents/Nav";
import Footer from "./Components/CommonComponents/Footer";
import LandingPage from "./Components/CommonComponents/LandingPage";
import CoursesIndex from "./Components/CoursesIndex";
import DetailedCourse from "./Components/DetailedCourse";
import ReviewForm from "./Components/ReviewForm";
import AboutTheDevs from "./Components/CommonComponents/AboutTheDevs";
import ReviewsIndex from "./Components/ReviewsIndex";
import UserDetails from "./Components/UserDetails";

const App = () => {
  //define api url
  const API = import.meta.env.VITE_API_URL;

  return (
    <div className="">
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursesIndex />} />
          <Route path="/courses/:id" element={<DetailedCourse API={API} />} />
          <Route path="/courses/:id/edit" element={<ReviewForm API={API} />} />
          <Route path="/courses/new" element={<ReviewForm API={API} />} />
          <Route path="/courses/reviews" element={<ReviewsIndex />} />
          <Route path="account" element={<UserDetails />} />
          <Route path="aboutthedevs" element={<AboutTheDevs />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
