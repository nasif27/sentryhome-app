import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const setToken = useContext(AuthContext).setToken;
    const setIsLoggedIn = useContext(AuthContext).setIsLoggedIn;

    const incorrectCredentialTxt = useContext(AuthContext).incorrectCredentialTxt;
    const setIncorrectCredentialTxt = useContext(AuthContext).setIncorrectCredentialTxt;
    
    const isAdmin = username === "sif123@abc.com" && password === "qwe123";
    const isGuest = username === "zxc@abc.com" && password === "asd123";
    
    const login = (e) => {
        if (isAdmin) {
            e.preventDefault();
            setIsLoggedIn(true);
            setToken('admin123');
            setIncorrectCredentialTxt('');
            navigate("/dashboard");
        } else if (isGuest) {
            e.preventDefault();
            setIsLoggedIn(true);
            setToken('guest123');
            setIncorrectCredentialTxt('');
            navigate("/dashboard");
        } else {
            e.preventDefault();
            // setIsLoggedIn(false);
            setUsername('');
            setPassword('');
            setIncorrectCredentialTxt('Invalid credentials');
        }
    }

    return (
        <Container
            className="mt-5" 
            // className="d-flex flex-column justify-content-center"
            // className="d-flex flex-column justify-content-center align-items-center align-content-center"
            // style={{
            //     borderRadius: '20px',
            //     width: "100%",
            //     maxWidth: "500px",
            //     margin: "0 auto",
            //     backgroundColor: 'grey',
            //     color: 'white'
            // }}
        >
            <div className="d-flex justify-content-center px-3">
                <Form
                    className="d-flex flex-column w-100 px-3 px-sm-5 py-5"
                    style={{
                        borderRadius: '20px',
                        maxWidth: "500px",
                        backgroundColor: 'grey',
                        color: 'white'
                    }} 
                    onSubmit={login}
                >
                    <h1 className="mb-4">Login to your account</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <Form.Text className="text-white">
                            We&apos;ll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {incorrectCredentialTxt !== '' && <Form.Text style={{color: 'white'}}>{incorrectCredentialTxt}</Form.Text>}

                    <Button className="mt-3" type="submit" variant="primary">Login</Button>
                </Form>
            </div>

            <Row 
                className="text-white d-flex justify-content-center align-items-center mt-5 mb-5 pt-3"
                style={{border: '1px solid white', width: "100%", maxWidth: "500px", margin: "0 auto",}}
            >
                <Col>
                    <p><strong>Admin</strong></p>
                    <p>username = sif123@abc.com</p>
                    <p>password = qwe123</p>
                </Col>

                <Col>
                    <p><strong>Guest</strong></p>
                    <p>username = zxc@abc.com</p>
                    <p>password = asd123</p>
                </Col>
            </Row>
        </Container>
    );
}