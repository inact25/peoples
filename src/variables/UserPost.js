import React, {Component} from 'react';
import {getPostComment, getUserPost} from "../apis/dataApi";
import animLoading from "../assets/img/animLoading.gif";
import commentLoading from "../assets/img/commentLoading.gif";
import PostCard from "../components/cards/PostCard";
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";

class UserPost extends Component {
    state = {
        postData: [],
        commentsData: [],
        id: this.props.urlID,
        isLoaded: false,
        isCommentLoaded : false
    }
    getPostCommentData = (id) => {
        this.commentPopUp()
        getPostComment(id)
            .then((commentsData) => {
                this.setState({
                    isLoaded: true,
                    isCommentLoaded :true,
                    commentsData,
                });
                this.commentPopUp()
                this.setState({
                    isCommentLoaded :false,
                });
            })
            .catch((e) => {
                Swal.fire("Oops", "Connection Timeout !!!", "error")
            });
    };

    getUserPost = (id) => {
        getUserPost(id)
            .then((postData) => {
                this.setState({
                    isLoaded: true,
                    postData,
                });
            })
            .catch((e) => {
                Swal.fire("Oops", "Connection Timeout !!!", "error")
            });
    };

    commentPopUp = () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire(
            <div>
                {this.state.isCommentLoaded ?
                    this.state.commentsData.map(comment =>
                        <div className="card customCommentCard">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-3" style={{textAlign: 'left !important'}}>
                                        <img style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '10em'
                                        }}
                                             src={comment.owner.picture} alt="profile"/>
                                    </div>
                                    <div className="col-9" style={{textAlign: 'left !important'}}>
                                        <p style={{
                                            fontSize: '14px',
                                            fontWeight: 'bolder',
                                            textAlign: 'left'
                                        }}
                                        >{`${comment.owner.title}. ${comment.owner.firstName} ${comment.owner.lastName}`}</p>
                                        <p style={{
                                            fontSize: '10px',
                                            marginTop: '-10px',
                                            textAlign: 'left'
                                        }}>{comment.message}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer customCommentFooter">
                                <p>{new Date().toLocaleDateString("en-US", comment.publishDate)}</p>
                            </div>
                        </div>
                    ) : <img src={commentLoading} alt="loading"/>}
            </div>
        )
    }

    componentDidMount() {
        this.getUserPost(this.state.id)
    };

    render() {
        return (
            <div>
                {this.state.isLoaded ?
                    <div className="row justify-content-md-center">
                        <div className="col-8">
                            <div className="card-columns customPostCardColumn">
                                {
                                    this.state.postData.map(post =>
                                        <PostCard
                                            dataPopup={this.getPostCommentData}
                                            dataPostID={post.id}
                                            dataPostOwnerId={post.owner.id}
                                            dataPostImg={post.image}
                                            dataPostOwner={post.owner.picture}
                                            dataPostArticle={post.text}
                                            dataPostTag={post.tags}
                                            dataPostLike={post.likes}
                                            dataPostDate={post.publishDate}
                                        />
                                    )}
                            </div>
                        </div>
                    </div>
                    : <img src={animLoading} alt="loading"/>}
            </div>
        );
    }
}

export default UserPost;