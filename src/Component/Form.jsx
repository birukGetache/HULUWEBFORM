// src/components/Form.js
import React , {useState} from 'react';

const Form = ({ formData, handleChange, handleSubmit }) => {
    const [isFocused, setIsFocused] = useState(false);

  // Inline styles with conditional background color
  const inputStyle = {
    width: "95%",
    height: "50px",
    margin: "0",
    borderRadius: "5px",
    fontSize: "17px",
    border: "2px solid #007bff",
    backgroundColor: isFocused ? "#027ffb" : "#c8cfd5",
    transition: "background-color 0.3s ease"  // Smooth transition for color change
  };
  return (
    <div className="form-container">
      <h1 style={{textAlign:"center" , fontFamily:"cursive" }}>Form Page For HULU</h1>
      <form onSubmit={handleSubmit} className="form" style={{width:"100%" , height:"70vh",display:"grid" , gridTemplateColumns:"1fr 1fr 1fr" }}>
        <label style={{display:"grid"}}>
          <span style={{display:"flex" , alignItems:"center" , fontFamily:"cursive"}}>First Name:</span>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={() => setIsFocused(true)}   // Handle focus
            onBlur={() => setIsFocused(false)}  
          />
        </label>
        <label style={{display:"grid"}}>
        <span style={{display:"flex" , alignItems:"center" , fontFamily:"cursive"}}>Middle Name:</span>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={() => setIsFocused(true)}   // Handle focus
            onBlur={() => setIsFocused(false)}  
          />
        </label>
        <label style={{display:"grid"}}>
        <span style={{display:"flex" , alignItems:"center" , fontFamily:"cursive"}}> Department:</span>
         
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            style={{width:"95%", height:"50px", margin:"0", borderRadius:"5px" , fontSize:"17px" , border:"2px solid #007bff" , backgroundColor:"#dae7ff  "}}
          />
        </label>

        <label>
            <span style={{display:"flex" , alignItems:"center" , fontFamily:"cursive" , textAlign:"end"}}>Experience:</span>
        <div>
          <label style={{display:"grid" , gridTemplateColumns:"1fr 1fr 1fr 1fr "}}>
             <span style={{display:"flex" , alignItems:"center" , fontFamily:"cursive" , textAlign:"end"}}>  Experienced </span> 
            <input
              type="radio"
              name="experience"
              value="experienced"
              checked={formData.experience === 'experienced'}
              onChange={handleChange}
              style={{width:"95%", height:"20px",display:"flex", alignItems:"center", marginLeft:"60px", borderRadius:"5px" , fontSize:"17px" , border:"2px solid #007bff" , backgroundColor:"#dae7ff  " , justifyContent:"start"}}
              
            />
          
          </label>
          <label  style={{display:"grid" , gridTemplateColumns:"1fr 1fr 1fr "}}>
         <span style={{display:"flex" , alignItems:"center" , fontFamily:"cursive" , textAlign:"end"}}> Not Experienced</span>
            <input
              type="radio"
              name="experience"
              value="not experienced"
              checked={formData.experience === 'not experienced'}
              onChange={handleChange}
              style={{width:"95%", height:"20px",display:"flex", alignItems:"center", borderRadius:"5px" , fontSize:"17px" , border:"2px solid #007bff" , backgroundColor:"#dae7ff  "}}
              
            />
           
          </label>
        </div>
        </label>
        {formData.experience === 'experienced' && (
          <label>
             <span style={{display:"flex" , alignItems:"center" , fontFamily:"cursive" , textAlign:"end"}}> Years Of experiance</span>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              required={formData.experience === 'experienced'}
              style={{width:"95%", height:"50px", margin:"0", borderRadius:"5px" , fontSize:"17px" , border:"2px solid #007bff" , backgroundColor:"#dae7ff  "}}
              
            />
          </label>
        )}

        <label>
        <span style={{display:"flex" , alignItems:"center" , fontFamily:"cursive" , textAlign:"end"}}> Phone Number</span>
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            style={{width:"95%", height:"50px", margin:"0", borderRadius:"5px" , fontSize:"17px" , border:"2px solid #007bff" , backgroundColor:"#dae7ff  "}}
          />
        </label>
        <label>
        <span style={{display:"flex" , alignItems:"center" , fontFamily:"cursive" , textAlign:"end"}}> Location</span>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={{width:"95%", height:"50px", margin:"0", borderRadius:"5px" , fontSize:"17px" , border:"2px solid #007bff" , backgroundColor:"#dae7ff  "}}
            
          />
        </label>
        <label>
        <span style={{display:"flex" , alignItems:"center" , fontFamily:"cursive" , textAlign:"end"}}> Gender</span>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={{width:"95%", height:"50px", margin:"0", borderRadius:"5px" , fontSize:"17px" , border:"2px solid #007bff" , backgroundColor:"#dae7ff  "}}
        
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
        <span style={{display:"flex" , alignItems:"center" , fontFamily:"cursive" , textAlign:"end"}}> Urgency</span>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            required
            style={{width:"95%", height:"50px", margin:"0", borderRadius:"5px" , fontSize:"17px" , border:"2px solid #007bff" , backgroundColor:"#dae7ff  "}}
        
          >
            <option value="not urgent">Not Urgent</option>
            <option value="urgent">Urgent</option>
          </select>
        </label>
        <label>
        <span style={{display:"flex" , alignItems:"center" , fontFamily:"cursive" , textAlign:"end"}}> Hire Status:</span>
          
          <select
            name="hired"
            value={formData.hired}
            onChange={handleChange}
            required
            style={{width:"95%", height:"50px", margin:"0", borderRadius:"5px" , fontSize:"17px" , border:"2px solid #007bff" , backgroundColor:"#dae7ff  "}}
          >
            <option value="not hired">Not Hired</option>
            <option value="hired">Hired</option>
          </select>
        </label>
        <button type="submit" style={{borderRadius:"30px" , height:"50px" , marginTop:"20px"}}>Submit</button>
      </form>
    </div>
  );
};

export default Form;
