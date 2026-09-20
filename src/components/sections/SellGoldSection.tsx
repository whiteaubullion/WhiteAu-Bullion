'use client';
import React from 'react';
import InteractiveStepsCard, { StepItem } from '@/components/features/InteractiveStepsCard';
import Accordion from '@/components/ui/Accordion';
import faqStyles from './TwoColumnFaq.module.css';

export default function SellGoldSection() {
  const [showAllFaqs, setShowAllFaqs] = React.useState(false);

  const sellGoldSteps: StepItem[] = [
    {
      id: '1',
          title: 'Contact Us',
          content: (
            <>
              <strong>Contact Us</strong>
              <p>Get in touch with WhiteAu through our phone, WhatsApp, or website or our office. Our team will assist you and guide you through the process.</p>
            </>
          ),
        },
        {
          id: '2',
          title: 'Bring Your ID Proof',
          content: (
            <>
              <strong>Required Documents</strong>
              <p>For a quick and hassle-free KYC verification, please carry any of the following documents:</p>
              <strong>Passport</strong>
              <p>Carry your valid Passport for fast-track verification.</p>
              <div style={{ textAlign: 'left', margin: '0.5rem 0', fontWeight: 'bold', color: 'var(--color-gold)' }}>OR</div>
              <strong>Aadhaar Card</strong>
              <p>Carry your Aadhaar Card for easy KYC verification.</p>
              <div style={{ textAlign: 'left', margin: '0.5rem 0', fontWeight: 'bold', color: 'var(--color-gold)' }}>AND</div>
              <strong>Photo ID Proof</strong>
              <p>A valid government-issued photo ID is required.</p>
              <div style={{ textAlign: 'left', margin: '0.5rem 0', fontWeight: 'bold', color: 'var(--color-gold)' }}>AND</div>
              <strong>Local Address Proof</strong>
              <p>A valid address proof is required to complete the verification process.</p>
            </>
          ),
        },
        {
          id: '3',
          title: 'Gold Purity Testing',
          content: (
            <>
              <strong>Professional Gold Testing</strong>
              <p>Your gold is tested using a secure and professional process to ensure accurate results.</p>
              <strong>Tamper-Proof Testing</strong>
              <p>Gold is tested through a secure, tamper-proof process.</p>
              <strong>German Testing Machines</strong>
              <p>Advanced German testing machines are used to assess gold purity accurately.</p>
              <strong>Accurate Valuation</strong>
              <p>Your gold is valued based on its verified purity and weight, ensuring a transparent and fair valuation.</p>
            </>
          ),
        },
        {
          id: '4',
          title: 'Check Gold Rate',
          content: (
            <>
              <strong>Transparent Quotation</strong>
              <p>Based on the results of the gold purity check, we will provide you with a clear quotation for your gold.</p>
              <strong>Transparent Gold Rate</strong>
              <p>Our applicable gold rate is clearly communicated to you before the transaction.</p>
              <strong>Fair Valuation</strong>
              <p>Your quotation is determined based on the verified purity and weight of your gold.</p>
              <strong>No Hidden Charges</strong>
              <p>We believe in complete transparency, with no unexpected charges or surprises.</p>
            </>
          ),
        },
        {
          id: '5',
          title: 'Complete KYC Verification',
          content: (
            <>
              <strong>KYC Verification</strong>
              <p>Complete a quick and secure KYC verification with the required documents.</p>
              <strong>Photo ID Proof</strong>
              <p>A valid government-issued photo ID is required for verification.</p>
              <strong>Address Proof</strong>
              <p>A valid address proof is mandatory. Your Aadhaar Card can serve as both Photo ID and Address Proof.</p>
              <strong>Verification Phone Call</strong>
              <p>As an additional safety and fraud-prevention measure, a verification call to a family member may be required.</p>
            </>
          ),
        },
        {
          id: '6',
          title: 'Receive Your Payment',
          content: (
            <>
              <strong>Payment Transfer</strong>
              <p>Once the valuation is approved and the KYC process is completed, your payment will be transferred securely to your bank account.</p>
              <strong>Instant Payment</strong>
              <p>Your payment is transferred instantly to your bank account upon completion of the transaction.</p>
              <strong>Secure Bank Transfer</strong>
              <p>For your security, the payment is made directly to your bank account.</p>
              <strong>Confirm Before You Leave</strong>
              <p>You can confirm the successful transfer of your payment before leaving our branch.</p>
            </>
          ),
        },
        {
          id: '7',
          title: 'Get More With Your Gold',
          content: (
            <>
              <strong>Original Purchase Bill</strong>
              <p>Have your original purchase bill? Bring it with you to help us verify your gold and make your selling experience even more rewarding.</p>
              <strong>Original Purchase Bill</strong>
              <p>Carry the original purchase bill of your gold for verification.</p>
              <strong>Earn a Reward</strong>
              <p>Get an additional payment when you present the original purchase bill, as per our applicable policy.</p>
              <strong>Better Value</strong>
              <p>A hassle-free experience with the opportunity to receive better value for your gold.</p>
            </>
          ),
    }
  ];

  const sellGoldFaqs = [
    {
        "question": "What documents do I need to sell my gold to WhiteAu?",
        "answer": "To sell your gold, you will generally need a valid photo identification document and proof of address. An Aadhaar card can serve both purposes, making the KYC process simple and convenient."
    },
    {
        "question": "Can I receive payment in cash when I sell my gold?",
        "answer": "WhiteAu processes gold-sale payments through bank transfer. Once the valuation and required KYC formalities are completed, the eligible sale amount can be transferred directly to your bank account."
    },
    {
        "question": "What are WhiteAu's branch operating hours?",
        "answer": "Our branches are open from Monday to Saturday, 10:00 AM to 7:00 PM. You can check the WhiteAu website to find the branch nearest to you."
    },
    {
        "question": "Are WhiteAu branches open on Sundays?",
        "answer": "No. Our branches remain closed on Sundays. You can visit us from Monday through Saturday between 10:00 AM and 7:00 PM."
    },
    {
        "question": "Can I sell gold jewellery that does not have a hallmark?",
        "answer": "Yes. Unhallmarked gold can still be evaluated and sold. The amount offered will be determined according to the actual purity and weight of the gold established during the valuation process."
    },
    {
        "question": "Does WhiteAu purchase silver or diamond jewellery?",
        "answer": "No. WhiteAu specialises in buying gold. We currently do not purchase diamonds or silver."
    },
    {
        "question": "How will I receive the money after selling my gold?",
        "answer": "The payment is made directly to your bank account through a bank transfer. The amount is calculated after assessing the purity, weight and other relevant factors affecting the value of your gold."
    },
    {
        "question": "Is selling gold better than taking a gold loan?",
        "answer": "The better option depends on your financial requirements. When you sell your gold, you receive the sale value of the eligible gold. With a gold loan, you typically receive only a percentage of the gold's value as a loan and must repay the borrowed amount along with applicable interest. If you no longer need the jewellery and want to permanently dispose of it, selling may provide a higher immediate amount than borrowing against it."
    },
    {
        "question": "How does WhiteAu determine the value of my gold?",
        "answer": "Your gold is evaluated by checking its purity and accurately measuring its weight. We use advanced testing equipment and precision weighing technology to determine the gold content. The complete valuation and KYC process generally takes around 10–15 minutes."
    },
    {
        "question": "Will testing damage my gold jewellery?",
        "answer": "No. Our gold valuation process is designed to assess your jewellery without causing unnecessary damage to the ornament."
    },
    {
        "question": "Is there a limit to how much gold I can own in India?",
        "answer": "Gold ownership and documentation requirements can depend on the circumstances and applicable Indian laws and regulations. If you have substantial quantities of gold, keeping purchase invoices and other supporting documents is advisable. For specific legal or tax requirements, please consult a qualified professional or refer to the latest applicable government guidance."
    },
    {
        "question": "I am visiting from another city. Can I sell my gold at WhiteAu?",
        "answer": "Yes. Customers from outside the local area can approach our branches to sell eligible gold jewellery. You should carry valid photo identification and address proof for the KYC process. An Aadhaar card can make the verification process easier when it contains the required details."
    },
    {
        "question": "How much money will I receive for my gold?",
        "answer": "The final value depends on several factors, primarily the purity and weight of the gold, along with any documentation that may be relevant to the transaction. A higher purity and accurate weight can affect the amount you receive. Our team will assess your gold and explain the valuation before completing the transaction."
    },
    {
        "question": "Can I get my jewellery back after selling it?",
        "answer": "No. Once the sale has been completed and the transaction has been accepted, the sale is considered final. The jewellery cannot subsequently be reclaimed or repurchased from WhiteAu as the same ornament."
    },
    {
        "question": "Is selling gold a convenient way to access money?",
        "answer": "Yes. Gold is a widely traded asset and can generally be converted into money relatively easily when you choose a reputable gold buyer. At WhiteAu, we aim to make the process straightforward, transparent and convenient."
    },
    {
        "question": "Can I sell broken, damaged or old gold jewellery?",
        "answer": "Yes. Broken or damaged gold jewellery can be considered for sale, subject to our verification and KYC requirements. If you have the original purchase invoice or receipt, we recommend bringing it with you."
    },
    {
        "question": "When should I consider selling my gold?",
        "answer": "There is no single right time for everyone. You may consider selling gold when you have a genuine financial requirement or when you no longer want to keep certain jewellery. Before selling, it is advisable to understand the current gold rate and the expected value of your items."
    },
    {
        "question": "How long does the gold-selling process take?",
        "answer": "The valuation and KYC process is generally completed within 10–15 minutes, although the exact time can vary depending on the quantity and type of jewellery and the documentation provided. Once the transaction is approved, payment is processed through bank transfer."
    },
    {
        "question": "When is the best time to sell gold?",
        "answer": "The decision to sell should depend on your financial needs as well as the prevailing gold market conditions. If you require funds urgently, selling eligible gold jewellery can be a convenient way to access its value."
    },
    {
        "question": "Does WhiteAu charge any transaction fee when I sell gold?",
        "answer": "A 3% transaction fee is applicable to gold-selling transactions. Any applicable charges and the expected payable amount should be clearly communicated during the transaction process."
    },
    {
        "question": "Where can I sell my gold safely?",
        "answer": "You should choose a gold buyer that follows a transparent valuation process, performs proper KYC verification and clearly explains how the final value is calculated. WhiteAu aims to provide a convenient gold-selling experience with transparent valuation, professional testing and direct bank-transfer payments."
    },
    {
        "question": "Is gold valuation free at WhiteAu?",
        "answer": "Yes. WhiteAu provides gold valuation free of charge. Our team assesses the purity and weight of your gold so you can understand its potential value before proceeding with the sale."
    },
    {
        "question": "Can I sell gold belonging to a family member or someone else?",
        "answer": "Gold can only be sold when the ownership and required documentation meet our KYC and transaction requirements. If the gold belongs to your spouse or parents, additional consent or documentation may be required. You cannot simply sell gold belonging to a neighbour, friend or another person without the necessary ownership verification and supporting documents."
    },
    {
        "question": "Why might WhiteAu reject a gold-selling transaction?",
        "answer": "A transaction may be declined if there are issues with the customer's KYC information, the customer does not meet the applicable age requirements, ownership of the gold cannot be satisfactorily established, or the customer is attempting to sell gold on behalf of another person without the required authorization or documentation."
    },
    {
        "question": "How does WhiteAu make the gold-selling process easier?",
        "answer": "We focus on making gold selling simple, transparent and convenient. Our trained team uses modern gold-testing technology to evaluate your jewellery and explain the valuation process clearly, helping you make an informed decision."
    },
    {
        "question": "Can I sell gold if I don't have the original purchase bill?",
        "answer": "Yes, gold may be accepted even when you do not have the original purchase receipt, subject to our KYC and verification requirements. However, if you have the original purchase invoice or supporting documentation, bringing it with you may help establish the history and ownership of the gold."
    },
    {
        "question": "Why should I choose WhiteAu to sell my old gold?",
        "answer": "WhiteAu is committed to providing a transparent and convenient gold-selling experience. We offer free valuation, modern testing technology and a straightforward transaction process. If you are looking to convert your old, unused or unwanted gold into money, WhiteAu can help you understand the value of your gold and complete the selling process with clarity and convenience."
    }
  ];

  return (
    <>
      <section className="section-padding">
        <div className="container">
          <InteractiveStepsCard 
            title={<>Sell Gold in Bangalore with<br/><span style={{ color: 'var(--color-gold)' }}>Seven easy steps</span></>}
            steps={sellGoldSteps}
            imageSrc="/images/sell-gold-model.png"
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
              <Accordion items={showAllFaqs ? sellGoldFaqs : sellGoldFaqs.slice(0, 5)} />
              
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
