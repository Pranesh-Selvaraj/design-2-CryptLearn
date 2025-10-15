function FeatureCard({ icon, title, description, illustration }) {
  return (
    <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
      {/* Illustration Area */}
      {illustration ? (
        <div className="mb-6 h-48 bg-gradient-to-br from-accent-cream to-white rounded-xl flex items-center justify-center border border-gray-100">
          {illustration}
        </div>
      ) : (
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-cream text-accent-coral rounded-2xl mb-6">
          {icon}
        </div>
      )}

      <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;
