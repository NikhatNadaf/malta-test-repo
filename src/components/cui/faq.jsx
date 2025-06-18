import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Faq({data=[]}) {
  return (
    <div className="mx-8 lg:px-64">
      <p className="text-3xl font-bold text-center mb-10">Frequently Asked Question</p>
      <Accordion type="single" collapsible className="space-y-4">
        {data.map((item, index)=><AccordionItem key={index} value={`item-${index+1}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            {item.answer}
          </AccordionContent>
        </AccordionItem>)}
      </Accordion>
    </div>
  );
}

export default Faq;
