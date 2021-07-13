import React from 'react';
import Company from './Company';
import Navigation from './Navigation';

export default function Footer() {
  return (
    <footer className="py-4 text-center text-md-start footer" id="footer">
      <div className="container">
        <div className="row">
          <Navigation
            title="Navigation"
            linkName1="Home"
            linkName2="Login"
            linkTo2="/login"
            linkName3="Registration"
            linkTo3="/register"  
          />
          <Navigation
            title="Partners"
            linkName1="Littel Ltd"
            linkName2="Sigurdsson and Sons"
            linkName3="Thiel-Rodriguez Ltd"
          />
          <Company/>
        </div>
        <hr className="col-md-12 d-none d-md-block"/>
        <div className="row">
          <div className="text-center">
            <h5 className="mt-0 mt-md-3 mb-0 text-white">
            Copyright © 2021 Avius Coronilla Group
            </h5>
          </div>
        </div>
      </div>
    </footer>
  )
}