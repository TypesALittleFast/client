import React, { useState } from "react";
import { showErrorMsg, showSuccessMsg } from "./message";
import isEmpty from "validator/lib/isEmpty";
import { useNavigate } from "react-router-dom";
import { setAuthentication, isAuthenticated } from "./helper/authorize.js";

import isEmail from "validator/lib/isEmail";
import { signin } from "./API/api";
const Login = () => {
  const history = useNavigate();

  const [formData, setData] = useState({
    email: "",
    password: "",
    successMsg: false,
    errorMsg: false,
  });
  const { email, password, successMsg, errorMsg } = formData;
  const ChangeEvent = (event) => {
    const { name, value } = event.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
        successMsg: "",
        errorMsg: "",
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(email) || isEmpty(password)) {
      setData({
        ...formData,
        errorMsg: "All fields are required",
      });
    }
    //  else if (!isEmail(email)) {
    //     setData({
    //         ...formData,
    //         errorMsg: 'Invalid email',
    //     });
    // }
    else {
      // const {email, password} = formData;
      // const data = {email,password};

      signin(formData)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);
          if (isAuthenticated() && isAuthenticated().role === "admin") {
            setData({
              ...formData,
              successMsg: response.data.successMsg,
              errorMsg: false,
            });
            console.log("Redirecting to admin dashboard");
            // history("/allUsers/:file");
            window.location.reload();
          } else {
            setData({
              ...formData,
              successMsg: response.data.successMsg,
              errorMsg: false,
            });
            console.log("Redirecting to user dashboard");
            window.location.reload();
            // history("/user/dashboard");
          }
          // successMsg:response.data.succMessage,

          console.log(response);
        })
        .catch((err) => {
          console.log("Axios signup error: ", err);
          setData({
            ...formData,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  return (
    <>
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-6 col-xl-6">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body py-2 py-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center fw-bold">
                  Ingresar
                </h3>
                <form>
                  <div className="row w-75 m-auto ">
                    <div className="col-12">
                      <p style={{ color: "red", fontSize: "20px" }}>
                        {successMsg && showSuccessMsg(successMsg)}
                        {errorMsg && showErrorMsg(errorMsg)}
                      </p>
                    </div>
                  </div>

                  <div className="row w-75 m-auto">
                    <div className="col-12 col-md-12 m-0 pb-4 ">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="emailAddress"
                          name="email"
                          value={email}
                          placeholder="Email"
                          className="form-control form-control-lg "
                          onChange={ChangeEvent}
                        />
                      </div>
                    </div>

                    {/* <label className="col-12 col-md-3 control-label form-label" htmlFor="password">Password</label> */}
                    <div className="col-12 m-0 pb-2 mb-2">
                      <div className="form-outline">
                        <input
                          type="tel"
                          id="password"
                          name="password"
                          value={password}
                          placeholder="Contraseña"
                          className="form-control form-control-lg"
                          onChange={ChangeEvent}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-1 pt-2 text-center">
                    <input
                      className="btn btn-primary btn-lg"
                      type="submit"
                      value="Submit"
                      onClick={handleSubmit}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Login;
