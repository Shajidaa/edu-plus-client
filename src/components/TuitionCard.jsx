import { FiBookOpen, FiMapPin, FiDollarSign, FiCalendar } from "react-icons/fi";
import { Link } from "react-router";

const TuitionCard = ({ tuition }) => {
  const {
    subject,
    class: tuitionClass,
    location,
    budget,

    status = "pending",

    createdAt,
  } = tuition;

  const getStatusColor = () => {
    switch (status) {
      case "approved":
        return "badge-success";
      case "rejected":
        return "badge-error";
      case "pending":
        return "badge-warning";
      default:
        return "badge-ghost";
    }
  };

  const formatDate = (date) => {
    if (!date) return "Recently";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="card-body p-6">
        {/* Header with Status Badge */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="card-title text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              {subject}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-base-content/70">
              <FiCalendar size={14} />
              <span className="text-sm">Posted {formatDate(createdAt)}</span>
            </div>
          </div>
          <div className={`badge ${getStatusColor()} badge-lg`}>{status}</div>
        </div>

        {/* Tuition Details */}
        <div className="space-y-3 mb-4">
          {/* Class/Grade */}
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
            <div className="bg-primary/20 p-2 rounded-lg">
              <FiBookOpen className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-xs text-base-content/60 font-semibold">
                Class/Grade
              </p>
              <p className="font-semibold text-base">{tuitionClass}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
            <div className="bg-secondary/20 p-2 rounded-lg">
              <FiMapPin className="text-secondary" size={20} />
            </div>
            <div>
              <p className="text-xs text-base-content/60 font-semibold">
                Location
              </p>
              <p className="font-semibold text-base">{location}</p>
            </div>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
            <div className="bg-accent/20 p-2 rounded-lg">
              <FiDollarSign className="text-accent" size={20} />
            </div>
            <div>
              <p className="text-xs text-base-content/60 font-semibold">
                Budget (per month)
              </p>
              <p className="font-bold text-lg text-accent">৳{budget}</p>
            </div>
          </div>
        </div>

        <div className="divider my-2"></div>

        {/* Student Information */}
        <div className="flex items-center justify-between">
          {/* Action Button */}

          <Link
            to={`/tuitions-details/${tuition._id}`}
            className="btn btn-primary btn-sm gap-2"
          >
            see more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TuitionCard;
