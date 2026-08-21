'use client';
import React from 'react';
import ProcessAccordion, { ProcessGroup } from './ProcessAccordion';
import Accordion from './Accordion';
import styles from './ServiceSection.module.css'; // Will create a shared CSS for the section wrapper

export default function SellGoldSection() {
  const sellGoldGroups: ProcessGroup[] = [
    {
      groupName: 'AT HOME',
      steps: [
        {
          id: '1',
          title: 'Find a Branch',
          content: (
            <>
              <strong>Contact Us</strong>
              <p>Get in touch with WhiteAu through our phone, WhatsApp, website, or branch. Our team will assist you and guide you through the process.</p>
            </>
          ),
        },
        {
          id: '2',
          title: 'Carry ID Proof',
          content: (
            <>
              <strong>Required Documents</strong>
              <p>For KYC verification, customers should carry the required identification and address documents.</p>
              <strong>Passport</strong>
              <p>A valid passport may be used for verification.</p>
              <strong>Aadhaar Card</strong>
              <p>An Aadhaar Card can be used for convenient KYC verification.</p>
              <strong>Photo ID Proof</strong>
              <p>A valid government-issued photo ID is required.</p>
              <strong>Local Address Proof</strong>
              <p>A valid address proof is required to complete verification.</p>
            </>
          ),
        }
      ]
    },
    {
      groupName: 'AT OUR BRANCH',
      steps: [
        {
          id: '3',
          title: 'Check Gold Purity',
          content: (
            <>
              <strong>Professional Gold Testing</strong>
              <p>Your gold is tested using a secure and professional process to determine its purity accurately.</p>
              <strong>Tamper-Proof Testing</strong>
              <p>Gold is tested through a secure, tamper-proof process.</p>
              <strong>German Testing Machines</strong>
              <p>Advanced German testing machines are used to assess gold purity accurately.</p>
              <strong>Accurate Valuation</strong>
              <p>Your gold is valued based on its verified purity and weight.</p>
            </>
          ),
        },
        {
          id: '4',
          title: 'Check Gold Rate',
          content: (
            <>
              <strong>Transparent Gold Rate</strong>
              <p>Based on the results of the gold purity check, WhiteAu will provide a clear quotation for your gold.</p>
              <strong>Transparent Gold Rate</strong>
              <p>The applicable gold rate is clearly communicated before the transaction.</p>
              <strong>Fair Valuation</strong>
              <p>The quotation is determined based on the verified purity and weight of the gold.</p>
              <strong>No Hidden Charges</strong>
              <p>There should be no unexpected charges or surprises.</p>
            </>
          ),
        },
        {
          id: '5',
          title: 'KYC Verification',
          content: (
            <>
              <strong>Complete KYC Verification</strong>
              <p>Complete a quick and secure KYC verification with the required documents.</p>
              <strong>Photo ID Proof</strong>
              <p>A valid government-issued photo ID is required.</p>
              <strong>Address Proof</strong>
              <p>A valid address proof is required. Aadhaar may serve as both photo ID and address proof.</p>
              <strong>Verification Phone Call</strong>
              <p>As an additional safety and fraud-prevention measure, a verification call to a family member may be required.</p>
            </>
          ),
        },
        {
          id: '6',
          title: 'Instant Payment',
          content: (
            <>
              <strong>Receive Your Payment</strong>
              <p>Once the valuation is approved and KYC is completed, payment will be transferred securely to the customer's bank account.</p>
              <strong>Instant Payment</strong>
              <p>Payment is transferred instantly to the bank account upon completion of the transaction.</p>
              <strong>Secure Bank Transfer</strong>
              <p>Payment is made directly to the customer's bank account.</p>
              <strong>Confirm Before You Leave</strong>
              <p>The customer can confirm the successful transfer before leaving the branch.</p>
            </>
          ),
        },
        {
          id: '7',
          title: 'Earn a Bonus',
          content: (
            <>
              <strong>Original Purchase Bill</strong>
              <p>If the customer has the original purchase bill, they should bring it to help verify the gold.</p>
              <strong>Original Purchase Bill</strong>
              <p>Carry the original purchase bill of the gold for verification.</p>
              <strong>Earn a Reward</strong>
              <p>An additional payment may be available when the original purchase bill is presented, according to the applicable policy.</p>
              <strong>Better Value</strong>
              <p>The customer gets a hassle-free experience with the opportunity to receive better value.</p>
            </>
          ),
        }
      ]
    }
  ];

  const sellGoldFaqs = [
    {
      question: 'What ID Proof is Required For Selling Gold?',
      answer: 'For KYC verification, a valid government-issued photo ID and address proof are required. An Aadhaar Card can serve as both photo ID and address proof.'
    },
    {
      question: 'Can I sell gold for cash?',
      answer: 'Payments are processed instantly and securely through direct bank transfer to the customer\'s bank account. We do not provide cash payments.'
    },
    {
      question: 'What are your Branch Timings?',
      answer: 'Our branch timings are Monday to Saturday, 10:00 AM to 7:00 PM.'
    },
    {
      question: 'Do you work on Sundays?',
      answer: 'Our branches are closed on Sundays.'
    },
    {
      question: 'Can I sell my gold which is without a hallmark?',
      answer: 'Yes, unhallmarked gold can still be evaluated and sold. It is subject to our professional testing for actual purity and weight.'
    },
    {
      question: 'Will you Buy Diamond And Silver?',
      answer: 'WhiteAu specialises exclusively in buying gold. Currently, we do not purchase diamonds or silver.'
    },
    {
      question: 'Mode of Payment?',
      answer: 'Payment is made directly and securely to the customer\'s bank account by instant bank transfer.'
    }
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Sell Gold in Kerala with Seven easy steps</h2>
        </div>
        
        <ProcessAccordion groups={sellGoldGroups} />
        
        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <Accordion items={sellGoldFaqs} />
          
          <div className={styles.showAllWrapper}>
            <button className={styles.showAllBtn}>Show All FAQs</button>
          </div>
        </div>
      </div>
    </section>
  );
}
