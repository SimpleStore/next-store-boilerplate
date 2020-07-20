import Slick from "react-slick";
import { ISearchResult, IProduct } from "../../lib/Interfaces";
import { firstImage } from "../../lib/Util";

interface IProps {
  featuredProducts: ISearchResult<IProduct>;
}

export const Slider = ({ featuredProducts }: IProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return <Slick {...settings}>
    
        {featuredProducts.result &&
          featuredProducts.result.map((item) => {
            const image = firstImage(item.files);
            return (
              <div className="block h-64 text-gray-700">
              <p className="px-1 text-2xl text-gray-600">Featured Products</p>
                <a className="p-4 mt-2 text-gray-600" href={`/p/${item.slug}`}>
                  {item.title}
                </a>
                {image && (
                  <img
                    className="mt-3 rounded-lg shadow-xl"
                    src={`${image.edgeUrl}/fit-in/400x400/${image.accessUrl}`}
                  />
                )}
                </div>
            );
          })}
    
    </Slick>;
};

