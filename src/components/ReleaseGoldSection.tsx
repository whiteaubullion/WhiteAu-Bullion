'use client';
import React from 'react';
import ProcessAccordion, { ProcessGroup } from './ProcessAccordion';
import Accordion from './Accordion';
import styles from './ServiceSection.module.css';

export default function ReleaseGoldSection() {
  const [showAllFaqs, setShowAllFaqs] = React.useState(false);

  const releaseGoldGroups: ProcessGroup[] = [
    {
      groupName: 'AT HOME',
      steps: [
        {
          id: '1',
          title: 'Bring Pledge Receipt',
          content: (
            <>
              <strong>Check Your Loan Documents</strong>
              <p>Bring the original pledge receipt issued by your gold loan provider.</p>
              <p>The pledge receipt/gold loan document is required to begin the pledged-gold release process.</p>
            </>
          ),
        },
        {
          id: '2',
          title: 'Carry ID Proof',
          content: (
            <>
              <strong>Identification & Address Proof</strong>
              <p>Bring a valid government-issued ID.</p>
              <strong>Passport</strong>
              <p>Valid passport for verification.</p>
              <strong>Aadhaar Card</strong>
              <p>Can be used for KYC verification.</p>
              <strong>Address Proof</strong>
              <p>A valid address proof may be required.</p>
            </>
          ),
        },
        {
          id: '3',
          title: 'Find a Branch',
          content: (
            <>
              <strong>Visit WhiteAu</strong>
              <p>Locate your nearest WhiteAu branch and discuss your gold loan with the team.</p>
              <p>The branch visit allows WhiteAu to verify identity/documents, review gold-loan details, check the pledge receipt and explain the release process.</p>
            </>
          ),
        }
      ]
    },
    {
      groupName: 'AT OUR BRANCH',
      steps: [
        {
          id: '4',
          title: 'KYC Verification',
          content: (
            <>
              <strong>Complete KYC Verification</strong>
              <p>Complete secure KYC verification before proceeding.</p>
              <strong>Photo ID Proof</strong>
              <p>A valid government-issued photo ID.</p>
              <strong>Address Proof</strong>
              <p>A valid address proof.</p>
              <strong>Verification Call</strong>
              <p>A verification call may be required as an additional security measure.</p>
            </>
          ),
        },
        {
          id: '5',
          title: 'Check Gold Rate',
          content: (
            <>
              <strong>Transparent Gold Rate</strong>
              <p>Based on the purity of the gold, WhiteAu will provide a clear quotation.</p>
              <p>The applicable rate and transaction details should be clearly communicated before proceeding.</p>
            </>
          ),
        }
      ]
    },
    {
      groupName: 'VISIT GOLD LOAN PROVIDER',
      steps: [
        {
          id: '6',
          title: 'Release Your Gold',
          content: (
            <>
              <strong>Complete Your Gold Loan Closure</strong>
              <p>WhiteAu's team will guide the customer through the required steps to close the existing gold loan and arrange for release of the pledged gold.</p>
              <strong>Complete Documentation</strong>
              <strong>Confirm the Applicable Gold Rate</strong>
              <strong>Sign the Required Documents</strong>
              <strong>Personal Assistance</strong>
              <p>A WhiteAu representative can assist with the process and coordinate with the gold-loan provider.</p>
            </>
          ),
        }
      ]
    },
    {
      groupName: 'AT OUR BRANCH',
      steps: [
        {
          id: '7',
          title: 'Check Gold Purity',
          content: (
            <>
              <strong>Professional Gold Testing</strong>
              <p>The released gold is professionally tested to determine purity accurately.</p>
              <strong>Tamper-Proof Testing</strong>
              <strong>German Testing Machines</strong>
              <strong>Accurate Valuation</strong>
              <p>The valuation considers verified purity and weight.</p>
            </>
          ),
        },
        {
          id: '8',
          title: 'Instant Payment',
          content: (
            <>
              <strong>Secure Bank Transfer</strong>
              <p>Once the valuation and settlement formalities are complete, the applicable amount is transferred to the customer's bank account.</p>
              <p>The customer can confirm the transfer before leaving the branch.</p>
            </>
          ),
        }
      ]
    }
  ];

  const releaseGoldFaqs = [
    { question: 'WhiteAu Will Help Release Your Pledged Gold', answer: 'WhiteAu assists customers in releasing their pledged gold from banks or financial institutions by providing the necessary funds and guidance.' },
    { question: 'How WhiteAu Can Help Release Your Pledged Gold?', answer: 'WhiteAu helps by evaluating your gold loan, providing funds to close it, and guiding you through the release process before purchasing the gold.' },
    { question: 'Do you Release Pledged Gold?', answer: 'Yes, WhiteAu provides services to help release gold that has been pledged for loans.' },
    { question: 'Can you release Gold which has already been pledged in a Bank or Finance company?', answer: 'Yes, we can assist in releasing gold pledged in a bank or finance company.' },
    { question: 'What if I am not satisfied with the valuation after my gold is released?', answer: 'If you are not satisfied with the valuation, you are under no obligation to proceed with selling the gold.' },
    { question: 'What if the value of my gold is lower than the amount paid to release it?', answer: 'If the gold value is lower than the release amount, the customer is responsible for the difference.' },
    { question: 'Can I keep some part of my Gold which has been released?', answer: 'Yes, after settling the release amount, you may keep a portion of the gold.' },
    { question: 'Will the weight of stones or other materials be deducted during valuation?', answer: 'Yes, the weight of stones, enamel, or other non-gold materials is deducted to determine the net gold weight.' },
    { question: 'Is there a minimum quantity of gold required to release pledged gold?', answer: 'Please contact your nearest branch, as minimum quantity requirements may vary based on the loan amount.' },
    { question: 'Can WhiteAu release gold loans from multiple locations?', answer: 'Yes, we can assist with releasing gold loans from multiple locations, provided all documentation is in order.' },
    { question: 'Will a WhiteAu representative accompany me to the bank or finance company?', answer: 'Yes, a WhiteAu representative can personally assist and accompany you to coordinate with the gold-loan provider.' },
    { question: 'Can WhiteAu release my gold without a pledge receipt?', answer: 'The original pledge receipt is generally required. Contact us to discuss alternative options if it is missing.' },
    { question: 'Can I release gold that is pledged in someone else\'s name?', answer: 'Releasing gold pledged in someone else\'s name may require explicit authorization or the presence of the pledge holder.' },
    { question: 'Can WhiteAu release gold that has already been moved for auction?', answer: 'This depends on the specific bank\'s policies. Contact us immediately so we can evaluate the situation.' },
    { question: 'What documents do I need to bring to release my pledged gold?', answer: 'You need to bring the original pledge receipt, a valid government-issued photo ID (like a Passport or Aadhaar Card), and a valid address proof.' },
    { question: 'What is the process for releasing pledged gold through WhiteAu?', answer: 'The process involves: 1. Bringing your documents. 2. KYC Verification. 3. Checking the gold rate. 4. Closing the loan with our assistance. 5. Purity testing. 6. Final instant payment.' }
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Release Gold Loan<br/>Eight easy steps</h2>
        </div>
        
        <ProcessAccordion groups={releaseGoldGroups} />
        
        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <Accordion items={showAllFaqs ? releaseGoldFaqs : releaseGoldFaqs.slice(0, 3)} />
          
          <div className={styles.showAllWrapper}>
            <button 
              className={styles.showAllBtn}
              onClick={() => setShowAllFaqs(!showAllFaqs)}
            >
              {showAllFaqs ? 'Show Less ↑' : 'Show All FAQs ↓'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
