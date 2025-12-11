import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { FiMail, FiUser, FiShield, FiCalendar, FiEdit2 } from "react-icons/fi";
import GradientHeading from "../../../components/Shared/GradientHeading";

const Profile = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const handleClick = () => {
    return toast("This feature is progress.");
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <GradientHeading text={"My Profile"}></GradientHeading>
          <p className="text-base-content/70">
            Manage your account information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card - Left Side */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-2xl">
              <div className="card-body items-center text-center p-8">
                {/* Profile Image */}
                <div className="relative">
                  <div className="avatar online">
                    <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={user?.photoURL} alt={user?.displayName} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-primary text-primary-content rounded-full p-2 shadow-lg">
                    <FiEdit2 size={16} />
                  </div>
                </div>

                {/* User Name */}
                <h3 className="text-2xl font-bold mt-4">
                  {user?.displayName || "User"}
                </h3>

                {/* Role Badge */}
                <div className="badge badge-primary badge-lg gap-2 mt-2">
                  <FiShield size={14} />
                  {role || "User"}
                </div>

                {/* Email */}
                <p className="text-base-content/70 mt-2 flex items-center gap-2">
                  <FiMail size={16} />
                  {user?.email}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 w-full mt-6">
                  <button
                    onClick={handleClick}
                    className="w-full text-base btn text-white font-bold py-3 
            rounded-lg shadow-lg hover:shadow-xl transition-all
             duration-300 hover:scale-[1.02] active:scale-95 border-none 
             hover:opacity-70 "
                    style={{
                      background:
                        "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                    }}
                  >
                    <FiEdit2 size={18} />
                    Edit Profile
                  </button>
                </div>

                {/* Account Created */}
                <div className="divider"></div>
                <div className="text-sm text-base-content/60 flex items-center gap-2">
                  <FiCalendar size={14} />
                  Member since {formatDate(user?.metadata?.creationTime)}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details - Right Side */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-2xl">
              <div className="card-body p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FiUser size={24} />
                  Account Information
                </h3>

                {/* Information Grid */}
                <div className="space-y-6">
                  {/* Personal Information Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      <h4 className="text-lg font-semibold">
                        Personal Information
                      </h4>
                    </div>
                    <div className="bg-linear-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            Full Name
                          </label>
                          <p className="text-lg font-medium mt-1">
                            {user?.displayName || "Not provided"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            Email Address
                          </label>
                          <p className="text-lg font-medium mt-1">
                            {user?.email}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            Phone Number
                          </label>
                          <p className="text-lg font-medium mt-1">
                            {user?.phoneNumber || "Not provided"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            User ID
                          </label>
                          <p className="text-lg font-medium mt-1 truncate">
                            {user?.uid?.substring(0, 20)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Status Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-secondary rounded-full"></div>
                      <h4 className="text-lg font-semibold">Account Status</h4>
                    </div>
                    <div className="bg-linear-to-br from-secondary/5 to-accent/5 p-6 rounded-xl border border-secondary/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            Email Verification
                          </label>
                          <div className="mt-2">
                            {user?.emailVerified ? (
                              <span className="badge badge-success gap-2">
                                ✓ Verified
                              </span>
                            ) : (
                              <span className="badge badge-warning gap-2">
                                ⚠ Not Verified
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            Account Role
                          </label>
                          <div className="mt-2">
                            <span className="badge badge-primary badge-lg">
                              {role || "User"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            Account Created
                          </label>
                          <p className="text-lg font-medium mt-1">
                            {formatDate(user?.metadata?.creationTime)}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            Last Sign In
                          </label>
                          <p className="text-lg font-medium mt-1">
                            {formatDate(user?.metadata?.lastSignInTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Provider Information */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-accent rounded-full"></div>
                      <h4 className="text-lg font-semibold">
                        Authentication Provider
                      </h4>
                    </div>
                    <div className="bg-linear-to-br from-accent/5 to-primary/5 p-6 rounded-xl border border-accent/10">
                      <div className="flex items-center gap-4">
                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content rounded-full w-12">
                            <span className="text-xl">
                              {user?.providerData?.[0]?.providerId
                                ?.charAt(0)
                                .toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            Sign-in Method
                          </label>
                          <p className="text-lg font-medium capitalize">
                            {user?.providerData?.[0]?.providerId?.replace(
                              ".com",
                              ""
                            ) || "Email"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
