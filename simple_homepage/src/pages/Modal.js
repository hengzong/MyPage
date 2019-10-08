import React, {Component} from 'react';
import './Modal.scss';

export default class Modal extends Component {
  render() {
    var className = this.props.size==="small"? 'modal-small': 'modal';
    className = this.props.show? className+' display-block' : className+' display-none';
    const closeClassName = this.props.disableClose? "close display-none": 'close display-block';
    const childClassName = this.props.size==="small"? 'children-small': 'children';
    return (
      <div style={{zIndex: 10}} className={className}>
        <section className='modal-main'>
          <div className="closeBar">
            <p className={closeClassName} onClick={this.props.handleModalClose}>[Close]</p>
          </div>
          <div className={childClassName}>{this.props.children}</div>
        </section>
      </div>
    );
  }
}
