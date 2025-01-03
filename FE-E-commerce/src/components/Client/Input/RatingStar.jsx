import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useState } from "react";

const RatingStar = ({ rating = 0 }) => {
    const [hoveredStar, setHoveredStar] = useState(0)
    const [selectedStar, setSelectedStar] = useState(0)

    const handleMouseEnter = (index) => {
        setHoveredStar(index)
    }

    const handleMouseLeave = () => {
        setHoveredStar(0)
    }

    const handleClick = (index) => {
        setSelectedStar(index)
    }

    return (
        <div className="rating" style={{ display: "flex", gap: "8px", cursor: "pointer" }}>
            <label>
                Đánh giá
            </label>
            {Array.from({length: 5}).map((_, index) => {
                const starIndex = index + 1;
                return (
                    <span
                        key={starIndex}
                        onMouseEnter={() => handleMouseEnter(starIndex)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(index)}
                    >
                        {starIndex <= (hoveredStar || selectedStar) ? (
                            <AiFillStar size="24px" color="#FFC12F" />
                        ): (
                            <AiOutlineStar size="24px" color="#D3D3D3" />
                        )}
                    </span>
                )
            })}
        </div>
    )
}

export default RatingStar;