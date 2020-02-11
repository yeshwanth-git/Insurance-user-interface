import * as React from 'react';
import Header from './Header';
import API from './API';
import Loader from './Loader';
import AlertDismissible from './DisplayAlert';
import Table from 'react-bootstrap/Table'

class Users extends React.PureComponent {

    async componentDidMount() {
        this.setState({
            inProcess: true,
        });

        const response = await API.put('http://www.mocky.io/v2/5e4143392f00006d0058333f')
            .then(resp => {
                return resp.data;
            }).catch(error => {
                return 'error';
            });
        console.log('response ', response);

        let alertDisplay = undefined;
        let userInfo = [];
        if (response.status == 200) {
            userInfo = response.results.users;
        } else {
            alertDisplay = {
                status: 'danger',
                heading: 'Alert',
                content: 'Unable to retrieve users',
            }
        }
        this.setState({
            userInfo,
            inProcess: false,
            alertDisplay,
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            userInfo: [],
            alertDisplay: undefined,
            inProcess: false,
        }
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
                {this.state.inProcess && <Loader message={'Fetching users'} />}
                {this.state.alertDisplay && <AlertDismissible {...this.state.alertDisplay} />}
                <br />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Date Of Birth</th>
                            <th>Email</th>
                            <th>SSN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userInfo.map(e => {
                            return (
                                <tr>
                                    <td>{e.fName}</td>
                                    <td>{e.lName}</td>
                                    <td>{e.gender}</td>
                                    <td>{e.email}</td>
                                    <td>{e.dob}</td>
                                    <td>{e.ssn}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <br />
            </Header>
        );
    }
}


export default Users;