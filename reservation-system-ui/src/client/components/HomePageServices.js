// import serverRequest from "../axios";
import CONFIG from "../../configuration/ServerConfig";
import serverRequest from "../axios.js/Index";

export default function HomePageServices(){
    function getPlaces(){
        return serverRequest(CONFIG.API.GETPLACES.HEADER.method, {}, CONFIG.API.GETPLACES.PATH);
    }
    return Object.freeze({
        getPlaces
    })
}