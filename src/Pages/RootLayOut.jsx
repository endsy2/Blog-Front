import { NavLink,Outlet, useLocation } from "react-router-dom"
import { logo } from "../Asset"
import { nav_bar } from "../Constants"
import Home from "./Home";


const RootLayOut = () => {

    const location=useLocation();
  return (
    <div className="flex gap-10">
    <header className="flex justify-center p-10 w-[400px] border-r-2 border-b-2 items-center h-full ">
      <nav className="flex flex-col items-center justify-center ">
        <NavLink path='/' element={<Home/>}><img src={logo} alt="logo" className="mb-20 w-40"/></NavLink>
        <div>
          {nav_bar.map(({ img, label ,path}) => (
            <NavLink key={label} to={path} className={`flex justify-center items-center w-30 h-15 my-20  
            border-2 px-20 py-2 text-center rounded-xl hover:bg-lightGray  ${location.pathname === `/${path}` ? 'bg-lightGray' : ''}`}>
                <img src={img} alt={label} />
                <p className="font-Roboto text-primary">{label}</p>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
    <main>
      <Outlet/>
    </main>
    </div>
  )
}

export default RootLayOut
