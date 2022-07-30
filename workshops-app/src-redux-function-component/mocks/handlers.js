import { rest } from 'msw';
import workshops from './data/workshops.json';

const baseUrl = process.env.REACT_APP_BASE_URL;

const handlers = [
    rest.get( `${baseUrl}/workshops`, ( req, res, ctx ) => {
        const _page = req.url.searchParams.get( '_page' );

        if( _page === 1 ) {
            return res(
                ctx.status( 200 ), // not needed really - is the default
                ctx.json( workshops.slice( 0, 10 ) )
            );
        }
        
        if( _page === 2 ) {
            return res(
                ctx.status( 200 ), // not needed really - is the default
                ctx.json( workshops.slice( 10, 20 ) )
            );
        }

        return res(
            ctx.status( 200 ), // not needed really - is the default
            ctx.json( workshops )
        );
    })
];

const errorHandlers = [
    rest.get( `${baseUrl}/workshops`, ( req, res, ctx ) => {
        return res(
            ctx.status( 500 ),
            ctx.json( null )
        );
    })
];

export {
    handlers,
    errorHandlers
};