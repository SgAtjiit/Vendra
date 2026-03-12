import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealCard from "./DealCard";
import { useAppSelector } from "../../../../Redux Toolkit/Store";

export default function DealSlider() {
    const {homePage}=useAppSelector(store=>store)
    var settings = {
        dots: true,
        infinite,
        slidesToShow: 6,
        slidesToScroll,
        autoplay: true,
        speed,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 1024, // Large screen
              settings,
            },
            {
              breakpoint: 768, // Tablet
              settings,
            },
            {
              breakpoint: 480, // Mobile
              settings,
            },
          ],

    };
    return (
        <div className=" py-5 lg:px-20">
            <div className="slide-container  ">
                <Slider {...settings}>
                    {homePage.homePageData?.deals?.map((item) => <div className="border flex flex-col items-center justify-center">
                        <DealCard deal={item}/>
                    </div>)}

                </Slider>
            </div>
        </div>

    );
}