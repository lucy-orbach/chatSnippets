import React from 'react';
import { canUseDOM } from 'utils/canUseDOM';
import { Motion, spring, presets } from 'react-motion';
import UserAvatar from 'components/UserAvatar.react';
import DefaultAvatar from 'components/DefaultAvatar.react';
import Title from 'components/Title.react';
import Message from 'components/Message.react';
import PinnedToBottom from 'components/PinnedToBottom.react';
import ReplyForm from'components/ReplyForm.react';
import styles from 'css/messageBoard.css';

export default class MessageBoard extends React.Component {
constructor(props) {
	super(props);
	this.state = { messages: [] };
}

componentDidMount() {
	// gets event messages
	if (canUseDOM) {
		let subscribeToMessages = require('utils/ChatUtils').subscribeToMessages;
		subscribeToMessages(this.props.event._id, (messages) => {
			this.setState({ messages });
		});
	}
}
componentWillReceiveProps(nextProps) {
	// updates message thread according to selected channel
	if (canUseDOM) {
		let subscribeToMessages = require('utils/ChatUtils').subscribeToMessages;
		subscribeToMessages(nextProps.event._id, (messages) => {
			this.setState({ messages });
		});
	}
}
render() {
	let { messages } = this.state;
	let { chatUser, chatParty, event } = this.props;
	
	// messages
	let messageTrend = messages.map((message, key) => {
		// determines messageUser
		let messagePic = message.username === chatUser.name
			? chatUser.pic 
			: chatParty.pic;
		return (
			<Motion key={key} defaultStyle={{opa: 0, y: 10}} style={{opa: spring(1, presets.gentle), y: spring(0, presets.gentle)}}>
				{({opa, y }) =>
					<Message
						style={{opacity: `${opa}`, transform: `translateY(${y}px)`}}
						message={message}
						name={message.username}
						pic={messagePic} />
				}
			</Motion>
		);
	});
	return (
		<Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1, presets.gentle)}}>
		{({opacity}) =>
			<div className={styles.messageBoard} style={{opacity: `${opacity}`}}> 
				<div key={0} className={styles.header}>
					<div className={styles.activityInfo}>
						<div key={0} className={styles.avatarContainer}>
							{ chatParty.pic
								?	<UserAvatar pic={chatParty.pic} name={chatParty.name} size={30}/>
								: <DefaultAvatar name={chatParty.name} size={30} />
							}
						</div>
						<div key={1} className={styles.textContainer}>
							{
								event.isEmpty
								? <h6 className={styles.activityStatus}>You currently have no event hosts to message with</h6>
								: <h6 className={styles.activityStatus}>Messaging with <span className={styles.hostName}><Title title={chatParty.name} clear /></span> from</h6>
							}
		  				<h2 className={styles.eventTitle}><Title title={event.title} clear /></h2>
		  			</div>
					</div>
					<nav className={styles.iconNav}>
						<button className={styles.btnReply}>reply</button>
						<button className={styles.btnArchive}>archive</button>
					</nav>
				</div>
				<div key={1} className={styles.boardContainer}>
					<PinnedToBottom>
						<ul className={styles.messagesList} style={{opacity: `${opacity}`}}>
								{messageTrend}
						</ul>
					</PinnedToBottom>
					<div className={styles.footer}>
						{!event.isEmpty && 
							<ReplyForm
								avatar={chatUser.pic}
								name={chatUser.name}
								event={event}
								placeholder={messages.length > 0
									? 'Type a reply' 
									: 'Type a Message' }/>
						}
					</div>
				</div>
			</div> }
		</Motion>
	);
}
}
MessageBoard.propTypes = {
	chatParty: React.PropTypes.object,
	chatUser: React.PropTypes.object,
	event: React.PropTypes.object,
	user: React.PropTypes.object,//
	restContact: React.PropTypes.object,//
	children: React.PropTypes.object,//
	handleChangeReply: React.PropTypes.func,
	onSubmitAddMessage: React.PropTypes.func
};

