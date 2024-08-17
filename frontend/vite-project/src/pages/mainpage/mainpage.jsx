import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  setLogged,
  setToken,
  setUser,
} from "../../app/features/auth/authSlice";
import { useDispatch } from "react-redux";

const MainPage = () => {
  //comprobar que en el estado global está el usuario tiene token
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const logout = () => {
    //limpiar el estado global
    dispatch(setLogged(false));
    dispatch(setUser(null));
    dispatch(setToken(null));
    //redirigir a la página
    navigate("/login");
  };

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
      <h1>Welcome to the Main Page!</h1>
      <p>This is a basic landing page in React.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default MainPage;
