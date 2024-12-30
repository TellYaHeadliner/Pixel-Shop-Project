import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsSearch } from "react-icons/bs";

import styles from "./Search.module.css";

const Search = () => {
  return (
    <div className={styles.searchBar}>
      <InputGroup>
        <Form.Control
          aria-label="Search"
          aria-describedby="basic-addon2"
          placeholder="Tìm kiếm"
          className={styles.searchInput}
        />
        <InputGroup.Text id="basic-addon1" className={styles.searchIcon}>
          <BsSearch />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
}

export default Search;