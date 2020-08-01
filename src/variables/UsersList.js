import React, {Component} from 'react';
import Card from "../components/cards/Card";
import {getUsers} from "../apis/dataApi";
import animLoading from "../assets/img/animLoading.gif"
import Swal from "sweetalert2";

class UsersList extends Component {

    state = {
        usersData: [],
        isLoaded: false
    }

    getUsersData = () => {
        getUsers()
            .then((usersData) => {
                this.setState({
                    isLoaded: true,
                    usersData,
                });
            })
            .catch((e) => {
                Swal.fire("Oops", "Connection Timeout !!!", "error")
            });
    };

    componentDidMount() {
        this.getUsersData()
    };

    render() {
        return (
            <div className="row justify-content-md-center">
                {this.state.isLoaded ?
                    this.state.usersData.map(user =>
                        <Card
                            dataId={user.id}
                            dataImg={user.picture}
                            dataTitleName={user.title}
                            dataTitle={user.firstName + " " + user.lastName}
                            dataText={user.email}
                            dataLink={user.id}
                        />
                    ) : <img src={animLoading} alt="loading"/>}
            </div>
        );
    }
}

export default UsersList;