import React from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';
import ChannelTab from 'components/ChannelTab.react';
import styles from 'css/channels.css';

export default class Channels extends React.Component {
constructor(props) {
	super(props);
	this.getDefaultValue = this.getDefaultValue.bind(this);
	this.getEndValue = this.getEndValue.bind(this);
	this.willLeave = this.willLeave.bind(this);
	this.willEnter = this.willEnter.bind(this);
}

getDefaultValue() { // for animation
  let { data } = this.props;
  let configs = data.map((event, key) => ({
  	data: event,
  	key: `${key}`,
  	style: { height: 0, opacity: 1 }
  }));
	return configs;
}

getEndValue() { // for animation
	let { data } = this.props; 
	let configs = data.map((event, key) => {
		// determines height according to media
		let h = this.props.media.smallDevice ? 80 : 100;
		return {
			data: event,
			key: key,
			style: {
				height: spring(h, presets.gentle),
		   	opacity: spring(1, presets.gentle)
			}
		};
	});
	return configs;  
}

render() {
	let { selectedTab, isHost } = this.props;
	return (
		<TransitionMotion
			defaultStyles={this.getDefaultValue()}
			styles={this.getEndValue()}
			willLeave={this.willLeave}
			willEnter={this.willEnter}>
		{ configs =>
			<nav className={styles.channels}>
				<ul className={styles.eventList}>
				{ configs.map((event, i) => {
						if (event.data && !event.isRestCreated) {
            	return (
	            	<ChannelTab
	            		key={i}
	            		avatar={isHost
	            			? {
	            				name: event.data.venue.name,
	            				pic: event.data.venue.logo 
	            			}
	            			: {
	            				name: event.data.host.name,
	            				pic: event.data.host.pic
	            			}}
	            		title={event.data.title}
	            		subtitle={!isHost ? `Hosted by ${event.data.host.name}` : ''}
	            		badgeCount={event.data.newMessages}
	            		onClick={() => this.props.handleClickTab(event.key)}
	            		isSelected={(i === selectedTab) }
	            		style={{
	            			height: `${event.style.height}`,
	            			opacity: `${event.style.opacity}`
	            		}}
	            	/>); }
					})
				}
				</ul>
			</nav>
		}
		</TransitionMotion>
	);
}

willEnter() { // for animation
  return {
    height: 0,
    opacity: 1 
  };
}

willLeave() { // for animation
  return {
    height: spring(0, presets.gentle),
    opacity: spring(0, presets.gentle) 
  };
}
}

Channels.propTypes = {
	data: React.PropTypes.array,
	filter: React.PropTypes.string,
	isHost: React.PropTypes.bool,
	media: React.PropTypes.object,
	selectedTab: React.PropTypes.number,
	handleClickTab: React.PropTypes.func
};
