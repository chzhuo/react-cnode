import React,{PropTypes} from 'react';
import '../styles/menu.scss';
import MenuNotLogin from './MenuNotLogin.jsx';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import MenuLogin from './MenuLogin.jsx';
import {setShowMenu} from '../actions'

class Menu extends React.Component{
    render(){
        return(
            <div id="menu">
                <div className="menu-bg" onClick={this.props.onMenuBgClick}></div>
                <div className="menu-content">
                    <div className="menu-header">
                        <MenuNotLogin/>
                    </div>
                    <ul className="menu-icon">
                        <li onClick={()=>this.onMenuClick('all')} className="">全部</li>
                        <li onClick={()=>this.onMenuClick('good')} className="">精华</li>
                        <li onClick={()=>this.onMenuClick('share')} className="">分享</li>
                        <li onClick={()=>this.onMenuClick('ask')} className="">问答</li>
                        <li onClick={()=>this.onMenuClick('job')} className="">招聘</li>
                        <li onClick={()=>this.onMenuClick('message')} className="">消息</li>
                        <li onClick={()=>this.onMenuClick('about')} className="">关于</li>
                    </ul>
                </div>
            </div>
        )
    }
    //改变path
    onMenuClick(path){
        this.props.dispatch(push("/"+path));
        this.props.dispatch(setShowMenu(false));
    }
}
Menu.propTypes = {
    onMenuBgClick:PropTypes.func.isRequired,
    dispatch:PropTypes.func.isRequired
};
let select = function(state,ownProps){
    return {};
}

export default connect(select)(Menu);