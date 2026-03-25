import { motion } from "framer-motion";

interface BankCardProps {
  type: "debit" | "credit";
  number: string;
  name: string;
  expiry: string;
  balance: string;
  onClick?: () => void;
}

const BankCard = ({ type, number, name, expiry, balance, onClick }: BankCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "var(--shadow-card-hover)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      className="relative min-w-[300px] md:min-w-[340px] h-[200px] rounded-xl cursor-pointer overflow-hidden wood-gradient p-6 flex flex-col justify-between text-primary-foreground select-none"
    >
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-xs uppercase tracking-widest opacity-70 font-body">
            {type === "debit" ? "Debit Card" : "Credit Card"}
          </p>
          <p className="text-lg font-heading mt-1">{balance}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-accent/60" />
        </div>
      </div>

      <div className="relative z-10">
        <p className="font-mono text-base tracking-[0.2em] mb-3">{number}</p>
        <div className="flex justify-between items-end">
          <p className="text-sm font-body opacity-90">{name}</p>
          <p className="text-xs opacity-70">{expiry}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BankCard;
