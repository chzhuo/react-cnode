import React ,{PropTypes} from 'react';
import '../styles/header.scss';


export default class Header extends React.Component{
    render(){
        return (
          <div id="header">
              <div className="header-nav" onClick={this.props.onMenuClick}></div>
              <span>全部</span>
              <div className="header-nav-right"></div>
          </div>
        );
    }
}
Header.propTypes = {
    onMenuClick:PropTypes.func.isRequired
};