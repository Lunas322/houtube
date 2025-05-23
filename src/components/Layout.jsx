import { Outlet } from "react-router-dom";
import Header from "./Header";

function LayOut () {
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
} 

export default LayOut