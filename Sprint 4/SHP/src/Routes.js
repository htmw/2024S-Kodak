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