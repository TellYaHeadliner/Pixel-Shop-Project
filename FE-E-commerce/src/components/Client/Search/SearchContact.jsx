import { Input } from "antd"
import { Placeholder } from "react-bootstrap"

const SearchContact = ({ searchContact, onSearchChange }) => {
    return (
        <Input placeholder="Tên liên hệ" value={searchContact} style={{ width: "300px"}}  onChange={(e) => onSearchChange(e.target.value)}/>
    )
}

export default SearchContact;