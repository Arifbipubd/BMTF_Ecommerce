import Link from "next/link";
import SimpleSlider from "../Helpers/SliderCom";
import ShopNowBtn from "../Helpers/Buttons/ShopNowBtn";
import { useRef, useState } from "react";
export default function Banner({ className, sliders = [] }) {
  const [sliderImage, setSliderImage] = useState([
    '/assets/images/banner images bmtf ecommerce/furniture.jpg',
    '/assets/images/banner images bmtf ecommerce/new.jpg',
    '/assets/images/banner images bmtf ecommerce/leather.jpg',
  ])

  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    autoplay: true,
    fade: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          dots: true,
        },
      },
    ],
  };
  return (
    <>
      <div className={`w-full xl:h-[733px] md:h-[500px] ${className || ""}`}>
        <div className="main-wrapper w-full h-full">
          {/*    slider area*/}
          <div className="hero-slider-wrapper xl:h-full mb-10 md:mb-20 xl:mb-0  w-full relative">
            <SimpleSlider settings={settings} selector={sliderRef}>
              {sliders.length > 0 &&
                sliders.map((item, i) => (
                  <div key={i} className="item w-full xl:h-[733px] md:h-[500px]">
                    <div className="md:hidden w-full h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={sliderImage[i]}
                        alt=""
                      />
                    </div>
                    <div
                      className="w-full h-full relative md:bg-center hidden md:block"
                      style={{
                        backgroundImage: `url(${
                          process.env.NEXT_PUBLIC_BASE_URL + item.image
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="container-x mx-auto flex items-center  h-full">
                        <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0">
                          <div className="md:w-[626px] w-full">
                            <p className="md:text-[34px] text-[20px] font-medium text-qpurple mb-[7px]">
                              {item.title_one}
                            </p>
                            <h1 className="md:text-[66px] text-[40px]  font-bold text-qblack md:leading-[80px] leading-[40px] mb-[44px]">
                              {item.title_two}
                            </h1>

                            <Link
                              href={{
                                pathname: "/single-product",
                                query: { slug: item.product_slug },
                              }}
                              passhref
                            >
                              <a rel="noopener noreferrer">
                                <ShopNowBtn
                                  className="md:w-[160px] w-[145px] h-[52px] bg-qpurple"
                                  textColor="text-white group-hover:text-white"
                                />
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </SimpleSlider>
          </div>
        </div>
      </div>
    </>
  );
}
