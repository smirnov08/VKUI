import './ScrollView.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getClassName from '../../helpers/getClassName';
import removeObjectKeys from '../../lib/removeObjectKeys';
import classnames from '../../lib/classnames';

const baseClassNames = getClassName('ScrollView');

export default class ScrollView extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  static childContextTypes = {
    panel: PropTypes.string
  };

  static propTypes = {
    /**
     * @ignore
     */
    activePanel: PropTypes.string,
    /**
     * @ignore
     */
    prevPanel: PropTypes.string,
    /**
     * @ignore
     */
    nextPanel: PropTypes.string,
    /**
     * @ignore
     */
    children: PropTypes.node,
    className: PropTypes.string,
    theme: PropTypes.oneOf(['white', 'gray']),
    id: PropTypes.string.isRequired,
    header: PropTypes.shape({
      left: PropTypes.node,
      right: PropTypes.node,
      title: PropTypes.node
    }).isRequired,
    centered: PropTypes.bool
  };

  static contextTypes = {
    insets: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
    })
  };

  getChildContext () {
    return {
      panel: this.props.id
    };
  }

  get insets () {
    return this.context.insets || {};
  }

  static defaultProps = {
    children: '',
    theme: 'gray',
    centered: false
  };

  shouldComponentUpdate ({ id, activePanel, nextPanel }) {
    return id === activePanel || id === nextPanel;
  }

  render () {
    const { className } = this.props;

    return (
      <div
        className={classnames(baseClassNames, className, {
          'ScrollView--centered': this.props.centered
        })}
        {...removeObjectKeys(this.props, ['header', 'onPull', 'className', 'activePanel', 'prevPanel', 'nextPanel', 'fixedLayout', 'theme', 'centered'])}
        ref={this.getRef}
      >
        <div className="ScrollView__in" style={{ paddingBottom: this.insets.bottom || null }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
