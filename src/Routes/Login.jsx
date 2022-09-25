import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../context/AppContext";
import { ACTION_TYPE } from "../context/ActionCreators";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const { dispatch } = useContext(Authcontext);

  console.log(`Email :`, email);
  console.log(`Password :`, password);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: ACTION_TYPE.LOGIN_REQUEST });

    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: ACTION_TYPE.LOGIN_SUCCESS, payload: data.token });
        Navigate("/dashboard");
      })
      .catch((err) => {
        dispatch({ type: ACTION_TYPE.LOGIN_FAILURE });
        console.log(err);
      });
  };
  return (
    <div className="login-page">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
              name="email"
            />
          </label>
        </div>
        <div>
          <label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              name="password"
            />
          </label>
        </div>
        <div>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}
export default Login;
