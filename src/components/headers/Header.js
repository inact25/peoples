import React, {Component} from 'react';
import {RiSearchEyeLine} from "react-icons/ri";

class Header extends Component {
    render() {
        return (
            <div className='sticky-top' style={{background: '#EEF1FB'}}>
                <h3 style={{
                    margin: '5%'
                }}>pe<RiSearchEyeLine/>ples</h3>
                <div className="row justify-content-md-center">
                    <div className='col'/>
                    <div className='col-8'>
                        <input placeholder='Looking for someone...?' type="text"
                               className="form-control dashboardCustomInput"/>
                    </div>
                    <div className='col'>
                        <button className="btn btn-block dashboardCustomBtn"><RiSearchEyeLine/></button>
                    </div>
                    <div className='col'/>
                </div>
            </div>
        );
    }
}

export default Header;