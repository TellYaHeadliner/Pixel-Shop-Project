
import { Carousel } from "antd";
import styles from "./SlideShowAds.module.css"

const SlideShowAds = ({ width = "100%" ,height = "100%" }) => {
  return (
    <Carousel
      autoplay
    >
      <div>
        <img
          src="/imgs/slideshow1.png"
          alt=""
          className={styles.imageSlideShow}
          style={{ width: width, height: height, objectFit: "cover" }}
        />
      </div>
      <div>
        <img
          src="/imgs/slideshow2.png"
          alt=""
          className={styles.imageSlideShow}
          style={{ width: width, height: height, objectFit: "cover" }}
        />
      </div>
      <div>
        <img
          src="/imgs/slideshow3.png"
          alt=""
          className={styles.imageSlideShow}
          style={{ width: width, height: height, objectFit: "cover" }}
        />
      </div>
    </Carousel>
  );
}



export default SlideShowAds;
