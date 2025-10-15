import { Link } from "react-router-dom";
import { Clock, Users, Star } from "lucide-react";

function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.id}`} className="card p-6 block group">
      <div className="aspect-video bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl">{course.icon}</span>
        )}
      </div>

      <div className="mb-2">
        <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
          {course.level}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
        {course.title}
      </h3>

      <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{course.students}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-yellow-500">
          <Star size={16} fill="currentColor" />
          <span className="text-gray-700 font-semibold">{course.rating}</span>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
