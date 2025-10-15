import { Facebook, Github, Bitcoin, MessageCircle, Chrome } from "lucide-react";

function IconStrip() {
  const icons = [
    { icon: <Facebook size={40} />, name: "Facebook" },
    { icon: <Github size={40} />, name: "GitHub" },
    { icon: <Bitcoin size={40} />, name: "Bitcoin" },
    { icon: <MessageCircle size={40} />, name: "Discord" },
    { icon: <Chrome size={40} />, name: "Chrome" },
  ];

  return (
    <section className="bg-accent-coral py-12">
      <div className="container-custom">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {icons.map((item, index) => (
            <div
              key={index}
              className="text-white opacity-80 hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-2"
            >
              {item.icon}
              <span className="text-xs font-medium">{item.name}</span>
            </div>
          ))}
          {/* University Badge */}
          <div className="text-white opacity-80 hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 bg-white text-accent-coral px-4 py-2 rounded-lg">
              <span className="font-bold text-lg">RUB</span>
            </div>
            <span className="text-xs font-medium">University</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IconStrip;
