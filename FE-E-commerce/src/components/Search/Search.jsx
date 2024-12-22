import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsSearch } from "react-icons/bs";
export default function Search() {
  return (
    <InputGroup className="mb-3">
        <Form.Control
            placeholder="Tìm kiếm"
            aria-label="Search"
            aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon1">
            <BsSearch />
        </InputGroup.Text>
    </InputGroup>
  );
}
