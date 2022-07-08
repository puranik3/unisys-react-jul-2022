import '@testing-library/jest-dom';
import server from './mocks/server';

// runs before the first test in a test file runs
beforeAll( () => server.listen() );

// runs after each test in a test file runs
afterEach( () => server.resetHandlers() );

// runs after the last test in a test file runs
afterAll( () => server.close() );