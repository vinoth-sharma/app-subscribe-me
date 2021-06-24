import "./main.scss";
import CustomizedSteppers from "../stepper/stepper";
import { getPriceInfo } from "../../service/global.service";
import React, { useEffect } from "react";

export function MainContainer(){
    const [loading,setLoading] = React.useState(true);
    const [msg,setMsg] = React.useState("Loading...");

    useEffect(() => {
       getPriceInfo().then(res=>{
           if(res) setLoading(false);
           else setMsg("Server Error")
       })
    }, [])

    return(
        <main>
            <div className="main-content">
                { loading?<div className="loader">{msg}</div>:   <CustomizedSteppers /> }
            </div>
        </main>
    )
}

export default MainContainer;