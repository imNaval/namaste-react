import { useNavigate, useRouteError } from "react-router-dom"
import logo from "../utils/images/logo.png"

const Error = () =>{
    const navigate = useNavigate();
    const err = useRouteError();
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
            <img
              src={logo}
              alt="App Logo"
              className="mx-auto mb-8 cursor-pointer"
              onClick={()=> navigate("/")}
            />
            <h1 className="text-2xl font-semibold text-red-500 mb-4">Oops! Something went wrong</h1>
            <h3 className="text-4xl font-bold text-red-500 mb-4">{err.status} : {err.statusText}</h3>
            <p className="text-gray-700 text-lg">We're sorry, but an unexpected error occurred. Please try again later.</p>
          </div>
        </div>
      );
}

export default Error