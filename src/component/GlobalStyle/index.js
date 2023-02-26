import classNames from "classnames/bind";
import styles from "./GlobalStyle.scss";

const cx = classNames.bind(styles);

function GlobalStyle({ children }) {
  return children;
}

export default GlobalStyle;
