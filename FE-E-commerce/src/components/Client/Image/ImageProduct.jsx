import { Image } from 'antd';

const ImageProduct  = ({ img }) => {
    const linkImg = `http://127.0.0.1:8000/imgs/` + img;

    return (
        <Image width="100%" src={linkImg} />
    )
}

export default ImageProduct;