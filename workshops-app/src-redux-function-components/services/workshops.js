import axios from 'axios';

// Webpack substitutes the variable with its value during the build and serve process
const baseUrl = process.env.REACT_APP_BASE_URL;

// const getWorkshops = () => {
//     // axios.get() etc. return a JS "Promise" object. We call the then() method the promise, and pass a function. This function executes when the promise "resolves" (i.e. the backend returns the data)
//     return axios
//             .get( `${baseUrl}/workshops` )
//             .then( response => response.data );
// };

const getWorkshops = async () => {
    const response = await axios.get( `${baseUrl}/workshops` );
    return response.data;
};

// gets the workshops for page number passed
const getWorkshopsForPage = async ( page ) => {
    const response = await axios.get( `${baseUrl}/workshops`, {
        params: {
            _page: page
        }
    });
    return response.data;
};

const getWorkshopById = async ( id ) => {
    const response = await axios.get( `${baseUrl}/workshops/${id}` );
    return response.data;
};

export {
    getWorkshops,
    getWorkshopsForPage,
    getWorkshopById
};