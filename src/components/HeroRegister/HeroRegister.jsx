import {createUserWithEmailAndPassword} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import {useState} from "react";

const HeroRegister = () => {
  const [success, setSuccess] = useState("");
  const [regError, setRegError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("form submitted");
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    // check password character
    if (password.length < 8) {
      setRegError("Password Should be at least 8 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegError("Your password should have at least one uppercase character");
    }

    // reset error
    setSuccess("");
    setRegError("");
    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setSuccess("User Created Successfully");
      })
      .catch((error) => {
        console.error(error);
        setRegError(error.message);
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRegister;
