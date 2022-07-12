import React, {useState, useContext} from 'react'
import {NavLink, useHistory} from "react-router-dom";

import { AdminContext } from "../../App"

const Addcars = () => {

  const {adminState, dispatchadmin} = useContext(AdminContext)

    const history = useHistory();
    const [file, setFile] = useState();
    const [car, setCar] = useState({
        brand : "",
        model : "",
        year : "",
        color : "",
        enginecc : "",
        maxpower : "",
        airbags : "",
        rearcamera : "",
        price : "",
        retailprice : "",
        quantity : ""
    });

    let name, value;

    const handleInputs = (e) =>{
        name = e.target.name;
        value = e.target.value;
        
        setCar({...car, [name]:value});
    }
    
    
    const handleFile = (e) =>{
        const myfile = e.target.files[0] 
        setFile({...car, myfile});
        
    }
    
    
    const postData = async (e) =>{
        e.preventDefault(); 
        let formData = new FormData();
        formData.append('brand', file.brand) 
        formData.append('model', file.model) 
        formData.append('year', file.year) 
        formData.append('color', file.color) 
        formData.append('enginecc', file.enginecc) 
        formData.append('maxpower', file.maxpower) 
        formData.append('airbags', file.airbags) 
        formData.append('rearcamera', file.rearcamera) 
        formData.append('price', file.price) 
        formData.append('retailprice', file.retailprice) 
        formData.append('quantity', file.quantity) 
        formData.append('myfile', file.myfile) 
       
       
        const res = await fetch("/addcars", {
            method: "POST",
            body: formData
              
        })
        
    }




    const [rentFile, setRentFile] = useState();
    const [rentcar, setRentCar] = useState({
        brand : "",
        model : "",
        year : "",
        color : "",
        seats : "",
        price : "",
        rent : ""
    });

    let rentName, rentValue;

    const handleRentInputs = (e) =>{
        rentName = e.target.name;
        rentValue = e.target.value;
        
        setRentCar({...rentcar, [rentName]:rentValue});
    }
    
    
    const handleRentFile = (e) =>{
        const myrentfile = e.target.files[0] 
        setRentFile({...rentcar, myrentfile});
        
    }
    
    
    const postRentData = async (e) =>{
        e.preventDefault(); 
        let rentData = new FormData();
        rentData.append('brand', rentFile.brand) 
        rentData.append('model', rentFile.model) 
        rentData.append('year', rentFile.year) 
        rentData.append('color', rentFile.color) 
        rentData.append('seats', rentFile.seats) 
        rentData.append('price', rentFile.price) 
        rentData.append('rent', rentFile.rent) 
        rentData.append('myrentfile', rentFile.myrentfile) 
       
       
        const res = await fetch("/addrentcars", {
            method: "POST",
            body: rentData
        })
        
    }



    
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

    <div className="home-content">
      <div className="sales-boxes">
        <div className="recent-sales box">
          <div className="title">Add Cars For Sale</div>
          <form method="POST" className="addsalecarform" name="myform" id="myform">
            <label htmlFor="fname">Brand: </label>
            <input type="text" name="brand" id="brand" value={car.brand} onChange={handleInputs} placeholder="Enter Car Brand"/><br />
            <label htmlFor="lname">Model: </label>
            <input type="text" name="model" id="model" value={car.model} onChange={handleInputs} placeholder="Enter Car Model" /><br />
            <label htmlFor="fname">Year: </label>
            <input type="text" name="year" id="year" value={car.year} onChange={handleInputs} placeholder="Manufacturing Year"/><br />
            <label htmlFor="fname">Color: </label>
            <input type="text" name="color" id="color" value={car.color} onChange={handleInputs} placeholder="Enter Car Color" /><br />
            <label htmlFor="lname">Engine CC: </label>
            <input type="text" name="enginecc" id="enginecc" value={car.enginecc} onChange={handleInputs} placeholder="Enter Car Engine CC" /><br />
            <label htmlFor="lname">Max Power: </label>
            <input type="text" name="maxpower" id="maxpower" value={car.maxpower} onChange={handleInputs} placeholder="Enter car MaxPower" /><br />
            <label htmlFor="lname">Air Bags: </label>
            <input type="text" name="airbags" id="airbags" value={car.airbags} onChange={handleInputs} placeholder="Enter Airbags Quantity" /><br />
            <label htmlFor="lname">Rear Camera: </label>
            <input type="text" name="rearcamera" id="rearcamera" value={car.rearcamera} onChange={handleInputs} placeholder="Is Rear Camera Available?" /><br />
            <label htmlFor="lname">Price: </label>
            <input type="text" name="price" id="price" value={car.price} onChange={handleInputs} placeholder="Enter car Price" /><br />
            <label htmlFor="lname">Retail Price: </label>
            <input type="text" name="retailprice" id="retailprice" value={car.retailprice} onChange={handleInputs} placeholder="Enter retail Price" /><br />
            <label htmlFor="lname">Quantity: </label>
            <input type="text" name="quantity" id="quantity" value={car.quantity} onChange={handleInputs} placeholder="Enter car quantity" /><br />
            <label htmlFor="fname">Picture: </label>
            <input type="file" name="image" id="image"  onChange={handleFile} />
            <div className="button">
                <input type="submit" name="submit" onClick={postData}/>
            </div>
            </form>
          
        </div>



        {/* Rent File */}
        <div className="recent-sales box">
          <div className="title">Add Cars For Rent</div>
          <form method="POST" className="addcarform" name="rentform" id="myrentform">
            <label htmlFor="fname">Brand: </label>
            <input type="text" name="brand" id="brand" value={rentcar.brand} onChange={handleRentInputs} placeholder="Enter Car Brand"/><br />
            <label htmlFor="lname">Model: </label>
            <input type="text" name="model" id="model" value={rentcar.model} onChange={handleRentInputs} placeholder="Enter Car Model" /><br />
            <label htmlFor="fname">Year: </label>
            <input type="text" name="year" id="year" value={rentcar.year} onChange={handleRentInputs} placeholder="Manufacturing Year"/><br />
            <label htmlFor="fname">Color: </label>
            <input type="text" name="color" id="color" value={rentcar.color} onChange={handleRentInputs} placeholder="Enter Car Color" /><br />
            <label htmlFor="lname">Seats: </label>
            <input type="text" name="seats" id="seats" value={rentcar.seats} onChange={handleRentInputs} placeholder="Enter Car Seats" /><br />
            <label htmlFor="lname">Car Price: </label>
            <input type="text" name="price" id="price" value={rentcar.price} onChange={handleRentInputs} placeholder="Enter car price" /><br />
            <label htmlFor="lname">Car Rent: </label>
            <input type="text" name="rent" id="rent" value={rentcar.rent} onChange={handleRentInputs} placeholder="Enter rent per hour" /><br />
            <label htmlFor="fname">Picture: </label>
            <input type="file" name="image" id="image"  onChange={handleRentFile} />
            <div className="button">
                <input type="submit" name="submit" onClick={postRentData}/>
            </div>
            </form>
          
        </div>
      </div>
    </div>
  </section>
        </>
    )
}

export default Addcars
