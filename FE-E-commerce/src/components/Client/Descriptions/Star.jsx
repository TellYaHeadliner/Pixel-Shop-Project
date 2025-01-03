import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Star = ({ rating = 0 }) => {
    return (
        <>
            <div className="string" style={{ display: "flex", gap: "8px", alignItems: "center"}}>
                {Array.from({ length: 5}).map((_, index) => {
                    const starIndex = index + 1;
                    return (
                        <span key={starIndex}>
                            {starIndex <= rating ? (
                                <AiFillStar size="24px" color="#FFC12F"/>
                            ): (
                                <AiOutlineStar size="24px" color="#D3D3D3"/>
                            )}
                        </span>
                    )
                })}
            </div>
        </>
    )
}

export default Star;