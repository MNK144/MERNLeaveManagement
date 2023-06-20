import ApplyLeave from "../pages/ApplyLeave";
import ApproveLeave from "../pages/ApproveLeave";
import Home from "../pages/Home";
import LeaveHistory from "../pages/LeaveHistory";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "../pages/Main";

function AppLayout() {
  return (
    <div>
      <Main/>
    </div>
  );
}

export default AppLayout;