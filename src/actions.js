/**
 * Created by zhuo on 16/3/29.
 */
import $ from 'jquery';

//获取列表数据
export const FETCH_TOPICS_REQUEST = "FETCH_TOPICS_REQUEST";
export const FETCH_TOPICS_SUCCESS = "FETCH_TOPICS_SUCCESS";
export const FETCH_TOPICS_FAILURE = "FETCH_TOPICS_FAILURE";

export const SET_SHOW_MENU = "SET_SHOW_MENU" //设置是否显示menu

export let setShowMenu = function(isShowMenu){
    return {
        type:SET_SHOW_MENU,
        isShowMenu:isShowMenu
    }
};

//获取列表数据
export function fetchTopics(topicTitle,page){
    return function(dispatch,getState){
        let data = {
            page:page,
            limit:20,
            tab:topicTitle==="all"?"":topicTitle
        };
        dispatch({type:FETCH_TOPICS_REQUEST,topicTitle:topicTitle});
        $.ajax({
            url:"https://cnodejs.org/api/v1/topics",
            data:data,
            dataType:"json",
            success:(topics)=>{
                dispatch({type:FETCH_TOPICS_SUCCESS,topics:topics.data,topicTitle:topicTitle});
            },
            error:(e)=>{
                console.log(e);
            }
        });
    }
}