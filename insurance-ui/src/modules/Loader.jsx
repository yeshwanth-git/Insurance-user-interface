import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner'

const Loader = (props) => {
    return (
        <Spinner animation="border" role="status">
            <span className="sr-only">{props.message}</span>
        </Spinner>
    );
}

export default Loader;