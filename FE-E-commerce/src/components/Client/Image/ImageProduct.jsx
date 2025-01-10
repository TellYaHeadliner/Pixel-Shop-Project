import { Image } from 'antd';

const ImageProduct  = ({ img }) => {
    const linkImg = `http://localhost:8000` + img;

    return (
        <Image width={700} src={linkImg} />
    )
}

export default ImageProduct;