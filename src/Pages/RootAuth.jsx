import { logo } from "../Asset"
import { Outlet } from "react-router-dom"
const RootAuth = () => {
  return (
    <>
    <header>
      <img src={logo} alt="" className="w-36 m-20 "/>

    </header>
    <main>
      <Outlet></Outlet>
    </main>
    </>
  )
}

export default RootAuth
