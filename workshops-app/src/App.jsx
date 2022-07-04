import { Container } from 'react-bootstrap';
import MyHome from './components/pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // JSX is like HTML syntax
  // JSX defines a "React element" - an object which defines the user interface
  return (
    <div id="app" title="Workshops App">
      <Container className="my-4">
        <MyHome></MyHome>
      </Container>
    </div>
  );
}

export default App;
