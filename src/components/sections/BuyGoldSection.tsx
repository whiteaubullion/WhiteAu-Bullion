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
      question: "What type of gold bars does WhiteAu sell?",
      answer: "WhiteAu offers imported 999-purity gold bars, containing 99.9% pure gold. All products are subject to availability and the specifications stated in their accompanying documentation."
    },
    {
      question: "How can I purchase gold bars from WhiteAu?",
      answer: "Contact us through our website, WhatsApp, phone or an authorised branch. Select your required quantity in grams, receive a detailed price quotation, complete KYC verification and confirm your booking."
    },
    {
      question: "What quantities of gold can I purchase?",
      answer: "You can enquire about the quantity of gold you wish to purchase in grams. Available quantities are subject to stock, supplier availability and confirmation by our team."
    },
    {
      question: "How is the gold price calculated?",
      answer: "Your quotation is based on the applicable gold rate, the quantity purchased and relevant charges. WhiteAu provides a detailed price breakdown, including applicable GST, before you confirm your trade."
    },
    {
      question: "Does the quoted price include GST?",
      answer: "Yes. The quotation provided to you will clearly show the applicable GST and the total amount payable before you confirm your booking."
    },
    {
      question: "How long do I have to pay after booking?",
      answer: "Payment for booked gold trades must be completed within one day of the trade date. Please confirm the applicable deadline with our team when your booking is finalised."
    },
    {
      question: "What happens if I pay late?",
      answer: "A late payment fine of ₹500 per day per 100 grams of gold applies to overdue trades, in accordance with the agreed trade terms. The applicable calculation and payment deadline will be communicated at booking."
    },
    {
      question: "Is KYC verification mandatory?",
      answer: "Yes. Customers must complete the required KYC verification and submit valid identification and other requested information before proceeding, in accordance with applicable legal and regulatory requirements."
    },
    {
      question: "What payment methods can I use?",
      answer: "Payment can be made through WhiteAu's approved payment methods. Our team will share the available options and payment instructions when your trade is confirmed."
    },
    {
      question: "Can I collect my gold in person?",
      answer: "Yes. You can collect your gold bars from an authorised WhiteAu branch, subject to confirmation of your order, payment and collection arrangements."
    },
    {
      question: "Does WhiteAu provide home delivery?",
      answer: "Yes. Delivery can be arranged to your specified destination through an authorised courier partner, subject to service availability, security procedures and agreed delivery terms."
    },
    {
      question: "What documents will I receive with my gold bars?",
      answer: "Your purchase will include the applicable sales invoice and the imported 999-purity gold bar certificate or product documentation available for the specific bar."
    },
    {
      question: "How can I verify the purity of my gold bar?",
      answer: "Check the purity markings, weight, serial number where applicable, and accompanying certificate or refinery documentation. Contact WhiteAu if you need assistance verifying the documents supplied with your purchase."
    },
    {
      question: "Can I book gold bars in advance?",
      answer: "You can enquire about advance bookings with our team. Bookings are subject to availability, the agreed gold rate, payment deadline and applicable trade terms."
    },
    {
      question: "How do I contact WhiteAu for assistance?",
      answer: "Contact our team through the official WhiteAu website, WhatsApp, phone or an authorised branch for current rates, quotations, bookings, payment instructions and delivery information."
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
            imageSrc="/images/sell-gold-model.webp"
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
