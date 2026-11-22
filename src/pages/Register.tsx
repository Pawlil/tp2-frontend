import {RegisterForm} from '../components/RegisterForm.tsx';
import "./Register.css";

const Register = () => {
  return (
    <div className="register-page row g-4">

      {/* HEADER Y FORMULARIO */}
      <div className="col-md-7">

        <p className="register-eyebrown">UnaHur Anti-Social NET / NUEVO USUARIO</p>

        <div className="register-heading">
          <h1>¡Unete a Nosotros!</h1>

          <p className="register-intro">
            Completa el siguiente formulario para crearte un usuario
          </p>
        </div>

        {/* FORMULARIO */}
        <RegisterForm />

      </div>

    </div>
  );
};

export default Register;