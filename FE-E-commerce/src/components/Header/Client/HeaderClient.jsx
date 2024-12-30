/* Header gộp giữa HeaderOne và HeaderTwo */
import HeaderOne from "../Client/HeaderOne";
import HeaderTwo from "../Client/HeaderTwo";
const HeaderClient = () => {
    return (
      <header>
        <HeaderOne />
        <HeaderTwo />
      </header>
    );
}

export default HeaderClient;