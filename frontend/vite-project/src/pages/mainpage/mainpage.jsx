import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import "./mainpage.css";
import AsideLeft from "../AsideLeft/asideLeft";
import AsideRight from "../AsideRight/asideRight";

const MainPage = () => {
  //comprobar que en el estado global está el usuario tiene token
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>You are not authorized to view this page.</p>
        <button onClick={() => navigate("/login")}>volver</button>
      </div>
    );
  }
  return (
    <div>
      <div className="body">
        <AsideLeft />
        <div className="mainContent">
          <h1>Welcome to the Main Page!</h1>
          <p>This is a basic landing page in React.</p>
        </div>
        <AsideRight />
      </div>
    </div>
  );
};

export default MainPage;
