import { useEffect } from "react"
import RatingStar from "./RatingStar"
import Review from  "./Review"

import Cookies from "js-cookie"
import { message } from "antd"

const Rating = () => {
    return (
        <>
            <RatingStar />
            <Review />
        </>
    )
}