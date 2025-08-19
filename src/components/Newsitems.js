import React from 'react';

const Newsitems = (props) => {
  const { title, description, imageurl, newsurl } = props;

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={
            imageurl?imageurl: "https://image.cnbcfm.com/api/v1/image/108177148-17534560482025-07-25t150540z_659622175_rc2ptfahmlxi_rtrmadp_0_usa-stocks.jpeg?v=1753456136&w=1920&h=1080"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a href={newsurl} className="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsitems;
