import React, {Component} from 'react';
import '../assets/css/Post.css'
import UserPost from "../variables/UserPost";
import AlternateHeader from "../components/headers/AlternateHeader";


class PostView extends Component {
    render() {
        return (
            <div>
                <AlternateHeader/>
                <UserPost urlID={this.props.match.params.userID}/>
            </div>
        );
    }
}

export default PostView;