import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, MapPin, Wrench, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface ChatMsg {
  id: string;
  sender: 'user' | 'technician';
  text: string;
  time: string;
}

const QUICK_QUESTIONS = [
  'Where is your Dugbe shop located?',
  'How much is PS5 HDMI port repair?',
  'Do you buy faulty or used consoles?',
  'How long does stick drift fix take?',
];

export const OnlineChatWidget: React.FC<{
  onOpenBooking: () => void;
}> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'm1',
      sender: 'technician',
      text: `Hello! Welcome to Adelod Game World. I'm Stephen Adelodun. How can I assist you today with game purchases, trade-ins, or console repairs at our Dugbe shop?`,
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMsg = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate smart technician response
    setTimeout(() => {
      let reply = `Thank you for reaching out! You can visit us at ${COMPANY_INFO.address}. You can also chat directly on WhatsApp at ${COMPANY_INFO.phoneDisplay}.`;

      const lower = text.toLowerCase();
      if (lower.includes('where') || lower.includes('location') || lower.includes('address') || lower.includes('dugbe')) {
        reply = `We are located at Shop No. 32 Zion Samsung Building, Ekotedo, Dugbe, Ibadan, Oyo State (near Cocoa House and Dugbe Post Office). We are open Monday to Saturday, 8:30 AM to 6:30 PM.`;
      } else if (lower.includes('hdmi') || lower.includes('ps5') || lower.includes('cost') || lower.includes('price')) {
        reply = `PS5 HDMI port replacement is ₦35,000 using reinforced OEM HDMI 2.1 sockets. Same-day express repair takes only 2 to 3 hours with a 6-month workshop warranty! Would you like to book a slot?`;
      } else if (lower.includes('drift') || lower.includes('controller') || lower.includes('analog')) {
        reply = `We upgrade DualSense & Xbox controllers with electromagnetic Hall-Effect sensors for ₦14,000. It permanently stops stick drift and takes only 45 minutes on our bench!`;
      } else if (lower.includes('buy') || lower.includes('sell') || lower.includes('trade') || lower.includes('faulty')) {
        reply = `Yes! We buy both brand new, gently used, and faulty/broken consoles (e.g. broken HDMI, BLOD, power IC faults) because we repair them in-house. Check out our Sell & Trade-in tool or bring it to Shop 32 Dugbe for immediate cash!`;
      } else if (lower.includes('appointment') || lower.includes('book')) {
        reply = `You can click the "Book Repair" button on our site to lock in your diagnostic bench time and receive an appointment ticket ID immediately.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'msg_reply_' + Date.now(),
          sender: 'technician',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const getWhatsAppLaunchUrl = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user')?.text || '';
    const text = `Hello CEO Stephen / Adelod Game World! Reaching out via the online chat on your website:\n"${lastUserMsg || 'Inquiring about gaming consoles and repair services at Shop 32 Dugbe'}"`;
    return `https://wa.me/2349033363437?text=${encodeURIComponent(text)}`;
  };

  return (
    <aside aria-label="Support and repair live chat" className="fixed bottom-5 right-5 z-40">
      {/* Floating launcher trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm shadow-xl transition-transform hover:scale-105"
        >
          <MessageSquare className="w-5 h-5 text-neutral-950" />
          <span>Chat with Technician</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[92vw] sm:w-96 h-[500px] max-h-[85vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold text-xs">
                AG
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Stephen Adelodun
                  <span className="text-[10px] text-emerald-400 font-normal">● Online</span>
                </h3>
                <p className="text-[10px] text-neutral-400">
                  Lead Technician · Shop 32 Dugbe
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={getWhatsAppLaunchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                title="Switch to WhatsApp"
                className="p-1.5 rounded-md text-emerald-400 hover:bg-neutral-800 transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages scroll area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-neutral-950/50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-400 text-neutral-950 font-medium rounded-br-xs'
                      : 'bg-neutral-800 text-neutral-200 rounded-bl-xs border border-neutral-750'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-neutral-500 mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] px-2 py-1">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1">Stephen is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Questions Chips */}
          <div className="p-2 bg-neutral-900 border-t border-neutral-800/80 flex gap-1.5 overflow-x-auto scrollbar-none">
            {QUICK_QUESTIONS.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-750 text-[11px] text-neutral-300 whitespace-nowrap border border-neutral-700 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input and direct WhatsApp bridge */}
          <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Ask about repairs, stock, Dugbe shop..."
              className="flex-1 px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="p-2 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-neutral-950 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Footer */}
          <div className="px-3 py-2 bg-neutral-950 border-t border-neutral-850 flex items-center justify-between text-[11px]">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              <Wrench className="w-3 h-3" />
              <span>Book Appointment Slot</span>
            </button>
            <a
              href={getWhatsAppLaunchUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline font-semibold"
            >
              Open on WhatsApp
            </a>
          </div>
        </div>
      )}
    </aside>
  );
};
