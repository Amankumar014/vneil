import { ArrowRight, Brain, Heart, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-purple-100/50 dark:bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-blue-100/50 dark:bg-blue-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full mb-12">
            <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-300">
              AI-Powered Healthcare Solutions
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 dark:from-purple-400 dark:via-purple-300 dark:to-blue-400 bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            VNEiL
            <br />
            Intelligent Care
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            Revolutionizing healthcare with artificial intelligence, delivering personalized care with compassion and precision
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <button className="group px-8 py-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white rounded-full font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 rounded-full font-semibold transition-all duration-200 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          {[
            { icon: Brain, label: 'AI-Powered', desc: 'Advanced machine learning algorithms' },
            { icon: Heart, label: 'Compassionate', desc: 'Patient-centered care approach' },
            { icon: Zap, label: 'Efficient', desc: 'Streamlined healthcare delivery' }
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <item.icon className="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{item.label}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
