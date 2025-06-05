import React from "react";
import "./Sidebar.css"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <aside className="vertical-sidebar">
      <input
        type="checkbox"
        role="switch"
        id="checkbox-input"
        className="checkbox-input"
        checked
      />
      <nav>
        <header>
        <div className="sidebar__toggle-container"> <label  htmlFor="checkbox-input" id="label-for-checkbox-input" className="nav__toggle"> <span className="toggle--icons" aria-hidden="true"> <svg width="24" height="24" viewBox="0 0 24 24" className="toggle-svg-icon toggle--open">
                            <path d="M3 5a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2zM2 12a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1M2 18a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1"> </path>
                        </svg> <svg width="24" height="24" viewBox="0 0 24 24" className="toggle-svg-icon toggle--close">
                            <path d="M18.707 6.707a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12z"> </path>
                        </svg> </span> </label> </div>
          {/* <figure> <img className="codepen-logo" src="https://blog.codepen.io/wp-content/uploads/2023/09/logo-black.png" alt="" />
                <figcaption>
                    <p className="user-id">Codepen</p>
                    <p className="user-role">Coder</p>
                </figcaption>
            </figure> */}
        </header>
        <section className="sidebar__wrapper">
          <ul className="sidebar__list list--primary">
            <li className="sidebar__item item--heading">
              <h2 className="sidebar__item--heading">general</h2>
            </li>
            <li className="sidebar__item">
              <Link to="/" className="sidebar__link" data-tooltip="Inbox">
                <span className="icon">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-house"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 .134a.5.5 0 0 1 .344.146L13.5 4H12v8H4V4H2.5l5.156-4.72A.5.5 0 0 1 8 .134zM7.5 1.493L3.7 4h2.3V8h4V4h2.3L8.5 1.493a.5.5 0 0 0-.344-.146H8V1.138z" />
                    <path d="M7 9.5V11h2v-1.5h2a.5.5 0 0 1 .5.5v1.5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V10a.5.5 0 0 1 .5-.5h2z" />
                  </svg>
                </span>
                <span className="text">Home</span>
              </Link>
            </li>
          </ul>
          <ul className="sidebar__list list--secondary">
            <li className="sidebar__item item--heading">
              <h2 className="sidebar__item--heading">general</h2>
            </li>
            <li className="sidebar__item">
              <Link
                to="/profile"
                className="sidebar__link"
                data-tooltip="Inbox"
              >
                <span className="icon">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </span>
                <span className="text">Profile</span>
              </Link>
            </li>
          </ul>
        </section>
      </nav>
    </aside>
  );
}

export default Sidebar;
