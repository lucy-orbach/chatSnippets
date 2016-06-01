import React from 'react';
import styles from 'css/avatars.css';

export default class DefaultAvatar extends React.Component {
render() {
	let { name, size } = this.props;
	let initials = name ? name[0].toUpperCase() : '?';
	return (
		<div className={styles.avatarContainer} title={name}>
			<span
				className={styles.defaultAvatar}
				style={{ width: size, height: size }}>
				{initials}
			</span>
		</div>
	);
}
}

DefaultAvatar.propTypes = {
	name: React.PropTypes.string, 
	size: React.PropTypes.number
};
