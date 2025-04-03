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

  const signupRedirect=()=>{
      navigate("/signup")
  }

  const loginRedirect=()=>{
    navigate("/login");
  }


  return (
    <div>
      <img className="image-gradient" src={grad} alt="gradient" />
      <div className="layer-blur"></div>

      <div className="container">
        <header>
          <h1 data-aos="fade-down" data-aos-duration="1500" className="logo">NavaAI</h1>
          <nav>
            <a data-aos="fade-down" data-aos-duration="1500">Company</a>
            <a data-aos="fade-down" data-aos-duration="2000">Features</a>
            <a data-aos="fade-down" data-aos-duration="2500">Resources</a>
            <a data-aos="fade-down" data-aos-duration="3000">Docs</a>
          </nav>
          <div className="btn-group ">
            <button data-aos="fade-down" data-aos-duration="1500" className="btn-signing" onClick={signupRedirect}>Sign Up</button>
            <button data-aos="fade-down" data-aos-duration="1500" className="btn-signing" onClick={loginRedirect}>Log In</button>
          </div>
          
        </header>

        <main>
          <div
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
            data-aos-offset="0"
            data-aos-duration="1500"
            className="content cursor-"
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
              <b>Nava AI</b> is a <b>smart</b>,<b>scalable</b>, and <b>AI-driven chat assistant</b>.
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
              <a className="btn-get-started">Documentation &gt;</a>
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






