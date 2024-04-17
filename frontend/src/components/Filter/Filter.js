import React, { useEffect, useState, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { CANADIAN_CITIES_AND_PROVINCES } from "../../utils/cities";
import "./Filter.css";

export default function Filter({ onFilter, tags }) {
  const [hourlyRate, setHourlyRate] = useState(0);
  const [location, setLocation] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [error, setError] = useState('');
  const [criteriasList, setCriteriasList] = useState([]);
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchInputRef = useRef(null);

  const buildQueryString = () => {
    const queryParams = [];

    if (hourlyRate.trim() !== "") {
      queryParams.push(`hourlyRate=${hourlyRate}`);
    }
    if (location.trim() !== "") {
      queryParams.push(`location=${location}`);
    }
    if (tags.length > 0) {
      const tagsString = tags.map((tag) => tag.trim()).join(",");
      queryParams.push(`tags=${tagsString}`);
    }

    return queryParams.length > 0 ? "?" + queryParams.join("&") : "";
  };

  const applyFilters = (e) => {
    e.preventDefault();
    let locationExists = CANADIAN_CITIES_AND_PROVINCES.some((subArray) => {
      // Check if every element in 'toCheck' exists in 'subArray'
      return location.split(", ").every((value, index) => {
        return subArray[index] === value;
      });
    });
    if (!locationExists) {
      setError("Please choose a location from the list");
    }
    const queryString = buildQueryString();
    onFilter(queryString);
  };

  const resetFilters = (e) => {
    e.preventDefault();
    setHourlyRate(null);
    setLocation(null);
    selectedTags([]);
  };

  const handleLocationSearchChange = (event) => {
    const { value } = event.target;
    setLocation(value);

    // Debounce the filtering function
    setTimeout(() => {
      const filtered = CANADIAN_CITIES_AND_PROVINCES.filter(
        ([city, province]) =>
          city.toLowerCase().includes(value.toLowerCase()) ||
          province.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }, 300); // 300ms debounce delay
  };

  useEffect(() => {
    const filtered = tags.filter((tag) =>
      tag.name.toLowerCase().includes(tagSearchTerm.toLowerCase())
    );
    setFilteredTags(filtered);
  }, [tagSearchTerm, tags]);

  useEffect(() => {
    const list = [];
    if (hourlyRate) {
        list.push("Hourly rate <= " + hourlyRate + "$");
    }
    if (location){
        list.push("Location: " + location);
    }
    if (selectedTags.length > 0){
        selectedTags.map((tagId) =>{
            const tag = tags.find((t) => t.id === tagId)
            list.push(tag.name);
            return true;
        });
    }
    setCriteriasList(list);
}, [hourlyRate, location, selectedTags, tags]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    if (!dropdownOpen) {
      // Focus on input when opening dropdown
      searchInputRef.current.focus();
    }
  };

  const handleTagSearchChange = (e) => {
    setTagSearchTerm(e.target.value);
  };

  const handleTagSelection = (tag) => {
    const index = selectedTags.indexOf(tag.id);
    if (index === -1) {
      setSelectedTags([...selectedTags, tag.id]);
      setCriteriasList([...criteriasList, tag.name]);
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag.id));
      setCriteriasList(criteriasList.filter((criteria) => {
        return criteria !== tag.name;
      }));
    }

  };
   /**
     * The role of this function is to convert the criteria text into a blue label to be displayed in
     * the filter in the user selected criterias section
     * @param {String} criteria 
     * @returns JSX element
     */
   const getCriteriaJSXElement = (criteria) => {
    return              <span key={criteria} className="criteria small rounded text-white me-1 ps-2 pe-2 pt-1 pb-1">
                            <span>{criteria}</span>
                            <i className="ms-2 bi bi-x-lg" onClick={removeCriteria}></i>
                        </span>;

}
/**
 * This function is used to remove a criteria from the criterias list
 * @param {Event} e 
 */
const removeCriteria = (e) => {
    const criteriaName = e.target.parentElement.innerText;

    if (criteriaName.includes("Hourly rate")){
        setHourlyRate(0);
    }else if (criteriaName.includes("Location")){
        setLocation('');
    }else{
        setSelectedTags(selectedTags.filter((tagId) =>{
            const tag = tags.find((t) => t.name === criteriaName)
            return tagId !== tag.id;
        }));
    } 
    setCriteriasList(criteriasList.filter((criteria) => {
        return criteria !== criteriaName;
    }));
}

  return (
    <Container
      id="filter-container"
      className=" bg-light mt-5 mb-5 text-secondary rounded border border-2 "
    >
      <Form id="filter">
        <div className="d-flex justify-content-center mb-2">
          <div className="row ms-5 mt-2">
            <Form.Label>Hourly rate:</Form.Label>
            <div className="col">0 CAD</div>
            <div className="col">
              <input
                type="range"
                min="0"
                max="100"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="form-range"
              />
            </div>
            <div className="col">100 CAD</div>
          </div>
          <div className="row justify-content-center ms-5 mt-2">
            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                className={`${error ? "is-invalid" : ""}`}
                list="locationDetails"
                placeholder="Enter location"
                value={location}
                onChange={handleLocationSearchChange}
              />
              <datalist id="locationDetails">
                {filteredOptions.map(([city, province]) => (
                  <option
                    key={`${city}-${province}`}
                    value={`${city}, ${province}`}
                  />
                ))}
              </datalist>
            </Form.Group>
          </div>
          <div className="row justify-content-center ms-5 mt-2">
            <Form.Group className="mb-3" controlId="tags">
              <Form.Label>Tags:</Form.Label>
              <div className="tag-selector">
                <div className="tag-selector-input">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search tags..."
                    value={tagSearchTerm}
                    onChange={handleTagSearchChange}
                    onClick={toggleDropdown}
                    ref={searchInputRef}
                  />
                </div>
                {dropdownOpen && (
                  <div className="tag-selector-dropdown ps-4 pt-2">
                    {filteredTags.length === 0 && <div>No results found</div>}
                    {filteredTags.map((tag) => (
                      <div key={tag.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`tag-${tag.id}`}
                          value={tag.id}
                          checked={selectedTags.includes(tag.id)}
                          onChange={() => handleTagSelection(tag)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`tag-${tag.id}`}
                        >
                          {tag.name}
                        </label>
                      </div>
                    ))}
                    <div className="tag-selector-footer">
                      
                      <button
                        className="btn btn-secondary mt-2 mb-2"
                        onClick={toggleDropdown}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Form.Group>
          </div>
          <div className="row justify-content-center ms-5 mt-4">
            <Button className="bg-team-purple me-1 mb-3" onClick={applyFilters}>
              Apply
            </Button>
            <Button
              className="bg-secondary border border-secondary me-1"
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
        </div>
      </Form>
      {criteriasList.length !== 0  && <div className=" d-flex row justify-content-center mt-2 mb-2 border-top">
                <div className="col" id="criterias">
                    <span className="d-block small mb-1">Your criterias:</span>
                    {criteriasList.map((criteria, index) => {
                        return getCriteriaJSXElement(criteria)
                    })}                  
                </div>
            </div>}
    </Container>
  );
}
