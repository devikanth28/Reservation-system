const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH'
};
const API_URL="http://localhost:8081/";
const CONTENT_TYPE = {
    JSON: 'application/json; charset=utf-8'
};

const CONFIG = {
    REDIRECT_HOME_URL: process.env.API_URL,
    API:{
        GETPLACES:{
            PATH:API_URL+'getPlaces',
            HEADER: {
                method: REQUEST_TYPE.GET,
                // contentType: CONTENT_TYPE.JSON
            }
        },
        GETBUSES:{
            PATH:API_URL+'getBuses',
            HEADER:{
                method:REQUEST_TYPE.GET,
            }
        },
        GETSEATS:{
            PATH:API_URL+'getSeats',
            HEADER:{
                method:REQUEST_TYPE.GET
            }
        },
        GETALLBUSES:{
            PATH:API_URL+'getAllBuses',
            HEADER:{
                method:REQUEST_TYPE.GET
            }
        },
        SETUPDATEBUSDETAILS:{
            PATH:API_URL+'updateBusDetails',
            HEADER:{
                method:REQUEST_TYPE.POST
            }
        },
        GETUSERDETAILS:{
            PATH:API_URL+'getUserDetails',
            HEADER:{
                method:REQUEST_TYPE.GET
            }
        },
        CREATEUSER:{
            PATH:API_URL+'createUser',
            HEADER:{
                method:REQUEST_TYPE.POST
            }
        },
        GETlOGIN:{
            PATH:API_URL+'getLogin',
            HEADER:{
                method:REQUEST_TYPE.GET
            }
        },
        GETBOOKSEATS:{
            PATH:API_URL+'getBookSeats',
            HEADER:{
                method:REQUEST_TYPE.GET
            }
        }
    }
}
export default CONFIG;