import { Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="home-page">
            <Container className="d-flex flex-column justify-content-center align-items-center gap-5 text-white">
                <h1 className="mt-5">Welcome to SentryHome</h1>
                <h6>Your home monitoring dashboard app</h6>
                
                <Image 
                    src="/SentryHome-button.png" 
                    alt="SentryHome button"
                    style={{width: '200px'}} 
                    id="sentryhome-btn"
                    onClick={() => navigate("/dashboard")}
                />
                
            </Container>
        </div>
    );
}