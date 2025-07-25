import React from "react";
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react'


export default function Faq() {

  return (
    <>
      <div className="default-width font-[Poppins] mx-auto px-5 pb-20">
        <h2 className="text-2xl poppins-bold text-center tracking-tight pt-8 text-gray-900 mb-3"
          style={{ color: '#ed1016' }} >Frequently Asked Questions</h2>

        <CAccordion flush>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>If I wish to get a cake delivery today, latest by what time should I place the order?</CAccordionHeader>
            <CAccordionBody className="text-black">
              In Gurgaon, we can deliver the cakes to you within 2 to 3 Hrs of receiving the order if the order is placed before 8 pm. However, if done after 8 pm, then the order might be delivered the next day.
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={2}>
            <CAccordionHeader>Do you provide specific time delivery of Cake, if any?</CAccordionHeader>
            <CAccordionBody className="text-black">
              Yes, we do try our best to meet the specific delivery time request if made by the customer; however, there can be deviation of +/- 45 minutes owing to the traffic or other possible factors that are not in our control.
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={3}>
            <CAccordionHeader>Does your website also deliver on Sundays and public holidays?</CAccordionHeader>
            <CAccordionBody className="text-black">
              Book My Cake works on all Sundays and holidays except under uncontrollable situations like bad weather or civil disorder like bandhs or strikes.
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={4}>
            <CAccordionHeader>Do you have an option of eggless cake delivery?</CAccordionHeader>
            <CAccordionBody className="text-black">
              Yes. All the displayed cakes are available in eggless variant as well. They are 100% vegetarian cakes with delicious taste.
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={5}>
            <CAccordionHeader>Can we send messages along with cake?</CAccordionHeader>
            <CAccordionBody className="text-black">
              Of course you can. Book My Cake provides facility of sending personalized messages along with Cake. While placing an order for cake, you get an option of typing your message in a message box.
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={6}>
            <CAccordionHeader>Can I order a customized cake?</CAccordionHeader>
            <CAccordionBody className="text-black">
              Yes, you can customize your cake, as we have photo cakes, where you can upload the best clicked photo and customize it accordingly. For any other customization, you may write to us at info@bookmycake.co or call us on 9990027699
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={7}>
            <CAccordionHeader>Which mode of payment does Book My Cake accept?</CAccordionHeader>
            <CAccordionBody className="text-black">
              Book My Cake accepts all the major payment intermediaries like Visa, Master Card, Maestro, American Express. You can also make the payment through wallets - Paytm, Mobikwik and PayUmoney.
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>

      </div>
    </>
  );
}