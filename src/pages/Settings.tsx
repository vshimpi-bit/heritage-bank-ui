import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BankCard from "@/components/BankCard";
import CardDetailModal from "@/components/CardDetailModal";
import { motion, AnimatePresence } from "framer-motion";
import { User, Wallet, Shield, Bell, HelpCircle, LogOut, ChevronRight, Camera, Building2, Copy, Plus, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

type TabId = 'profile' | 'account' | 'security' | 'notifications' | 'help' | 'logout';

const tabs = [
  { id: 'profile', label: 'Profile & Payment', icon: User },
  { id: 'account', label: 'Account Settings', icon: Wallet },
  { id: 'security', label: 'Security & Privacy', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
  { id: 'logout', label: 'Logout', icon: LogOut },
] as const;

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [mobileView, setMobileView] = useState<'list' | 'content'>('list');

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
    setMobileView('content');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileTab />;
      case 'account': return <AccountTab />;
      case 'security': return <SecurityTab />;
      case 'notifications': return <NotificationsTab />;
      case 'help': return <HelpTab />;
      case 'logout': return <LogoutTab />;
      default: return null;
    }
  };

  return (
    <DashboardLayout title="Settings">
      <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto h-full min-h-[600px]">
        
        {/* Sidebar/List (Hidden on mobile if content is active) */}
        <div className={`w-full md:w-72 flex-shrink-0 space-y-2 ${mobileView === 'content' ? 'hidden md:block' : 'block'}`}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center justify-between p-4 md:p-3 rounded-xl font-body text-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-sidebar text-sidebar-foreground shadow-sm' 
                    : 'text-muted-foreground hover:bg-sidebar/10 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className={`w-5 h-5 ${isActive ? 'text-[#D4AF37]' : ''}`} />
                  <span className={isActive ? 'font-medium' : ''}>{tab.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 md:hidden ${isActive ? 'text-[#D4AF37]' : 'opacity-50'}`} />
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className={`flex-1 ${mobileView === 'list' ? 'hidden md:block' : 'block'} min-w-0`}>
           {/* Mobile Back Button */}
           <button 
             className="md:hidden flex items-center gap-2 text-muted-foreground font-body text-sm mb-4 hover:text-foreground"
             onClick={() => setMobileView('list')}
           >
             <ChevronRight className="w-4 h-4 rotate-180" /> Back to menu
           </button>

           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.2 }}
               className="parchment-card rounded-xl p-6 md:p-8 paper-texture h-full max-h-[80vh] overflow-y-auto"
             >
               {renderContent()}
             </motion.div>
           </AnimatePresence>
        </div>

      </div>
    </DashboardLayout>
  )
}

const ProfileTab = () => {
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [selectedBank, setSelectedBank] = useState<any | null>(null);

  const debitCards = [
    { type: "debit" as const, number: "•••• •••• •••• 4289", name: "John Doe", expiry: "09/27", balance: "$12,450.00", cvv: "•••", status: "Active" },
    { type: "debit" as const, number: "•••• •••• •••• 1023", name: "John Doe", expiry: "12/26", balance: "$5,780.00", cvv: "•••", status: "Active" },
  ];

  const bankAccounts = [
    { id: 1, name: "Heritage Bank Savings", number: "•••• •••• 9876", upi: "johndoe@heritage", isPrimary: true, status: "Active" },
    { id: 2, name: "Global Bank Checking", number: "•••• •••• 1234", upi: "johndoe@global", isPrimary: false, status: "Active" },
  ];

  return (
    <div className="space-y-12">
      {/* Personal Info Section */}
      <section className="space-y-6">
        <h3 className="font-heading text-2xl text-foreground border-b border-border pb-4">Personal Info</h3>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-sidebar flex items-center justify-center border-2 border-border relative overflow-hidden group cursor-pointer shadow-sm shrink-0">
              <span className="font-heading text-3xl text-[#D4AF37]">JD</span>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-body">Tap to change</p>
          </div>
          <div className="flex-1 space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-body text-muted-foreground">Full Name</label>
                <Input defaultValue="John Doe" className="bg-background/80 border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-body text-muted-foreground">Phone Number</label>
                <Input defaultValue="+1 (555) 123-4567" className="bg-background/80 border-border" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-body text-muted-foreground">Email Address</label>
                <Input defaultValue="john.doe@example.com" type="email" className="bg-background/80 border-border" />
              </div>
            </div>
            <Button className="mt-4 bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 font-body shadow-sm">
              Save Changes
            </Button>
          </div>
        </div>
      </section>

      {/* UPI & Payment Methods Section */}
      <section className="space-y-6">
        <h3 className="font-heading text-2xl text-foreground border-b border-border pb-4">UPI & Payment Methods</h3>
        
        {/* UPI ID Display */}
        <div className="space-y-4">
          <h4 className="font-heading text-lg text-foreground">Primary UPI ID</h4>
          <div className="p-4 rounded-xl border border-border bg-background/50 flex justify-between items-center shadow-sm">
            <div className="flex flex-col">
              <span className="font-heading text-xl text-[#D4AF37]">johndoe@heritage</span>
              <span className="text-xs text-muted-foreground font-body mt-1 flex items-center gap-1">
                <BadgeCheck className="w-3 h-3 text-green-600" /> Verified
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="h-8 text-xs font-body border-dashed">
                <Plus className="w-3 h-3 mr-1" /> Add New
              </Button>
            </div>
          </div>
        </div>

        {/* Linked Bank Accounts */}
        <div className="space-y-4">
          <h4 className="font-heading text-lg text-foreground">Linked Bank Accounts</h4>
          <div className="space-y-3">
            {bankAccounts.map((bank) => (
              <div 
                key={bank.id} 
                className="p-4 rounded-xl border border-border bg-background/50 flex justify-between items-center shadow-sm cursor-pointer hover:-translate-y-0.5 hover:border-[#D4AF37]/50 transition-all group"
                onClick={() => setSelectedBank(bank)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-sidebar/5 flex items-center justify-center border border-border shrink-0">
                    <Building2 className="w-5 h-5 text-muted-foreground group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-body text-sm font-medium">{bank.name}</p>
                      {bank.isPrimary && (
                        <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-medium border border-[#D4AF37]/20 whitespace-nowrap">Primary</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">A/C {bank.number} • {bank.upi}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-[#D4AF37] shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Debit Cards */}
        <div className="space-y-4">
          <h4 className="font-heading text-lg text-foreground mt-8">Your Debit Cards</h4>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory scrollbar-hide py-2">
            {debitCards.map((card, i) => (
              <div key={i} className="snap-start shrink-0 hover:scale-[1.02] transition-transform duration-300">
                <BankCard {...card} onClick={() => setSelectedCard(card)} />
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Detail Modals */}
      <CardDetailModal 
        isOpen={!!selectedCard} 
        onClose={() => setSelectedCard(null)} 
        card={selectedCard} 
      />

      <Dialog open={!!selectedBank} onOpenChange={(open) => !open && setSelectedBank(null)}>
        <DialogContent className="sm:max-w-sm bg-card paper-texture border-border rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-center">Account Details</DialogTitle>
          </DialogHeader>
          {selectedBank && (
            <div className="py-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-sidebar/5 flex items-center justify-center border border-border shadow-sm">
                <Building2 className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-heading text-xl">{selectedBank.name}</h4>
                <p className="text-muted-foreground font-body text-sm mt-1">{selectedBank.number}</p>
              </div>
              <div className="w-full bg-background/50 rounded-lg p-3 border border-border text-left space-y-3 mt-4">
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-xs text-muted-foreground font-body">Status</span>
                  <span className="text-xs font-medium text-green-600 flex items-center gap-1"><BadgeCheck className="w-3 h-3"/> {selectedBank.status}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-xs text-muted-foreground font-body">UPI ID</span>
                  <span className="text-xs font-medium text-[#D4AF37]">{selectedBank.upi}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground font-body">Type</span>
                  <span className="text-xs font-medium">{selectedBank.isPrimary ? 'Primary Account' : 'Secondary Account'}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex sm:justify-center border-t border-border pt-4">
            <Button variant="outline" onClick={() => setSelectedBank(null)} className="w-full font-body hover:bg-background">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ... Remaining Tabs (Account, Security, Notifications, Help, Logout)
const AccountTab = () => (
  <div className="space-y-8">
    <h3 className="font-heading text-2xl text-foreground border-b border-border pb-4">Account Settings</h3>
    
    <div className="space-y-4">
      <h4 className="font-heading text-lg text-foreground">Linked Accounts & Cards</h4>
      <div className="p-4 rounded-xl border border-border bg-background/50 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border">
            <Wallet className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-body text-sm font-medium">Chase Sapphire Reserve</p>
            <p className="text-xs text-muted-foreground font-body">Ending in •••• 9876</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80 font-body text-xs hover:bg-destructive/10">Remove</Button>
      </div>
      <Button variant="outline" className="w-full border-dashed font-body text-muted-foreground border-border hover:border-sidebar/50 bg-background/30 transition-colors">
        + Link New Account
      </Button>
    </div>

    <div className="space-y-4">
      <h4 className="font-heading text-lg text-foreground">Preferences</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-body text-muted-foreground">Primary Currency</label>
          <Select defaultValue="usd">
            <SelectTrigger className="bg-background/80 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="usd">USD ($)</SelectItem>
              <SelectItem value="eur">EUR (€)</SelectItem>
              <SelectItem value="gbp">GBP (£)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-body text-muted-foreground">Language</label>
          <Select defaultValue="en">
            <SelectTrigger className="bg-background/80 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </div>
);

const SecurityTab = () => (
  <div className="space-y-8">
    <h3 className="font-heading text-2xl text-foreground border-b border-border pb-4">Security & Privacy</h3>
    
    <div className="space-y-4">
      <h4 className="font-heading text-lg text-foreground">Change Password</h4>
      <div className="space-y-4 max-w-md">
        <div className="space-y-2">
          <label className="text-sm font-body text-muted-foreground">Current Password</label>
          <Input type="password" placeholder="••••••••" className="bg-background/80 border-border" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-body text-muted-foreground">New Password</label>
          <Input type="password" placeholder="••••••••" className="bg-background/80 border-border" />
        </div>
        <Button className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 font-body shadow-sm">
          Update Password
        </Button>
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="font-heading text-lg text-foreground">Two-Factor Authentication</h4>
      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background/50 shadow-sm">
        <div>
          <p className="font-body text-sm font-medium">Authenticator App</p>
          <p className="text-xs text-muted-foreground font-body max-w-[250px] mt-1 hidden sm:block">Use an app like Google Authenticator to secure your account.</p>
        </div>
        <Switch className="data-[state=checked]:bg-[#D4AF37]" />
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="font-heading text-lg text-foreground">Privacy Controls</h4>
      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background/50 shadow-sm">
        <div>
          <p className="font-body text-sm font-medium">Data Sharing</p>
          <p className="text-xs text-muted-foreground font-body max-w-[250px] mt-1 hidden sm:block">Allow anonymous usage data to improve our services.</p>
        </div>
        <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
      </div>
    </div>
  </div>
);

const NotificationsTab = () => (
  <div className="space-y-8">
    <h3 className="font-heading text-2xl text-foreground border-b border-border pb-4">Notifications</h3>
    
    <div className="space-y-4">
      {[
        { title: "Email Notifications", desc: "Receive weekly summaries and important updates." },
        { title: "SMS Alerts", desc: "Get text messages for successful transactions and logins." },
        { title: "Push Notifications", desc: "Enable app pop-ups for real-time account activity." },
        { title: "Marketing Offers", desc: "Hear about exclusive rewards and promotions." },
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-background/50 shadow-sm">
          <div>
            <p className="font-body text-sm font-medium text-foreground">{item.title}</p>
            <p className="text-xs text-muted-foreground font-body mt-1 hidden sm:block">{item.desc}</p>
          </div>
          <Switch defaultChecked={i < 3} className="data-[state=checked]:bg-[#D4AF37]" />
        </div>
      ))}
    </div>
  </div>
);

const HelpTab = () => (
  <div className="space-y-8">
    <h3 className="font-heading text-2xl text-foreground border-b border-border pb-4">Help & Support</h3>
    
    <div className="space-y-4">
      <h4 className="font-heading text-lg text-foreground">Frequently Asked Questions</h4>
      <div className="space-y-3">
        {[
          "How do I dispute a transaction?",
          "What are the fees for international transfers?",
          "How can I increase my credit limit?",
        ].map((q, i) => (
          <div key={i} className="p-4 rounded-xl border border-border bg-background/50 cursor-pointer hover:border-[#D4AF37]/50 hover:bg-background transition-colors flex justify-between items-center group shadow-sm">
            <p className="font-body text-sm font-medium text-foreground">{q}</p>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#D4AF37] transition-colors" />
          </div>
        ))}
      </div>
    </div>

    <div className="p-6 rounded-xl bg-sidebar/5 border border-sidebar/10 flex flex-col items-center text-center shadow-sm">
      <HelpCircle className="w-10 h-10 text-[#D4AF37] mb-3" />
      <h4 className="font-heading text-lg text-foreground">Still need help?</h4>
      <p className="text-sm font-body text-muted-foreground mb-4">Our support team is available 24/7 to assist you.</p>
      <Button className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 font-body shadow-sm">
        Contact Support
      </Button>
    </div>
  </div>
);

const LogoutTab = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
            <LogOut className="w-10 h-10 text-destructive" />
        </div>
        <div>
            <h3 className="font-heading text-2xl text-foreground mb-2">Sign Out</h3>
            <p className="font-body text-muted-foreground text-sm max-w-sm">
                Are you sure you want to sign out of your Heritage Bank account? You will need to enter your credentials to access your dashboard again.
            </p>
        </div>
        <div className="flex gap-4 w-full max-w-xs mt-4">
            <Button variant="outline" className="flex-1 font-body border-border hover:bg-background" onClick={() => window.location.reload()}>Cancel</Button>
            <Button variant="destructive" className="flex-1 font-body shadow-sm" onClick={() => navigate('/')}>Sign Out</Button>
        </div>
    </div>
  );
};
