import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Input, message } from "antd";
import { useState } from "react";
import Cookies from "js-cookie"; // Ensure this package is installed

const Review = () => {
  const [description, setDescription] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleMouseEnter = (index) => {
    setHoveredStar(index);
  };

  const handleMouseLeave = () => {
    setHoveredStar(0);
  };

  const handleClick = (index) => {
    setSelectedStar(index);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      message.success("Bạn đã đánh giá thành công")
      localStorage.setItem("selectedStar", selectedStar);
      localStorage.setItem("description", description);
      setDescription("");
      setSelectedStar(0);
      setHoveredStar(0);
    }
  };

  // Check for token in cookies
  const token = Cookies.get("token");

  return (
    <div>
      {token ? (
        <>
          <div
            className="rating"
            style={{
              display: "flex",
              gap: "8px",
              cursor: "pointer",
              alignItems: "center",
            }}
          >
            <label style={{ fontWeight: "bold" }}>Đánh giá:</label>
            {Array.from({ length: 5 }).map((_, index) => {
              const starIndex = index + 1;
              const isFilled = starIndex <= (hoveredStar || selectedStar);

              return (
                <span key={starIndex} onClick={() => handleClick(starIndex)}>
                  {isFilled ? (
                    <AiFillStar size="24px" color="#FFC12F" />
                  ) : (
                    <AiOutlineStar size="24px" color="#D3D3D3" />
                  )}
                </span>
              );
            })}
          </div>

          <label>Mô tả:</label>
          <Input.TextArea
            value={description}
            onChange={handleChange}
            onKeyPress={handleKeyPress} // Added key press event
            placeholder="Nhập đánh giá"
            rows={4}
          />
        </>
      ) : (
        <p>Vui lòng đăng nhập để đánh giá và viết nhận xét.</p>
      )}
    </div>
  );
};

export default Review;
