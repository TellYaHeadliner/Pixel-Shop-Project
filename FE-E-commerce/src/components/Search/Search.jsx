import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsSearch } from "react-icons/bs";

import styles from "./Search.module.css";

const Search = () => {
  return (
    <InputGroup>
      <Form.Control
        aria-label="Search"
        aria-describedby="basic-addon2"
        placeholder="Tìm kiếm"
        className={styles.customInput}
      />
      <InputGroup.Text id="basic-addon1">
        <BsSearch />
      </InputGroup.Text>
    </InputGroup>
    // <input type="text" className={styles.customInput} placeholder="Tìm kiếm..." />
  );
}

export default Search;