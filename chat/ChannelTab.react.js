import React from 'react';
import Badge from 'components/Badge.react';
import UserAvatar from 'components/UserAvatar.react';
import DefaultAvatar from 'components/DefaultAvatar.react';
import styles from 'css/channeltab.css';

export default class ChannelTab extends React.Component {
render() {
	let { key, title, subtitle, badgeCount, isSelected, style, pic } = this.props;
	return (
		<div className={styles.channelTab} key={key} onClick={this.props.onClick} style={style}>
			<div className={styles.container} style={isSelected ? {backgroundColor: '#fde7d6'} : null}>
				<div className={isSelected ? styles.avatarContainerSelected : styles.avatarContainer}>
					{ pic
						? <UserAvatar pic={pic} name={subtitle} size={30} />
						: <DefaultAvatar name={subtitle} size={30} />
					}
				</div>
				<div className={styles.textContainer}>
					<h3 className={styles.title}>{title}</h3>
					<span className={styles.subtitle}>Hosted by {subtitle}</span>
				</div>
				{ badgeCount 
					? <Badge value={badgeCount} />
					: null
				}
				{ isSelected ? <span className={styles.selectedIcon}/> : null }
			</div>
		</div>
	);
}
}

ChannelTab.propTypes = {
	badgeCount: React.PropTypes.number,
	isSelected: React.PropTypes.bool,
	key: React.PropTypes.number,
	pic: React.PropTypes.string,
	style: React.PropTypes.object,
	subtitle: React.PropTypes.string,
	title: React.PropTypes.string,
	unread: React.PropTypes.bool,	
	onClick: React.PropTypes.func
};
