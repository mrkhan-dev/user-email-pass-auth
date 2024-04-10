import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import {useRef, useState} from "react";
import {IoWarning} from "react-icons/io5";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";
import {CiCircleCheck} from "react-icons/ci";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [successLogin, setSuccessLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setSuccessLogin("");
    setLoginError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (result.user.emailVerified) {
          setSuccessLogin("Login Successful");
          toast.success("Login successful😍");
        } else {
          toast.error("Verified failed!");
        }
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError("Invalid email and password");
      });
  };

  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please provide an email");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      console.log("Please write a valid email");
      toast.error("Invalid email");
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Please check your email");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                ref={emailRef}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute mt-[52px] ml-[250px] text-xl lg:ml-[280px] cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
              <label className="label">
                <a
                  onClick={handleResetPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {loginError && (
            <p className="flex items-center gap-2 justify-center mb-4 text-red-600">
              {loginError} <IoWarning />{" "}
            </p>
          )}

          {successLogin && (
            <p className="flex items-center gap-2 justify-center mb-4 text-green-600">
              {successLogin} <CiCircleCheck></CiCircleCheck>
            </p>
          )}
          <p className="text-center mb-4">
            New to this website?{" "}
            <Link className="text-primary" to="/heroRegister">
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
