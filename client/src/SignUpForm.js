import React, { useState } from "react";
import { showErrorMsg, showSuccessMsg } from "./message";
import { useNavigate } from "react-router-dom";
import { signup } from "./API/api";
import isEmpty from "validator/lib/isEmpty";
import axios from "axios";

const SignUpForm = () => {
  const history = useNavigate();
  const [videos, setVideos] = useState([]);
  const [mname, setMname] = useState("");
  const [surname, setSurname] = useState("");
  const [surname2, setSurname2] = useState("");
  const [password, setPassword] = useState("");
  const [passport, setPassport] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [select, setSelect] = useState("");
  const [gender, setGender] = useState("");
  const [formData, setData] = useState({
    successMsg: false,
    errorMsg: false,
  });

  const { successMsg, errorMsg } = formData;
  // console.log(videos);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }
    formdata.append("mname", mname);
    formdata.append("surname", surname);
    formdata.append("email", email);
    formdata.append("passport", passport);
    formdata.append("password", password);
    formdata.append("select", select);
    formdata.append("role", role);
    formdata.append("surname2", surname2);
    formdata.append("age", age);
    formdata.append("gender", gender);
    formdata.append("country", country);
    if (
      isEmpty(mname) ||
      isEmpty(surname) ||
      isEmpty(email) ||
      isEmpty(passport) ||
      isEmpty(password) ||
      isEmpty(select) ||
      isEmpty(role) ||
      isEmpty(country) ||
      isEmpty(gender) ||
      isEmpty(age)
    ) {
      setData({
        ...formdata,
        errorMsg: "All fields are required",
      });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/signup",
          formdata
        );
        if (response) {
          console.log("Axios signup success: ", response);
          setData({
            // fname: '',
            // lname: '',
            // email: '',
            // phone: '',
            // password: '',
            // cpassword: '',
            // classN:'',
            // role:'student',
            successMsg: response.data.successMsg,
            errorMsg: false,
          });
          // history("./login")
        }
        // await signup(formdata);
      } catch (err) {
        console.log("Axios signup error: ", err);
        setData({
          ...formData,
          errorMsg: err.response.data.errorMessage,
          successMsg: false,
        });
      }

      // formdata.append("gender",gender);
    }
  };

  return (
    <>
    
    <section className="  gradient-custom bg-red">
      <div className="container h-100 fs-4 w-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body  p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center fw-bold">
                Añadir Usuario
                </h3>
                <form>
                  <div className="row">
                    <div className="col-12">
                      <p style={{ color: "red", fontSize: "20px" }}>
                        {successMsg && showSuccessMsg(successMsg)}
                        {errorMsg && showErrorMsg(errorMsg)}
                      </p>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="Name"
                          name="mname"
                          className="form-control form-control-lg "
                          onChange={(e) => setMname(e.target.value)}
                        />
                        <label className="form-label " htmlFor="Name">
                          {" "}
                          Nombre
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="SurName"
                          name="surname"
                          className="form-control form-control-lg"
                          onChange={(e) => setSurname(e.target.value)}
                        />
                        <label className="form-label" htmlFor="SurName">
                          Primer Apellido
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 d-flex align-items-center ">
                      <div className="form-outline datepicker w-100">
                        <input
                          type="text"
                          name="surname2"
                          className="form-control form-control-lg"
                          id="SurName-2"
                          onChange={(e) => setSurname2(e.target.value)}
                        />
                        <label htmlFor="SurName-2" className="form-label">
                          {" "}
                          Segundo Apellido
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4 d-flex align-items-center ">
                      <div className="form-outline datepicker w-100">
                        <input
                          type="tel"
                          id="passport"
                          name="passport"
                          className="form-control form-control-lg"
                          onChange={(e) => setPassport(e.target.value)}
                        />
                        <label className="form-label" htmlFor="passport">
                          Identificación
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 d-flex align-items-center ">
                      <div className="form-outline datepicker w-100">
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="age"
                          className="form-control form-control-lg"
                          onChange={(e) => setAge(e.target.value)}
                        />
                        <label className="form-label" htmlFor="phoneNumber">
                          Edad
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="email"
                          name="country"
                          onChange={(e) => setCountry(e.target.value)}
                          id="country"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="emailAddress">
                          País
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="emailAddress"
                          name="email"
                          className="form-control form-control-lg"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form-label" htmlFor="emailAddress">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-1">
                      <div className="form-outline">
                        <input
                          type="tel"
                          id="password"
                          name="password"
                          className="form-control form-control-lg"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="password">
                          Contraseña
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-12 mt-lg-4">
                      {/* <label className="form-label select-label">Types of User</label> */}
                      <select
                        className="form-select form-select-lg"
                        name="select"
                        onChange={(e) => setSelect(e.target.value)}
                      >
                        <option value="none">Select</option>
                        <option value="Collaborator">Colaborador
</option>
                        <option value="Donur">Donador
</option>
                        <option value="Volunteer">Voluntario</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-4 mt-3 mt-lg-2"></div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-12 mt-lg-4">
                      {/* <label className="form-label select-label">Types of User</label> */}
                      <select
                        className="form-select form-select-lg"
                        name="gender"
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="none">Género</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-4 mt-3 mt-lg-2"></div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="videos">Upload Videos</label>
                    <input
                      type="file"
                      name="videos"
                      id="videos"
                      accept="application/pdf"
                      className="form-control"
                      multiple
                      onChange={(e) => {
                        setVideos(e.target.files);
                      }}
                    />
                  </div>

                  <div className="mt-4 pt-2 text-center">
                    <input
                      className="btn btn-primary btn-lg"
                      type="submit"
                      value="Subir"
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

export default SignUpForm;
