import React from "react";

const Resume = () => {
  return (
    <div className="resume-container">
      {/* Education Section */}
      <section className="resume-col">
        <header className="resume-title">
          <h2>EDUCATION</h2>
        </header>
        <div className="resume-contents">
          <div className="resume-box">
            <h4>2018 - 2022</h4>
            <h3>High School Degree</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>
          <div className="resume-box">
            <h4>2018 - 2022</h4>
            <h3>Bachelor's Degree</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>
          <div className="resume-box">
            <h4>2018 - 2022</h4>
            <h3>Master Degree</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="resume-col">
        <header className="resume-title">
          <h2>EXPERIENCE</h2>
        </header>
        <div className="resume-contents">
          <div className="resume-box">
            <h4>2018 - 2022</h4>
            <h3>UI/UX Designer</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>
          <div className="resume-box">
            <h4>2018 - 2022</h4>
            <h3>Full-Stack Developer</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>
          <div className="resume-box">
            <h4>2018 - 2022</h4>
            <h3>Frontend Developer</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resume;

