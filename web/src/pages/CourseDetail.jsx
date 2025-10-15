import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  Award,
  CheckCircle,
} from "lucide-react";
import { courses } from "../data/courses";

function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <Link to="/courses" className="btn btn-primary">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Course Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <Link
            to="/courses"
            className="inline-flex items-center text-white hover:text-primary-100 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-semibold rounded-full mb-4">
                {course.level}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-xl mb-6 text-primary-100">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock size={20} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={20} />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star size={20} fill="currentColor" />
                  <span>{course.rating} rating</span>
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-20">
                <div className="aspect-video bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">{course.icon}</span>
                </div>
                <div className="text-3xl font-bold mb-4 text-gray-900">
                  {course.price}
                </div>
                <button className="btn btn-primary w-full mb-3">
                  Enroll Now
                </button>
                <button className="btn btn-secondary w-full">
                  Add to Wishlist
                </button>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Award size={16} />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={16} />
                    <span>Access to community</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>Lifetime access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About Course */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                <p className="text-gray-600 leading-relaxed">
                  {course.longDescription}
                </p>
              </div>

              {/* What You'll Learn */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.topics.map((topic, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle
                        size={20}
                        className="text-green-500 flex-shrink-0 mt-1"
                      />
                      <span className="text-gray-600">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-4">Your Instructor</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {course.instructor.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {course.instructor}
                    </h3>
                    <p className="text-gray-600">Expert Instructor</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Only on larger screens */}
            <div className="lg:col-span-1 hidden lg:block">
              {/* Empty space for layout */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseDetail;
