'use client';
import React from 'react';
import ProcessAccordion, { ProcessGroup } from '@/components/features/ProcessAccordion';
import Accordion from '@/components/ui/Accordion';
import styles from '../ui/ServiceSection.module.css';

export default function ReleaseGoldSection() {
  const [showAllFaqs, setShowAllFaqs] = React.useState(false);

  const releaseGoldGroups: ProcessGroup[] = [
    {
      groupName: 'NINE EASY STEPS',
      steps: [
        {
          id: '1',
          title: 'Visit a White AU',
          content: (
            <>
              <strong>Locate a Branch</strong>
              <p>Locate your nearest White AU branch or connect us through website or call and discuss your gold loan with our team.</p>
            </>
          ),
        },
        {
          id: '2',
          title: 'Submit Your Documents',
          content: (
            <>
              <strong>Required Documents</strong>
              <p>Bring your pledge receipt/gold loan document and valid government-issued photo ID.</p>
            </>
          ),
        },
        {
          id: '3',
          title: 'Complete KYC Verification',
          content: (
            <>
              <strong>Identity Verification</strong>
              <p>Our team will verify your identity and review the relevant gold loan documents.</p>
            </>
          ),
        },
        {
          id: '4',
          title: 'Understand the Gold Rate and Terms',
          content: (
            <>
              <strong>Transparent Terms</strong>
              <p>We will explain the applicable gold rate, release amount, valuation process, and transaction terms.</p>
            </>
          ),
        },
        {
          id: '5',
          title: 'Confirm the Transaction',
          content: (
            <>
              <strong>Authorization</strong>
              <p>After reviewing the terms, you can provide the necessary authorization and complete the required documentation.</p>
            </>
          ),
        },
        {
          id: '6',
          title: 'Visit the Gold Loan Provider',
          content: (
            <>
              <strong>Personal Assistance</strong>
              <p>A White AU representative can accompany you to the concerned bank or finance company to assist with settling the outstanding gold loan and collecting your pledged jewellery.</p>
            </>
          ),
        },
        {
          id: '7',
          title: 'Gold Purity Assessment',
          content: (
            <>
              <strong>Professional Testing</strong>
              <p>Once the jewellery is released, it will be brought to the White AU branch for purity testing and precise weighing.</p>
            </>
          ),
        },
        {
          id: '8',
          title: 'Final Valuation',
          content: (
            <>
              <strong>Accurate Valuation</strong>
              <p>The jewellery will be valued based on its purity, net gold weight, applicable gold rate, and agreed transaction terms.</p>
            </>
          ),
        },
        {
          id: '9',
          title: 'Final Settlement',
          content: (
            <>
              <strong>Instant Payment</strong>
              <p>After completing the valuation and settlement formalities, the applicable amount will be transferred to your bank account.</p>
            </>
          ),
        }
      ]
    }
  ];

  const releaseGoldFaqs = [
    {
        "question": "Does White AU help release pledged gold?",
        "answer": "Yes. White AU can help you close your existing gold loan and release your pledged gold jewellery.Our team will guide you through the required documentation, loan settlement, gold release, purity assessment, valuation, and final settlement process."
    },
    {
        "question": "Can White AU release gold pledged with a bank or finance company?",
        "answer": "Yes. White AU can assist in releasing gold that has been pledged with a bank or finance company.Simply bring your valid pledge receipt or relevant gold loan documents to our branch. After completing the necessary verification and formalities, White AU can arrange the funds required to settle the outstanding loan amount and facilitate the release of your pledged jewellery."
    },
    {
        "question": "What if I am not satisfied with the valuation after my gold is released?",
        "answer": "If you are not satisfied with the valuation offered after your pledged gold is released, you can choose to take back your gold by paying the gold release amount plus 5%, subject to the applicable terms and conditions.This gives you an opportunity to review the valuation before completing the final transaction."
    },
    {
        "question": "What happens if the value of my gold is lower than the amount paid to release it?",
        "answer": "If the final value of your gold is lower than the amount White AU paid to release the pledged jewellery, you will be required to pay the difference amount, as applicable under the agreed terms. Our team will explain the applicable amount and settlement terms before the transaction is finalized."
    },
    {
        "question": "Can I keep some of the gold that has been released?",
        "answer": "Yes, you may be able to retain a portion of your released gold. However, you must inform the White AU branch executive in advance, before the final valuation and settlement, so the necessary arrangements can be made."
    },
    {
        "question": "Will the weight of stones or other materials be deducted during valuation?",
        "answer": "Yes.White AU values the actual gold content of your jewellery. Therefore, the weight of stones, beads, enamel, or other non-gold materials will be deducted when determining the net gold weight. The final valuation is based on the eligible gold weight and purity."
    },
    {
        "question": "Is there a minimum quantity of gold required to release pledged gold?",
        "answer": "No. There is no minimum quantity of gold required for the pledged-gold release service. The transaction will, however, remain subject to the required documentation, verification, and applicable terms."
    },
    {
        "question": "Can White AU release gold loans from multiple locations?",
        "answer": "Yes. White AU can assist with releasing pledged gold from multiple locations. If your gold loan involves more than one branch, bank, or finance company, speak with our team so we can explain the process and documentation required for your specific situation."
    },
    {
        "question": "Will a White AU representative accompany me to the bank or finance company?",
        "answer": "Yes.After the necessary formalities are completed, a White AU representative can accompany you to the concerned bank or finance company. You will authorize the representative to assist with the gold release process. The applicable outstanding loan amount will be settled, and the pledged gold will be collected in your presence. Once the gold has been released, the representative will accompany you back to the White AU branch for the final purity assessment, valuation, and settlement."
    },
    {
        "question": "Can White AU release my gold without a pledge receipt?",
        "answer": "No. A copy of the pledge receipt or relevant gold loan document is required to evaluate and process the pledged gold release. Please carry your pledge receipt when visiting a White AU branch. If you have lost your receipt, contact the concerned branch to understand whether alternative documentation can be accepted."
    },
    {
        "question": "Can I release gold that is pledged in someone else's name?",
        "answer": "No. The person in whose name the gold has been pledged must be present during the release process. The required KYC, authorization, and other formalities must be completed by the person who originally pledged the gold."
    },
    {
        "question": "Can White AU release gold that has already been moved for auction?",
        "answer": "Yes, White AU may be able to assist with gold that has been moved into the auction process. However, such cases are considered on a case-by-case basis. The availability of relevant documents, such as purchase bills and other supporting records, may be required before the transaction can proceed. Please contact a White AU branch so our team can assess your specific case."
    },
    {
        "question": "What types of gold items can I sell to White AU?",
        "answer": "White AU purchases a wide range of eligible gold items. These may include: ● Gold jewellery ● Gold coins ● Gold bars ● Other eligible gold articles The final value depends on factors such as gold purity, net gold weight, prevailing market price, and the applicable terms of the transaction."
    },
    {
        "question": "Why do I need to visit a White AU branch before releasing my pledged gold?",
        "answer": "A branch visit is required because certain takeover, KYC, verification, and documentation formalities must be completed before the pledged gold can be released. Visiting the branch allows our team to: ● Verify your identity and documents ● Review your gold loan details ● Check the pledge receipt ● Explain the release process ● Discuss the applicable gold rate and terms ● Complete the required takeover formalities This helps ensure that the entire process is properly documented and transparent."
    },
    {
        "question": "How does White AU determine the value of my gold jewellery?",
        "answer": "White AU uses advanced gold-testing technology and precision weighing equipment to assess your jewellery. The valuation generally considers: ● Gold purity ● Net gold weight ● Weight of stones and other non-gold materials ● Prevailing gold market price ● Applicable transaction terms Our objective is to provide a clear and transparent valuation based on the actual gold content and prevailing market conditions."
    },
    {
        "question": "What documents do I need to bring to release my pledged gold?",
        "answer": "To begin the process, you should carry your pledge receipt or gold loan document along with a valid government-issued photo ID. Depending on your specific case, additional documents may be required for KYC, ownership verification, or loan settlement. Our branch team will review your documents and let you know if anything additional is required."
    }
];

  return (
    <section className="section-padding">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Release Gold Loan<br/>Nine easy steps</h2>
          <p className={styles.intro} style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--color-gold)' }}>White AU — Release Your Gold. Move Forward.</p>
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
