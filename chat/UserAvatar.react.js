import React from 'react';
import styles from 'css/avatars.css';

export default class UserAvatar extends React.Component {
render() {
	let { pic, name, size } = this.props;
	return (
		<div className={styles.avatarContainer} title={name}>
			<span
				className={styles.userAvatar}
				style={{
					backgroundImage: `url(${pic})`,
					width: size,
					height: size
				}} />
			</div>
		);
	}
}

UserAvatar.propTypes = {
	pic: React.PropTypes.string,
	name: React.PropTypes.string,
	size: React.PropTypes.number
};
