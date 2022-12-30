import './App.css';

import { AuthProvider } from "./context/AuthContext";
import { Container } from "react-bootstrap";
import PageSpanner from './components/PageSpanner';

function App() {
  /*________________________
    |SPWR                  |
    |______________________|
    |    Posts     | L   I |
    |    Posts     | O - N |
    |    Posts     | G     |
    |    Posts     |       |
    |    Posts     |       |
    |    Posts     |       |
    |    Posts     |       |
    |    Posts     |       |
    */
    return (
        <>
        <Container fluid>
        <AuthProvider>
            <PageSpanner />
        </AuthProvider>
        </Container>
        </>
        );
}

export default App;
