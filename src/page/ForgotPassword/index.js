import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import "./style.css";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { forgotRoute } from "~/utils/APIRoutes";
import className from "classnames/bind";
import styles from "./ForgotPassword.module.scss";
import axios from "axios";

const cx = className.bind(styles);

function ForgotPassword() {
  const [countDown, setCountDown] = useState(0);
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Tên người dùng của bạn phải nhiều 5 ký tự!")
      .max(50, "Tên người dùng của bạn phải ít hơn 50 ký tự!")
      .required("Hãy nhập tên người dùng của bạn vào!"),
    email: Yup.string()
      .email("Email không hợp lệ!")
      .required("Hãy nhập email của bạn vào!"),
  });

  const renderError = (message) => <p className="help is-danger">{message}</p>;
  const [cookies, setCookie] = useCookies("access_token");

  const navigate = useNavigate();
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
  const timerId = useRef();
  const buttonRef = useRef();

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let secound = Math.floor(time - minutes * 60);
    if (minutes < 10) minutes = "0" + minutes;
    if (secound < 10) secound = "0" + secound;
    return minutes + ":" + secound;
  };
  useEffect(() => {
    if (cookies.accessToken) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => setInterval(timerId.current);
  }, []);
  useEffect(() => {
    if (countDown <= 0) {
      buttonRef.current.removeAttribute("disabled");
    }
  }, [countDown]);
  return (
    <Container fluid="xl">
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
              username: "",
              email: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              const { data } = await axios.post(forgotRoute, values);
              console.log(data.status);
              if (data.status === true) {
                setCountDown(300);
                buttonRef.current.setAttribute("disabled", true);
              }
            }}
          >
            {({ errors, touched, handleBlur, handleChange }) => (
              <Form>
                <h2>Quên Mật Khẩu</h2>
                <div className="field">
                  <div className="control">
                    <Field
                      name="email"
                      type="email"
                      className="input"
                      placeholder="Email người dùng"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email ? (
                      <ErrorMessage name="email" render={renderError} />
                    ) : null}
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <Field
                      name="username"
                      type="text"
                      className="input"
                      placeholder="Tên người dùng"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.username && touched.username ? (
                      <ErrorMessage name="username" render={renderError} />
                    ) : null}
                  </div>
                </div>
                <Button type="submit" ref={buttonRef}>
                  Send Link Reset Password
                </Button>
                {countDown > 1 ? (
                  <p style={{ marginTop: "20px" }}>
                    Hãy chờ đợi {formatTime(countDown)}
                  </p>
                ) : (
                  <></>
                )}
                <span>
                  Don't have an account? <Link to="/register">Register</Link>
                </span>
                <span>
                  Are you login?<Link to="/login">Login</Link>
                </span>
              </Form>
            )}
          </Formik>
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
