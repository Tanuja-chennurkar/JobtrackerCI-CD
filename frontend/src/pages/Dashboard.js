import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
function Dashboard({ darkMode, setDarkMode }) {

  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const stats = {
    total: jobs.length,
    applied: jobs.filter(job => job.status === "Applied").length,
    interview: jobs.filter(job => job.status === "Interview").length,
    offer: jobs.filter(job => job.status === "Offer").length,
    rejected: jobs.filter(job => job.status === "Rejected").length,
  };
  const filteredJobs = jobs.filter((job) => {

  const matchesSearch =
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.title.toLowerCase().includes(search.toLowerCase());

  const matchesFilter =
    filterStatus === "All" ||
    job.status === filterStatus;

  return matchesSearch && matchesFilter;

});

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {

    try {

      const res = await API.get("/jobs");

      setJobs(res.data);

    } catch (err) {

      console.log(err.response);

    }
  };
  const addJob = async () => {
    
    try {
      
      await API.post("/jobs", {
        title,
        company
      });
      
      setTitle("");
      setCompany("");
      
      fetchJobs();
      toast.success("Job added successfully");

    } catch (err) {

      toast.error("Failed to add job");
      console.log(err);

    }
  };

  const updateJob = async (jobId, status) => {

    try {

      await API.put(
        `/jobs/${jobId}`,
        {
          status
        }
      );

      fetchJobs();
      toast.success(`Status updated to ${status}`);

    } catch (err) {

      console.log(err);
      toast.error("Failed to update job");
    }
  };
  const deleteJob = async (jobId) => {

    try {

      await API.delete(
        `/jobs/${jobId}`
      );

      fetchJobs();
      toast.success("Job deleted");
    } catch (err) {

      console.log(err);
      toast.error("Failed to delete job");
    }
  };

  return (

    <div className="flex bg-slate-50 min-h-screen">

      <Sidebar 
      darkMode={darkMode}
  setDarkMode={setDarkMode}/>

      <div className="ml-56 flex-1 p-10">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Dashboard
          </h1>

          <p className="text-gray-500 text-lg">
            Track your job applications easily
          </p>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-1 transition border-l-4 border-slate-700">

            <h2 className="text-4xl font-bold">
              {stats.total}
            </h2>

            <p className="text-gray-500 mt-3">
              Total Jobs
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500 hover:-translate-y-1 transition">

            <h2 className="text-4xl font-bold">
              {stats.applied}
            </h2>

            <p className="text-gray-500 mt-3">
              Applied
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-amber-400 hover:-translate-y-1 transition">

            <h2 className="text-4xl font-bold">
              {stats.interview}
            </h2>

            <p className="text-gray-500 mt-3">
              Interview
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-emerald-500 hover:-translate-y-1 transition">

            <h2 className="text-4xl font-bold">
              {stats.offer}
            </h2>

            <p className="text-gray-500 mt-3">
              Offer
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-red-500 hover:-translate-y-1 transition">

            <h2 className="text-4xl font-bold">
              {stats.rejected}
            </h2>

            <p className="text-gray-500 mt-3">
              Rejected
            </p>

          </div>

        </div>

        {/* Add Job Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-10">

          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            Add Job
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <input
              className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Role"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button
              onClick={addJob}
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition"
            >
              Add Job
            </button>

          </div>

        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

            <h2 className="text-4xl font-bold text-slate-800">
              Your Applications
            </h2>

            <div className="flex gap-4">

  

</div>

          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-800 text-white">

                  <th className="py-6 px-5 text-left">
                    Company
                  </th>

                  <th className="py-6 px-5 text-left">
                    Role
                  </th>

                  <th className="py-6 px-5 text-left">
                    Status
                  </th>

                  <th className="py-6 px-5 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredJobs.map((job) => (

                  <tr
                    key={job.id}
                    className="border-b hover:bg-slate-50 transition"
                  >

                    <td className="py-6 px-5 font-medium">
                      {job.company}
                    </td>

                    <td className="py-6 px-5">
                      {job.title}
                    </td>

                    <td className="py-6 px-5">

                      <span className={`
                        px-4 py-1 rounded-full text-sm font-semibold
                        ${job.status === "Applied" && "bg-blue-100 text-blue-700"}
                        ${job.status === "Interview" && "bg-amber-100 text-amber-700"}
                        ${job.status === "Offer" && "bg-emerald-100 text-emerald-700"}
                        ${job.status === "Rejected" && "bg-red-100 text-red-700"}
                      `}>
                        {job.status}
                      </span>

                    </td>

                    <td className="py-6 px-5">

                      <div className="flex gap-2 flex-wrap">

                        <button
                          onClick={() =>
                            updateJob(job.id, "Interview")
                          }
                          className="bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-lg font-medium transition"
                        >
                          Interview
                        </button>

                        <button
                          onClick={() =>
                            updateJob(job.id, "Offer")
                          }
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition"
                        >
                          Offer
                        </button>

                        <button
                          onClick={() =>
                            updateJob(job.id, "Rejected")
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() =>
                            deleteJob(job.id)
                          }
                          className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-lg font-medium transition"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;