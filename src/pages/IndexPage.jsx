import React from "react";
import Banner from "../components/Banner";
import CourseCarousel from "../components/courseCarousel/courseCarousel";
import UnescoCarousel from "../components/unescoCarousel/unescoCarousel";
import VideoSection from "../components/videoSection/VideoSection";
import FestivalPreview from "../components/festivalPreview/FestivalPreview";

const IndexPage = () => {
  return (
    <>
      <Banner />
      <CourseCarousel />
      <UnescoCarousel />
      <FestivalPreview />
      <VideoSection />
    </>
  );
};

export default IndexPage;
