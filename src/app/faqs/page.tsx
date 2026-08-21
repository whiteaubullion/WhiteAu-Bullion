import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Accordion from '@/components/Accordion';
import styles from './page.module.css';

export const metadata = {
  title: 'FAQs | WhiteAu Bullion',
  description: 'Frequently Asked Questions about selling and releasing pledged gold with WhiteAu.',
};

export default function FAQs() {
  const sellGoldFaqs = [
    { question: "What documents do I need to sell my gold?", answer: "To sell your gold, you will generally need a valid photo identification document and proof of address. An Aadhaar card can serve both purposes, making the KYC process simple and convenient." },
    { question: "Can I receive payment in cash?", answer: "WhiteAu processes gold-sale payments through bank transfer. Once the valuation and required KYC formalities are completed, the eligible sale amount can be transferred directly to your bank account." },
    { question: "Does WhiteAu buy silver or diamond jewellery?", answer: "No. WhiteAu specialises in buying gold. We currently do not purchase diamonds or silver." },
    { question: "Can I sell gold without a hallmark?", answer: "Yes. Unhallmarked gold can still be evaluated and sold. The amount offered will be determined according to the actual purity and weight of the gold established during the valuation process." },
    { question: "Is selling gold better than a gold loan?", answer: "The better option depends on your financial requirements. When you sell your gold, you receive the sale value of the eligible gold. With a gold loan, you typically receive only a percentage of the gold's value as a loan and must repay the borrowed amount along with applicable interest." },
    { question: "How is the value of my gold determined?", answer: "Your gold is evaluated by checking its purity and accurately measuring its weight. We use advanced testing equipment and precision weighing technology to determine the gold content." },
    { question: "Will testing damage my jewellery?", answer: "No. Our gold valuation process is designed to assess your jewellery without causing unnecessary damage to the ornament." },
    { question: "Does WhiteAu charge a transaction fee?", answer: "A 3% transaction fee is applicable to gold-selling transactions. Any applicable charges and the expected payable amount should be clearly communicated during the transaction process." },
    { question: "What are your branch hours?", answer: "Our branches are open from Monday to Saturday, 10:00 AM to 7:00 PM. We remain closed on Sundays." },
    { question: "Can I sell gold on behalf of a family member?", answer: "Gold can only be sold when the ownership and required documentation meet our KYC and transaction requirements. If the gold belongs to your spouse or parents, additional consent or documentation may be required." }
  ];

  const releaseGoldFaqs = [
    { question: "Does WhiteAu help release pledged gold?", answer: "Yes. WhiteAu can help you close your existing gold loan and release your pledged gold jewellery. Our team will guide you through the required documentation, loan settlement, gold release, purity assessment, valuation, and final settlement process." },
    { question: "Can you release gold pledged with a bank or finance company?", answer: "Yes. WhiteAu can assist in releasing gold that has been pledged with a bank or finance company. Simply bring your valid pledge receipt or relevant gold loan documents to our branch." },
    { question: "What if I'm not satisfied with the valuation after release?", answer: "If you are not satisfied with the valuation offered after your pledged gold is released, you can choose to take back your gold by paying the gold release amount plus 5%, subject to the applicable terms and conditions." },
    { question: "What happens if the released gold's value is lower than expected?", answer: "If the final value of your gold is lower than the amount WhiteAu paid to release the pledged jewellery, you will be required to pay the difference amount, as applicable under the agreed terms." },
    { question: "Do I need the pledge receipt to start the process?", answer: "Yes. To release your pledged gold, you will need the pledge receipt issued by your gold loan provider." },
    { question: "Can someone else release gold pledged in my name?", answer: "No. The person in whose name the gold has been pledged must be present during the release process." },
    { question: "Is there a minimum quantity required?", answer: "No. There is no minimum quantity of gold required for the pledged-gold release service." },
    { question: "Will a WhiteAu representative accompany me to the bank?", answer: "Yes. After the necessary formalities are completed, a WhiteAu representative can accompany you to the concerned bank or finance company to assist with settling the outstanding gold loan." }
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
