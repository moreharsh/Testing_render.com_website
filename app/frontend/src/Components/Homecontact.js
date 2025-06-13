import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Homecontact.css';

const HomeContact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_0swpn09',
        'template_e7i4hak',
        form.current,
        'Wqz3DA5EcUAVbl8qS'
      )
      .then(
        (result) => {
          console.log(result.text);
          setSent(true);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2>Get in Touch</h2>
        <p className="contact-subtext">
          We'd love to hear from you — whether you have a question, feedback, or just want to say hi.
        </p>

        <form ref={form} className="contact-form" onSubmit={sendEmail}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows="6" required />
          <button type="submit">Send Message</button>
        </form>

        {sent && <p className="success-msg">Thank you! Your message has been sent.</p>}
      </div>
    </section>
  );
};

export default HomeContact;
