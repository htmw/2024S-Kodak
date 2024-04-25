import React,{useState} from 'react';
import 'C:/MS Course Work/SEM 4/Project/Git Repo/2024S-Kodak/SmartHirePro/src/LoginSignup.css';
import user_icon from 'C:/MS Course Work/SEM 4/Project/Git Repo/2024S-Kodak/SmartHirePro/src/assets/person.png';
import email_icon from 'C:/MS Course Work/SEM 4/Project/Git Repo/2024S-Kodak/SmartHirePro/src/assets/email.png';
import password_icon from 'C:/MS Course Work/SEM 4/Project/Git Repo/2024S-Kodak/SmartHirePro/src/assets/password.png';

const LoginSingup = () => {
  const[action,setAction] = useState ("Sign up");

  return (
    <div className ='container'>
      <div className ="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action==="Login"?<div></div>:<div className="input">
        <img src={user_icon} alt=""/>
        <input placeholder ="Name" type="text"  />
        </div>}

        <div className="input">
        <img src={email_icon} alt=""/>
        <input placeholder ="Email" type="email" />
        </div>
        <div className="input">
        <img src={password_icon} alt=""/>
        <input placeholder ="Password" type="password" />
      </div>
      </div>
      {action==="Sign up"?<div></div>:<div className="forgot-password">Forgot password? <span>Click Here!</span></div>}

      <div className="submit-container">
        <div className ={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign up")}}> Sign up</div>
        <div className={action==="Sign up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Log in </div>
      </div>
    </div>
  )
}

export default LoginSingup