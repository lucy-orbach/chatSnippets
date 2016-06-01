import React from 'react';
import ReactDOM from 'react-dom';

const { func, number, oneOfType, string } = React.PropTypes;

const componentType = oneOfType([ string, func ]);

export default class PinnedToBottom extends React.Component {

  static propTypes = {
    component: componentType.isRequired,
    tolerance: number.isRequired
  }

  static defaultProps = {
    component: 'div',
    tolerance: 5
  }

  scrollToBottom() {
    let node = ReactDOM.findDOMNode(this);

    if (node && this.pinToBottom) {
      node.scrollTop = node.scrollHeight;
    }
  }

  adjustScrollPosition() {
    if (this.pinToBottom) {
      this.scrollToBottom();
    }
  }

  componentWillMount() {
    this.pinToBottom = true;
  }

  componentDidMount() {
    this.adjustScrollPosition();
  }

  componentWillUpdate() {
    let node = ReactDOM.findDOMNode(this);
    let { clientHeight, scrollHeight, scrollTop } = node;
    this.pinToBottom = clientHeight + scrollTop > (scrollHeight - this.props.tolerance);
  }

  componentDidUpdate() {
    this.adjustScrollPosition();
  }

  render() {
    let { children, component, style } = this.props;

    return React.createElement(component, {
      style: { ...style, overflowY: 'scroll' },
      children
    });
  }

}
