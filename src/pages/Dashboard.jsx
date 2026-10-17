import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import devices from "../data/devices.json"
import DeviceCard from "../components/DeviceCard";
import { useState } from "react";

export default function Dashboard() {
    const [filter, setFilter] = useState(null);
    const [deviceList, setDeviceList] = useState(devices);

    const totalOnline = deviceList.filter((device) => device.status === 1).length;
    const totalOffline = deviceList.filter((device) => device.status === 0).length;
    const totalAlert = deviceList.filter((device) => device.alert === 1).length;
    // console.log(filter);

    const handleStatusChange = (id, status) => {
        setDeviceList(deviceList.map(
            device => device.id === id ? {...device, status} : device
        ));
    };

    const handleAlertChange = (id, alert) => {
        setDeviceList(deviceList.map(
            device => device.id === id ? {...device, alert} : device
        ));
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center gap-5 mt-5">
            {/* <h1>Dashboard</h1> */}

            <div className="d-flex gap-2">
                <Card 
                    style={{border: filter === 1 ? '1px solid #00ff5e' : '', backgroundColor: '#2d2d30', color: 'white'}}
                    // onClick={() => setFilterStatus(1)}
                    onClick={() => setFilter(1)}
                >
                    <Card.Body>
                        <Row className="d-flex gap-5">
                            <Col>
                                <Card.Text>Active Devices</Card.Text>
                                <Card.Title className="fs-1">{totalOnline}</Card.Title>
                                <Card.Subtitle>Online</Card.Subtitle>
                            </Col>
                            <Col className="d-flex justify-content-end align-items-center">
                                <i className="bi bi-wifi fs-1"></i>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            

                <Card 
                    style={{border: filter === 0 ? '1px solid red' : '', backgroundColor: '#2d2d30', color: 'white'}}
                    onClick={() => setFilter(0)}
                >
                    <Card.Body>
                        <Row className="d-flex gap-5">
                            <Col>
                                <Card.Text>Inactive Devices</Card.Text>
                                <Card.Title className="fs-1">{totalOffline}</Card.Title>
                                <Card.Subtitle >Offline</Card.Subtitle>
                            </Col>
                            <Col className="d-flex justify-content-end align-items-center">
                                <i className="bi bi-wifi-off fs-1"></i>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <Card 
                    style={{border: filter === 'alert' ? '1px solid yellow' : '', backgroundColor: '#2d2d30', color: 'white'}}
                    onClick={() => setFilter('alert')}
                >
                    <Card.Body>
                        <Row className="d-flex gap-5">
                            <Col>
                                <Card.Text>Warning</Card.Text>
                                <Card.Title className="fs-1">{totalAlert}</Card.Title>
                                <Card.Subtitle >Alerts</Card.Subtitle>
                            </Col>
                            <Col className="d-flex justify-content-end align-items-center">
                                <i className="bi bi-exclamation-triangle fs-1"></i>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>

            <Nav variant="pills" defaultActiveKey="link-1" className="border rounded-3 p-1">
                <Nav.Item 
                    onClick={() => setFilter(null)}
                >
                    <Nav.Link eventKey="link-1">All</Nav.Link>
                </Nav.Item>

                <Nav.Item 
                    onClick={() => setFilter('camera')}
                >
                    <Nav.Link eventKey="link-2">Camera</Nav.Link>
                </Nav.Item>

                <Nav.Item 
                    onClick={() => setFilter('sensor')}
                >
                    <Nav.Link eventKey="link-3">Sensor</Nav.Link>
                </Nav.Item>

                <Nav.Item 
                    onClick={() => setFilter('switch')}
                >
                    <Nav.Link eventKey="link-4">
                        Switch
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <div className="d-flex flex-wrap gap-3 justify-content-center align-content-center">
                {deviceList.map((device) => 
                    filter === null ? (<DeviceCard key={device.id} device={device} handleStatusChange={handleStatusChange} handleAlertChange={handleAlertChange} />)
                    : device.type === filter ? (<DeviceCard key={device.id} device={device} handleStatusChange={handleStatusChange} handleAlertChange={handleAlertChange} />)
                    : device.status === filter ? (<DeviceCard key={device.id} device={device} handleStatusChange={handleStatusChange} handleAlertChange={handleAlertChange} />)
                    : device.alert === 1 && filter === 'alert' ? (<DeviceCard key={device.id} device={device} handleStatusChange={handleStatusChange} handleAlertChange={handleAlertChange} />)
                    : null
                )}
            </div>
        </Container>
    );
}