import React, {useEffect, useContext} from 'react';
import "../dashboard.css";
import {NavLink, useHistory} from "react-router-dom";

import { AdminContext } from "../App"

const Dashboard = () => {

  const {adminState, dispatchadmin} = useContext(AdminContext)

  const history = useHistory();

  const callDashboard =  async () =>{
      try {
          const res = await fetch('/dashboard', {
            method: "GET",
            headers: {
              Accept : "application/json",
              "Content-Type" : "application/json"
            },
            credentials: "include"
          });

          const data = await res.json();

          if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
          }

      } catch (error) {
        console.log(error)
        history.push("/signin");
      }
  }


  useEffect(() => {
    callDashboard();
  }, [])



const Loginbutton= () =>{
        
  if(adminState){
      return <div> 
          <button className="logoutbtnDash"><NavLink  to="/adminsignout">logout</NavLink></button>      
      </div>
  }
  else{
      return <div>  
              <button className="logoutbtnDash"><NavLink  to="/signin">login</NavLink></button>
              
          </div>
  }
}



    return (
        <>
            

  <div className="sidebar">
    <div className="logo-details">
      <i className='bx bxl-c-plus-plus'></i>
      <span className="logo_name">Cars Club</span>
    </div>
      <ul className="nav-links">
        {/* <li className="active"> */}
        <li>
            <NavLink className="dashlinks" to="/dashboard">
            <i className='bx bx-grid-alt' ></i>
            <span className="allLinks_name">Dashboard</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/addcars">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">Add Cars</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/getsalecarsforadmin">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">Available SaleCars</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/getrentcarsforadmin">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">Available RentCars</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/salecarsreports">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">Sale Cars Income</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/rentcarsreports">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">Rent Cars Income</span>
            </NavLink>
        </li>
        <li>
          <NavLink className="dashlinks" to="/availableusers">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">Available Users</span>
          </NavLink>
        </li>
        <li>
        <NavLink className="dashlinks" to="/usermessages">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">User's Messages</span>
          </NavLink>
        </li>
      </ul>

      <div className="logoutbtnDashDiv">
        <Loginbutton/>
      </div>
  </div>



  <section className="home-section">
    <nav>
      <div className="sidebar-button">
        <i className='bx bx-menu sidebarBtn'></i>
        <span className="dashboard">Dashboard</span>
      </div>
      
      <div className="profile-details">
        {/* <img src="/image/profile.jpg" alt=""/> */}
        <span className="admin_name">Asif Anwar</span>
        <i className='bx bx-chevron-down' ></i>
      </div>
    </nav>

    <div className="home-content" style={{textAlign:"center"}}>
      <h1>WELCOME TO DASHBOARD</h1><br/>
      <h3>Go To Add Cars Tab In Side Menu To Add Cars In Database</h3><br/>
      <h3>Go To Sale Cars Tab In Side Menu To Generate Income Reports of Sold Cars In Database</h3><br/>
      <h3>Go To Rent Cars Tab In Side Menu To Generate Income Reports of Rented Cars In Database</h3><br/>
      <h3>Go To Available Users Tab In Side Menu To See All Available Users Regestered In Database</h3><br/>
      </div>

  </section>



        </>
    )
}

export default Dashboard
