import reactLogo from "../../assets/logo.svg";
import "./style.css";

const Header = () => {
  return (
    <header>
      <img src={reactLogo} className="logo react" alt="React logo" />
      <h2 className="title">outsorce your mind and rest</h2>
    </header>
  );
};

export default Header;
