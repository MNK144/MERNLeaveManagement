import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import ApproveLeave from "./pages/ApproveLeave";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import AppLayout from "./layout/AppLayout";

function App() {
  const isAuthenticated = true;

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  return (
    <div className="App">
      <Switch>
        <Route path="/auth" component={AuthLayout} />
        <PrivateRoute path="/app" component={AppLayout} />
      </Switch>
    </div>
  );
}

export default App;
