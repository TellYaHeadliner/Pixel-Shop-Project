import { Input } from "antd";
import { useState } from "react"

const Review = () => {
    const [description, setDescription] = useState("");
    const handleChange = (e) => {
        setDescription(e.target.value);
    }
    return (
        <>
        <label>
            Mô tả:
        </label>
        <Input.TextArea 
            value={description}
            onChange={handleChange}
            placeholder="Nhập đánh giá"
            rows={4}
        />
        </>
    )
};

export default Review;

