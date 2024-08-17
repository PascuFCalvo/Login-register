import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate(); // Hook para manejar la navegación

  const start = () => {
    navigate("/credentials"); // Navegar a la página de credenciales sin recargar
  };

  return (
    <>
      <button onClick={start}> START </button>
    </>
  );
}

export default Start;
