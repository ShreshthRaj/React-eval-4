import { useReducer } from "react";
import { createContext } from "react";
import { initialState, reducer } from "./Reducer";
//We Create AuthContext Variable iN Seperate Component
export const Authcontext = createContext(null);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);
  return (
    <Authcontext.Provider value={{ state, dispatch }}>
      {children}
    </Authcontext.Provider>
  );
};
export default AuthProvider;
