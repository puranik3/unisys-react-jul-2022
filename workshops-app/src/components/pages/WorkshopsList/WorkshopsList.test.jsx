import { render, screen } from "@testing-library/react";
import WorkshopsList from "./";
import AllProviders from '../../../test-utils/AllProviders';

// "test suite" (group of tests)
describe( 'loading tests', () => {
    test( 'loading messsage shows up on load', () => {
        render(
            <AllProviders>
                <WorkshopsList />
            </AllProviders>
        );

        const loadingEl = screen.getByRole( "status", { name: /Loading list of workshops/i } );
        // const loadingEl = screen.getByText( /Loading/i );
        
        expect( loadingEl ).toBeInTheDocument();
    });
});