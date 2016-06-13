import React from 'react';
import {connect} from 'react-redux';
import '../styles/topic.scss';
import {fetchTopicByID} from '../actions';
import BottomLoading from './BottomLoading.jsx';
import {getLastTimeStr} from '../utils';
import {merge} from 'lodash';
import ReplyItem from './ReplyItem.jsx';

class Topic extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchTopicByID(this.props.topicId));
    }

    render() {
        if (!this.props.topic) {
            return <BottomLoading/>
        }

        let {replies, tab, content, title, lastReplyAt, good, top, replyCount, visitCount, createAt, author:{loginname, avatarUrl}} = this.props.topic;
        let tabTitle = {};
        if (top) {
            tabTitle.color = '#E74C3C';
            tabTitle.title = "顶置";
        } else if (good) {
            tabTitle.color = '#E67E22';
            tabTitle.title = "精华";
        } else if (tab === 'ask') {
            tabTitle.color = '#3498DB';
            tabTitle.title = "问答";
        } else if (tab === 'job') {
            tabTitle.color = '#9B59B6';
            tabTitle.title = "招聘";
        } else if (tab === 'share') {
            tabTitle.color = '#1ABC9C';
            tabTitle.title = "分享";
        } else {
            tabTitle.color = '#e7e7e7';
            tabTitle.title = "暂无";
        }
        return (
            <div className="component-wrap">
                <div id="topic">
                    <h2 className="topic-title">{title}</h2>
                    <section className="author-info">
                        <img className="avatar" src={avatarUrl}/>
                        <div className="topic-author-center">
                            <div>{loginname}</div>
                            <div>发布于:{getLastTimeStr(createAt, true)}</div>
                        </div>
                        <div className="topic-author-right">
                            <div className="topic-tag" style={{backgroundColor:tabTitle.color}}>{tabTitle.title}</div>
                            <div>{visitCount}次浏览</div>
                        </div>
                    </section>
                    <section dangerouslySetInnerHTML={{__html:content}} className="topic-content markdown-body">
                    </section>
                    <section className="topic-reply-count">
                        <strong>{replyCount}</strong>回复
                    </section>
                    <section className="reply-list">
                        <ul>
                            {replies?replies.map(function (reply) {
                                return (<ReplyItem key={reply.id} reply={reply}/>);
                            }):null}
                        </ul>
                    </section>
                </div>
            </div>
        );
    }
}
let select = function (state, ownProps) {
    let {topics, authors}  = state.entities;
    let topic = topics[ownProps.params.topicId];
    if (topic !== undefined) {
        topic = merge({}, topic);
        topic = Object.assign(topic, {author: authors[topic.author]});
        if(topic.replies){
            topic.replies.map(function(replyItem){
               replyItem.author =  authors[replyItem.author];
            });
        }
    }
    return {
        topic: topic,
        topicId: ownProps.params.topicId
    }
}
export default connect(select)(Topic);