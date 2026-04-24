import React from "react";
import Banner from "../components/Banner";
import CourseCarousel from "../components/courseCarousel/courseCarousel";
import UnescoCarousel from "../components/unescoCarousel/unescoCarousel";

const IndexPage = () => {
  return (
    <>
      <Banner />
      <CourseCarousel />
      <UnescoCarousel />
    </>
  );
};

export default IndexPage;
