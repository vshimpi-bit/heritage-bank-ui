import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Award, Gift, CheckCircle, Ticket, Coins, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const rewardHistory = [
  { action: "Card Purchase - Heritage Cafe", points: "+45", date: "Today, 10:30 AM" },
  { action: "Direct Deposit - Salary", points: "+500", date: "Mar 1, 2024" },
  { action: "Online Shopping - Amazon", points: "+120", date: "Feb 28, 2024" },
  { action: "Monthly Bill Payment", points: "+50", date: "Feb 25, 2024" },
];

const rewards = [
  { id: 1, title: "$20 Cashback", cost: 2000, type: "cashback", description: "Direct deposit to your main checking account." },
  { id: 2, title: "Coffee Voucher", cost: 500, type: "voucher", description: "Redeemable at participating coffee shops." },
  { id: 3, title: "Waived Monthly Fee", cost: 1500, type: "banking", description: "Waive next month's account maintenance fee." },
  { id: 4, title: "$50 Amazon Gift Card", cost: 5000, type: "voucher", description: "Digital gift card delivered to your email." },
];

const Rewards = () => {
  const [selectedReward, setSelectedReward] = useState<typeof rewards[0] | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPoints = 3750;
  const nextMilestone = 5000;
  const progress = (totalPoints / nextMilestone) * 100;

  const handleRedeem = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setSelectedReward(null);
      setIsSuccess(false);
    }, 2500);
  };

  return (
    <DashboardLayout title="Rewards">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Points Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="parchment-card rounded-xl paper-texture flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-sidebar flex items-center justify-center mb-4 shadow-sm border border-border">
            <Award className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <p className="font-body text-muted-foreground text-sm uppercase tracking-widest mb-1">Available Points</p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground text-[#D4AF37] mb-6">
            {totalPoints.toLocaleString()}
          </h2>
          
          <div className="w-full max-w-md">
            <div className="flex justify-between text-xs font-body text-muted-foreground mb-2">
              <span>Silver Tier</span>
              <span>{nextMilestone.toLocaleString()} pts to Gold</span>
            </div>
            <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#D4AF37] rounded-full" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Rewards List */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-heading text-lg text-foreground flex items-center gap-2">
              <Gift className="w-5 h-5 text-muted-foreground" />
              Redeemable Offers
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {rewards.map((reward) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border-2 border-dashed border-border p-5 relative overflow-hidden flex flex-col group paper-texture hover:-translate-y-1 transition-transform duration-300"
                  style={{ borderRadius: '12px' }}
                >
                  {/* Decorative cutouts to look like a ticket */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-r-2 border-dashed border-border" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-l-2 border-dashed border-border" />

                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 rounded-full bg-muted">
                      {reward.type === 'cashback' && <Coins className="w-5 h-5 text-sidebar" />}
                      {reward.type === 'voucher' && <Ticket className="w-5 h-5 text-sidebar" />}
                      {reward.type === 'banking' && <span className="w-5 h-5 flex items-center justify-center font-heading text-sidebar text-lg">%</span>}
                    </div>
                    <span className="font-body font-medium text-[#D4AF37] text-sm">
                      {reward.cost.toLocaleString()} pts
                    </span>
                  </div>
                  
                  <h4 className="font-heading text-foreground text-md mb-2">{reward.title}</h4>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed flex-1 mb-4">
                    {reward.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full font-body text-xs tracking-wider uppercase border-border hover:bg-sidebar hover:text-sidebar-foreground transition-colors"
                    onClick={() => setSelectedReward(reward)}
                  >
                    Redeem
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* History Column */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg text-foreground flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-muted-foreground" />
              Recent Activity
            </h3>
            <div className="parchment-card rounded-xl p-4 paper-texture space-y-4">
              {rewardHistory.map((item, i) => (
                <div key={i} className="flex justify-between items-start border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-body text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                  </div>
                  <span className="text-sm font-medium text-[#D4AF37]">{item.points}</span>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-muted-foreground mt-2 font-body h-8">
                View All Activity <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Redemption Modal */}
      <Dialog open={!!selectedReward} onOpenChange={(open) => !open && setSelectedReward(null)}>
        <DialogContent className="sm:max-w-md bg-card paper-texture border-border rounded-xl">
          {!isSuccess && selectedReward ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-center">Confirm Redemption</DialogTitle>
              </DialogHeader>
              <div className="py-6 flex flex-col items-center text-center space-y-4">
                <Ticket className="w-12 h-12 text-[#D4AF37] opacity-80" />
                <div>
                  <h4 className="font-heading text-2xl">{selectedReward.title}</h4>
                  <p className="text-muted-foreground font-body text-sm mt-2 max-w-[280px]">
                    Are you sure you want to redeem this offer for <span className="text-[#D4AF37] font-semibold">{selectedReward.cost.toLocaleString()} points</span>?
                  </p>
                </div>
              </div>
              <DialogFooter className="flex gap-2 sm:justify-between border-t border-border pt-4">
                <Button variant="outline" onClick={() => setSelectedReward(null)} className="flex-1 font-body">Cancel</Button>
                <Button onClick={handleRedeem} className="flex-1 bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 font-body">
                  Confirm
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8 text-green-700" />
              </div>
              <h4 className="font-heading text-2xl text-foreground">Redeemed Successfully!</h4>
              <p className="text-muted-foreground font-body text-sm">
                Your reward is being processed.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Rewards;
