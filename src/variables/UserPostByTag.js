import React, {Component} from 'react';
import {getPostbyTag, getPostComment} from "../apis/dataApi";
import animLoading from "../assets/img/animLoading.gif";
import PostCard from "../components/cards/PostCard";
import Swal from "sweetalert2";
import commentLoading from "../assets/img/commentLoading.gif";
import withReactContent from 'sweetalert2-react-content'

class UserPostByTag extends Component {
    state = {
        postData: [],
        commentsData: [],
        tag: this.props.urlTag,
        isLoaded: false,
        isCommentLoaded : false
    }

    getPostByTag = (tag) => {
        getPostbyTag(tag)
            .then((postData) => {
                console.log(postData)
                this.setState({
                    isLoaded: true,
                    postData,
                });
            })
            .catch((e) => {
                console.log(e);
                Swal.fire("Oops", "Connection Timeout !!!", "error")
            });
    };

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
                console.log(e);
                Swal.fire("Oops", "Connection Timeout !!!", "error")
            });
    }

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
        this.getPostByTag(this.state.tag)
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

export default UserPostByTag;