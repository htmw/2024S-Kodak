import React from "react";
import "/Users/yashjani/Documents/Code/Shp1/SmartHirePro1/src/pages/About/About.css";

function About() {
  
  const handleSubmit = (event) => {
    event.preventDefault();
   
    alert("Thank you for contacting us! We'll get back to you soon.");
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <h1 style={{ textAlign: 'left' }}>About SmartHirePro</h1>
      <p style={{ textAlign: 'left' }}>Welcome to SmartHirePro, your ultimate destination for career advancement and job opportunities.</p>
      <p style={{ textAlign: 'left' }}>At SmartHirePro, we understand the challenges of job hunting and aim to simplify the process for you. Our platform revolutionizes the way individuals find employment by leveraging advanced technology and cutting-edge features.</p>
      
      <p style={{ textAlign: 'left' }}>Whether you're seeking your first job, exploring new opportunities, or aiming for career advancement, SmartHirePro is your trusted partner every step of the way. Join our community today and unlock a world of possibilities!</p>
      <p style={{ textAlign: 'left' }}>Empower your career with SmartHirePro.</p>

      {/* Contact Information */}
      <div>
        <h2 style={{ textAlign: 'left' }}>Contact Us</h2>
        <p style={{ textAlign: 'left' }}>Email: info@smarthirepro.com</p>
        <p style={{ textAlign: 'left' }}>Phone: +1 (123) 456-7890</p>
      </div>

      {/* Contact Form */}
      <div>
        <h2>Get in Touch</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default About;
