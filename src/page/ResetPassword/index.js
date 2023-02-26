import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import "./style.css";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { resetPasswordRoute } from "~/utils/APIRoutes";

import className from "classnames/bind";
import styles from "./ResetPassword.module.scss";
import axios from "axios";
import NotFound from "../NotFound";

const cx = className.bind(styles);

function ForgotPassword() {
  const [userData, setUserData] = useState({
    email: "",
  });
  const [cookies, setCookies] = useCookies();
  let messageComponent;
  let { id, token } = useParams();

  const [connectAPI, setConnectAPI] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function FetchAPI() {
      const { data } = await axios.get(
        resetPasswordRoute + "/" + id + "/" + token
      );

      if (data.status === true) {
        setConnectAPI(true);
        setUserData((prev) => ({
          ...prev,
          email: data.email,
        }));
      } else {
        messageComponent = data.msg;
      }
    }

    FetchAPI();
  }, []);
  const ResetPassword = Yup.object().shape({
    password: Yup.string()
      .min(6, "Tên người dùng của bạn phải nhiều 5 ký tự!")
      .max(50, "Tên người dùng của bạn phải ít hơn 50 ký tự!")
      .required("Hãy nhập tên người dùng của bạn vào!"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Mật khẩu xác nhận của bạn không trùng khớp!"
    ),
  });

  const renderError = (message) => <p className="help is-danger">{message}</p>;

  const toastOptions = {
    toastId: "my_toast",
    position: "top-right",
    autoClose: 5000,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    autoClose: true,
    progress: 0,
    progressStyle: { background: "#cececec9" },
    theme: "colored",
    style: { background: "#313131ed" },
  };
  return (
    <Container fluid="xl">
      {connectAPI ? (
        <Row className={cx("wrapper")}>
          <Col xs={8} className={cx("container-left")}>
            <img src="https://cdn.dribbble.com/userupload/4054939/file/original-124ea277ceeab46606a958c73702e6c4.png?compress=1&resize=1024x768" />
          </Col>
          <Col
            xs={4}
            className={cx(
              "container-right",
              "d-flex",
              "justify-content-xl-center",
              "flex-wrap"
            )}
          >
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={ResetPassword}
              onSubmit={async (values) => {
                const { data } = await axios.post(
                  resetPasswordRoute + "/" + id + "/" + token,
                  values
                );
                if (!data.status) {
                  toast.error(data.msg, toastOptions);
                }
                if (data.status == true) {
                  alert(data.msg);
                  navigate("/");
                }
              }}
            >
              {({ errors, touched, handleBlur, handleChange }) => (
                <Form>
                  <h2>Cập Nhật Mật Khẩu</h2>
                  <div className="field">
                    <div className="control">
                      <Field
                        name="email"
                        type="email"
                        value={userData.email}
                        className="input"
                        disabled
                      />
                      {errors.email && touched.email ? (
                        <ErrorMessage name="email" render={renderError} />
                      ) : null}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <Field
                        name="password"
                        type="password"
                        className="input"
                        placeholder="Mật khẩu mới"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.password && touched.password ? (
                        <ErrorMessage name="password" render={renderError} />
                      ) : null}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <Field
                        name="confirmPassword"
                        type="password"
                        className="input"
                        placeholder="Mật khẩu xác nhận"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <ErrorMessage
                          name="confirmPassword"
                          render={renderError}
                        />
                      ) : null}
                    </div>
                  </div>
                  <Button type="submit">Save</Button>
                  {/* <span>
                    Don't have an account? <Link to="/register">Register</Link>
                  </span>
                  <span>
                    Are you login?<Link to="/login">Login</Link>
                  </span> */}
                </Form>
              )}
            </Formik>
            <ToastContainer />
          </Col>
        </Row>
      ) : (
        <NotFound msg={messageComponent} />
      )}
    </Container>
  );
}

export default ForgotPassword;
