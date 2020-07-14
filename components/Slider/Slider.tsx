import Slick from "react-slick";

export const Slider = ({ children }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return <Slick {...settings}>{children}</Slick>;
};

