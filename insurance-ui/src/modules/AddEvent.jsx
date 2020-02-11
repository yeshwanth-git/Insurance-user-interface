import * as React from 'react';
import Header from './Header';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import API from './API';
import Loader from './Loader';
import AlertDismissible from './DisplayAlert';

class AddEvent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            uID: '',
            dateOfIssue: '',
            timeOfIssue: '',
            billedAmount: '',
            coveredAmount: '',
            alertDisplay: undefined,
            inProcess: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        this.setState({
            inProcess: true,
        });

        debugger;
        event.preventDefault();
        const requestBody = { ...this.state };
        console.log('requestBody ', requestBody);
        // const response = await API.put('http://www.mocky.io/v2/5e413c042f0000cb545832fd', requestBody)
        const response = await API.post('http://localhost:8080/rest/events', requestBody)
            .then(resp => {
                return resp.data;
            }).catch(error => {
                return 'error';
            });
        console.log('response ', response);

        let alertDisplay = undefined;
        if (response.status == 201) {
            alertDisplay = {
                status: 'success',
                heading: 'Alert',
                content: `User insurance event added successfully`,
            }
        } else {
            alertDisplay = {
                status: 'danger',
                heading: 'Alert',
                content: 'Unable to add user insurance event',
            }
        }

        this.setState({
            uID: '',
            dateOfIssue: '',
            timeOfIssue: '',
            billedAmount: '',
            coveredAmount: '',
            alertDisplay,
            inProcess: false,
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    render() {
        return (
            <Header>
                <br />
                {this.state.inProcess && <Loader message={'Saving Insurance Event'} />}
                {this.state.alertDisplay && <AlertDismissible {...this.state.alertDisplay} />}
                <br />
                <Card>
                    <Card.Header>
                        Add User Insurance Event
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGriduID">
                                    <Form.Label>Unique Identifier</Form.Label>
                                    <Form.Control type="text" name="uID" placeholder="Enter Unique Identifier" value={this.state.uID} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDateOfIssue">
                                    <Form.Label>Date of Issue</Form.Label>
                                    <Form.Control type="text" name="dateOfIssue" placeholder="Enter Date Of Issue mm/dd/yyyy" value={this.state.dateOfIssue} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formTimeOfIssue">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="timeOfIssue" placeholder="Time of Issue" value={this.state.timeOfIssue} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridlBilledAmount">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="billedAmount" placeholder="Enter Billed Amount" value={this.state.billedAmount} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridlCoveredAmount">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="coveredAmount" placeholder="Enter Billed Amount" value={this.state.coveredAmount} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridl">

                                </Form.Group>
                            </Form.Row>
                        </Form>
                        <Button variant="primary" onClick={this.handleSubmit}>Save Details</Button>
                    </Card.Body>
                </Card>
                <br />
            </Header>
        );
    }
}

export default AddEvent;