import React from "react";
import Carousel from "react-elastic-carousel";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      content:
        "Wow... This platform is fantastic. I was able to get my business up and running online within just a few weeks.",
    },
    {
      id: 2,
      content: "Unbelievable support and customer service from this company!",
    },
    {
      id: 3,
      content:
        "I would recommend this to anyone looking for a fantastic website at a great price!",
    },
    {
      id: 4,
      content:
        "I would recommend this to anyone looking for a fantastic website at a great price!",
    },
    {
      id: 5,
      content:
        "I would recommend this to anyone looking for a fantastic website at a great price!",
    },
    {
      id: 6,
      content:
        "I would recommend this to anyone looking for a fantastic website at a great price!",
    },
  ];

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  return (
    <div className="testimonials" id="testimonials">
      <h3>Trusted by Thousands of Happy Customers</h3>
      <Carousel breakPoints={breakPoints} enableAutoPlay showArrows={false}>
        {testimonials.map((item) => (
          <div className="test-item" key={item.id}>
            {item.content}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Testimonials;
