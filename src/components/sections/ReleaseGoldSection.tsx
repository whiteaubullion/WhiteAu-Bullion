'use client';
import React from 'react';
import InteractiveStepsCard, { StepItem } from '@/components/features/InteractiveStepsCard';
import Accordion from '@/components/ui/Accordion';
import faqStyles from './TwoColumnFaq.module.css';

export default function ReleaseGoldSection() {
  const [showAllFaqs, setShowAllFaqs] = React.useState(false);

  const releaseGoldSteps: StepItem[] = [
    {
      id: '1',
      title: 'Bring Your Pledge Receipt',
      content: (
        <>
          <strong>Check Your Loan Documents</strong>
          <p>Locate your original pledge receipt and keep it ready for the process.</p>
        </>
      ),
    },
    {
      id: '2',
      title: 'Carry Your ID Proof',
      content: (
        <>
          <p>Bring a valid government-issued ID for identification and verification.</p>
          <strong>Passport</strong>
          <p>Carry your Passport for verification.</p>
          <div style={{ textAlign: 'left', margin: '0.5rem 0', fontWeight: 'bold', color: 'var(--color-gold)' }}>OR</div>
          <strong>Aadhaar Card</strong>
          <p>Your Aadhaar Card can be used for quick KYC verification.</p>
          <div style={{ textAlign: 'left', margin: '0.5rem 0', fontWeight: 'bold', color: 'var(--color-gold)' }}>AND</div>
          <strong>Address Proof</strong>
          <p>A valid address proof may be required to complete the process.</p>
        </>
      ),
    },
    {
      id: '3',
      title: 'Complete KYC Verification',
      content: (
        <>
          <p>Complete a secure KYC verification before proceeding with the gold loan release.</p>
          <strong>Photo ID Proof</strong>
          <p>A valid government-issued photo ID is required.</p>
          <strong>Address Proof</strong>
          <p>A valid address proof is required. Your Aadhaar Card can serve as both.</p>
          <strong>Verification Call</strong>
          <p>As an additional security measure, a verification call may be required to confirm the transaction.</p>
        </>
      ),
    },
    {
      id: '4',
      title: 'Check Gold Rate',
      content: (
        <>
          <p>Based on the purity of your gold, we will provide you with a clear quotation. Our gold rate is transparent and communicated upfront.</p>
        </>
      ),
    },
    {
      id: '5',
      title: 'Complete Your Gold Loan Closure',
      content: (
        <>
          <p>Our team will guide you through the required steps to close your existing gold loan and arrange for the release of your pledged gold.</p>
          <strong>Complete Documentation</strong>
          <p>Complete the necessary documentation for the loan closure.</p>
          <strong>Confirm the Applicable Gold Rate</strong>
          <p>The applicable rate and transaction details will be clearly communicated before proceeding.</p>
          <strong>Sign the Required Documents</strong>
          <p>Review and sign the necessary documents(Term Sheet) to complete the process.</p>
        </>
      ),
    },
    {
      id: '6',
      title: 'Meet Our Representative',
      content: (
        <>
          <p>A WhiteAu representative will assist you throughout the gold loan closure process and coordinate with the gold loan provider.</p>
          <strong>Personal Assistance</strong>
          <p>Our representative will guide you through the required steps.</p>
          <strong>Hassle-Free Process</strong>
          <p>We help simplify the process from documentation to gold release.</p>
        </>
      ),
    },
    {
      id: '7',
      title: 'Check Gold Purity',
      content: (
        <>
          <p>Your gold will be professionally tested to determine its purity accurately. Our testing process is secure, reliable, and transparent.</p>
          <strong>Tamper-Proof Testing</strong>
          <p>Secure testing procedures ensure the integrity of the valuation process.</p>
          <strong>German Testing Machines</strong>
          <p>We use advanced German testing machines for accurate purity assessment.</p>
          <strong>Accurate Valuation</strong>
          <p>The verified purity and weight of your gold help us determine its accurate value.</p>
        </>
      ),
    },
    {
      id: '8',
      title: 'Instant Payment',
      content: (
        <>
          <p>For your security, we transfer the money to your bank account. You can confirm the money transfer before leaving our branch.</p>
        </>
      ),
    },
    {
      id: '9',
      title: 'Customer Satisfaction & Gold Return',
      content: (
        <>
          <p>If you are not satisfied with the transaction or valuation, you can pay us the Gold Release Value plus the applicable percentage deduction and take back your gold.</p>
        </>
      ),
    }
  ];

  const releaseGoldFaqs = [
    {
        "question": "Does WhiteAu help release pledged gold?",
        "answer": "Yes. WhiteAu can help you close your existing gold loan and release your pledged gold jewellery.Our team will guide you through the required documentation, loan settlement, gold release, purity assessment, valuation, and final settlement process."
    },
    {
        "question": "Can WhiteAu release gold pledged with a bank or finance company?",
        "answer": "Yes. WhiteAu can assist in releasing gold that has been pledged with a bank or finance company.Simply bring your valid pledge receipt or relevant gold loan documents to our branch. After completing the necessary verification and formalities, WhiteAu can arrange the funds required to settle the outstanding loan amount and facilitate the release of your pledged jewellery."
    },
    {
        "question": "What if I am not satisfied with the valuation after my gold is released?",
        "answer": "If you are not satisfied with the valuation offered after your pledged gold is released, you can choose to take back your gold by paying the gold release amount plus 5%, subject to the applicable terms and conditions.This gives you an opportunity to review the valuation before completing the final transaction."
    },
    {
        "question": "What happens if the value of my gold is lower than the amount paid to release it?",
        "answer": "If the final value of your gold is lower than the amount WhiteAu paid to release the pledged jewellery, you will be required to pay the difference amount, as applicable under the agreed terms. Our team will explain the applicable amount and settlement terms before the transaction is finalized."
    },
    {
        "question": "Can I keep some of the gold that has been released?",
        "answer": "Yes, you may be able to retain a portion of your released gold. However, you must inform the WhiteAu branch executive in advance, before the final valuation and settlement, so the necessary arrangements can be made."
    },
    {
        "question": "Will the weight of stones or other materials be deducted during valuation?",
        "answer": "Yes.WhiteAu values the actual gold content of your jewellery. Therefore, the weight of stones, beads, enamel, or other non-gold materials will be deducted when determining the net gold weight. The final valuation is based on the eligible gold weight and purity."
    },
    {
        "question": "Is there a minimum quantity of gold required to release pledged gold?",
        "answer": "No. There is no minimum quantity of gold required for the pledged-gold release service. The transaction will, however, remain subject to the required documentation, verification, and applicable terms."
    },
    {
        "question": "Can WhiteAu release gold loans from multiple locations?",
        "answer": "Yes. WhiteAu can assist with releasing pledged gold from multiple locations. If your gold loan involves more than one branch, bank, or finance company, speak with our team so we can explain the process and documentation required for your specific situation."
    },
    {
        "question": "Will a WhiteAu representative accompany me to the bank or finance company?",
        "answer": "Yes.After the necessary formalities are completed, a WhiteAu representative can accompany you to the concerned bank or finance company. You will authorize the representative to assist with the gold release process. The applicable outstanding loan amount will be settled, and the pledged gold will be collected in your presence. Once the gold has been released, the representative will accompany you back to the WhiteAu branch for the final purity assessment, valuation, and settlement."
    },
    {
        "question": "Can WhiteAu release my gold without a pledge receipt?",
        "answer": "No. A copy of the pledge receipt or relevant gold loan document is required to evaluate and process the pledged gold release. Please carry your pledge receipt when visiting a WhiteAu branch. If you have lost your receipt, contact the concerned branch to understand whether alternative documentation can be accepted."
    },
    {
        "question": "Can I release gold that is pledged in someone else's name?",
        "answer": "No. The person in whose name the gold has been pledged must be present during the release process. The required KYC, authorization, and other formalities must be completed by the person who originally pledged the gold."
    },
    {
        "question": "Can WhiteAu release gold that has already been moved for auction?",
        "answer": "Yes, WhiteAu may be able to assist with gold that has been moved into the auction process. However, such cases are considered on a case-by-case basis. The availability of relevant documents, such as purchase bills and other supporting records, may be required before the transaction can proceed. Please contact a WhiteAu branch so our team can assess your specific case."
    },
    {
        "question": "What types of gold items can I sell to WhiteAu?",
        "answer": "WhiteAu purchases a wide range of eligible gold items. These may include: ● Gold jewellery ● Gold coins ● Gold bars ● Other eligible gold articles The final value depends on factors such as gold purity, net gold weight, prevailing market price, and the applicable terms of the transaction."
    },
    {
        "question": "Why do I need to visit a WhiteAu branch before releasing my pledged gold?",
        "answer": "A branch visit is required because certain takeover, KYC, verification, and documentation formalities must be completed before the pledged gold can be released. Visiting the branch allows our team to: ● Verify your identity and documents ● Review your gold loan details ● Check the pledge receipt ● Explain the release process ● Discuss the applicable gold rate and terms ● Complete the required takeover formalities This helps ensure that the entire process is properly documented and transparent."
    },
    {
        "question": "How does WhiteAu determine the value of my gold jewellery?",
        "answer": "WhiteAu uses advanced gold-testing technology and precision weighing equipment to assess your jewellery. The valuation generally considers: ● Gold purity ● Net gold weight ● Weight of stones and other non-gold materials ● Prevailing gold market price ● Applicable transaction terms Our objective is to provide a clear and transparent valuation based on the actual gold content and prevailing market conditions."
    },
    {
        "question": "What documents do I need to bring to release my pledged gold?",
        "answer": "To begin the process, you should carry your pledge receipt or gold loan document along with a valid government-issued photo ID. Depending on your specific case, additional documents may be required for KYC, ownership verification, or loan settlement. Our branch team will review your documents and let you know if anything additional is required."
    },
    {
        "question": "What is the process for releasing pledged gold through WhiteAu?",
        "answer": "The process is designed to be simple and transparent: Step 1 – Visit a WhiteAu Branch. Step 2 – Submit Your Documents. Step 3 – Complete KYC Verification. Step 4 – Understand the Gold Rate and Terms. Step 5 – Confirm the Transaction. Step 6 – Visit the Gold Loan Provider. Step 7 – Gold Purity Assessment. Step 8 – Final Valuation. Step 9 – Final Settlement."
    }
];

  return (
    <>
      <section className="section-padding">
        <div className="container">
          <InteractiveStepsCard 
            title={<>Release Gold Loan<br/><span style={{ color: 'var(--color-gold)' }}>Nine easy steps</span></>}
            subtitle="WhiteAu — Release Your Gold. Move Forward."
            steps={releaseGoldSteps}
            imageSrc="/why-model.webp"
          />
        </div>
      </section>

      <section className={faqStyles.faqSection}>
        <div className="container">
          <div className={faqStyles.faqContainer}>
            <div className={faqStyles.faqLeft}>
              <h2 className={faqStyles.faqTitle}>Frequently Asked<br/>Questions</h2>
            </div>
            
            <div className={faqStyles.faqRight}>
              <Accordion items={showAllFaqs ? releaseGoldFaqs : releaseGoldFaqs.slice(0, 5)} />
              
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
