// import serverRequest from "../axios";
import CONFIG from "../../configuration/ServerConfig";
import serverRequest from "../axios.js/Index";

export default function HomePageServices(){
    function getPlaces(){
        return serverRequest(CONFIG.API.GETPLACES.HEADER.method, {}, CONFIG.API.GETPLACES.PATH);
    }
    function getBuses(obj){
        console.log("Obj",obj)
        return serverRequest(CONFIG.API.GETBUSES.HEADER.method,obj,CONFIG.API.GETBUSES.PATH)
    }
    function getSeats(obj){
        return serverRequest(CONFIG.API.GETSEATS.HEADER.method,obj,CONFIG.API.GETSEATS.PATH)
    }
    return Object.freeze({
        getPlaces,
        getBuses,
        getSeats
    })
}