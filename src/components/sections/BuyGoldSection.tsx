'use client';
import React from 'react';
import InteractiveStepsCard, { StepItem } from '@/components/features/InteractiveStepsCard';
import Accordion from '@/components/ui/Accordion';
import ContactPanel from '@/components/sections/ContactPanel';
import faqStyles from './TwoColumnFaq.module.css';

interface BuyGoldSectionProps {
  showContactPanel?: boolean;
  children?: React.ReactNode;
}

export default function BuyGoldSection({ showContactPanel = true, children }: BuyGoldSectionProps = {}) {
  const [showAllFaqs, setShowAllFaqs] = React.useState(false);

  const buyGoldSteps: StepItem[] = [
    {
      id: '1',
      title: 'Contact Us',
      content: (
        <>
          <strong>Get in Touch with WhiteAu</strong>
          <p>Contact us through our phone, WhatsApp, website or authorised branch. Our team will guide you through the gold-buying process.</p>
        </>
      ),
    },
    {
      id: '2',
      title: 'Choose Your Gold Quantity',
      content: (
        <>
          <strong>Buy Imported 999-Purity Gold Bars</strong>
          <p>All our gold is available in the form of imported 999-purity gold bars (99.9% pure gold). Simply choose the quantity you wish to purchase in grams.</p>
        </>
      ),
    },
    {
      id: '3',
      title: 'Get the Best Gold Price',
      content: (
        <>
          <strong>Competitive Pricing with Complete Transparency</strong>
          <p>WhiteAu strives to offer highly competitive gold prices in the market, inclusive of applicable GST. We provide a clear, detailed price breakdown so you know exactly what you are paying before confirming your trade.</p>
        </>
      ),
    },
    {
      id: '4',
      title: 'Confirm Your Booking',
      content: (
        <>
          <strong>Book Gold at the Agreed Rate</strong>
          <p>Confirm your required quantity and finalise your trade with WhiteAu. Once your booking is confirmed, the agreed trade details and payment deadline will be communicated to you.</p>
          <div style={{ marginTop: '0.75rem' }}>
            <strong>Payment Deadline & Late Payment Fine</strong>
            <p>Payment must be completed within one day of the trade date. If payment is delayed beyond the stipulated period, a late payment fine of ₹500 per day per 100 grams of gold will apply until the outstanding payment is settled in full.</p>
          </div>
        </>
      ),
    },
    {
      id: '5',
      title: 'Complete KYC Verification',
      content: (
        <>
          <strong>Secure and Compliant Transactions</strong>
          <p>All customers must successfully complete the Know Your Customer (KYC) verification process by submitting the required identification documents and accurate details, in accordance with applicable legal and regulatory requirements.</p>
        </>
      ),
    },
    {
      id: '6',
      title: 'Complete Payment',
      content: (
        <>
          <strong>Secure and Hassle-Free Payments</strong>
          <p>Make your payment through WhiteAu's approved payment methods within the stipulated deadline. Once the payment is received and verified, your transaction will be confirmed and the applicable invoice will be issued.</p>
        </>
      ),
    },
    {
      id: '7',
      title: 'Receive Your Gold',
      content: (
        <>
          <strong>Secure Delivery or Convenient Collection</strong>
          <p>Receive your imported 999-purity gold bars at your specified destination through our authorised courier partners, or collect them directly from an authorised WhiteAu branch, subject to availability and delivery terms.</p>
          <div style={{ marginTop: '0.75rem' }}>
            <strong>Certification & Documentation</strong>
            <p>Every purchase will be accompanied by the applicable purchase invoice and imported 999-purity gold bar certificate, along with the relevant product documentation.</p>
          </div>
        </>
      ),
    },
  ];

  const buyGoldFaqs = [
    {
      question: "What form and purity of gold can I buy from WhiteAu?",
      answer: "All our gold is available in the form of imported 999-purity gold bars (99.9% pure gold). You can purchase any required quantity in grams."
    },
    {
      question: "How is the gold purchase price calculated?",
      answer: "WhiteAu provides highly competitive market prices, inclusive of applicable GST. We offer a transparent, itemised price breakdown before you confirm your trade with complete transparency."
    },
    {
      question: "What is the payment deadline after booking gold?",
      answer: "Payment must be completed within one day of the trade date through WhiteAu's approved payment methods. Once payment is received and verified, your transaction is confirmed and an official invoice is issued."
    },
    {
      question: "Is there a fine for delayed payment?",
      answer: "Yes. If payment is delayed beyond the stipulated one-day period, a late payment fine of ₹500 per day per 100 grams of gold will apply until the outstanding payment is settled in full."
    },
    {
      question: "What KYC verification is required to buy gold?",
      answer: "All customers must complete KYC verification by providing a valid government-issued photo ID (such as an Aadhaar Card or Passport) and address proof in accordance with legal and regulatory requirements."
    },
    {
      question: "How do I receive my gold bars?",
      answer: "You can receive your imported 999-purity gold bars delivered securely to your specified destination through authorised courier partners, or collect them directly from an authorised WhiteAu branch."
    },
    {
      question: "Will I get a certificate and invoice for my gold purchase?",
      answer: "Yes. Every purchase is accompanied by the applicable purchase invoice and imported 999-purity gold bar certificate along with all relevant product documentation."
    },
    {
      question: "How do I get in touch to start a purchase?",
      answer: "You can reach us through phone, WhatsApp (+91 70122 88794), our website enquiry form, or by visiting any authorised WhiteAu branch."
    }
  ];

  return (
    <>
      <section className="section-padding">
        <div className="container">
          <InteractiveStepsCard 
            title={<>Buy Gold from WhiteAu<br/><span style={{ color: 'var(--color-gold)' }}>In Seven Easy Steps</span></>}
            subtitle="WhiteAu — Your Trusted Gold Partner."
            steps={buyGoldSteps}
            imageSrc="/images/sell-gold-model.png"
          />
        </div>
      </section>

      {showContactPanel && <ContactPanel type="buy" />}
      {children}

      <section className={faqStyles.faqSection}>
        <div className="container">
          <div className={faqStyles.faqContainer}>
            <div className={faqStyles.faqLeft}>
              <h2 className={faqStyles.faqTitle}>Frequently Asked<br/>Questions</h2>
            </div>
            
            <div className={faqStyles.faqRight}>
              <Accordion items={showAllFaqs ? buyGoldFaqs : buyGoldFaqs.slice(0, 5)} />
              
              <div className={faqStyles.showAllWrapper}>
                <button 
                  className={faqStyles.showAllBtn}
                  onClick={() => setShowAllFaqs(!showAllFaqs)}
                >
                  {showAllFaqs ? 'Show Less ↑' : 'Show All FAQs'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
