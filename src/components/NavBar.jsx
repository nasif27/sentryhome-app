import { useContext } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function NavBar() {
    const setToken = useContext(AuthContext).setToken;
    const setIsLoggedIn = useContext(AuthContext).setIsLoggedIn;
    const navigate = useNavigate();
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        setToken('');
    }

    return (
        <>
            <Navbar className="bg-dark">
                <Container>
                    <Navbar.Brand 
                        className="text-white d-flex gap-2" 
                        onClick={() => navigate("/")}
                    >
                        <img
                            alt="sentryhome logo"
                            src="/SentryHome-logo2.png"
                            width="30"
                            height="30"
                            // className="d-inline-block align-top"
                        />
                        <strong>SentryHome</strong>
                    </Navbar.Brand>
                    
                    <Button
                        variant="danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Container>
            </Navbar>

            <Container>
                <Outlet />
            </Container>
        </>
    );
}