import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
 
export default function Faq() {
    const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
    <div className="default-width font-[Poppins] mx-auto px-5 pb-20">  
        <h2 className="text-2xl poppins-bold text-center tracking-tight pt-8 text-gray-900 mb-3"
          style={{ color: '#ed1016' }} >Frequently Asked Questions</h2>
       
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}
        className={`cursor-pointer border-b border-gray-300 ${open === 1 ? 'text-[#ed1016]' : 'text-gray-800'}`}>
            If I wish to get a cake delivery today, latest by what time should I place the order?</AccordionHeader>
        <AccordionBody className="text-md">
         In Gurgaon, we can deliver the cakes to you within 2 to 3 Hrs of receiving the order if the order is placed before 8 pm. However, if done after 8 pm, then the order might be delivered the next day.
        </AccordionBody>
      </Accordion>
 
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}
        className={`cursor-pointer border-b border-gray-300 ${open === 2 ? 'text-[#ed1016]' : 'text-gray-800'}`}>
          Do you provide specific time delivery of Cake, if any?
        </AccordionHeader>
        <AccordionBody className="text-md">
          Yes, we do try our best to meet the specific delivery time request if made by the customer; however, there can be deviation of +/- 45 minutes owing to the traffic or other possible factors that are not in our control.
        </AccordionBody>
      </Accordion>
 
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}
        className={`cursor-pointer border-b border-gray-300 ${open === 3 ? 'text-[#ed1016]' : 'text-gray-800'}`}>
          Does your website also deliver on Sundays and public holidays?
        </AccordionHeader>
        <AccordionBody className="text-md">
          Book My Cake works on all Sundays and holidays except under uncontrollable situations like bad weather or civil disorder like bandhs or strikes.
        </AccordionBody>
      </Accordion>
 
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(4)}
        className={`cursor-pointer border-b border-gray-300 ${open === 4 ? 'text-[#ed1016]' : 'text-gray-800'}`}>
          Do you have an option of eggless cake delivery?
        </AccordionHeader>
        <AccordionBody className="text-md">
         Yes. All the displayed cakes are available in eggless variant as well. They are 100% vegetarian cakes with delicious taste.
        </AccordionBody>
      </Accordion>
 
       <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(5)}
        className={`cursor-pointer border-b border-gray-300 ${open === 5 ? 'text-[#ed1016]' : 'text-gray-800'}`}>
          Can we send messages along with cake?
        </AccordionHeader>
        <AccordionBody className="text-md">
         Of course you can. Book My Cake provides facility of sending personalized messages along with Cake. While placing an order for cake, you get an option of typing your message in a message box.
        </AccordionBody>
      </Accordion>
 
       <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(6)}
        className={`cursor-pointer border-b border-gray-300 ${open === 6 ? 'text-[#ed1016]' : 'text-gray-800'}`}>
          Can I order a customized cake?
        </AccordionHeader>
        <AccordionBody className="text-md">
         Yes, you can customize your cake, as we have photo cakes, where you can upload the best clicked photo and customize it accordingly. For any other customization, you may write to us at info@bookmycake.co or call us on 9990027699
        </AccordionBody>
      </Accordion>
 
       <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(7)}
        className={`cursor-pointer border-b border-gray-300 ${open === 7 ? 'text-[#ed1016]' : 'text-gray-800'}`}>
          Which mode of payment does Book My Cake accept?
        </AccordionHeader>
        <AccordionBody className="text-md">
         Book My Cake accepts all the major payment intermediaries like Visa, Master Card, Maestro, American Express. You can also make the payment through wallets - Paytm, Mobikwik and PayUmoney.
        </AccordionBody>
      </Accordion>
 
      </div>
    </>
  );
}