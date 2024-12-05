import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

const Toastify = ({ value }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (value) {
            setShow(true)
        }
    }, [value])

    return (
        <Row>
            <Col xs={12}>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Welcome</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                </Toast>
            </Col>
            {/* <Col xs={6}>
                {value && <Button onClick={() => setShow(true)}>Show Toast</Button>}
            </Col> */}
        </Row>
    );
};

export default Toastify;