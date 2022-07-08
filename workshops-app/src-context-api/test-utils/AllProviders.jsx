import { BrowserRouter } from "react-router-dom";

const AllProviders = ( { children } ) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
};

export default AllProviders;