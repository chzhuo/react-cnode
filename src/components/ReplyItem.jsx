import React,{PropTypes} from 'react';


class ReplyItem extends React.Component{
    render(){
        let reply = this.props.reply;
        return (
            <li>
                <section className="user">
                    <img src={reply.author.avatarUrl} />
                </section>
            </li>
        );
    }
}
ReplyItem.propTypes = {
    reply:PropTypes.shape({
    }).isRequired
}

export default ReplyItem;