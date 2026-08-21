import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import styles from './page.module.css';

export const metadata = {
  title: 'Contact Us | WhiteAu Bullion',
  description: 'Get in touch with WhiteAu Bullion Pvt Ltd. Visit our branch in Cherthala, Kerala.',
};

export default function Contact() {
  return (
    <>
      <Header />
      
      <main className="container section-padding">
        <div className={styles.pageHeader}>
          <h1 className="font-serif">Let's Talk Gold.</h1>
          <p className={styles.intro}>Have a question or ready to sell your gold? We are here to help.</p>
        </div>

        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <div className={styles.infoBlock}>
              <h3 className="font-serif text-gold">Visit Us</h3>
              <p>
                WhiteAu Bullion Pvt Ltd<br/>
                Poonjikkavil, S N Puram P.O.,<br/>
                Cherthala, Kerala — 688582
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h3 className="font-serif text-gold">Contact Details</h3>
              <p>
                <a href="tel:+917012288794">+91 70122 88794</a><br/>
                <a href="mailto:sairajpr.whiteau@gmail.com">sairajpr.whiteau@gmail.com</a>
              </p>
            </div>

            <div className={styles.actionButtons}>
              <Button href="tel:+917012288794" variant="primary">Call Us</Button>
              <Button href="https://wa.me/917012288794" variant="outline">WhatsApp</Button>
            </div>
          </div>

          <div className={styles.contactForm}>
            <h3 className="font-serif">Send an Enquiry</h3>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your Name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" placeholder="Your Phone Number" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={4} placeholder="How can we help you?" required></textarea>
              </div>
              <Button variant="primary">Submit Enquiry</Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
