import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import LoginRegister from "./LoginRegister";
import Dashboard from "./Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/LoginRegister" exact component={LoginRegister} />
        <Route path="/Dashboard" exact component={Dashboard} />
        
      </Switch>
    </BrowserRouter>
  );
};  

export default Router;  

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();