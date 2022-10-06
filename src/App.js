import React, { useState } from "react";
// import _ from "underscore";
import _ from "lodash";

import "./App.css";

import MyResponsiveChoropleth from "./MyResponsiveChoropleth";
import { TagCloud } from "react-tagcloud";
import InfoCard from "./component/InfoCard";
import Selector from "./component/Selector";
import OptionSelector from "./component/OptionSelector";
import SliderSizes from "./component/Slider";

function App({ assignmentData }) {
  let filteredByYear = _.groupBy(assignmentData, "year");

  // console.log(filteredByYear);
  let uniqueYears = [...new Set(assignmentData.map((e) => e.year))];

  // const [content, setContent] = useState("");

  const [selectedYear, setSelectedYear] = useState(uniqueYears[0]);
  const [selectedYearData, setSelectedYearData] = useState(
    filteredByYear[selectedYear]
  );

  const [selectedTopic, setSelectedTopic] = useState("oil");
  const [selectedCardData, setSelectedCardData] = useState(
    _.groupBy(selectedYearData, "topic")[selectedTopic]
  );

  const [selectedCountry, setSelectedCountry] = useState("All");

  const vizOptions = ["intensity", "relevance", "likelihood"];
  const [selectedViz, setSelectedViz] = useState(vizOptions[0]);

  const countrySelection = (id) => {
    if (id === "reset") {
      setSelectedCardData(_.groupBy(selectedYearData, "topic")["oil"]);
      setSelectedTopic(() => "oil");
      setCountriesMap(countriesArray);
      return;
    }

    setSelectedCountry(id);
    setSelectedCardData(_.groupBy(selectedYearData, "id")[id]);
    console.log(_.groupBy(selectedYearData, "id")[id]);
    setCountriesMap(_.groupBy(countriesArray, "id")[id]);
  };
  let uniqueTopics = [...new Set(selectedYearData.map((e) => e.topic))];

  let uniqueCountries = [...new Set(selectedCardData.map((e) => e.id))];

  let filteredByTopic = _.groupBy(selectedYearData, "topic");

  let countriesObj = {};
  let countriesArray = [];

  uniqueCountries.map((e) =>
    countriesArray.push(
      (countriesObj["id"] = {
        id: e,
        value: Math.round(
          _.meanBy(
            _.groupBy(selectedCardData, "id")[e],
            (item) => item[selectedViz]
          )
        ).toFixed(1),
      })
    )
  );
  // console.log(countriesArray);

  const [countriesMap, setCountriesMap] = useState(countriesArray);

  const topicsArrayCount = [];

  uniqueTopics.map((e) =>
    topicsArrayCount.push(
      (countriesObj["id"] = {
        id: e,
        count: filteredByTopic[e].length,
      })
    )
  );

  // console.log(topicsArrayCount);

  const handleYearButton = (e) => {
    console.log(e);
    setSelectedYear(e);
    setSelectedYearData(filteredByYear[e]);
    // setSelectedCardData(filteredByYear[e.target.innerText]);
    let newSelectedCardData = _.groupBy(filteredByYear[e], "topic")["oil"];
    setSelectedTopic("oil");
    setSelectedCountry("All");
    setSelectedCardData(() => newSelectedCardData);
    console.log(newSelectedCardData);

    uniqueCountries = [...new Set(newSelectedCardData.map((e) => e.id))];
    countriesObj = {};
    countriesArray = [];

    uniqueCountries.map((e) =>
      countriesArray.push(
        (countriesObj["id"] = {
          id: e,
          value: Math.round(
            _.meanBy(
              _.groupBy(newSelectedCardData, "id")[e],
              (item) => item[selectedViz]
            )
          ).toFixed(1),
        })
      )
    );

    setCountriesMap(() => countriesArray);
    // countrySelection("reset");
  };

  const tagSelector = (topic) => {
    console.log(topic);

    const tagFiltered = _.groupBy(selectedYearData, "topic")[topic];

    console.log(tagFiltered);

    let newUniqueCountries = [...new Set(tagFiltered.map((e) => e.id))];

    console.log(newUniqueCountries);

    let newGroupedArray = _.groupBy(tagFiltered, "topic");

    console.log(newGroupedArray);
    const newArray = [];

    newUniqueCountries.map((e) =>
      newArray.push(
        (countriesObj["id"] = {
          id: e,
          value: Math.round(
            _.meanBy(
              _.groupBy(tagFiltered, "id")[e],
              (item) => item[selectedViz]
            )
          ).toFixed(1),
        })
      )
    );

    console.log(_.groupBy(tagFiltered, "id").USA);

    console.log("here////");
    console.log(_.meanBy(newGroupedArray[topic], (item) => item.intensity));
    console.log(newArray);
    setSelectedCardData(tagFiltered);
    setCountriesMap(newArray);
  };

  const selectTag = (tag) => {
    try {
      // setSelectedCardData(selectedYearData);
      setSelectedTopic(tag.id);
      setSelectedCountry("All");
      tagSelector(tag.id);
    } catch {
      countrySelection("reset");
    }
  };

  const handleVizButton = (e) => {
    let newVizarray = _.groupBy(filteredByYear[selectedYear], "topic")["oil"];
    uniqueCountries = [...new Set(newVizarray.map((e) => e.id))];
    countriesObj = {};
    countriesArray = [];

    uniqueCountries.map((country) =>
      countriesArray.push(
        (countriesObj["id"] = {
          id: country,
          value: Math.round(
            _.meanBy(_.groupBy(newVizarray, "id")[country], (item) => item[e])
          ).toFixed(1),
        })
      )
    );

    setCountriesMap(() => countriesArray);

    setSelectedViz(e);
    setSelectedTopic("oil");
    setSelectedCountry("all");
  };

  return (
    <>
      <div>
        <Selector handleYearButton={handleYearButton} />
      </div>
      <div className="year-box">
        <div className="selection-box">
          <p>Selected Year : </p>
          <span>{selectedYear}</span>
        </div>
        {uniqueYears.map((item) => (
          <button
            key={item}
            onClick={(e) => {
              handleYearButton(e.target.innerText);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div>
        <OptionSelector handleVizButton={handleVizButton} />
      </div>
      <div>
        <SliderSizes />
      </div>
      <div className="year-box">
        <div className="selection-box">
          <p>Selected Viz : </p>
          <span> {selectedViz.toUpperCase()}</span>
        </div>
        {vizOptions.map((item) => (
          <button
            key={item}
            onClick={(e) => {
              handleVizButton(e.target.innerText.toLowerCase());
            }}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="container">
        <MyResponsiveChoropleth
          countriesMap={countriesMap}
          countrySelection={countrySelection}
        />
      </div>
      <div className="year-box">
        <p>Selected Country :</p>
        <span>{selectedCountry}</span>
      </div>
      <div className="card-box">
        {selectedCardData.map(
          (item) =>
            item.topic === selectedTopic && (
              <InfoCard key={item.title} item={item} />
            )
        )}
      </div>
    </>
  );
}

export default App;
