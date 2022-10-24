import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import About from "./About";
import Login from "./Login";
import SignUpForm from "./SignUpForm";
import Contact from "./Contact";
import Error from "./Error";
import Missons from "./Missons";
import Information from "./Information";
import AllUsers from "./AllUsers";
import UpdateUser from "./UpdateUser";
import Navbar from "./Navbar";
import MyData from "./MyData";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="signup" element={<SignUpForm />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="/missions" element={<Missons />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/allUsers/:file" element={<AllUsers />}></Route>
        <Route path="/myData/:file" element={<MyData />}></Route>
        <Route path="/information/:file" element={<Information />}></Route>
        <Route path="/getUser/:file/:id" element={<UpdateUser />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  );
};

export default App;
