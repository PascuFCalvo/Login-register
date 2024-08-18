import "./loginRegister.css";

function LoginRegister() {
  const navigate = (direction) => {
    window.location.href = `/${direction}`;
  };

  return (
    <>
      <button onClick={() => navigate("login")}>LOGIN</button>
      <button onClick={() => navigate("register")}>REGISTER</button>
    </>
  );
}

export default LoginRegister;
