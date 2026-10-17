import { useContext, useState } from "react";
import { Badge, Button, Card, Form, ToggleButton } from "react-bootstrap";
import { AuthContext } from "../AuthContext";

export default function DeviceCard({
    device, 
    handleStatusChange, 
    handleAlertChange
}) {
    const handleActivateDeactivate = () => {
        const nextStatus = device.status === 1 ? 0 : 1;
        handleStatusChange(device.id, nextStatus);
    }

    const handleToggleAlert = () => {
        const nextAlert = device.alert === 0 ? 1 : 0;
        handleAlertChange(device.id, nextAlert);
    }

    const token = useContext(AuthContext).token;
    const isAdmin = token === 'admin123';
    // console.log(isAdmin);

    return (
        <Card id="device-card" style={{width: '300px', backgroundColor: '#2d2d30', color: 'white'}}>
            <Card.Body>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <Card.Text className="mb-0"><strong>{device.type}</strong></Card.Text>
                    
                    <Badge 
                        pill 
                        bg={device.status === 1 ? "success" : "danger"} 
                        className="mt-0"
                    >
                        {device.status === 1 ? "Online" : "Offline"}
                    </Badge>
                </div>

                <div className="mt-2 d-flex justify-content-center">
                    {device.type === 'camera' && device.status === 1 ?
                    <div className="position-relative">
                        <Card.Img 
                            src={device.imageURL} 
                            alt={device.type === 'camera' ? device.name : null}
                            // width='350px'
                            style={{objectFit: 'cover'}}
                            // className="object-fit-fill"
                        />

                        <Badge 
                            pill 
                            text="light" 
                            bg=""   // must put like this to bypass, if want to use inline style
                            style={{backgroundColor: 'grey'}}
                            className="position-absolute top-0 start-0 m-2 d-inline-flex align-items-center gap-2 border"
                        >
                            <span
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    backgroundColor: "#00ff5e",
                                    display: "inline-block",
                                }}
                            />
                            LIVE
                        </Badge>
                    </div>

                    : device.type === 'camera' && device.status === 0 ?
                    <Card.Text>CCTV disconnected. Waiting for connection</Card.Text>
                    
                    :
                    <Card.Img 
                        src={device.imageURL} 
                        alt={device.type === 'camera' ? device.name : null}
                        // width='350px'
                        style={{objectFit: 'cover', width: '100px', color: 'white'}}
                        // className="object-fit-fill"
                        
                    />}
                </div>

                <Card.Title className="mt-3"><strong>{device.name}</strong></Card.Title>
                
                <hr />

                <div 
                    className='d-flex align-items-center'
                    style={{justifyContent: device.type !== 'switch' ? 'space-between' : 'center'}}
                >
                    {device.type !== 'switch' && <span><strong>Alert: {device.alert}</strong></span>}
                    
                    {device.type !== 'switch' && 
                    <Form.Check 
                        checked={device.alert} 
                        type="switch" 
                        label={device.alert === 1 ? 'On' : 'Off'} 
                        onChange={handleToggleAlert} 
                    />}
                    
                    {isAdmin && (
                        <Button 
                            variant={device.status === 1 ? 'danger' : 'primary'}
                            onClick={handleActivateDeactivate}
                        >
                            {device.status === 1 ? 'Deactivate' : 'Activate'}
                        </Button>
                    )}

                </div>
            </Card.Body>
        </Card>
    )
}