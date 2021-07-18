import React from 'react';
import Company from './Company';
/* import Navigation from './Navigation'; */
import LinkItem from './LinkItem';

export default function Footer() {

  const footerMenu = [
    {
      'Navigation': [
        {
          title: 'Home',
          linkTo: '/'
        },
        {
          title: 'Login',
          linkTo: '/login'
        },
        {
          title: 'Registration',
          linkTo: '/register'
        }]
    },
    {
      'Partners': [
        {
          title: 'SanitCorp',
          linkTo: '/'
        },
        {
          title: 'MedicalResearch',
          linkTo: '/'
        },
        {
          title: 'PartnerFlow',
          linkTo: '/'
        }]
    }];

  return (
    <footer className="py-4 text-center text-md-start footer" id="footer">
      <div className="container">
        <div className="row">

          {footerMenu.map((footer, i) => (
            <div className="col-md-4 mb-4 mb-md-0 d-none d-md-block">
              <h4 className="mb-3 text-white">{Object.keys(footer)[0]}</h4>
              <nav className="nav flex-column">
                {footerMenu[i][Object.keys(footer)[0]].map(link => (
                  <LinkItem
                    linkName={link.title}
                    linkTo={link.linkTo}
                  />
                ))}
              </nav>
            </div>
          ))}
          <Company />
        </div>
        <hr className="col-md-12 d-none d-md-block" />
        <div className="row">
          <div className="text-center">
            <h5 className="mt-0 mt-md-3 mb-0 text-white">
              Copyright © 2021 Sanitally Appointment System
            </h5>
          </div>
        </div>
      </div>
    </footer>
  )
}