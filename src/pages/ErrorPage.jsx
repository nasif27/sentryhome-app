import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center gap-5 text-white">
            <h1 className="mt-5">Page not found</h1>
            <p>Why break the website</p>
            <i className="bi bi-emoji-frown mt" style={{fontSize: '100px'}}></i>
            <Button 
                onClick={() => navigate("/")}
            >
                Back to home <i className="bi bi-house-fill"></i>
            </Button>
        </Container>
    );
}