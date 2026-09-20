import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Accordion from '@/components/ui/Accordion';
import styles from './page.module.css';

export const metadata = {
  title: 'FAQs | WhiteAu Bullion',
  description: 'Frequently Asked Questions about selling and releasing pledged gold with WhiteAu.',
};

export default function FAQs() {
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
        "answer": "The process is designed to be simple and transparent:"
    }
];

  return (
    <>
      <Header />
      
      <main className="container section-padding">
        <div className={styles.pageHeader}>
          <h1 className="font-serif">Frequently Asked Questions</h1>
          <p className={styles.intro}>Find answers to the most common questions about selling or releasing your gold.</p>
        </div>

        <div className={styles.faqSection}>
          <h2 className="font-serif">Selling Gold</h2>
          <Accordion items={sellGoldFaqs} />
        </div>

        <div className={styles.faqSection}>
          <h2 className="font-serif">Releasing Pledged Gold</h2>
          <Accordion items={releaseGoldFaqs} />
        </div>
      </main>

      <Footer />
    </>
  );
}
