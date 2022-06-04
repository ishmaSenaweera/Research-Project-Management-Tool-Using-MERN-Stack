import homeImage from "../../../images/home.jpeg";
import "./home.css";

function Home() {
  return (
    <div className="container mb-5">
      <h1 className="home-title-style">Research Management Tool</h1>
      <img src={homeImage} className="home-image-style" />
    </div>
  );
}

export default Home;
