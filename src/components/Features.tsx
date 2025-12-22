import { Activity, Shield, Clock, Users, TrendingUp, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description: 'Continuous health tracking with instant alerts and insights powered by AI algorithms',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'End-to-end encryption ensuring your health data remains confidential and protected',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock intelligent care assistance whenever you need it most',
    color: 'from-purple-600 to-blue-500'
  },
  {
    icon: Users,
    title: 'Personalized Care',
    description: 'Tailored health recommendations based on your unique medical profile and history',
    color: 'from-blue-600 to-purple-500'
  },
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description: 'Advanced AI models predict health trends and prevent potential issues before they arise',
    color: 'from-purple-500 to-blue-500'
  },
  {
    icon: Smartphone,
    title: 'Easy Integration',
    description: 'Seamlessly connects with your existing devices and healthcare providers',
    color: 'from-blue-500 to-purple-600'
  }
];

export function Features() {
  return (
    <section id="features" className="py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-blue-100/20 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 dark:from-purple-400 dark:via-purple-300 dark:to-blue-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Cutting-edge technology meets compassionate care to deliver exceptional health outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border border-transparent hover:border-purple-200 dark:hover:border-purple-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
