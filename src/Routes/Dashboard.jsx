import { useContext, useEffect,useState } from "react";
import { Authcontext } from "../context/AppContext";
import { ACTION_TYPE } from "../context/ActionCreators";
import { useSearchParams } from "react-router-dom";

const getCurrentPageFromUrl = (value) => {
  value = Number(value);
  if (typeof value === "number" && value <= 0) {
    value = 1;
  }
  if (!value) {
    value = 1;
  }
  return value;
};

function Dashboard() {
  const { state, dispatch } = useContext(Authcontext);
  const [searchParams, setSearchParams] = useSearchParams();
  //Define function/pass searchparamvalue as argu/return value assign
  const initialPage = getCurrentPageFromUrl(searchParams.get("page"));
  //setting default page state getting from url
   const [page, setPage] = useState(initialPage);
  const {data,totalPages} = (state.data);
  console.log(`dashPages:`,totalPages);
  
  useEffect(() => {
    dispatch({ type: ACTION_TYPE.GET_PRODUCTS_REQUEST });
    fetch(
      `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?_limit=10&_page=${page}`
    )
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: ACTION_TYPE.GET_PRODUCTS_SUCCESS, payload: response });
      })
      .catch((err) => {
        dispatch({ type: ACTION_TYPE.GET_PRODUCTS_FAILURE });
      });
  }, [page]);
  useEffect(()=>
  {
      //Setting a paramster as an Object
      setSearchParams({page});
     
  },[page])
  return (
    <div>
      <h3>Dashboard</h3>
      <div>
        <p>
          Token:
          <b data-testid="user-token">{state.token}</b>
        </p>
      </div>
      <div>
      {data && data.map((elem) => 
       (
          <div
            key={elem.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
          <img src={elem.image} alt="prof-pic" />
            <h3>Title : {elem.title}</h3>
             <h3>Category : {elem.category}</h3>
              <h3>Price : {elem.price}</h3>
          </div>
        ))}
    </div>
    <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        PREV
      </button>
      <button>{page}</button>
      <button disabled={page >= 2} onClick={() => setPage(page + 1)}>
        NEXT
      </button>
    </div>
  );
}
export default Dashboard;
