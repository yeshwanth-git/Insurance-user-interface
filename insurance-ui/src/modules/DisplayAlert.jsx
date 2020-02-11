import * as React from 'react';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissible(props) {
    const [show, setShow] = useState(true);

    return (
        <>
            <Alert show={show} variant={props.status}>
                <Alert.Heading>{props.heading}</Alert.Heading>
                <p>
                    {props.content}
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant={`outline-${props.status}`}>
                        Close
            </Button>
                </div>
            </Alert>
        </>
    );
}

export default AlertDismissible;
