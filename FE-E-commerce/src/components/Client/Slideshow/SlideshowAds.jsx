import { Carousel } from "antd";

const SlideShowAds = ({ width ,height, linkImg }) => {
  return (
    <>
      <Carousel autoplay>
          <img
            src={linkImg}
            alt=""
            style={{
              width: width,
              height: height,
              objectFit: "cover",
              imageRendering: "optimize",
            }}
          />
          <img
            src={linkImg}
            alt=""
            style={{
              width: width,
              height: height,
              objectFit: "cover",
              imageRendering: "optimize",
            }}
          />
          <img
            src={linkImg}
            alt=""
            style={{
              width: width,
              height: height,
              objectFit: "cover",
              imageRendering: "optimize",
            }}
          />
      </Carousel>
    </>
  );
}

export default SlideShowAds;
