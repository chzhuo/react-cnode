/**
 * Created by zhuo on 16/3/29.
 */
import clone from './stateCopy'
import {merge} from 'lodash';
import {
    SET_SHOW_MENU,
    FETCH_TOPICS_REQUEST,
    FETCH_TOPICS_SUCCESS,
    FETCH_TOPICS_FAILURE,
    FETCH_TOPIC_REQUEST,
    FETCH_TOPIC_SUCCESS,
    FETCH_TOPIC_FAILURE
} from './actions';

let isShowMenu = function (state=false,action) {
    if(action.type===SET_SHOW_MENU){
        return action.isShowMenu;
    }
    return state;
}
let defaultTopicTabs={
    all:{
        isFetching:false,
        page:1,
        topics:[]
    },
    good:{
        isFetching:false,
        page:1,
        topics:[]
    },
    share:{
        isFetching:false,
        page:1,
        topics:[]
    },
    job:{
        isFetching:false,
        page:1,
        topics:[]
    },
    ask:{
        isFetching:false,
        page:1,
        topics:[]
    }

}
let topicTabs = function(state=defaultTopicTabs,action){
    switch (action.type){
        case FETCH_TOPICS_REQUEST:{
            let topicTabs = merge({},state);
            topicTabs[action.topicTitle].isFetching = true;
            console.log("FETCH_TOPICS_REQUEST",topicTabs);
            return topicTabs;
        }
        case FETCH_TOPICS_SUCCESS:{
            let topicTabs = merge({},state);
            let topicTab = topicTabs[action.topicTitle];
            topicTab.topics=topicTab.topics.concat(action.data.result);
            topicTab.page++;
            topicTab.isFetching = false;
            console.log("FETCH_TOPICS_SUCCESS",action,topicTab);
            return topicTabs;
        }
        case FETCH_TOPICS_FAILURE:{
            let topicTabs = merge({},state);
            topicTabs[action.topicTitle].isFetching = false;
            return topicTabs;
        }
        default:
            return state;
    }
}
let entities = function(state={topics:{},authors:{}},action){
    if(action.data && action.data.entities){
        return merge({}, state, action.data.entities);
    }
    return state;
};
const reducers = {
    isShowMenu,
    topicTabs,
    entities
};
export default reducers;