import "./asideRight.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  setLogged,
  setToken,
  setUser,
} from "../../app/features/auth/authSlice";

const AsideRight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    //limpiar el estado global
    dispatch(setLogged(false));
    dispatch(setUser(null));
    dispatch(setToken(null));
    //redirigir a la página
    setTimeout(() => {
      navigate("/");
    }, 100);
  };
  return (
    <aside className="asideRight">
      <div className="buttonsProfile">
        <button className="update" onClick={() => navigate("/update")}>
          Update Profile
        </button>
        <button className="logOut" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AsideRight;
