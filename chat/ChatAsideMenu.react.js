import React from 'react';
import ReactDOM from 'react-dom';
import styles from 'css/chatAsideMenu.css';

export default class ChatAsideMenu extends React.Component {
constructor(props) {
	super(props);
	this.state = { active: false };
	this.handleChange = this.handleChange.bind(this);
	this.handleReset = this.handleReset.bind(this);
}

handleChange(e) {
	let value = e.target.value.toLowerCase();
	// activates button display
	this.setState({active: true});
	// sends data
	this.props.onSearch(value);
}

handleReset() {
	// resets input value
	const input = ReactDOM.findDOMNode(this.refs.input);
	input.value = '';
	// hides cancel button
	this.setState({active: false});
	// unfilters channels
	this.props.onResetSearch();
}

render() {
	let { active } = this.state;
	return (
		<aside className={styles.aside}>
			<div className={styles.asideHeader}>
				<form className={styles.form}>
					<div className={styles.inputContainer}>
					<input ref="input" type="text" placeholder="Search Event Channel" className={styles.input} onChange={(e) => this.handleChange(e)} />
					{ active
					 ? <button className={styles.deleteBtn} onClick={this.handleReset} />
					 : null }
					</div>
				</form>
			</div>
			{this.props.children}
		</aside>
	);
}
}

ChatAsideMenu.propTypes = {
 children: React.PropTypes.object,
 onResetSearch: React.PropTypes.func,
 onSearch: React.PropTypes.func
};

