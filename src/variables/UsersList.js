import React, {Component} from 'react';
import Card from "../components/cards/Card";
import {getUsers} from "../apis/dataApi";
import animLoading from "../assets/img/animLoading.gif"
import Swal from "sweetalert2";
import {connect} from "react-redux";

class UsersList extends Component {

    state = {
        isLoaded: false
    }

    getUsersData = () => {
        getUsers()
            .then((usersData) => {
                this.props.UserData(usersData)
                this.setState({
                    isLoaded: true,
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
                    this.props.usersData.map(user =>
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


const mapStateToProps = (state) => {
    return{
       usersData: state.fetchReducer.FetchAction.fetchData

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        UserData : (data) => {
            dispatch({
                type: 'GET',
                JsonData: data
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersList);