import React from "react";
import "../Styling/Contact.css";

const Contact = () => {
  return (
    <>
      <div className="contact-section">
        <h1 className="contact-heading">Get In Touch</h1>
        {/* Top Contact Information Cards */}
        <div className="contact-info-cards">
          <div className="info-card">
            <span className="info-icon">📧</span>
            <p>Contact@spcreation.in</p>
            <p>support@spcreation.in</p>
          </div>
          <div className="info-card">
            <span className="info-icon">📞</span>
            <p>+91-7389250020</p>
            <p>+91-7389250030</p>
            <p>+91-7062321237</p>
          </div>
          <div className="info-card">
            <span className="info-icon">📍</span>
            <p>20, Juna Tukoganj, Opp. Rambagh Petrol Pump, Indore</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form-container">
          <h2>Have questions? Get in Touch</h2>
          <p>
            Connect with us and get updates and know everything about our collection
            that will fulfill all your prayer needs.
          </p>
          <form className="contact-form">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your name *"
                required
              />
              <input
                type="email"
                className="form-control"
                placeholder="Your email *"
                required
              />
            </div>
            <input
              type="text"
              className="form-control full-width"
              placeholder="Subject *"
              required
            />
            <textarea
              className="form-control full-width"
              rows="5"
              placeholder="Your message"
              required
            ></textarea>
            <button type="submit" className="send-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
