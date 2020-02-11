import * as React from 'react';
import Header from './Header';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import API from './API';
import Loader from './Loader';
import AlertDismissible from './DisplayAlert';

class AddUser extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            email: '',
            gender: '',
            dob: '',
            ssn: '',
            smoker: false,
            allergies: '',
            medical: '',
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
        // const response = await API.put('http://www.mocky.io/v2/5e41323b2f0000c92a5832a7', requestBody)
        const response = await API.get('http://localhost:8080/rest/users', requestBody)
            .then(resp => {
                return resp.data;
            }).catch(error => {
                return 'error';
            });
        console.log('response ', response);

        let alertDisplay = undefined;
        if (response.status == 200) {
            alertDisplay = {
                status: 'success',
                heading: 'Alert',
                content: `${response.results.policy_id} is the policy number`,
            }
        } else {
            alertDisplay = {
                status: 'danger',
                heading: 'Alert',
                content: 'Unable to save user details',
            }
        }

        this.setState({
            fName: '',
            lName: '',
            email: '',
            gender: '',
            dob: '',
            ssn: '',
            smoker: false,
            allergies: '',
            medical: '',
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
                {this.state.inProcess && <Loader message={'Saving user information'} />}
                {this.state.alertDisplay && <AlertDismissible {...this.state.alertDisplay} />}
                <br />
                <Card>
                    <Card.Header>
                        Add User Information
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridfName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="fName" placeholder="Enter First Name" value={this.state.fName} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridlName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="lName" placeholder="Enter Last Name" value={this.state.lName} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridlEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="email" placeholder="Enter Email address" value={this.state.email} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control as="select" name="gender" value={this.state.gender} onChange={this.handleInputChange} >
                                        <option>Choose...</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridbod">
                                    <Form.Label>Date Of Birth</Form.Label>
                                    <Form.Control type="text" name="dob" placeholder="Enter Date of Birth mm/dd/yyyy" value={this.state.dob} onChange={this.handleInputChange} />
                                    {/* <ControlLabel>Label</ControlLabel>
                                        <DatePicker id="dob" /> */}
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridlSSN">
                                    <Form.Label>Social Security Number</Form.Label>
                                    <Form.Control type="text" name="ssn" placeholder="Enter Social Security Number" value={this.state.ssn} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Card.Body>
                </Card>
                <br />
                <Card>
                    <Card.Header>
                        Health Information
                            </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Row>
                                <Form.Check
                                    type="switch"
                                    id="smoker"
                                    label="Smoker"
                                    value={this.state.smoker}
                                    name="smoker"
                                    onChange={this.handleInputChange} />
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAllergies">
                                    <Form.Label>Allergies</Form.Label>
                                    <Form.Control as="textarea" name="allergies" rows="3" value={this.state.allergies} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridMedicalCondition">
                                    <Form.Label>Medical Conditions</Form.Label>
                                    <Form.Control as="textarea" name="medical" rows="3" value={this.state.medical} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Form.Row>
                            <Button variant="primary" onClick={this.handleSubmit}>Save User</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Header>
        );
    }
}


export default AddUser;