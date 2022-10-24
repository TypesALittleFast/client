import React, { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { showErrorMsg, showSuccessMsg } from './message';
import axios from 'axios';
import { updateUser } from './API/api';
import fileDownload from 'js-file-download';
const UpdateUser = () => {
  const{id}=useParams();
  var file=useParams();

  const initialState={
    mname: "",
    surname:"",
    surname2:"",
    passport: "",
    age:"",
    email: "",
    password: "",
    select:"",
    role:'',
    gender:'',
    country:'',
    successMsg: false,
    errorMsg: false,
    videos:[]
  }
    const [formData, setData] = useState(initialState);
      // const [gender, setGender] = useState('male');
      const {
        mname,
        surname,
        surname2,
        passport,
        age,
        select,
        email,
        role,
        password,
        type,
    gender,
        successMsg,
        errorMsg,
      } = formData;

      const getUsers = async (id) => {
        id = id || '';
        return await axios.get(`http://localhost:8000/getUser/${id}`);
    }

    useEffect(() => {
        loadUserDetails();
    },[]);



    const loadUserDetails = async() => {
        const response = await getUsers(id);
        console.log(response.data.videos);
        setData(response.data);
    }

    const editServiceDetails = async() => {
     
      await updateUser(id, formData);
      window.alert('record updated successfully');
     
   }
   const downloadFile=(x)=>{
    console.log("in here")
    if(x===""){
  window.alert("Error 404! No File Found In Update");
    }
    else{
     file.file=x
    console.log(file)
    axios({
      url:`http://localhost:8000/getFiles/${x}`,
      method:"GET",
      responseType:"blob"
    }).then((res)=>{
      console.log(res)
      fileDownload(res.data,x)
    })
  }}
    const ChangeEvent = (event) => {
        const { name, value } = event.target;
        // setGender(event.target.value)
        setData((preVal) => {
          return {
            ...preVal,
            [name]: value,
            successMsg:'',
            errorMsg:'',
          };
        });
      };




  return (
    <section className="vh-100 gradient-custom bg-red">
  <div className="container py-5 h-100">
    <div className="row justify-content-center align-items-center h-100">
  
      <div className="col-12 col-lg-9 col-xl-7">
        <div className="card shadow-2-strong card-registration" >
          <div className="card-body p-4 p-md-5">
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center fw-bold">{id}</h3>
            <form>

              <div className="row">
                <div className='col-12'>
                <p style={{color:"red" , fontSize: "20px"}}>
                    {successMsg && showSuccessMsg(successMsg)}
                    {errorMsg && showErrorMsg(errorMsg)}
                    </p>

                </div>
                <div className="col-md-6 mb-4">

                  <div className="form-outline">
                    <input type="text" id="Name" name="mname" value={formData.mname} className="form-control form-control-lg "  onChange={ChangeEvent}  />
                    <label className="form-label " htmlFor="Name">Nombre
</label>
                  </div>

                </div>
                <div className="col-md-6 mb-4">

                  <div className="form-outline">
                    <input type="text" id="SurName" name="surname" value={formData.surname} className="form-control form-control-lg"  onChange={ChangeEvent} />
                    <label className="form-label" htmlFor="SurName">Primer Apellido
</label>
                  </div>

                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4 d-flex align-items-center ">

                  <div className="form-outline datepicker w-100">
                    <input type="text" name="surname2" value={formData.surname2}  className="form-control form-control-lg" id="SurName-2"  onChange={ChangeEvent} />
                    <label htmlFor="SurName-2" className="form-label"> Segundo Apellido
</label>
                  </div>
                </div>

                <div className="col-md-6 mb-4 d-flex align-items-center ">
                <div className="form-outline datepicker w-100">
                    <input type="tel" id="passport" name="passport" value={formData.passport} className="form-control form-control-lg"  onChange={ChangeEvent} />
                    <label className="form-label" htmlFor="passport">Identificación
</label>
                  </div>
                  </div>
                <div className="col-md-6 mb-4 d-flex align-items-center ">
                <div className="form-outline datepicker w-100">
                    <input type="tel" id="phoneNumber" name="age" value={formData.age} className="form-control form-control-lg"  onChange={ChangeEvent} />
                    <label className="form-label" htmlFor="phoneNumber">Edad
</label>
                  </div>
                  </div>

              
                <div className="col-md-6 mb-4 pb-2">

<div className="form-outline">
  <input type="text" id="country" value={formData.country} className="form-control form-control-lg" />
  <label className="form-label" htmlFor="emailAddress">País
</label>
</div>

</div>
              </div>
               
              

              <div className="row">
                <div className="col-md-6 mb-4 pb-2">

                  <div className="form-outline">
                    <input type="email" id="emailAddress" name='email' value={formData.email} className="form-control form-control-lg"  onChange={ChangeEvent}/>
                    <label className="form-label" htmlFor="emailAddress">Email</label>
                  </div>

                </div>
                <div className="col-md-6 mb-4 pb-1">

                  <div className="form-outline">
                    <input type="tel" id="password" name="password" value={formData.password} className="form-control form-control-lg"  onChange={ChangeEvent} />
                    <label className="form-label" htmlFor="password">Contraseña
</label>
                  </div>

                </div>
              </div>
              <div className="row">

               
                 <div className="col-12 col-md-6 col-lg-6 mt-lg-4">

                  <select className="form-select form-control-lg" name="select" onChange={ChangeEvent} value={formData.select}>
                    <option value="none" >TipoUsuario
</option>
                    <option value="Collaborator" >Colaborador
</option>
                    <option value="Donur">Donador
</option>
                    <option value="Volunteer">Voluntario
</option>
                  </select>
                  <label className="form-label select-label">TipoUsuario
</label>

                </div>
                <div className="col-12 col-md-6 col-lg-6 mt-lg-4">

 <select className="form-select form-control-lg" name="gender" onChange={ChangeEvent} value={formData.gender}>
   <option value="none" >Género
</option>
   <option value="male" >Masculino
</option>
   <option value="female">Femenino
</option>
<option value="female">Otro

</option>
 </select>
 <label className="form-label select-label">Gender</label>

</div>




<div className="col-md-12 mb-4 pb-1">

                  <div className="form-outline">
                    <input type="tel" id="password" name="role" value={formData.role} className="form-control form-control-lg"  onChange={ChangeEvent} />
                    <label className="form-label" htmlFor="password">Role
</label>
                  </div>

                </div>

              </div>
         <div>
          {
          formData.videos.map(v=>(
            <><button className='btn ' style={{backgroundColor:'lightgrey'}} onClick={()=>downloadFile(v)}>
              {v}
            </button><br/></>
          ))
          }
         </div>
           
              <div className="mt-4 pt-2 text-center">
                <input  onClick={() => editServiceDetails()} className="btn btn-primary btn-lg" type="submit" value="Actualizar
"  />
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default UpdateUser;