import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/createUserActions";
import Error from "../Error";

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
    <form onSubmit={handleSubmit(submitForm)} className="form-page-container">

      <h1 className="form-title"> {"Sign up"} </h1>

      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder={"Nombre"}
          {...register("nombre")}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-input"
          placeholder={"Email"}
          {...register("email")}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-input"
          placeholder={"Password"}
          {...register("password")}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-input"
          placeholder={"Confirmar password"}
          {...register("confirmPassword")}
          required
        />
      </div>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <button type="submit" className="button" disabled={loading}>
        {loading ? "Loading..." : "Registrar"}
      </button>
      <button className="button">
        <NavLink className="navlinks" to="/">¥ Volver ¥</NavLink>
      </button>
    </form>
  );
};

export default CreateUser;