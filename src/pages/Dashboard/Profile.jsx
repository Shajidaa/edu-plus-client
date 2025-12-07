import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl mb-4">
              <img src={user?.photoURL} alt="" />
            </div>
            <h3 className="text-xl text-black font-semibold">{user?.role}</h3>
            <h3 className="text-xl text-black font-semibold">
              {user?.displayName}
            </h3>
            <p className="text-gray-500"> {user?.email}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded ">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
