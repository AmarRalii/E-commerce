import React, { useContext, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { ThreeDots } from "react-loader-spinner";
import Loading from "./../Loading/Loading";
import { UserContext } from "./../../Hooks/UserContext";
export default function Login() {
  const { setUserToken ,setName } = useContext(UserContext); // Consume UserContext
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");
  let navigate = useNavigate();

  let validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),

    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Invalid password")
      .required("Password is required"),
  });

  async function submitData(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      if (data.message === "success") {
        setUserToken(data.token);
        localStorage.setItem("userToken", data.token);
        setLoading(false);
        setMsg("");
        navigate("/home");
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitData,
  });

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="login">
      <div className="container">
        <div className="login-form">
          <h2>Login Now:</h2>
          <form onSubmit={formik.handleSubmit}>
            {msg ? <p className="alert alert-danger">{msg}</p> : ""}
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="alert alert-danger mt-2 p-2">
                {formik.errors.email}
              </p>
            ) : null}
            
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="alert alert-danger mt-2 p-2">
                {formik.errors.password}
              </p>
            ) : null}

            <br />
            <Link
              className="main-color text-decoration-none ms-auto  mb-2"
              to={"/forgetpassword"}
            >
              {" "}
              Forget Your Password ?{" "}
            </Link>

            <button
              className="cursor-pointer"
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
            >
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="20"
                  width="40"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
