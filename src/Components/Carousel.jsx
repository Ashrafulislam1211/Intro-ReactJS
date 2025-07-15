import './Carousel.css';

const Carousel = () => {
  return (
    <div className="carousel">
      <div className="slides">
        <input type="radio" name="radio-btn" id="img-1" defaultChecked />
        <input type="radio" name="radio-btn" id="img-2" />
        <input type="radio" name="radio-btn" id="img-3" />

        <div className="slide first">
          <img src="https://thumbs.dreamstime.com/b/e-commerce-online-shopping-business-technology-concept-screen-e-commerce-online-shopping-business-technology-concept-screen-207950081.jpg" alt="Slide 1" />
        </div>
        <div className="slide">
          <img src="https://creatives.me/wp-content/uploads/2022/10/ecommerce.jpg" alt="Slide 2" />
        </div>
        <div className="slide">
          <img src="https://wallpapers.com/images/hd/e-commerce-pictures-nrz9qlar9weoxx5o.jpg" alt="Slide 3" />
        </div>

        <div className="navigation-manual">
          <label htmlFor="img-1" className="manual-btn"></label>
          <label htmlFor="img-2" className="manual-btn"></label>
          <label htmlFor="img-3" className="manual-btn"></label>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
