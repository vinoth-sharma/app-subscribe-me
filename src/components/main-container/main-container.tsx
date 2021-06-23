import "./main.scss";
import CustomizedSteppers from "../stepper/stepper";

export function MainContainer(){


    return(
        <main>
            <div className="main-content">
            <CustomizedSteppers />
            </div>
        </main>
    )
}

export default MainContainer;