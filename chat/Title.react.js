import React from 'react';

// Reusable component that clears Title strings from added information, creating a subtitle from it.

export default class Title extends React.Component {
	render() {
		let { maxChar, title, style, subStyle, clear } = this.props;
    let subtitle = '';
    // Searches for text inside parentheses
      if (title.indexOf('[') !== -1 || title.indexOf('(') !== -1) {
      	let titleArray;
      	if (title.indexOf('[') !== -1) {
        	titleArray = title.split('[');
        } else {
        	titleArray = title.split('(');
        }
        // Clears title and capitalizes first letter
        title = titleArray[0][0].toUpperCase() + titleArray[0].slice(1);
        subtitle = titleArray[1].replace(']', '').replace(')', '');
      }
      // Cuts titles according to max character allowed by design 
     if (maxChar && title.length > maxChar + 4) {
     	title = title.substring(0, maxChar).concat('...');
     }
		return (
			<span style={style}>
				{title}
				{ subtitle && !clear
					? <span style={subStyle}> {subtitle} </span>
					: null
				}
			</span>
		);
	}
}

Title.propTypes = {
	clear: React.PropTypes.bool,
	maxChar: React.PropTypes.number,
	title: React.PropTypes.string,
	style: React.PropTypes.object,
	subStyle: React.PropTypes.object
};
