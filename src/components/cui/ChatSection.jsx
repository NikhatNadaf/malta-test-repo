import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ChatSection() {
  return (
    <div className="bg-[#E5484D] rounded-xl overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="./call-center.jpg"
              alt="Customer Service Team"
              fill
              className="object-cover rounded-r-3xl"
            />
          </div>
          <div className="text-white p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold"
            >
              Got questions about Malta?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl sm:text-2xl lg:text-4xl font-bold"
            >
              We're here to help – let's chat!
            </motion.p>
            <Button
              variant="outline"
              onClick={() => {
                if (typeof window !== "undefined" && window.$crisp) {
                  window.$crisp.push(["do", "chat:open"]);
                }
              }}
              className="cursor-pointer text-black"
            >
              Start Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;
