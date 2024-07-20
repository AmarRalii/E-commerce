import React, { useState } from "react";
import "./SignUp.scss";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";

export default function SignUp() {
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");
  let navigate = useNavigate();

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
  
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name is too short")
      .max(10, "The maximum length is 10")
      .required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Invalid password")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Re-enter your password"),
  });

  async function submitData(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      if (data.message === "success") {
        setLoading(false);
        setMsg("");
        navigate("/login");
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitData,
  });

  return (
    <div className="signup">
      <div className="container">
        <div className="signup-form">
          <h2>Register Now:</h2>
          <form onSubmit={formik.handleSubmit}>
            {msg ? <p className='alert alert-danger'>{msg}</p> : ''}
            <label htmlFor="name">Name:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name ? (
              <p className="alert alert-danger mt-2 p-2">
                {formik.errors.name}
              </p>
            ) : null}

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

            <label htmlFor="rePassword">Re-enter Password:</label>
            <input
              className="form-control"
              name="rePassword"
              id="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <p className="alert alert-danger mt-2 p-2">
                {formik.errors.rePassword}
              </p>
            ) : null}

            <label htmlFor="phone">Phone:</label>
            <input
              className="form-control"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <p className="alert alert-danger mt-2 p-2">
                {formik.errors.phone}
              </p>
            ) : null}

            <br />

            <button className="cursor-pointer" type="submit" disabled={!(formik.isValid && formik.dirty)}>
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
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
