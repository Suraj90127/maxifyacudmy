import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PartnerSection() {
  const settings = {
    dots: false,
    infinite: true, // keep infinite loop
    speed: 800,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true, // must be true
    autoplaySpeed: 2000,
    arrows: false,
    pauseOnHover: false,
    cssEase: "linear", // smooth scrolling effect
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 3 } },
    ],
  };

  const logos = [
    "https://i.ibb.co/b5K34SSC/Chat-GPT-Image-Nov-1-2025-04-10-29-PM-min.png",
    "https://i.ibb.co/fdSqbx14/Chat-GPT-Image-Nov-1-2025-04-16-52-PM-min.png",
    "https://i.ibb.co/nN5BWprn/Chat-GPT-Image-Nov-1-2025-04-08-10-PM-min.png",
    "https://i.ibb.co/KpxNVHhN/Chat-GPT-Image-Nov-1-2025-04-01-48-PM-min.png",
    "https://i.ibb.co/VcC6TtfH/Chat-GPT-Image-Nov-1-2025-04-03-38-PM-min.png",
    "https://i.ibb.co/x8L5VQCF/Chat-GPT-Image-Nov-1-2025-03-59-38-PM-min.png",
    "https://i.ibb.co/nN5BWprn/Chat-GPT-Image-Nov-1-2025-04-08-10-PM-min.png",
    "https://i.ibb.co/KpxNVHhN/Chat-GPT-Image-Nov-1-2025-04-01-48-PM-min.png",

  ];

  return (
    <section className="py-6 bg-white">
      <div className="max-w-[90%] mx-auto px-6 lg:px-12">
        <h6 className="text-center text-2xl uppercase text-gray-500 font-semibold mb-16">
          Looking Forward to Partnering with <span className="font-bold text-black">150+</span> Brands in the Future.
        </h6>

        <Slider {...settings} className="ed-partner__slider">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex justify-center items-center p- ed-parnet__brand-logo"
            >
              <img
                src={logo}
                alt="brand-logo"
                className="w-auto h-10 opacity-90 hover:opacity-100 transition duration-300"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
