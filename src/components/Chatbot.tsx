import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const DUMMY_DATA_CONTEXT = `
Here is the user's mock banking data:
- User Name: John Doe
- Total Balance: $20,570.00
- Reward Points: 3,750 (Silver Tier, 1,250 points needed for Gold)
- Cards:
  1. Debit Card: •••• •••• •••• 4289 (Expires 09/27, Balance $12,450.00)
  2. Credit Card: •••• •••• •••• 7651 (Expires 03/28, Balance $2,340.00, Limit $15,000.00)
  3. Debit Card: •••• •••• •••• 1023 (Expires 12/26, Balance $5,780.00)
- Recent Transactions:
  1. Morning Brew Coffee: $4.50 (Today, 8:30 AM) - Expense
  2. Salary Deposit: $5,200.00 (Mar 1, 2024) - Income
  3. Amazon Purchase: $89.99 (Feb 28, 2024) - Expense
  4. Electric Bill: $124.00 (Feb 27, 2024) - Expense
  5. Uber Ride: $18.50 (Feb 26, 2024) - Expense
- Recent Reward History:
  1. Card Purchase - Heritage Cafe: +45 points
  2. Direct Deposit - Salary: +500 points
  3. Online Shopping - Amazon: +120 points
  4. Monthly Bill Payment: +50 points

You are a helpful, professional, and elegant AI banking assistant for Heritage Bank. You have access to this information to assist the user. Keep your responses concise and helpful. Don't mention that you have "mock" or "dummy" data. Speak naturally as if this is real data.
`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hello! I am your AI assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessageText = input.trim();
    const newMessages = [...messages, { role: 'user' as const, text: userMessageText }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_AI_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'ai', text: 'Please set your VITE_AI_API_KEY in the .env file to talk to me.' }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const openRouterMessages = [
        { role: 'system', content: DUMMY_DATA_CONTEXT },
        ...newMessages.map((msg) => ({ role: msg.role === 'ai' ? 'assistant' : 'user', content: msg.text }))
      ];

      const isOpenRouter = apiKey.startsWith("sk-or-");
      const url = isOpenRouter 
        ? "https://openrouter.ai/api/v1/chat/completions" 
        : "https://api.openai.com/v1/chat/completions";
        
      const model = isOpenRouter ? "openai/gpt-3.5-turbo" : "gpt-3.5-turbo";

      // Filter context for OpenAI (since OpenRouter requires HTTP-Referer but OpenAI doesn't)
      const headers: Record<string, string> = {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      };

      if (isOpenRouter) {
        headers["HTTP-Referer"] = window.location.origin || "http://localhost:8080";
        headers["X-Title"] = "Heritage Bank Dashboard";
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: model,
          messages: openRouterMessages,
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that request.";

      setMessages((prev) => [...prev, { role: 'ai', text: aiResponse }]);

    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'ai', text: `Error: ${error.message || 'Connecting to AI service failed.'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50">
      {isOpen && (
        <div className="bg-background border border-border rounded-xl shadow-modal w-[320px] md:w-[350px] mb-4 overflow-hidden flex flex-col h-[450px]">
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-4 py-3 flex justify-between items-center border-b border-sidebar-border">
            <h3 className="font-heading font-medium tracking-wide">AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 paper-texture bg-card/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm font-body shadow-sm whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted text-foreground border border-border rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground border border-border rounded-xl rounded-bl-sm px-4 py-2.5">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-border flex gap-2 bg-background"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm disabled:opacity-50"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </form>
        </div>
      )}

      {/* Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 absolute right-0 bottom-0"
        style={isOpen ? { opacity: 0, pointerEvents: 'none', transform: 'scale(0.8)' } : { opacity: 1, pointerEvents: 'auto' }}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
