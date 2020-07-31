import React, {Component} from 'react';
import AlternateHeader from "../components/headers/AlternateHeader";
import UserPostByTag from "../variables/UserPostByTag";

class PostByTagView extends Component {
    render() {
        return (
            <div>
                <AlternateHeader/>
                <UserPostByTag urlTag={this.props.match.params.postTag}/>
            </div>
        );
    }
}

export default PostByTagView;