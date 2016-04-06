/**
 * Created by zhuo on 16/3/29.
 */
import clone from './stateCopy'
import {
    SET_SHOW_MENU,
    FETCH_TOPICS_REQUEST,
    FETCH_TOPICS_SUCCESS,
    FETCH_TOPICS_FAILURE
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
            let topicTabs = clone(state);
            topicTabs[action.topicTitle].isFetching = true;
            console.log("FETCH_TOPICS_REQUEST",topicTabs);
            return topicTabs;
        }
        case FETCH_TOPICS_SUCCESS:{
            let topicTabs = clone(state);
            let topicTab = topicTabs[action.topicTitle];
            topicTab.topics=topicTab.topics.concat(action.topics);
            topicTab.page++;
            topicTab.isFetching = false;
            console.log("FETCH_TOPICS_SUCCESS",topicTabs);
            return topicTabs;
        }
        case FETCH_TOPICS_FAILURE:{
            let topicTabs = clone(state);
            topicTabs[action.topicTitle].isFetching = false;
            return topicTabs;
        }
        default:
            return state;
    }
}
const reducers = {
    isShowMenu,
    topicTabs
};
export default reducers;