import Login from "../pages/Login";
import Register from "../pages/Register";
import { Switch, Route, Redirect } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      <Route path="/auth/login" exact component={Login} />
      <Route path="/auth/register" exact component={Register} />
    </div>
  );
}

export default AuthLayout;