import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AllProviders from './test-utils/AllProviders';

test( 'should render', () => {
    // since Menu renders NavLink, and NavLink needs BrowserRouter somewhere above in the component hierarchy, we enclose the App compoenent in BrowserRouter

    // ALternative way to pass the component as a prop, instead of he "children prop"
    // <AllProviders Component={App}>
    render(
        <AllProviders>
            <App />
        </AllProviders>
    );

    const app = screen.getByTitle( /Workshops App/i );

    // if you want to print out the dom yourself, you can do this
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
    
    expect( app ).toBeInTheDocument();
});