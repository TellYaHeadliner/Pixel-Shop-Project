/* Header gộp giữa HeaderOne và HeaderTwo */
import HeaderOne from "../Header/HeaderOne";
import HeaderTwo from "../Header/HeaderTwo";
const HeaderClient = () => {
    return (
      <header>
        <HeaderOne />
        <HeaderTwo />
      </header>
    );
}

export default HeaderClient;