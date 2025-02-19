import React from "react";
import "../Styling/About.css"; // Updated CSS
import AboutProfile from "../assets/apcreation-web-logo.jpeg";
import AboutProfiless from "../assets/46.jpeg";

const About = () => {
  return (
    <>
      {/* Section 1: AP Creation Introduction */}
      <div className="about-container">
        <div className="about-image">
          <img src={AboutProfile} alt="AP Creation Logo" />
        </div>
        <div className="about-text">
          <h1>
            AP CREATION FROM THE START<span>!</span>
          </h1>
          <p>
            AP Creation is a one-stop online destination store bringing to you
            the best of complete range of Pooja Articles following all the
            Sahaja Yoga Norms at pocket-friendly prices. We are committed to do
            whatever it takes to help our customers from all over the globe to
            meet all their requirements while performing “pooja,” keeping our
            core principles, values, culture, and ethics alive by offering
            high-quality pooja articles and accessories.
          </p>
          <p>
            Today we have more than 200 products ranging from Shri Mataji’s
            Photo to Hindu Calendars to religious Video CDs, to Aasan Chunri,
            Brass Pooja Articles, to Car Articles to Silver and Gold Pendants,
            and much more. With our hard work, dedication, and commitment, we
            are renowned, honorable, and a trusted name in manufacturing a real
            extensive range of aesthetic puja articles that truly are highly
            auspicious and sacred.
          </p>
        </div>
      </div>

      {/* Section 2: Our Journey */}
      <div className="about-container reverse">
        <div className="about-text">
          <h1>
            Our Journey<span>!</span>
          </h1>
          <p>
            Taking the passion and guiding principles of our Proprietor Mr.
            Rajesh Agrawal, who was blessed with self-realization in 2008, we
            started manufacturing Sahaj articles in the year 2009. The story of
            AP Creation started with a realization and a strong concern—it was
            the concern about the expensive Puja Articles violating Sahaj Norms
            sold in the market.
          </p>
          <p>
            His vision and mission was to bring high-quality Puja Articles
            following all the Sahaj Norms within the reach of every common man.
            Taking his objective to the next level, today we are known for our
            flagship principles and ethics, bringing positive vibes through our
            high-quality Pooja Articles at your fingertips through AP Creation.
          </p>
        </div>
        <div className="about-image">
          <img src={AboutProfiless} alt="Our Journey Image" />
        </div>
      </div>
            {/* Why AP Creation? Section */}
            <div className="features-section">
        <h2>Why AP Creation?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-rocket"></i>
            <p>48 Hours Dispatch</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-question-circle"></i>
            <p>No Questions Return Policy</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-wallet"></i>
            <p>Pocket Friendly Prices</p>
          </div>
        </div>
      </div>

      {/* Our Assurance Section */}
      <div className="features-section assurance">
        <h2>Our Assurance</h2>
        <div className="features-grid">
          <div className="feature-card"> 
            <i className="fas fa-pencil-alt"></i>
            <p>No Edits in Shree Mataji's Photos</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-ban"></i>
            <p>No Plastic in Any Products</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-industry"></i>
            <p>In-House Production Following Sahaj Protocols</p>
          </div>
        </div>
      </div>

    </>
  );
};

export default About;
