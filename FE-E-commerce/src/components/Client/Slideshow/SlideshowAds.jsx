import Carousel from "react-bootstrap/Carousel";

function SlideShowAds () {
  return (
    <Carousel data-bs-theme="dark" controls={false} wrap={true}>
      <Carousel.Item>
        <img
          className="d-block w-100 vh-100"
          src="/public/imgs/slideshow1.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 vh-100"
          src="/public/imgs/slideshow2.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 vh-100"
          src="/public/imgs/slideshow3.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default SlideShowAds;
