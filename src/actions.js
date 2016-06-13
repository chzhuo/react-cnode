/**
 * Created by zhuo on 16/3/29.
 */
import $ from 'jquery';
import humps from 'humps';
import {normalize,arrayOf} from 'normalizr'
import {topicSchema,authorSchema} from './Schemas';

//获取列表数据
export const FETCH_TOPICS_REQUEST = "FETCH_TOPICS_REQUEST";
export const FETCH_TOPICS_SUCCESS = "FETCH_TOPICS_SUCCESS";
export const FETCH_TOPICS_FAILURE = "FETCH_TOPICS_FAILURE";

//主题详情
export const FETCH_TOPIC_REQUEST = "FETCH_TOPIC_REQUEST";
export const FETCH_TOPIC_SUCCESS = "FETCH_TOPIC_SUCCESS";
export const FETCH_TOPIC_FAILURE = "FETCH_TOPIC_FAILURE";

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

                let data = humps.camelizeKeys(topics.data);
                data = normalize(data,arrayOf(topicSchema));

                dispatch({type:FETCH_TOPICS_SUCCESS,data:data,topicTitle:topicTitle});
            },
            error:(e)=>{
                console.log("fetchTopics网络错误",e);
                dispatch({type:FETCH_TOPICS_FAILURE,topicTitle:topicTitle});
            }
        });
    }
}
//获取主题详情
export function fetchTopicByID(topicId){
    return function(dispatch,getState){
        let data = {
        };
        dispatch({type:FETCH_TOPIC_REQUEST,topicId:topicId});
        $.ajax({
            url:"https://cnodejs.org/api/v1/topic/"+topicId,
            data:data,
            dataType:"json",
            success:(topic)=>{
                let data = humps.camelizeKeys(topic.data);
                data = normalize(data,topicSchema);
                dispatch({type:FETCH_TOPIC_SUCCESS,data:data,topicId:topicId});
            },
            error:(e)=>{
                console.log("fetchTopicByID网络错误",e);
                dispatch({type:FETCH_TOPIC_FAILURE,topicId:topicId});
            }
        });
    }
}