import React from "react";

const InfoCard = ({ item }) => {
  return (
    <div className="card">
      <div className="info-box">
        <p>
          <span>Sector : </span> {item.sector}
        </p>
        <p>
          <span>Topic : </span> {item.topic}
        </p>
        <p>
          <span>Pestle : </span> {item.pestle}
        </p>
        <p>
          <span>Region : </span> {item.region}
        </p>

        <p>
          <span>Country : </span>
          {item.country}
        </p>
      </div>

      <div className="data">
        <p>
          <span>Insight : </span>
          {item.insight}
        </p>
        <p> {item.title}</p>
      </div>

      <div className="insight">
        <div className="data-box">
          <span>Relevance</span>
          <p> {item.relevance}</p>
        </div>
        <div className="data-box">
          <span>Likelihood</span>
          <p> {item.likelihood}</p>
        </div>
        <div className="data-box">
          <span>Intensity</span>
          <p> {item.intensity}</p>
        </div>
      </div>
      <div className="info-box source">
        <p>
          <span>Source : </span> {item.source}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
