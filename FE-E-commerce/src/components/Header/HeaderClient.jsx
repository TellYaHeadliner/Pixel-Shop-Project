/* Header gộp giữa HeaderOne và HeaderTwo */
import HeaderOne from "./HeaderOne";
import HeaderTwo from "./HeaderTwo";
const HeaderClient = () => {
    return (
      <header>
        <HeaderOne />
        <HeaderTwo />
      </header>
    );
}

export default HeaderClient;