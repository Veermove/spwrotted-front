import './App.css';

import { AuthProvider } from "./context/AuthContext";
import { Container } from "react-bootstrap";
import PageSpanner from './components/PageSpanner';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainColumn } from './components/Dashboard/MainColumn';
import PageMissing from './components/common/PageMissing';
import { YourProfile } from './components/user/YourProfile';
import { MenageUsers } from './components/user/MenageUsers';

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
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<PageSpanner />}>
                                <Route index element={<MainColumn />} />
                                <Route path="profile" element={<YourProfile />} />
                                <Route path="manageusers" element={<MenageUsers />} />
                                <Route path="*" element={<PageMissing />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </Container>
        </QueryClientProvider>
        </>
        );
}

export default App;
