import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Applications({ darkMode, setDarkMode }) {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {

    try {

      const res = await API.get("/jobs");

      setJobs(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const updateJob = async (jobId, status) => {

    try {

      await API.put(
        `/jobs/${jobId}`,
        { status }
      );

      fetchJobs();

    } catch (err) {

      console.log(err);

    }
  };

  const deleteJob = async (jobId) => {

    try {

      await API.delete(`/jobs/${jobId}`);

      fetchJobs();

    } catch (err) {

      console.log(err);

    }
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

  return (

    <div className="flex bg-slate-50 min-h-screen">

      <Sidebar 
      darkMode={darkMode}
  setDarkMode={setDarkMode}/>

      <div className="ml-56 flex-1 p-10">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Applications
          </h1>

          <p className="text-gray-500 text-lg">
            Manage and track all your applications
          </p>

        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

            <h2 className="text-3xl font-bold text-slate-800">
              Your Applications
            </h2>

            <div className="flex gap-4">

              <input
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 px-4 py-3 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >

                <option>All</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>

              </select>

            </div>

          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 ? (

            <div className="text-center py-20">

              <h2 className="text-2xl font-semibold text-slate-700 mb-3">
                No Applications Found
              </h2>

              <p className="text-gray-500">
                Try adding jobs or changing filters
              </p>

            </div>

          ) : (

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

          )}

        </div>

      </div>

    </div>

  );
}

export default Applications;