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
    <footer className="text-center pt-2 text-md-start footer fixed-bottom centered" id="footer">
      <div className="container row">
        {footerMenu.map((footer, i) => (
          <div
            key={`${Object.keys(footer)[0]}_key`}
            className="col-md-4 mb-4 mb-md-0 d-none d-md-block"
          >
            <h4 className="mb-3 ">{Object.keys(footer)[0]}</h4>
            <nav className="nav flex-column">
              {footerMenu[i][Object.keys(footer)[0]].map(link => (
                <LinkItem
                  key={`linkItem_${link.title}`}
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
        <h5 className="text-center">
          Copyright © 2021 Sanitally Appointment System
        </h5>
      </div>
    </footer>
  )
}