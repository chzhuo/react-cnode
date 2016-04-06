import React from 'react';
import {getLastTimeStr} from '../utils';

export default class ListItem extends React.Component {

    render() {
        let {id,author_id,tab,content,title,last_reply_at,good,top,reply_count,visit_count,create_at,author:{loginname,avatar_url}} = this.props.topic;
        let tabTitle={};
        if(top){
            tabTitle.color = '#E74C3C';
            tabTitle.title = "顶置";
        }else if(good){
            tabTitle.color = '#E67E22';
            tabTitle.title = "精华";
        }else if(tab==='ask'){
            tabTitle.color = '#3498DB';
            tabTitle.title = "问答";
        }else if(tab==='job'){
            tabTitle.color = '#9B59B6';
            tabTitle.title = "招聘";
        }else if(tab==='share'){
            tabTitle.color = '#1ABC9C';
            tabTitle.title = "分享";
        }else{
            tabTitle.color = '#e7e7e7';
            tabTitle.title = "暂无";
        }
        return (<li>
            <h3><span className="title" style={{backgroundColor:tabTitle.color}}>{tabTitle.title}</span>{title}</h3>
            <div className="content">
                <img src={avatar_url}/>
                <div className="info">
                    <p className="first-p">
                        <span className="name">
                            {loginname}
                        </span>
                        <span className="status">
                            <b>{reply_count}</b>/{visit_count}
                        </span>
                    </p>
                    <p>
                        <span className="name">{getLastTimeStr(create_at,true)}</span>
                        <span className="statue">{getLastTimeStr(last_reply_at,true)}</span>
                    </p>
                </div>
            </div>
        </li>);
    }
}