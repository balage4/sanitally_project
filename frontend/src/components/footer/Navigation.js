import React from 'react';
import LinkItem from './LinkItem';

export default function Navigation({
  // eslint-disable-next-line
  linkName1, linkName2, linkName3, linkTo1, linkTo2, linkTo3, title
})
  {
  return (
    <div className="col-md-4 mb-4 mb-md-0 d-none d-md-block">
      <h4 className="mb-3 text-white">{title}</h4>
      <nav className="nav flex-column">
        <LinkItem linkName={linkName1} linkTo={linkTo1}/>
        <LinkItem linkName={linkName2} linkTo={linkTo2}/>
        <LinkItem linkName={linkName3} linkTo={linkTo3}/>
      </nav>
    </div>
  )
}