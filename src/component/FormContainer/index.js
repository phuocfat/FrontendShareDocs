import classNames from "classnames/bind";
import style from "./FormContainer.module.scss";

const cx = classNames.bind(style);

function FormContainer({ children }) {
  return children;
}

export default FormContainer;
