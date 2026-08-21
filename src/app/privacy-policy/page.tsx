import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | WhiteAu Bullion',
  description: 'Privacy Policy for WhiteAu Bullion Pvt Ltd.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      
      <main className="container section-padding" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Privacy Policy</h1>
        
        <div style={{ color: 'var(--color-gray)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1rem' }}><strong>Effective Date: 12 August 2026</strong></p>
          
          <p style={{ marginBottom: '2rem' }}>
            At WhiteAu, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website, contact us, make an inquiry, or use our products and services.
          </p>

          <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h3>
          <p style={{ marginBottom: '1rem' }}>Depending on how you interact with WhiteAu, we may collect information that you provide directly to us, including:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '2rem' }}>
            <li>Your name</li>
            <li>Mobile or telephone number</li>
            <li>Email address</li>
            <li>Address</li>
            <li>Information submitted through enquiry or contact forms</li>
          </ul>

          <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem' }}>2. How We Collect Information</h3>
          <p style={{ marginBottom: '1rem' }}>We may collect information when you:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '2rem' }}>
            <li>Submit an enquiry through our website</li>
            <li>Contact us by phone, email, WhatsApp, or other communication channels</li>
            <li>Request a quotation, valuation, or other service</li>
            <li>Purchase or sell products through us</li>
            <li>Visit or use our website</li>
          </ul>

          <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem' }}>3. How We Use Your Information</h3>
          <p style={{ marginBottom: '1rem' }}>WhiteAu may use your personal information to:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '2rem' }}>
            <li>Respond to your enquiries and requests</li>
            <li>Provide information about our products and services</li>
            <li>Provide quotations, valuations, or other requested services</li>
            <li>Process and manage transactions</li>
          </ul>

          <p style={{ marginTop: '3rem', fontSize: '0.9rem' }}>
            This is a summary of our privacy practices. For any questions regarding this Privacy Policy or the way WhiteAu handles personal information, you may contact us through the contact details provided on our website.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
