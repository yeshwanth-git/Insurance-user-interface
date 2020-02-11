import * as React from 'react';
import Header from './Header';
import API from './API';
import Loader from './Loader';
import AlertDismissible from './DisplayAlert';
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class InsuranceEvents extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            uID: '',
            alertDisplay: undefined,
            inProcess: false,
            userEventsInfo: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    async handleSearch(event) {
        this.setState({
            inProcess: true,
        });

        debugger;
        event.preventDefault();
        const uID = this.state.uID;
        const response = await API.put('http://www.mocky.io/v2/5e414f8d2f000058005833e2?' + uID)
            .then(resp => {
                return resp.data;
            }).catch(error => {
                return 'error';
            });
        console.log('response ', response);

        let alertDisplay = undefined;
        let userEventsInfo = [];
        if (response.status == 200) {
            userEventsInfo = response.results.userEvents;
        } else {
            alertDisplay = {
                status: 'danger',
                heading: 'Alert',
                content: 'Unable to retrieve user events',
            }
        }

        this.setState({
            uID,
            alertDisplay,
            inProcess: false,
            userEventsInfo,
        })
    }

    render() {
        return (
            <Header>
                <br />
                {this.state.inProcess && <Loader message={'Retrieving user insurance events'} />}
                {this.state.alertDisplay && <AlertDismissible {...this.state.alertDisplay} />}
                <br />
                <Card>
                    <Card.Header>
                        Search by User Identifier
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGriduID">
                                    <Form.Label>User Identifier</Form.Label>
                                    <Form.Control type="text" name="uID" placeholder="Enter User Identifier" value={this.state.uID} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Button variant="primary" onClick={this.handleSearch} size="sm">Search</Button>
                            </Form.Row>
                        </Form>
                    </Card.Body>
                </Card>
                <br />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Date of Incidence</th>
                            <th>Type Of Issue</th>
                            <th>Billed Amount</th>
                            <th>Covered Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userEventsInfo.map(e => {
                            return (
                                <tr>
                                    <td>{e.doi}</td>
                                    <td>{e.toi}</td>
                                    <td>{e.ba}</td>
                                    <td>{e.ca}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Header>
        );
    }
}


export default InsuranceEvents;