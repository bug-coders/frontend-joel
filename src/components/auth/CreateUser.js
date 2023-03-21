import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/createUserActions";
import Error from "../Error";
import Button from "../Button";
import logo from "../../assets/wakapop propio.png";
import sax from "../../assets/sax.png";
import guitt from "../../assets/ESP.png";
import iconT from '../../assets/icons/Twitter.png';
import iconF from '../../assets/icons/Facebook.png';
import iconI from '../../assets/icons/Instagram.png';
import "./CreatePage.css";

const CreateUser = () => {
  const [customError, setCustomError] = useState(null);
  const { loading, error, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      setCustomError("el Password no coincide");
      return;
    }
    data.email = data.email.toLowerCase();

    dispatch(registerUser(data));
  };
  return (
    <div className="formMain">
      
        <div className="formCont">
          <div className="logoCont">
            <img className="logoReg" src={logo} alt="Wusikando" />
          </div>
          <div className="formcontainer">
          <img className="imgAdd" src={sax} alt="Wusikando" />
            <form
              onSubmit={handleSubmit(submitForm)}
              className="form-page-container-sign">
              <h1 className="form-title-sign"> {"Sign up"} </h1>

              <div className="form-group-sign">
                <input
                  type="text"
                  className="form-input-sign"
                  placeholder={"Name"}
                  {...register("name")}
                  required
                />
              </div>
              <div className="form-group-sign">
                <input
                  type="email"
                  className="form-input-sign"
                  placeholder={"Email"}
                  {...register("email")}
                  required
                />
              </div>
              <div className="form-group-sign">
                <input
                  type="password"
                  className="form-input-sign"
                  placeholder={"Password"}
                  {...register("password")}
                  required
                />
              </div>
              <div className="form-group-sign">
                <input
                  type="password"
                  className="form-input-sign"
                  placeholder={"Confirmar password"}
                  {...register("confirmPassword")}
                  required
                />
              </div>
              {error && <Error>{error}</Error>}
              {customError && <Error>{customError}</Error>}
              <Button type="submit" className="button-sign" disabled={loading}>
                {loading ? "Loading..." : "Register"}
              </Button>
              <Button className="button-sign">
                <NavLink className="navlinks" to="/">
                  Volver
                </NavLink>
              </Button>
            </form>
            <img className="imgAdd" src={guitt} alt="Wusikando" />
          </div>
          <footer className="footer">
        <div>
          <a href="https://twitter.com/?lang=es" target="_blank" rel="noopener noreferrer">
            <img className="iconFoot" src={iconT} alt="twitter logo" />
          </a>
        </div>
        <div>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img className="iconFoot" src={iconI} alt="instagram" />
          </a>
        </div>
        <div>
          <a href="https://es-es.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img className="iconFoot" src={iconF} alt="Facebook" />
          </a>
        </div>
      </footer>
        </div>
      
    </div>
  );
};

export default CreateUser;
