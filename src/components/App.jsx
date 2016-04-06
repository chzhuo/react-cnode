import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from 'react-redux';
import 'normalize.css/normalize.css';
import '../styles/app.scss';
import Menu from './Menu.jsx';
import Header from './Header.jsx';
import {setShowMenu} from '../actions';


class App extends React.Component {

    render() {
        return <div id="app">
            <Header onMenuClick={()=>this.setMenuClick(true)}/>
            <ReactCSSTransitionGroup
                transitionName="menu-transition"
                transitionEnter={false}
                transitionLeaveTimeout={300}>
                {this.props.isShowMenu ? <Menu key="menu" onMenuBgClick={()=>{this.setMenuClick(false)}}/> : undefined}
            </ReactCSSTransitionGroup>
            {
                React.cloneElement(this.props.children,{
                    key:this.props.pathname
                })
            }
        </div>
    }

    setMenuClick(isShowMenu) {
        this.props.dispatch(setShowMenu(isShowMenu));
    }
}
App.propTypes = {
    isShowMenu: PropTypes.bool.isRequired
}
let select = function (state) {
    return {
        isShowMenu: state.isShowMenu,
        pathname:state.routing.locationBeforeTransitions.pathname
    }
};
export default connect(select)(App);