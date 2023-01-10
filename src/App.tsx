import './App.css';

import { AuthProvider } from "./context/AuthContext";
import { Container } from "react-bootstrap";
import PageSpanner from './components/PageSpanner';
import { QueryClient, QueryClientProvider } from 'react-query';

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

    const queryClient = new QueryClient();
    return (
        <>
        <QueryClientProvider client={queryClient}>
            <Container fluid>
                <AuthProvider>
                    <PageSpanner />
                </AuthProvider>
            </Container>
        </QueryClientProvider>
        </>
        );
}

export default App;
