import { setupServer } from 'msw/node';
import { handlers } from './handlers';

const server = setupServer( ...handlers ); // spread operator comma-separates the items in the handlers array

export default server;