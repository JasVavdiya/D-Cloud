import React, { Component } from 'react';
import Identicon from 'identicon.js';
import box from '../box.gif'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar p-0">
        <div className='d-flex flex-row align-items-center'>
        <img src={box} width="100" height="100" className="align-top" alt="" />
        <h1>
          D-Cloud
        </h1>
        </div>

        <div>
        <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
            { this.props.account
              ? <img
              alt='profileimg'
                className='ml-2'
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
              />
              : <span></span>
            }
          </li>
        </ul>
        </div>
      
      </nav>
    );
  }
}

export default Navbar;