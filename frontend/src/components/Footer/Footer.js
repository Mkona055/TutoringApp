import "./Footer.css";
import React from "react";

function Footer() {
  return (
    <footer className="footer mt-5" data-testid="footer">
      <div className="container py-3" >
        <div className="row">
          <div className="col-12 col-md-4">
            <h5 >About Mentor me!</h5>
            <p>
              Mentor me! is the leading platform for finding a entor and get help on a particular subject. Our mission is to help people find help quickly and easily.
            </p>
          </div>
          <div className="col-12 col-md-4">
            <h5>Contact Us</h5>
            <p>
              <strong>Email:</strong> info@mentorme.com
            </p>
            <p>
              <strong>Phone:</strong> (555) 555-5555
            </p>
          </div>
          <div className="col-12 col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled ">
              <li>
                <a className="text-white" href="/">Facebook</a>
              </li>
              <li>
                <a className="text-white" href="/">Twitter</a>
              </li>
              <li>
                <a className="text-white" href="/">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bottom-section py-3">
        &copy; {(new Date()).getFullYear()} Mentor me! | All rights reserved
      </div>
    </footer>
  );
}

export default Footer;