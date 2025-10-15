function Hero({ title, subtitle, actions }) {
  return (
    <section className="relative bg-white text-gray-900 py-16 md:py-24 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-semibold">
              ALL-IN-ONE PLACE
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl mb-8 text-gray-600">
                {subtitle}
              </p>
            )}
            {actions && (
              <div className="flex flex-col sm:flex-row gap-4">{actions}</div>
            )}
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="relative w-full h-[400px] bg-gradient-to-br from-accent-cream to-white rounded-3xl flex items-center justify-center border border-gray-100">
              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-24 h-24 bg-accent-pink rounded-2xl transform rotate-12 opacity-80"></div>
              <div className="absolute bottom-16 left-10 w-32 h-32 bg-accent-blue rounded-full opacity-70"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent-yellow rounded-3xl rotate-45 opacity-60"></div>
              <div className="absolute bottom-10 right-16 w-20 h-20 bg-accent-purple rounded-full opacity-50"></div>

              {/* Placeholder text */}
              <div className="relative z-10 text-center">
                <div className="w-48 h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Illustration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
