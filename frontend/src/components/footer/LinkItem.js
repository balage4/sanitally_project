import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line
export default function LinkItem ({linkName, linkTo="/"})
  {
  return (
    <Link className="link mb-2" to={linkTo}>{linkName}</Link>
  )
}
