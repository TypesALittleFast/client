import React,{useEffect,useState} from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import {useNavigate, useParams} from 'react-router-dom'
import { isAuthenticated } from './helper/authorize';
const backendURL="http://localhost:8000";

const MyData = () => {
  // let id= useParams()
  let arr=[]
  const url = `${backendURL}/getAllUsers`
  const [userData, setFormData] = useState([]);
  const [name, setname] = useState('');
  const [surname, setsurname] = useState('')
  const [surname2, setsurname2] = useState('')
  const [age, setage] = useState('')
   const [country, setcountry] = useState('')
   const [passport, setpassport] = useState()
   const [email, setemail] = useState('')
   const [password, setpassword] = useState('')
   const [select, setselect] = useState('')
   const [gender, setgender] = useState('')

  var file=useParams();

useEffect(() => {
fetch(url).then(resp => resp.json()).then(resp => {
const d=   resp.filter(data=>{
   return data.passport===isAuthenticated().passport
 })
 setFormData(d)
 setname(d[0].mname)
 setsurname(d[0].surname)
 setsurname2(d[0].surname2)
 setage(d[0].age)
 setcountry(d[0].country)
 setemail(d[0].email)
 setpassword(d[0].password)
 setgender(d[0].gender)
 setselect(d[0].select)

 setpassport(d[0].passport)

 console.log(d[0].mname)
}
)
}, [])
  //---------------------D O W N L O A D I N G
  const downloadFile=(x)=>{
    console.log("in here")
    if(x===""){
  window.alert("Error 404! No File Found In Update");
    }
    else{
     file=x
    console.log(file)
    axios({
      url:`http://localhost:8000/getFiles/${x}`,
      method:"GET",
      responseType:"blob"
    }).then((res)=>{
      console.log(res)
      fileDownload(res.data,x)
    })
  }
  }

  return (
   
    <div>

<section className="vh-100 gradient-custom bg-red">
  <div className="container py-5 h-100">
    <div className="row justify-content-center align-items-center h-100">
  
      <div className="col-12 col-lg-9 col-xl-7">
        <div className="card shadow-2-strong card-registration" >
          <div className="card-body p-2 p-md-5">
           
            <form>


            <div className="row">
                <div className="col-md-6 mb-4 d-flex align-items-center ">

                  <div className="form-outline datepicker w-100">
                    <input type="text" name="surname2" value={name}  className="form-control form-control-lg" id="SurName-2"   />
                    <label htmlFor="SurName-2" className="form-label"> Nombre
</label>
                  </div>
                </div>

                <div className="col-md-6 mb-4 d-flex align-items-center ">
                <div className="form-outline datepicker w-100">
                    <input type="tel" id="passport" name="passport" value={surname} className="form-control form-control-lg"   />
                    <label className="form-label" htmlFor="passport">Primer Apellido
</label>
                  </div>
                  </div>
                <div className="col-md-6 mb-4 d-flex align-items-center ">
                <div className="form-outline datepicker w-100">
                    <input type="tel" id="phoneNumber" name="age" value={age} className="form-control form-control-lg"   />
                    <label className="form-label" htmlFor="phoneNumber">Edad
</label>
                  </div>
                  </div>

              
                <div className="col-md-6 mb-4 pb-2">

<div className="form-outline">
  <input type="text" id="country" value={country} className="form-control form-control-lg" />
  <label className="form-label" htmlFor="emailAddress">País
</label>
</div>

</div>
              </div>

              


              <div className="row">
                <div className="col-md-6 mb-4 d-flex align-items-center ">

                  <div className="form-outline datepicker w-100">
                    <input type="text" name="surname2" value={surname2}  className="form-control form-control-lg" id="SurName-2"   />
                    <label htmlFor="SurName-2" className="form-label"> Segundo Apellido
</label>
                  </div>
                </div>

                <div className="col-md-6 mb-4 d-flex align-items-center ">
                <div className="form-outline datepicker w-100">
                    <input type="tel" id="passport" name="passport" value={passport} className="form-control form-control-lg"   />
                    <label className="form-label" htmlFor="passport">Identificación
</label>
                  </div>
                  </div>
            

              
       
              </div>
               
              

              <div className="row">
                <div className="col-md-6 mb-4 pb-2">

                  <div className="form-outline">
                    <input type="email" id="emailAddress" name='email' value={email} className="form-control form-control-lg"  />
                    <label className="form-label" htmlFor="emailAddress">Email</label>
                  </div>

                </div>
                <div className="col-md-6 mb-4 pb-1">

                  <div className="form-outline">
                    <input type="tel" id="password" name="password" value={password} className="form-control form-control-lg"  />
                    <label className="form-label" htmlFor="password">Contraseña
</label>
                  </div>

                </div>

                <div className="col-md-6 mb-4 pb-1">

<div className="form-outline">
  <input type="tel" id="password" name="select" value={select} className="form-control form-control-lg"  />
  <label className="form-label" htmlFor="password">TipoUsuario
</label>
</div>

</div>




<div className="col-md-6 mb-4 pb-1">

<div className="form-outline">
  <input type="tel" id="password" name="gender" value={gender} className="form-control form-control-lg"  />
  <label className="form-label" htmlFor="password">Género
</label>
</div>

</div>



  {/* //  <p> {userData[0].mname}</p>, */}
    { 
      userData.map(x=>(
        x.videos.map(i=>{
arr.push(i)

        })
 ))
    },
      {
      arr.map(n=>(
       // console.log(n)
        <><button type='submit' onClick={()=>downloadFile(n)}>{n} </button> <br/><br/>
    </> 
      ))
    }
  
              </div>
           
    
  

            </form>
          </div>     
        </div>
      </div>
    </div>
  </div>
</section>


     </div>
  )
}

export default MyData