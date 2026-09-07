import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import ContactForm from '@/components/ui/ContactForm';
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
            <ContactForm />
          </div>
        </div>


      </main>

      <Footer />
    </>
  );
}
