import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Analytics({ darkMode, setDarkMode }) {

  const [jobs, setJobs] = useState([]);

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

  const stats = {
    total: jobs.length,
    applied: jobs.filter(job => job.status === "Applied").length,
    interview: jobs.filter(job => job.status === "Interview").length,
    offer: jobs.filter(job => job.status === "Offer").length,
    rejected: jobs.filter(job => job.status === "Rejected").length,
  };

  const interviewRate =
    stats.total === 0
      ? 0
      : ((stats.interview / stats.total) * 100).toFixed(1);

  const offerRate =
    stats.total === 0
      ? 0
      : ((stats.offer / stats.total) * 100).toFixed(1);

  const rejectionRate =
    stats.total === 0
      ? 0
      : ((stats.rejected / stats.total) * 100).toFixed(1);

  const chartData = [
    {
      name: "Applied",
      value: stats.applied
    },
    {
      name: "Interview",
      value: stats.interview
    },
    {
      name: "Offer",
      value: stats.offer
    },
    {
      name: "Rejected",
      value: stats.rejected
    }
  ];

  const COLORS = [
    "#3B82F6",
    "#FBBF24",
    "#10B981",
    "#EF4444"
  ];

  return (

    <div className="flex bg-slate-50 min-h-screen">

      <Sidebar 
      darkMode={darkMode}
  setDarkMode={setDarkMode}/>

      <div className="ml-56 flex-1 p-10">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Analytics
          </h1>

          <p className="text-gray-500 text-lg">
            Track application performance and hiring progress
          </p>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-slate-700">

            <h2 className="text-4xl font-bold">
              {stats.total}
            </h2>

            <p className="text-gray-500 mt-3">
              Total Applications
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-400">

            <h2 className="text-4xl font-bold">
              {interviewRate}%
            </h2>

            <p className="text-gray-500 mt-3">
              Interview Rate
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-emerald-500">

            <h2 className="text-4xl font-bold">
              {offerRate}%
            </h2>

            <p className="text-gray-500 mt-3">
              Offer Rate
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-red-500">

            <h2 className="text-4xl font-bold">
              {rejectionRate}%
            </h2>

            <p className="text-gray-500 mt-3">
              Rejection Rate
            </p>

          </div>

        </div>

        

        {/* Main Chart */}
<div className="bg-white rounded-2xl shadow-md p-10 mb-10">

  <h2 className="text-3xl font-bold text-slate-800 mb-10">
    Application Distribution
  </h2>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

    {/* Chart */}
    <div className="h-[420px]">

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={140}
          >

            {chartData.map((entry, index) => (

              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>

    {/* Legend + Insights */}
    <div className="space-y-6">

      <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-5">

        <div className="flex items-center gap-3">

          <div className="w-4 h-4 rounded-full bg-blue-500"></div>

          <span className="text-lg font-medium">
            Applied
          </span>

        </div>

        <span className="text-2xl font-bold">
          {stats.applied}
        </span>

      </div>

      <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-5">

        <div className="flex items-center gap-3">

          <div className="w-4 h-4 rounded-full bg-amber-400"></div>

          <span className="text-lg font-medium">
            Interview
          </span>

        </div>

        <span className="text-2xl font-bold">
          {stats.interview}
        </span>

      </div>

      <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-5">

        <div className="flex items-center gap-3">

          <div className="w-4 h-4 rounded-full bg-emerald-500"></div>

          <span className="text-lg font-medium">
            Offer
          </span>

        </div>

        <span className="text-2xl font-bold">
          {stats.offer}
        </span>

      </div>

      <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-5">

        <div className="flex items-center gap-3">

          <div className="w-4 h-4 rounded-full bg-red-500"></div>

          <span className="text-lg font-medium">
            Rejected
          </span>

        </div>

        <span className="text-2xl font-bold">
          {stats.rejected}
        </span>

      </div>

    </div>

  </div>

</div>
      </div>

    </div>

  );
}
export default Analytics;