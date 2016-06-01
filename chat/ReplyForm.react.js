import React from 'react';
import { canUseDOM } from 'utils/canUseDOM';
import UserAvatar from 'components/UserAvatar.react';
import DefaultAvatar from 'components/DefaultAvatar.react';
import styles from 'scss/components/replyForm.css';

export default class ReplyForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			active: false, message: '' };
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleClick() {
		// opens dialog box
		this.setState({ active: true });
	}
	handleChange(e) {
		// changes input value
		this.setState({message: e.target.value});
	} 
	onSubmitClick = (e) => {
		e.preventDefault();
		if (this.state.message !== '') {
			// console.log('event id is ' + this.props.event._id);
			if (canUseDOM) {
				//send messages to data
				let sendMessage = require('utils/ChatUtils').sendMessage;
				sendMessage(this.props.event._id, this.props.user.name, 'Sent', this.state.message, this.props.avatar);
						// resets input
	      		this.setState({message: ''});  
			}
		}
	}
	render() {
		let { user } = this.props;
		let { active, message } = this.state;
		return (
			<form className={ active ? styles.messageFormOpen : styles.messageForm}>
				<div className={styles.messageFormContainer}>
					<div className={styles.avatarContainerMessage}>
						{ user.pic
							?	<UserAvatar pic={user.pic} name={user.name} size={30} />
							: <DefaultAvatar name={user.name} size={30} />
						}
					</div>
					<textarea className={styles.replyInput} placeholder="Type a reply..." onClick={this.handleClick} onChange={(e) => this.handleChange(e)} value={ message }/>
				</div>
				<div className={styles.messageFormFooter}>
					<div className={styles.footerContainer}>
						<nav className={styles.footerNav}>
							<i className={styles.btnTextActive}>Text</i>
							<i className={styles.btnEmoji}>Emoji</i>
							<i className={styles.btnAttach}>Attach</i>
						</nav>
						<input type="submit" value="Send" className={styles.inputSend} onClick={this.onSubmitClick}/>
					</div>
				</div>
			</form>
		);
	}
}

ReplyForm.propTypes = {
	user: React.PropTypes.object,
	avatar: React.PropTypes.string,
	onClick: React.PropTypes.func,
	event: React.PropTypes.object
};


