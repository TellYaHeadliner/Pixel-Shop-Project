import { Carousel } from "antd";

const SlideShowAds = ({ width = "100%" ,height = "100%", linkImg }) => {
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
