import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import "./style.css";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerRoute } from "~/utils/APIRoutes";

import className from "classnames/bind";
import styles from "./Register.module.scss";
import axios from "axios";

const cx = className.bind(styles);

function Register() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Tên người dùng của bạn phải nhiều 5 ký tự!")
      .max(50, "Tên người dùng của bạn phải ít hơn 50 ký tự!")
      .required("Hãy nhập tên người dùng của bạn vào!"),
    email: Yup.string()
      .email("Email không hợp lệ!")
      .required("Hãy nhập email của bạn vào!"),
    password: Yup.string()
      .min(6, "Mật khẩu của bạn phải nhiều 5 ký tự!")
      .max(50, "Mật khẩu của bạn phải ít hơn 50 ký tự!")
      .required("Hãy nhập mật khẩu của bạn vào!"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Mật khẩu xác nhận của bạn không trùng khớp!"
    ),
  });

  const renderError = (message) => <p className="help is-danger">{message}</p>;
  const [cookies, setCookie] = useCookies();

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
  useEffect(() => {
    if (cookies.accessToken) {
      navigate("/");
    }
  }, []);
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
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              setUserData(values);
              const { data } = await axios.post(registerRoute, userData);
              if (data.status) {
                alert(data.msg);
                await navigate("/login");
              }
              if (!data.status) {
                toast.error(data.msg, toastOptions);
              }
            }}
          >
            {({ errors, touched, handleBlur, handleChange }) => (
              <Form>
                <h2>Đăng Ký</h2>
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
                <div className="field">
                  <div className="control">
                    <Field
                      name="email"
                      type="email"
                      className="input"
                      placeholder="Email"
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
                      name="password"
                      type="password"
                      className="input"
                      placeholder="Mật khẩu"
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
                      placeholder="Xác nhận mật khẩu"
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

                <Button type="submit">Đăng ký</Button>
                <span>
                  Already have account? <Link to="/Login">Login</Link>
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

export default Register;
