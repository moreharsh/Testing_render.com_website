import React from 'react';
import Slider from 'react-slick';
import './Homeportfolio.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    name: "ABC R.",
    role: "Wellness Coach",
    quote: "After exploring this website, I felt a sense of calm wash over me. The design, the flow, everything just helped me breathe easier.",
  },
  {
    name: "DEF M.",
    role: "Freelance Designer",
    quote: "Spending just a few minutes here helps me reset my mind. It’s like a digital breath of fresh air.",
  },
  {
    name: "GHI K.",
    role: "Yoga Practitioner",
    quote: "I visit this site whenever I need a moment of peace. It’s beautifully built and truly relaxing.",
  },
  {
    name: "JKL S.",
    role: "Remote Developer",
    quote: "The soft visuals and thoughtful layout made me feel instantly at ease. I didn’t realize how much I needed that pause.",
  },
  {
    name: "MNO L.",
    role: "Meditation Blogger",
    quote: "After a long day, this website is my go-to place to unwind. It’s minimal, calm, and feels like a gentle reset.",
  },
];

const Homeportfolio = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000, // 5 seconds
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768, // Tablet
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonial-carousel" id="portfolio">
      <h2>What People Say</h2>
      <Slider {...settings}>
        {testimonials.map((item, index) => (
          <div key={index} className="testimonial-card">
            <p className="quote">“{item.quote}”</p>
            <p className="author">— {item.name}, {item.role}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Homeportfolio;
