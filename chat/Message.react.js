import React from 'react';
import moment from 'moment';
import UserAvatar from 'components/UserAvatar.react';
import DefaultAvatar from 'components/DefaultAvatar.react';
import styles from 'css/message.css';

export default class Message extends React.Component {
render() {
	let { key, message, name, pic } = this.props;
	let timeAgo = moment(message.timestamp).fromNow();
	let attachments = message.attachments;
	let attachedFiles;
	if (attachments) {
		attachedFiles = attachments.map((attachment, aKey) => {
			return (
				<li className={styles.attachmentLink} key={aKey}>
					{attachment.name}
				</li>
			);
		});
	}
	return (
		<li key={key} className={styles.message} style={this.props.style}>
			<div
				className={message.unread ? styles.messageDateUnread : styles.messageDate}>
				{timeAgo}
			</div>
			<div className={(message.type === 'Sent') ? styles.messageContainer : styles.messageContainerReceived} >
				<div className={styles.messageContent}>{message.text}</div>
					<div className={styles.messageFooter}>
						<div className={styles.avatarContainerMessage}>
						{ (pic || message.avatar) ?
							<UserAvatar pic={pic || message.avatar} name={name} size={30} />
							: <DefaultAvatar name={name} size={30} />
						}
						</div>
						<ul className={styles.attachmentsList}>
							{ attachedFiles }
						</ul>
						</div>
					</div>
				</li>
	);
}
}

Message.propTypes = {	
	key: React.PropTypes.number,
	message: React.PropTypes.object,
	name: React.PropTypes.string,
	pic: React.PropTypes.string,
	style: React.PropTypes.object
};

