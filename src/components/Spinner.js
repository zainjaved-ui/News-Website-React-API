// import React, { Component } from 'react'
// import loading from '../loading.gif'

// export default class spinner extends Component {
//   render() {
//     return (
//       <div className='text-center'>
//         <img src={loading} alt="loading" />
//       </div>
//     )
//   }
// }

import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className='spinner-wrapper'>
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;


