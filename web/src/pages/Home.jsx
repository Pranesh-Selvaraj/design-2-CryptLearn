import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Shield,
  Zap,
  Monitor,
  Target,
  FileText,
} from "lucide-react";
import Hero from "../components/Hero";
import IconStrip from "../components/IconStrip";

function Home() {
  const learningPaths = [
    {
      title: "Introduction to Cryptography",
      level: "Beginner",
      courses: 10,
      lessons: 45,
      duration: "6-8 weeks",
      icon: <BookOpen size={32} className="text-accent-coral" />,
    },
    {
      title: "Symmetric Cryptography",
      level: "Intermediate",
      courses: 8,
      lessons: 38,
      duration: "5-7 weeks",
      icon: <Shield size={32} className="text-accent-blue" />,
    },
    {
      title: "RSA Cryptography",
      level: "Advanced",
      courses: 12,
      lessons: 52,
      duration: "8-10 weeks",
      icon: <Award size={32} className="text-accent-purple" />,
    },
  ];

  const exercises = [
    {
      title: "Hash Challenge",
      subtitle: "Enigma Machine",
      difficulty: "Easy",
      problems: 12,
      duration: 15,
      category: "Design Encrypt Decrypt Enigma/Cipher",
    },
    {
      title: "Programming",
      subtitle: "Elliptic Curve Cryptography",
      difficulty: "Medium",
      problems: 8,
      duration: 25,
      category: "Cryptography Programming: Maths, Curve, Elliptics",
    },
    {
      title: "Programming",
      subtitle: "Cryptography Concepts",
      difficulty: "Medium",
      problems: 15,
      duration: 30,
      category: "Programming Cryptography Concepts",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="A comprehensive learning solution for Cryptography"
        subtitle=""
        actions={
          <>
            <Link to="/courses" className="btn btn-primary text-base">
              Get Started
            </Link>
          </>
        }
      />

      {/* Icon Strip */}
      <IconStrip />

      {/* Interactive Learning Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            {/* Illustration Left */}
            <div className="relative h-[300px] bg-gradient-to-br from-accent-cream to-white rounded-3xl flex items-center justify-center border border-gray-100">
              <div className="w-32 h-32 bg-accent-pink rounded-2xl transform rotate-12 flex items-center justify-center">
                <Monitor size={48} className="text-white" />
              </div>
            </div>

            {/* Content Right */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Interactive Learning Material
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Visualize several cryptographic functions with interactive
                inputs. Crypteach offers multimedia learning materials for all
                kinds of learners.
              </p>
            </div>
          </div>

          {/* Embedded Practice - Content Left */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Embedded Practice Space
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Learning and practice all at one place. Play around with a
                myriad of cryptographic functions to choose from and sharpen
                your skills.
              </p>
            </div>

            {/* Illustration Right */}
            <div className="relative h-[300px] bg-gradient-to-br from-accent-cream to-white rounded-3xl flex items-center justify-center border border-gray-100">
              <div className="w-32 h-32 bg-accent-blue rounded-3xl transform -rotate-6 flex items-center justify-center">
                <Target size={48} className="text-white" />
              </div>
            </div>
          </div>

          {/* Challenges and Scores */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Illustration Left */}
            <div className="relative h-[300px] bg-gradient-to-br from-accent-cream to-white rounded-3xl flex items-center justify-center border border-gray-100">
              <div className="w-32 h-32 bg-accent-yellow rounded-full flex items-center justify-center">
                <FileText size={48} className="text-white" />
              </div>
            </div>

            {/* Content Right */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Challenges and Scores
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Assess your knowledge at any moment and score points as along.
                Collect Bronze, Gold, Silver, Platinum and Diamond badges by
                completing challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20 bg-accent-beige">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Learning Paths
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="w-24 h-24 bg-gradient-to-br from-accent-cream to-white rounded-2xl flex items-center justify-center mb-6 border border-gray-100">
                  {path.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-6">{path.title}</h3>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award size={18} className="text-accent-coral" />
                    <span>{path.courses} Courses</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen size={18} className="text-accent-coral" />
                    <span>{path.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <TrendingUp size={18} className="text-accent-coral" />
                    <span>{path.level}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield size={18} className="text-accent-coral" />
                    <span>{path.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="btn btn-primary text-base">Explore More</button>
          </div>
        </div>
      </section>

      {/* Practice Exercises Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Practice Exercises
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-accent-coral"
              >
                {/* Icon/Illustration */}
                <div className="w-20 h-20 bg-gradient-to-br from-accent-yellow to-accent-pink rounded-2xl flex items-center justify-center mb-6">
                  <Zap size={32} className="text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2">{exercise.title}</h3>
                <p className="text-lg font-semibold text-gray-700 mb-4">
                  {exercise.subtitle}
                </p>

                {/* Difficulty Badge */}
                <div className="inline-block mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      exercise.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {exercise.difficulty}
                  </span>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-accent-coral" />
                    <span>{exercise.problems} Problems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-accent-coral" />
                    <span>{exercise.duration} minutes</span>
                  </div>
                </div>

                {/* Category */}
                <p className="text-xs text-gray-500 italic">
                  {exercise.category}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="btn btn-primary text-base">Explore More</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
