import { InputNumber } from "antd";

const InputSoLuong = ({ soLuong, setSoLuong}) => {
    const handleChange = (value) => {
        if (value > 0){
            setSoLuong(value);
        }
    }

    return (
        <InputNumber type="number" min={1} max={10} placeholder="Số lượng" onChange={handleChange} value={soLuong}/>
    )
}

export default InputSoLuong;