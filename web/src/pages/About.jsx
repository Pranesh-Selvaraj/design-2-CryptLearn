import { Target, Users, Award, Lightbulb } from "lucide-react";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";

function About() {
  const values = [
    {
      icon: <Target size={32} />,
      title: "Our Mission",
      description:
        "To democratize cryptocurrency education and empower individuals to confidently navigate the digital economy.",
    },
    {
      icon: <Users size={32} />,
      title: "Community First",
      description:
        "We believe in building a supportive community where learners help each other grow and succeed.",
    },
    {
      icon: <Award size={32} />,
      title: "Quality Education",
      description:
        "We maintain the highest standards in course quality, ensuring you receive accurate and valuable information.",
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Innovation",
      description:
        "We continuously update our content to reflect the latest developments in blockchain technology.",
    },
  ];

  return (
    <div>
      <Hero
        title="About CryptLearn"
        subtitle="Empowering the next generation of crypto enthusiasts"
      />

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                CryptLearn was founded in 2020 with a simple yet ambitious goal:
                to make cryptocurrency and blockchain education accessible to
                everyone, regardless of their technical background.
              </p>
              <p>
                We recognized that while the crypto industry was growing
                rapidly, quality educational resources were scarce and often too
                technical for beginners. Our team of blockchain experts and
                educators came together to create comprehensive courses that
                break down complex concepts into easy-to-understand lessons.
              </p>
              <p>
                Today, we're proud to serve over 50,000 students worldwide,
                helping them understand everything from basic Bitcoin
                transactions to advanced smart contract development. Our courses
                are designed by industry professionals and continuously updated
                to reflect the latest trends and best practices in the crypto
                space.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <FeatureCard key={index} {...value} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're a complete beginner or looking to advance your
              crypto knowledge, CryptLearn has something for everyone. Join
              thousands of learners and start your journey today.
            </p>
            <a href="/courses" className="btn btn-primary text-lg">
              Explore Courses
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
