import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

const HEADER_HEIGHT = 80;

interface Message {
  id: string;
  user_message: string;
  bot_response: string;
  created_at: string;
}

const KNOWLEDGE_BASE = {
  company: {
    name: "VNEiL Intelligent Care",
    location: "Siliguri, West Bengal, India",
    phone: "+91 8250900446",
    email: "contact@vneil.care",
    tagline: "AI-Powered Healthcare Solutions",
    address: "Siliguri, West Bengal, India"
  },
  website: {
    sections: {
      home: "The Home section showcases our main tagline 'VNEiL Intelligent Care' and highlights our AI-powered, compassionate, and efficient approach to healthcare.",
      features: "The Features section displays our six powerful capabilities: Real-Time Monitoring, Secure & Private, 24/7 Availability, Personalized Care, Predictive Analytics, and Easy Integration.",
      about: "The About section tells our story - how we combine advanced AI with compassionate healthcare delivery, serving 50K+ active users with 99.9% uptime and 24/7 support.",
      contact: "The Contact section provides our contact information and a form to reach out. You can find our email (contact@vneil.care), phone (+91 8250900446), and address (Siliguri, West Bengal, India)."
    },
    navigation: "Our website has four main sections accessible from the navigation bar: Home, Features, About, and Contact. You can click on any section in the navigation to jump directly to that part of the website.",
    social: "You can connect with us on social media! Find us on Twitter, LinkedIn, and Instagram. Links are available in the footer section of our website."
  },
  features: {
    monitoring: "Real-Time Monitoring: Continuous health tracking with instant alerts and insights powered by AI algorithms. Our system continuously analyzes your health metrics and sends instant notifications if anything requires attention.",
    secure: "Secure & Private: End-to-end encryption ensuring your health data remains confidential and protected. Your data is protected with end-to-end encryption and secure servers.",
    availability: "24/7 Availability: Round-the-clock intelligent care assistance whenever you need it most. VNEiL is accessible 24/7 through our mobile app and web platform.",
    personalized: "Personalized Care: Tailored health recommendations based on your unique medical profile and history. Our AI learns your health patterns and provides recommendations specifically designed for you.",
    predictive: "Predictive Analytics: Advanced AI models predict health trends and prevent potential issues before they arise. This helps you take preventive action before health issues develop.",
    integration: "Easy Integration: Seamlessly connects with your existing devices and healthcare providers. Whether it's fitness trackers, wearables, or your healthcare provider's systems, VNEiL works seamlessly with your ecosystem."
  },
  about: {
    mission: "Our Mission: To democratize access to intelligent healthcare solutions, making advanced medical insights available to everyone, everywhere.",
    vision: "Our Vision: A world where AI-powered healthcare anticipates needs, prevents diseases, and empowers individuals to live healthier lives.",
    values: "Our Values: Innovation, compassion, privacy, and excellence guide everything we do in our mission to transform healthcare.",
    stats: "We're proud to serve 50K+ active users with 99.9% uptime and provide 24/7 support to ensure continuous care."
  },
  faq: {
    about: "VNEiL Intelligent Care represents the convergence of advanced artificial intelligence and compassionate healthcare delivery. We're dedicated to transforming how people experience healthcare through innovative technology. Our platform leverages cutting-edge machine learning algorithms to provide personalized, predictive, and preventive care. We serve 50K+ active users with 99.9% uptime.",
    ai: "Our AI algorithms analyze health data in real-time to provide predictive insights, personalized recommendations, and instant alerts based on your unique health profile. We use advanced machine learning to provide predictive care, preventing issues before they arise.",
    privacy: "Your data is protected with end-to-end encryption and secure servers. We comply with all healthcare privacy regulations and never share your information without consent. Security and privacy are core values at VNEiL.",
    access: "VNEiL is accessible 24/7 through our mobile app and web platform. You can monitor your health, receive notifications, and communicate with our AI assistant anytime, anywhere.",
    difference: "Unlike traditional healthcare, VNEiL uses advanced machine learning to provide predictive care, preventing issues before they arise while maintaining a compassionate, patient-centered approach. We combine AI-powered technology with compassionate care.",
    getting_started: "Visit our website, create an account, and complete your health profile. Our AI will then provide personalized recommendations and continuous monitoring. You can also contact us at +91 8250900446 or contact@vneil.care for assistance.",
    cost: "For detailed pricing information, please contact our sales team at +91 8250900446 or email contact@vneil.care. We'd be happy to discuss our plans and find the best solution for your needs.",
    contact: "You can reach us at +91 8250900446, email contact@vneil.care, or visit us in Siliguri, West Bengal, India. Our 24/7 support team is ready to help! You can also use the contact form on our website to send us a message.",
    location: "We are located in Siliguri, West Bengal, India. You can visit us at our office or contact us via phone (+91 8250900446) or email (contact@vneil.care)."
  }
};

function getBotResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();

  // Greetings
  if (/^(hello|hi|hey|greetings|namaste)(\s|$|!)/.test(msg) || msg === '?' || msg.length < 3) {
    return `Hello! Welcome to ${KNOWLEDGE_BASE.company.name}. I'm your AI assistant. How can I help you today? You can ask me about our website sections, features, mission, vision, contact information, or anything else about VNEiL!`;
  }

  // Website navigation and sections
  if (msg.includes('navigation') || msg.includes('navigate') || msg.includes('menu') || msg.includes('sections')) {
    return KNOWLEDGE_BASE.website.navigation;
  }

  if (msg.includes('home section') || msg.includes('homepage') || msg.includes('main page')) {
    return KNOWLEDGE_BASE.website.sections.home;
  }

  if (msg.includes('features section') || msg.includes('feature page')) {
    return KNOWLEDGE_BASE.website.sections.features;
  }

  if (msg.includes('about section') || msg.includes('about page')) {
    return KNOWLEDGE_BASE.website.sections.about;
  }

  if (msg.includes('contact section') || msg.includes('contact page') || msg.includes('contact form')) {
    return KNOWLEDGE_BASE.website.sections.contact;
  }

  // About VNEiL
  if ((msg.includes('about') && !msg.includes('section')) || msg.includes('vneil') || msg.includes('company') || msg.includes('who are you')) {
    return KNOWLEDGE_BASE.faq.about;
  }

  // Mission, Vision, Values
  if (msg.includes('mission') || msg.includes('what is your mission')) {
    return KNOWLEDGE_BASE.about.mission;
  }

  if (msg.includes('vision') || msg.includes('what is your vision')) {
    return KNOWLEDGE_BASE.about.vision;
  }

  if (msg.includes('values') || msg.includes('what are your values')) {
    return KNOWLEDGE_BASE.about.values;
  }

  // Statistics
  if (msg.includes('statistics') || msg.includes('stats') || msg.includes('users') || msg.includes('uptime') || msg.includes('50k') || msg.includes('99.9')) {
    return KNOWLEDGE_BASE.about.stats;
  }

  // Features and capabilities
  if (msg.includes('feature') || msg.includes('capability') || msg.includes('offer') || msg.includes('what do') || msg.includes('services')) {
    return `VNEiL offers six powerful features:\n\n1. ${KNOWLEDGE_BASE.features.monitoring}\n\n2. ${KNOWLEDGE_BASE.features.secure}\n\n3. ${KNOWLEDGE_BASE.features.availability}\n\n4. ${KNOWLEDGE_BASE.features.personalized}\n\n5. ${KNOWLEDGE_BASE.features.predictive}\n\n6. ${KNOWLEDGE_BASE.features.integration}`;
  }

  // Specific features
  if (msg.includes('real-time monitoring') || msg.includes('monitoring') || msg.includes('track') || msg.includes('alert')) {
    return KNOWLEDGE_BASE.features.monitoring;
  }

  if (msg.includes('secure') || msg.includes('security') || msg.includes('private') || msg.includes('privacy') || msg.includes('encryption') || msg.includes('data protection')) {
    return KNOWLEDGE_BASE.features.secure + " " + KNOWLEDGE_BASE.faq.privacy;
  }

  if (msg.includes('24/7') || msg.includes('availability') || msg.includes('always available') || msg.includes('round the clock')) {
    return KNOWLEDGE_BASE.features.availability;
  }

  if (msg.includes('personalized') || msg.includes('personalization') || msg.includes('tailored') || msg.includes('customized')) {
    return KNOWLEDGE_BASE.features.personalized;
  }

  if (msg.includes('predictive') || msg.includes('predict') || msg.includes('prevent') || msg.includes('analytics')) {
    return KNOWLEDGE_BASE.features.predictive;
  }

  if (msg.includes('integration') || msg.includes('integrate') || msg.includes('connect') || msg.includes('device') || msg.includes('compatible')) {
    return KNOWLEDGE_BASE.features.integration;
  }

  // AI and how it works
  if (msg.includes('ai') || msg.includes('artificial intelligence') || msg.includes('machine learning') || msg.includes('algorithm') || msg.includes('how does it work')) {
    return KNOWLEDGE_BASE.faq.ai;
  }

  // Location and address
  if (msg.includes('location') || msg.includes('address') || msg.includes('where') || msg.includes('office') || msg.includes('siliguri')) {
    return KNOWLEDGE_BASE.faq.location;
  }

  // Contact information
  if (msg.includes('phone') || msg.includes('call') || msg.includes('telephone') || msg.includes('number')) {
    return `You can reach us by phone at ${KNOWLEDGE_BASE.company.phone}. Our support team is available 24/7 to assist you!`;
  }

  if (msg.includes('email') || msg.includes('e-mail') || msg.includes('mail')) {
    return `You can contact us via email at ${KNOWLEDGE_BASE.company.email}. We'll respond to your inquiry as soon as possible!`;
  }

  // Social media
  if (msg.includes('social') || msg.includes('twitter') || msg.includes('linkedin') || msg.includes('instagram') || msg.includes('facebook') || msg.includes('follow')) {
    return KNOWLEDGE_BASE.website.social;
  }

  // What makes it different
  if (msg.includes('differ') || msg.includes('unique') || msg.includes('advantage') || msg.includes('why vneil') || msg.includes('what makes you different')) {
    return KNOWLEDGE_BASE.faq.difference;
  }

  // Getting started
  if (msg.includes('get started') || msg.includes('start') || msg.includes('begin') || msg.includes('sign up') || msg.includes('register') || msg.includes('how to start')) {
    return KNOWLEDGE_BASE.faq.getting_started;
  }

  // Pricing
  if (msg.includes('price') || msg.includes('cost') || msg.includes('plan') || msg.includes('subscription') || msg.includes('fee') || msg.includes('pricing')) {
    return KNOWLEDGE_BASE.faq.cost;
  }

  // Support and contact
  if (msg.includes('support') || msg.includes('help') || msg.includes('contact') || msg.includes('reach') || msg.includes('assistance')) {
    return KNOWLEDGE_BASE.faq.contact;
  }

  // Demo or trial
  if (msg.includes('demo') || msg.includes('trial') || msg.includes('test') || msg.includes('sample')) {
    return `We'd love to show you VNEiL in action! Contact us at ${KNOWLEDGE_BASE.company.phone} or ${KNOWLEDGE_BASE.company.email} to schedule a personalized demo and see how we can transform your healthcare.`;
  }

  // Website functionality
  if (msg.includes('website') || msg.includes('site') || msg.includes('web') || msg.includes('page')) {
    return `Our website has four main sections: Home, Features, About, and Contact. You can navigate between them using the menu at the top. Each section provides detailed information about VNEiL Intelligent Care. Is there a specific section you'd like to know more about?`;
  }

  // Thank you
  if (msg.includes('thank') || msg.includes('thanks') || msg.includes('appreciate')) {
    return "You're welcome! Is there anything else you'd like to know about VNEiL Intelligent Care or our website?";
  }

  // Goodbye
  if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you') || msg.includes('farewell')) {
    return "Thank you for visiting VNEiL Intelligent Care! Feel free to come back anytime if you have more questions. Have a great day!";
  }

  // Default response for unrecognized queries
  const defaultResponses = [
    `That's a great question! I can help you with information about our website sections (Home, Features, About, Contact), our services, mission, vision, contact details, and more. Could you be more specific? Or you can contact our team at ${KNOWLEDGE_BASE.company.phone} or ${KNOWLEDGE_BASE.company.email}.`,
    `I'd be happy to help! You can ask me about our website navigation, features, mission, vision, contact information, or anything else about VNEiL. For more specific assistance, you can also reach our support team directly at ${KNOWLEDGE_BASE.company.phone}.`,
    `Thank you for your interest in VNEiL! I can provide information about our website, services, and company. If you need more detailed assistance, our expert team at ${KNOWLEDGE_BASE.company.phone} or ${KNOWLEDGE_BASE.company.email} would be delighted to help you.`
  ];
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      loadMessages();
    }
  }, [isOpen]);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })
        .limit(20);

      if (error) {
        console.warn('Could not load messages from database:', error);
        // Continue with empty messages if database fails
        return;
      }

      if (data) {
        setMessages(data);
      }
    } catch (error) {
      console.warn('Error loading messages:', error);
      // Continue with empty messages if database fails
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = getBotResponse(userMessage);

      // Create message object immediately
      const newMessage: Message = {
        id: `msg_${Date.now()}_${Math.random()}`,
        user_message: userMessage,
        bot_response: botResponse,
        created_at: new Date().toISOString()
      };

      // Add message to UI immediately
      setMessages((prev: Message[]) => [...prev, newMessage]);

      // Try to save to Supabase (optional - won't block if it fails)
      try {
        const { data } = await supabase
          .from('chat_messages')
          .insert([
            {
              user_message: userMessage,
              bot_response: botResponse,
              session_id: sessionId
            }
          ])
          .select();

        // Update message with database ID if successful
        if (data && data[0]) {
          setMessages((prev: Message[]) => 
            prev.map(msg => 
              msg.id === newMessage.id ? { ...msg, id: data[0].id } : msg
            )
          );
        }
      } catch (dbError) {
        // Supabase save failed, but message is already shown in UI
        console.warn('Could not save message to database:', dbError);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error message to user
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        user_message: userMessage,
        bot_response: "I apologize, but I encountered an error. Please try again.",
        created_at: new Date().toISOString()
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      )}

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={handleBackdropClick}
            aria-label="Close chat overlay"
          />
          <div className="fixed top-24 bottom-4 left-4 right-4 md:top-auto md:bottom-6 md:left-auto md:right-6 z-40 w-auto md:w-96 h-[500px] md:h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 transition-colors duration-300 animate-fade-in-up">
          <div className="flex justify-between items-center p-3 md:p-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-t-2xl">
            <h3 className="font-semibold flex items-center space-x-2 text-sm md:text-base">
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span>VNEiL Assistant</span>
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-200"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center pt-8">
                <MessageCircle className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">Start a conversation!</p>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div className="flex justify-end">
                  <div className="max-w-[85%] md:max-w-xs bg-purple-600 text-white rounded-xl p-3 rounded-tr-none text-sm break-words">
                    {msg.user_message}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[85%] md:max-w-xs bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl p-3 rounded-tl-none text-sm break-words">
                    {msg.bot_response}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 rounded-tl-none">
                  <Loader className="w-5 h-5 animate-spin text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="px-3 md:px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
}
