import { BrowserRouter, Routes, Route } from "react-router-dom";
import Operator from "./Operator";
import EMSCaller from "./EMSCaller";
// import Citizen from "./Citizen";
import logo from "./../assets/yes-removebg-preview.png";

export default function Header() {
  return (
    <div className="spicyspicyhead">
      <div className="horizontal-items headheadhead">
        <img src={logo} width="7%" height="auto" alt="failed"></img>
        <div className="horizo">
          <div className="logo-text">
            <div className="link">Heart AtTech</div>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={<p className="nav">(Operator View)</p>}
                />
                <Route
                  path="/operator"
                  element={<p className="nav">(Operator View)</p>}
                />
                <Route
                  path="/emscaller"
                  element={<p className="nav">(EMS Caller View)</p>}
                />
                <Route
                  path="/citizen"
                  element={<p className="nav">(Citizen View)</p>}
                />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
        <div className="leftleftxx">
          <div type="submit" className="horizontal-items">
            <button  type="submit" className="head-button leftxlog btn">Log in</button>
            <button type="submit" className="head-button regreg btn">Register</button>
          </div>
        </div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={Operator()} />
          <Route path="/operator" element={Operator()} />
          <Route path="/emscaller" element={EMSCaller()} />
          {/* <Route path="/citizen" element={Citizen()} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
