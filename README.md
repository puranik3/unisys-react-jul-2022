## References
- [Server](https://workshops-server.herokuapp.com/)
- [Completed app](https://vw-angular.s3.ap-south-1.amazonaws.com/index.html)
- [React bootstrap](https://react-bootstrap.github.io/)

## Breaks
- Tea break (15 minutes) - 10:30 AM, 3:00 PM IST
- Lunch break (45 minutes) - 1:00 PM

## Troubleshooting
- https://stackoverflow.com/questions/61036156/react-typescript-testing-typeerror-mutationobserver-is-not-a-constructor
- npm install -D jest-environment-jsdom-sixteen
//  ...
//   "scripts": {
//     ...
// -   "test": "react-scripts test --env=dom"
// +   "test": "react-scripts test --env=jest-environment-jsdom-sixteen"
//     ...
//   },
//   ...
//   "devDependencies": {
//     ...
//     "jest-environment-jsdom-sixteen": "^1.0.3",
//     ...
//   },
//   ...

- Please try this...
- npm uninstall -g create-react-app
- npx create-react-app workshops-app