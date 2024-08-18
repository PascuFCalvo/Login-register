import Navbar from "./pages/navbar/navbar";
import RouterApp from "./router";
import "./app.css";
import Footer from "./pages/Footer/footer";

function App() {
  return (
    <>
      <div className="content">
        <Navbar />
        <div className="BodySection">
          <RouterApp />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default App;
