import React, { useEffect } from "react";
import "./landing.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "@splinetool/viewer"; // Import the spline viewer
import grad from "../../assets/gradient.png"
import {useNavigate} from "react-router-dom"

const Landing = () => {
  const navigate=useNavigate();
  useEffect(() => {
    AOS.init();
  }, []);

  const loginChecker=()=>{

    const token=localStorage.getItem("Token");
    if(!token)
    {
        alert("Please Log In");
        navigate("/login");
    }
    else
    {
        navigate("/chat");
    }
  }


  return (
    <div>
      <img className="image-gradient" src={grad} alt="gradient" />
      <div className="layer-blur"></div>

      <div className="container">
        <header>
          <h1 data-aos="fade-down" data-aos-duration="1500" className="logo">NavaAI</h1>
          <nav>
            <a data-aos="fade-down" data-aos-duration="1500" href="#">Company</a>
            <a data-aos="fade-down" data-aos-duration="2000" href="#">Features</a>
            <a data-aos="fade-down" data-aos-duration="2500" href="#">Resources</a>
            <a data-aos="fade-down" data-aos-duration="3000" href="#">Docs</a>
          </nav>
          
          <button data-aos="fade-down" data-aos-duration="1500" className="btn-signing"><a href="/signup">Sign Up</a></button>
          <button data-aos="fade-down" data-aos-duration="1500" className="btn-signing"><a href="/login">Log In</a></button>
        </header>

        <main>
          <div
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
            data-aos-offset="0"
            data-aos-duration="1500"
            className="content"
          >
            <div className="tag-box">
              <div className="tag">INTRODUCING</div>
            </div>

            <h1
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
              data-aos-offset="0"
              data-aos-duration="2000"
            >
              Nava AI for <br /> Everyone
            </h1>

            <p
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
              data-aos-offset="0"
              data-aos-duration="2500"
              className="description"
            >
              The best way to reach humans instead of spam folder, deliver transactional and marketing emails at scale.
            </p>

            <div
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
              data-aos-offset="0"
              data-aos-duration="3000"
              className="buttons"
            >
              <a href="/login" className="btn-get-started">Documentation &gt;</a>
              <a onClick={loginChecker} className="btn-signing-main">Get Started &gt;</a>
            </div>
          </div>
        </main>

        <spline-viewer
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
          data-aos-offset="0"
          data-aos-duration="1500"
          className="robot-3d"
          url="https://prod.spline.design/dlfloXxlswn1Jvux/scene.splinecode"
        ></spline-viewer>
      </div>
     
      <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js"></script>
    </div>
  );
};

export default Landing;






