import { Target, Eye, Award } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-32 bg-gradient-to-br from-white via-purple-50/50 to-white dark:from-gray-900 dark:via-purple-900/10 dark:to-gray-900 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute -right-1/3 top-1/2 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-left">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              About VNEiL
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              VNEiL Intelligent Care represents the convergence of advanced artificial intelligence and compassionate healthcare delivery. We're dedicated to transforming how people experience healthcare through innovative technology.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Our platform leverages cutting-edge machine learning algorithms to provide personalized, predictive, and preventive care that adapts to each individual's unique health journey.
            </p>

            <div className="space-y-4">
              {[
                { value: '--', label: 'Active Users' },
                { value: '--', label: 'Uptime' },
                { value: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 animate-fade-in-right">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                description: 'To democratize access to intelligent healthcare solutions, making advanced medical insights available to everyone, everywhere.',
                gradient: 'from-purple-500 to-purple-600'
              },
              {
                icon: Eye,
                title: 'Our Vision',
                description: 'A world where AI-powered healthcare anticipates needs, prevents diseases, and empowers individuals to live healthier lives.',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                icon: Award,
                title: 'Our Values',
                description: 'Innovation, compassion, privacy, and excellence guide everything we do in our mission to transform healthcare.',
                gradient: 'from-purple-600 to-blue-500'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-x-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
