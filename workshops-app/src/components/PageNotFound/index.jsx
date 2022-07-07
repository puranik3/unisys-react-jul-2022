import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div>
            Sorry, looks like you hit a dead end. You can go <Link to="/">Home</Link> from here.
        </div>
    );
}
 
export default PageNotFound;