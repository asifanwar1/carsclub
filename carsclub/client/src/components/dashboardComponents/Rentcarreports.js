import React, {useState, useEffect, useContext} from 'react'
import {NavLink} from "react-router-dom";

import { AdminContext } from "../../App"

const Rentcarreports = () => {

  const {adminState, dispatchadmin} = useContext(AdminContext)

  const [income, setIncome] = useState([]);
  let allsoldItems = [];

  const getrentcarincome = async () =>{
      try {
          const res = await fetch ('/getrentcarincome', {
              method: 'GET',
          });

          const data = await res.json();
          
          setIncome(data);

      }
      catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
    getrentcarincome();
  }, [])

  income.map(income=>{
    income.soldItems.map(soldItems=>{
      allsoldItems.push(soldItems)
    })
      
  })


  const Loginbutton= () =>{
        
    if(adminState){
        return <div> 
            <button className="logoutbtnDash"><NavLink className="nav-link" to="/adminsignout">logout</NavLink></button>      
        </div>
    }
    else{
        return <div>  
                <button className="logoutbtnDash"><NavLink className="nav-link" to="/signin">login</NavLink></button>
                
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



    
    <div className = "salecartableDiv">

            <h1 className="heading"><span>Rented Cars Income Report</span></h1>

            <table className = "salecartable">
                  <thead>
                    <tr>
                      <th >BRAND </th>
                      <th >MODEL </th>
                      <th >RETAIL </th>
                      <th >BOOKED HOURS </th>
                      <th >INCOME </th>
                    </tr>
                    </thead>
            
        

        {allsoldItems.map((allsoldItems) => 
            <tbody key={allsoldItems._id} >
                <tr>
                  <td >{allsoldItems.brand}</td>
                  <td >{allsoldItems.model}</td>
                  <td >{allsoldItems.retailPricePerItem} Rs</td>
                  <td >{allsoldItems.bookedHours}</td>
                  <td >{allsoldItems.totalIncome} Rs</td>
                </tr> 
            </tbody>
         
        )}
        </table>
        </div>
    </section>
        </>
    )
}

export default Rentcarreports
