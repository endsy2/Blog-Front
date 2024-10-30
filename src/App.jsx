import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom";
import RootLayOut from "./Pages/RootLayOut";
import Home from "./Pages/Home";
import RootAuth from "./Pages/RootAuth";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Blog from "./Pages/blog";



const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<RootLayOut/>}>
      <Route index element={<Home/>}/>
      <Route path="/blog/:id" element={<Blog />} />
    </Route>
    <Route path="auth" element={<RootAuth/>}>
      <Route path="register" element={<SignUp/>}/>
      <Route path="login" element={<SignIn/>}/>
    </Route>
  </>
  )
)

const App=()=>{
  return(
    <>
    <RouterProvider router={router}/>
    </>
  )
};
export default App; 