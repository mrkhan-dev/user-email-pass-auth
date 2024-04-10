import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import {useState} from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";

const HeroRegister = () => {
  const [success, setSuccess] = useState("");
  const [regError, setRegError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("form submitted");
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password);
    // check password character
    if (password.length < 8) {
      setRegError("Password Should be at least 8 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegError("Your password should have at least one uppercase character");
      return;
    } else if (!terms) {
      setRegError("please accept our terms & conditions");
      return;
    }

    // reset error
    setSuccess("");
    setRegError("");
    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setSuccess("Register Successful");

        // send verification email
        sendEmailVerification(result.user).then(() => {
          toast.success("OTP sent successful");
        });
      })
      .catch((error) => {
        console.error(error);
        // setRegError(error.message);
        setRegError("This account already exist ");
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
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
                <div className="mt-4 px-1">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    name="terms"
                    id=""
                  />
                  <label className="ml-2" htmlFor="terms">
                    Accept our <a href="#">Terms and conditions</a>
                  </label>
                </div>
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
            {regError && (
              <p className="mb-4 mx-4 flex justify-center text-red-600">
                {regError}
              </p>
            )}
            {success && (
              <p className="mb-4 mx-4 flex justify-center text-green-600">
                {success}
              </p>
            )}
            <p className="text-center mb-4">
              Already have an account?{" "}
              <Link className="text-primary" to="/login">
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRegister;
