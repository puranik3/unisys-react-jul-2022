import { getByText, render, screen } from "@testing-library/react";
import WorkshopsList from "./";
import AllProviders from '../../../test-utils/AllProviders';
import server from '../../../mocks/server';
import { errorHandlers } from "../../../mocks/handlers";

import workshops from '../../../mocks/data/workshops.json';

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

    test( 'shows the workshops after they are fetched on load', async () => {
        render(
            <AllProviders>
                <WorkshopsList />
            </AllProviders>
        );

        const workshopsPage1 = workshops.slice( 0, 10 );

        for( let i = 0; i < workshopsPage1.length; i++ ) {
            // we use findBy*() methods when we expect the element to be matched in the near future
            // It will keep polling for 1 second (by default) to check if the element appears, after which it throws an error (test also fails)
            const workshopCardTitle = await screen.findByText( workshops[i].name )
            expect( workshopCardTitle ).toHaveTextContent( workshops[i].name );
        }
    });

    test( 'shows an error message when the component is unable to fetch the workshops', async () => {
        server.use( ...errorHandlers );

        render(
            <AllProviders>
                <WorkshopsList />
            </AllProviders>
        );

        const errorMessageEl = await screen.findByText( 'Request failed with status code 500' );
        expect( errorMessageEl ).toBeInTheDocument();
    });
});