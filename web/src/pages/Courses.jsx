import { useState } from "react";
import { Search, Filter } from "lucide-react";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import { courses } from "../data/courses";

function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel =
      selectedLevel === "All" || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div>
      <Hero
        title="Explore Our Courses"
        subtitle="Choose from our comprehensive collection of cryptocurrency and blockchain courses"
        backgroundPattern={true}
      />

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {/* Search and Filter */}
          <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              <Filter size={20} className="text-gray-600" />
              <div className="flex space-x-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedLevel === level
                        ? "bg-primary-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                No courses found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Courses;
