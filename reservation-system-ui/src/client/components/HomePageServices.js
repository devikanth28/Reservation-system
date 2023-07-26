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
    function getAllBuses(){
        return serverRequest(CONFIG.API.GETALLBUSES.HEADER.method, {}, CONFIG.API.GETALLBUSES.PATH)
    }
    function setUpdateDetails(obj){
        return serverRequest(CONFIG.API.SETUPDATEBUSDETAILS.HEADER.method,obj,CONFIG.API.SETUPDATEBUSDETAILS.PATH)
    }
    function getUSerDetails(obj){
        return serverRequest(CONFIG.API.GETUSERDETAILS.HEADER.method,obj,CONFIG.API.GETUSERDETAILS.PATH)
    }
    function createUser(obj){
        return serverRequest(CONFIG.API.CREATEUSER.HEADER.method,obj,CONFIG.API.CREATEUSER.PATH)
    }
    function getLogin(obj){
        return serverRequest(CONFIG.API.GETlOGIN.HEADER.method,obj,CONFIG.API.GETlOGIN.PATH)
    }
    function getBookSeats(obj){
        return serverRequest(CONFIG.API.GETBOOKSEATS.HEADER.method,obj,CONFIG.API.GETBOOKSEATS.PATH)
    }
    return Object.freeze({
        getPlaces,
        getBuses,
        getSeats,
        getAllBuses,
        setUpdateDetails,
        getUSerDetails,
        createUser,
        getLogin,
        getBookSeats
    })
}