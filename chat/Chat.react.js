import React from 'react';
import _ from 'lodash';
import ChatAsideMenu from 'components/ChatAsideMenu.react';
import Channels from 'components/Channels.react';
import MessageBoard from 'components/MessageBoard.react';
import Badge from 'components/Badge.react';
import styles from 'css/chat.css';

/* 
The following component is part of the event plataform Hoost. 
It is used to communicate the user - who may have several events - and the venues.
Currently it has sidemenu displaying the event channels and a message board with a simple reply form.
It also has a search box to filter channels. 
In the future, a New Message and Archive function will be integrated.
*/

export default class Chat extends React.Component {
render() {
	let { chatUser, isHost } = this.props;
	let { mobile } = this.props.media;
	let { filter, selected } = this.props.chat;
	let { events } = this.state;
	
	// Filer  All / New Messages
	let allCount = 0;
	let newCount = 0;

	const emptyEvent = { host: { name: 'Hoost', pic: null}, isEmpty: true };
	let event = (events && events.length) ? events[selected] : emptyEvent;
	// Determines details of other user
	let chatParty;
	if (isHost) {
		chatParty = { name: event.venue.name, pic: event.venue.logo || '' };
	} else {
		chatParty = { name: event.host.givenName, pic: event.host.pic || '' };
	}
	return (
		<div className={styles.chatContainer}>
      <div className={styles.titleContainer}>
      	{ mobile
      		? <button className={styles.menuIcon} onClick={this.props.onClickMenu}/>
      		: null
      	}
				<h2 className={styles.title}>Messages</h2>
			</div> 
			<section className={styles.chat}> 
				<nav className={styles.tabNav}>
					<ul className={styles.tabList}>
						<li key={0} className={styles.tab} onClick={() => this.props.onClickFilter('all')} style={filter === 'all' ? {color: '#ff8133'} : null}>
							All<span className={styles.tabSpan}>({allCount})</span>
						</li>
						<li key={1} className={styles.tab} onClick={() => this.props.onClickFilter('newOnly')} style={filter === 'newOnly' ? {color: '#ff8133'} : null}>
							New<Badge value={newCount} style={{transform: 'translateY(-7px)'}} />
						</li>
					</ul>
				</nav>
				<div className={styles.container}>
				{ !mobile
					? <ChatAsideMenu
							onResetSearch={this.handleResetSearch}
							onSearch={this.handleSearchEvent} >
							<Channels
								media={this.props.media}
								selectedTab={selected}
								data={events}
								filter={filter}
								isHost={isHost}
								handleClickTab={this.props.onClickTab} />
						</ChatAsideMenu>
					: null }
					<MessageBoard
					 	chatUser={chatUser}
					 	chatParty={chatParty}
					 	event={event}
					 	handleChangeReply={(text) => this.props.handleChangeReply(selected, text)}
						onSubmitAddMessage={(text) => this.props.onSubmitAddMessage(selected, text)} />
				</div>
			</section>
		</div>
	);
}
}

Chat.propTypes = {
	chat: React.PropTypes.object,
	chatUser: React.PropTypes.object,
	events: React.PropTypes.array,
	host: React.PropTypes.object,
	isHost: React.PropTypes.bool,
	media: React.PropTypes.object,
	restaurant: React.PropTypes.object,
	onClickMenu: React.PropTypes.func, 
  onClickFilter: React.PropTypes.func,
  onClickTab: React.PropTypes.func,
  handleChangeReply: React.PropTypes.func,
  onSubmitAddMessage: React.PropTypes.func
};
