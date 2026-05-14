import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import toast from "react-hot-toast";

function Profile() {

  const [profile, setProfile] = useState({
    name: "",
    title: "",
    bio: "",
    github: "",
    linkedin: "",
    skills: ""
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const res = await API.get("/profile");

      setProfile(res.data);

    } catch (err) {

      console.log(err);

      toast.error("Failed to load profile");

    }
  };

  const updateProfile = async () => {

    try {

      await API.put("/profile", profile);

      toast.success("Profile updated");

    } catch (err) {

      console.log(err);

      toast.error("Failed to update profile");

    }
  };

  return (

    <div className="flex bg-slate-50 min-h-screen">

      <Sidebar />

      <div className="ml-56 flex-1 p-10">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-slate-800 mb-3">
            Profile
          </h1>

          <p className="text-gray-500 text-lg">
            Manage your career profile
          </p>

        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg p-10">

          {/* Top Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            <div className="flex items-center gap-6">

              {/* Avatar */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-5xl font-bold shadow-lg">

                {profile.name
                  ? profile.name.charAt(0).toUpperCase()
                  : "T"}

              </div>

              {/* User Info */}
              <div>

                <h2 className="text-4xl font-bold text-slate-800">

                  {profile.name || "Your Name"}

                </h2>

                <p className="text-indigo-500 font-semibold text-xl mt-2">

                  {profile.title || "Your Title"}

                </p>

              </div>

            </div>

            {/* Edit Button */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold transition shadow-lg"
            >
              Edit Profile
            </button>

          </div>

          {/* Bio */}
          <div className="mt-10">

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              About
            </h3>

            <p className="text-gray-600 text-lg leading-8">

              {profile.bio || "Add your bio..."}

            </p>

          </div>

          {/* Skills */}
          <div className="mt-10">

            <h3 className="text-2xl font-bold text-slate-800 mb-5">
              Skills
            </h3>

            <div className="flex flex-wrap gap-4">

              {profile.skills
                ? profile.skills.split(",").map((skill, index) => (

                    <div
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-5 py-3 rounded-full font-medium hover:scale-105 transition"
                    >

                      {skill.trim()}

                    </div>

                  ))
                : (
                  <p className="text-gray-500">
                    No skills added
                  </p>
                )
              }

            </div>

          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            {/* GitHub */}
            <div className="bg-slate-100 rounded-2xl p-6">

              <p className="text-gray-500 mb-2">
                GitHub
              </p>

              <p className="text-indigo-500 font-semibold break-all">

                {profile.github || "Add GitHub link"}

              </p>

            </div>

            {/* LinkedIn */}
            <div className="bg-slate-100 rounded-2xl p-6">

              <p className="text-gray-500 mb-2">
                LinkedIn
              </p>

              <p className="text-indigo-500 font-semibold break-all">

                {profile.linkedin || "Add LinkedIn link"}

              </p>

            </div>

          </div>

        </div>

        {/* Modal */}
        {
          showModal && (

            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-[90%] max-w-4xl p-10 relative">

                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-5 right-6 text-3xl text-gray-500 hover:text-black transition"
                >
                  ×
                </button>

                {/* Heading */}
                <div className="mb-8">

                  <h2 className="text-4xl font-bold text-slate-800 mb-2">
                    Edit Profile
                  </h2>

                  <p className="text-gray-500">
                    Update your professional details
                  </p>

                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <input
                    type="text"
                    placeholder="Name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        name: e.target.value
                      })
                    }
                    className="bg-white/70 border border-white/40 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />

                  <input
                    type="text"
                    placeholder="Title"
                    value={profile.title}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        title: e.target.value
                      })
                    }
                    className="bg-white/70 border border-white/40 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />

                </div>

                {/* Bio */}
                <textarea
                  rows="5"
                  placeholder="Bio"
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      bio: e.target.value
                    })
                  }
                  className="w-full mt-6 bg-white/70 border border-white/40 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />

                {/* Skills */}
                <input
                  type="text"
                  placeholder="React, Docker, FastAPI"
                  value={profile.skills}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      skills: e.target.value
                    })
                  }
                  className="w-full mt-6 bg-white/70 border border-white/40 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                  <input
                    type="text"
                    placeholder="GitHub"
                    value={profile.github}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        github: e.target.value
                      })
                    }
                    className="bg-white/70 border border-white/40 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />

                  <input
                    type="text"
                    placeholder="LinkedIn"
                    value={profile.linkedin}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        linkedin: e.target.value
                      })
                    }
                    className="bg-white/70 border border-white/40 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />

                </div>

                {/* Save Button */}
                <button
                  onClick={() => {
                    updateProfile();
                    setShowModal(false);
                  }}
                  className="mt-8 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold transition shadow-lg"
                >
                  Save Changes
                </button>

              </div>

            </div>

          )
        }

      </div>

    </div>

  );
}

export default Profile;