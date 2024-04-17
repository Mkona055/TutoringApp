import "./SignUpLogin.css";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { SERVER_BASE_URL } from "../../utils/api";
import React, { useState } from "react";
import { CANADIAN_CITIES_AND_PROVINCES } from "../../utils/cities";
import { useNavigate } from "react-router-dom";

const SignUpLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [location, setLocation] = useState();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleSearchChange = (event) => {
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

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      if (isSignUp) {
        let locationExists = CANADIAN_CITIES_AND_PROVINCES.some((subArray) => {
          // Check if every element in 'toCheck' exists in 'subArray'
          return location.split(", ").every((value, index) => {
            return subArray[index] === value;
          });
        });
        if (locationExists) {
          // Sign Up
          const res = await axios.post(`${SERVER_BASE_URL}/register`, {
            email,
            password,
            role,
            firstName,
            lastName,
            location,
          });
          if(res.ok){
            navigate("/feed"); 
          }else{
            setError(res.data.error);
          }

        } else {
          setError("Please choose a location from the list");
        }
      } else {
        // Sign In
        const response = await axios.get(`${SERVER_BASE_URL}/authenticate`, {
          email,
          password,
        });
        if (response.ok){
          const { token } = response.data;
          login(token);
          navigate("/feed");
        }else{
          setError("Invalid credentials. Please try again.");

        }

      }
   
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card rounded">
            <div className="d-flex justify-content-center card-header colorFullText">
              Mentor me!
            </div>
            <div className="card-body">
              <h2 className="card-title text-center">
                {isSignUp ? "Sign up" : "Sign in"}
              </h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                {isSignUp && (
                  <>
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Please enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Please enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="form-label">
                        Location
                      </label>
                      <input
                        className={`form-control ${error ? "is-invalid" : ""}`}
                        value={location}
                        list="locationDetails"
                        id="location"
                        placeholder="Type to search..."
                        onChange={handleSearchChange}
                        required
                      />

                      <datalist id="locationDetails">
                        {filteredOptions.map(([city, province]) => (
                          <option
                            key={`${city}-${province}`}
                            value={`${city}, ${province}`}
                          />
                        ))}
                      </datalist>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="accountType" className="form-label">
                        Account type
                      </label>
                      <select
                        className="form-control"
                        id="accountType"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Select a City
                        </option>
                        <option value="STUDENT">Student</option>
                        <option value="TUTOR">Tutor</option>
                      </select>
                    </div>
                  </>
                )}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn text-white bg-team-purple w-50 "
                  >
                    {isSignUp ? "Sign up" : "Sign in"}
                  </button>
                </div>
              </form>
              <p className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={handleToggle}
                >
                  {isSignUp
                    ? "Already have an account ? Sign in"
                    : "Do not have an account ? "}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpLogin;
