import React, {PropTypes} from 'react';
import ListItem from './ListItem.jsx';
import '../styles/list.scss';
import {connect} from 'react-redux';
import {fetchTopics} from '../actions';
import BottomLoading from './BottomLoading.jsx'

class List extends React.Component {
    componentDidMount() {
        let {dispatch} = this.props;
        let {isFetching, topics, page}  = this.props.topicTab;
        //检查是否有数据,没有数据加载数据
        if (isFetching === false && topics.length === 0) {
            dispatch(fetchTopics(this.props.topicTitle, page));
        }
    }

    render() {
        return (
            <div id="list-wrap" onScroll={(e)=>this.onScroll(e)}>
                <ul id="list">
                    {this.props.topicTab.topics.map((topic, index)=> {
                        return <ListItem topic={topic} key={topic.id}/>
                    })}
                    <BottomLoading/>
                </ul>
            </div>
        );
    }

    onScroll(e) {
        //判断是否加载下一页
        let target = e.target;
        if(target.scrollTop+target.clientHeight>target.scrollHeight-44){
            if(!this.props.topicTab.isFetching){
                this.props.dispatch(fetchTopics(this.props.topicTitle, this.props.topicTab.page));
            }
        }
    }
}
List.propTypes = {
    topicTitle: PropTypes.string.isRequired
}
let select = function (state, ownProps) {
    //从path中计算出应该显示哪个topic
    let topicTitle = state.routing.locationBeforeTransitions.pathname.substr(1);
    if (topicTitle.length === 0) {
        topicTitle = 'all';
    }
    let r = {
        topicTab: state.topicTabs[topicTitle],
        topicTitle: topicTitle
    }
    console.log("r", r);
    return r;
}

export default connect(select)(List);