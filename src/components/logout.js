import {useNavigate} from "react-router-dom";

function Logout(){
    const history=useNavigate()
    localStorage.clear()
    history("/")
}
export default Logout;