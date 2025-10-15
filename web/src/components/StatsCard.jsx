function StatsCard({ number, label, icon }) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-2 text-primary-600">{icon}</div>
      <div className="text-4xl font-bold text-gray-900 mb-1">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

export default StatsCard;
