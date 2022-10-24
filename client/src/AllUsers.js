import React from 'react';
import MainDial from './MainDial';
import UserModal from './UserModal';

const AllUsers = () => {
  return (
    <>
        <div className=' m-auto' style={{width:"98%"}}>
    <h1 align="center" className='mt-5'></h1>
    {/* <UserModal/> */}
    <MainDial/>
    </div>
    
   </>
    
  )
}

export default AllUsers