// import { useEffect, useState } from "react";
// import { Sun, Moon, LogOut } from "lucide-react";
// import { CheckCircle, Circle, Trash2 } from "lucide-react";
// import toast from "react-hot-toast";


// function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [title, setTitle] = useState("");
//   const [loading, setLoading] = useState(false);

  

//   const [filter, setFilter] = useState("all"); // 🔥 NEW
//   const [dark, setDark] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   const token = localStorage.getItem("token");
//   if (!token) window.location.href = "/";

//   // 🔁 Fetch
  
  
// const fetchTasks = async () => {
//   try {
//     setLoading(true);

//     const res = await fetch("http://localhost:5000/api/tasks", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     // ❗ check response status
//     if (!res.ok) {
//       throw new Error("Failed to fetch tasks");
//     }

//     const data = await res.json();

//     setTasks(data);

//     // 🔥 Optional: show message if no tasks
//     if (data.length === 0) {
//       toast("No tasks yet ");
//     }

//   } catch (err) {
//     console.error(err);
//     toast.error("Unable to load tasks 🚫");
//   } finally {
//     setLoading(false);
//   }
// };
//   // ➕ Add
//   const addTask = async () => {
//   if (!title.trim()) {
//     return toast.error("Task title is required ❗");
//   }
//     await fetch("http://localhost:5000/api/tasks", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ title }),
//     });

//     setTitle("");
//     fetchTasks();
//   };

//   // ❌ Delete
//   const deleteTask = async (id) => {
//     await fetch(`http://localhost:5000/api/tasks/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchTasks();
//   };

//   // ✅ Complete
//   const completeTask = async (id) => {
//     await fetch(`http://localhost:5000/api/tasks/${id}`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchTasks();
//   };

//   // 🔐 Logout
//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   // 🌗 Theme persistence
//   useEffect(() => {
//     localStorage.setItem("theme", dark ? "dark" : "light");
//   }, [dark]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // 🎯 FILTER LOGIC
//   const filteredTasks = tasks.filter((task) => {
//     if (filter === "completed") return task.status === "completed";
//     if (filter === "pending") return task.status === "pending";
//     return true;
//   });

//   useEffect(() => {
//   if (dark) {
//     document.documentElement.classList.add("dark");
//   } else {
//     document.documentElement.classList.remove("dark");
//   }

//   localStorage.setItem("theme", dark ? "dark" : "light");
// }, [dark]);

//   return (
//       <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition">

//         {/* SIDEBAR */}
       
// <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between">

//   {/* 🔥 LOGO */}
//   <div>
//     <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-8 tracking-tight">
//       TaskFlow
//     </h1>

//     {/* MENU TITLE */}
//     <p className="text-xs uppercase text-gray-400 mb-3 tracking-wider">
//       Menu
//     </p>

//     {/* MENU ITEMS */}
//     <div className="space-y-1 text-sm">

//       <button
//         onClick={() => setFilter("all")}
//         className={`w-full text-left px-3 py-2 rounded-lg transition ${
//           filter === "all"
//             ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium"
//             : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
//         }`}
//       >
//         All Tasks
//       </button>

//       <button
//         onClick={() => setFilter("completed")}
//         className={`w-full text-left px-3 py-2 rounded-lg transition ${
//           filter === "completed"
//             ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium"
//             : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
//         }`}
//       >
//         Completed
//       </button>

//       <button
//         onClick={() => setFilter("pending")}
//         className={`w-full text-left px-3 py-2 rounded-lg transition ${
//           filter === "pending"
//             ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium"
//             : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
//         }`}
//       >
//         Pending
//       </button>

//     </div>
//   </div>

//   {/* 🌗 THEME TOGGLE */}
//   <button
//     onClick={() => setDark(!dark)}
//     className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white transition"
//   >
//     <span className="text-lg">🌙</span>
//     Toggle Theme
//   </button>

// </div>
//         {/* MAIN */}
//         <div className="flex-1 p-8">

//           {/* TOP */}
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//               My Tasks
//             </h2>

//             <button
//               onClick={logout}
//               className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
//             >
//               <LogOut size={16} />
//               Logout
//             </button>
//           </div>

//           {/* ADD TASK */}
//           <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-6 flex gap-3">
//             <input
//               className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
//               placeholder="Write a task..."
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <button
//               onClick={addTask}
//               className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
//             >
//               Add
//             </button>
//           </div>

//           {/* LIST */}
//   {/* LIST */}
// <div className="space-y-4">

//   {/* 🔄 Loading */}
//   {loading && (
//     <p className="text-gray-500 text-center mt-6">
//       Loading tasks...
//     </p>
//   )}

//   {/* 🚫 Empty State */}
//   {!loading && filteredTasks.length === 0 && (
//     <p className="text-gray-400 text-center mt-6">
//       No tasks yet. Add your first task...
//     </p>
//   )}

//   {/* ✅ Task List */}
//   {!loading &&
//     filteredTasks.length > 0 &&
//     filteredTasks.map((task) => (
//       <div
//         key={task.id}
//         className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 flex justify-between items-center hover:shadow-md transition"
//       >
//         {/* LEFT */}
//         <div className="flex items-center gap-3">

//           {/* STATUS ICON */}
//           {task.status === "completed" ? (
//             <CheckCircle className="text-green-500" size={20} />
//           ) : (
//             <Circle className="text-gray-400" size={20} />
//           )}

//           <div>
//             <p
//               className={`text-sm font-medium ${
//                 task.status === "completed"
//                   ? "line-through text-gray-400"
//                   : "text-gray-900 dark:text-white"
//               }`}
//             >
//               {task.title}
//             </p>

//             <span className="text-xs text-gray-400">
//               {task.status}
//             </span>
//           </div>
//         </div>

//         {/* RIGHT ACTIONS */}
//         <div className="flex items-center gap-3">

//           <button
//             onClick={() => completeTask(task.id)}
//             className="text-gray-400 hover:text-green-500 transition"
//           >
//             <CheckCircle size={18} />
//           </button>

//           <button
//             onClick={() => deleteTask(task.id)}
//             className="text-gray-400 hover:text-red-500 transition"
//           >
//             <Trash2 size={18} />
//           </button>

//         </div>
//       </div>
//     ))}
// </div>
//         </div>
//       </div>
   
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import { Sun, Moon, LogOut, CheckCircle, Circle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { ListTodo, CheckCircle2, Clock, PanelLeft } from "lucide-react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const total = tasks.length;
const completed = tasks.filter(t => t.status === "completed").length;
const pending = total - completed;


  const [filter, setFilter] = useState("all");
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // 🔥 NEW (Edit states)
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const token = localStorage.getItem("token");
  if (!token) window.location.href = "/";

  // 🔁 Fetch
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      setTasks(data);

      if (data.length === 0) {
        toast("No tasks yet ");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to load tasks 🚫");
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add
  const addTask = async () => {
    if (!title.trim()) {
      return toast.error("Task title is required ❗");
    }

    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    toast.success("Task added ✅");

    setTitle("");
    fetchTasks();
  };

  // ❌ Delete (TOAST CONFIRM)
  const deleteTask = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="text-sm">Delete this task?</p>

        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-2 py-1 text-xs bg-gray-200 rounded"
          >
            No
          </button>

          <button
            onClick={async () => {
              await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              });

              toast.dismiss(t.id);
              toast.success("Task deleted 🗑️");
              fetchTasks();
            }}
            className="px-2 py-1 text-xs bg-red-500 text-white rounded"
          >
            Yes
          </button>
        </div>
      </div>
    ));
  };

  // ✅ Complete
  const completeTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Task completed 🎉");
    fetchTasks();
  };

  // ✏️ Update
  const updateTask = async (id) => {
    if (!editTitle.trim()) {
      return toast.error("Task cannot be empty ❗");
    }

    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: editTitle }),
    });

    toast.success("Task updated ✅");

    setEditingId(null);
    setEditTitle("");
    fetchTasks();
  };

  // 🔐 Logout
  const logout = () => {
    localStorage.removeItem("token");
    toast("Logged out 👋");
    setTimeout(() => (window.location.href = "/"), 800);
  };

  // Theme
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status === "completed";
    if (filter === "pending") return task.status === "pending";
    return true;
  });

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition">

      {/* SIDEBAR */}
  <div className={`${collapsed ? "w-20" : "w-64"} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col justify-between transition-all duration-300`}>

  {/* TOP */}
  <div>
    {/* HEADER */}
    <div className="flex items-center justify-between mb-6">
      {!collapsed && (
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          TaskFlow
        </h1>
      )}

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-gray-500 hover:text-black dark:hover:text-white"
      >
        <PanelLeft size={20} />
      </button>
    </div>

    {/* MENU */}
    <div className="space-y-2 text-sm">

      {/* ALL */}
      <button
        onClick={() => setFilter("all")}
        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition ${
          filter === "all"
            ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        <div className="flex items-center gap-2">
          <ListTodo size={18} />
          {!collapsed && <span>All Tasks</span>}
        </div>
        {!collapsed && <span className="text-xs">{total}</span>}
      </button>

      {/* COMPLETED */}
      <button
        onClick={() => setFilter("completed")}
        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition ${
          filter === "completed"
            ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} />
          {!collapsed && <span>Completed</span>}
        </div>
        {!collapsed && <span className="text-xs">{completed}</span>}
      </button>

      {/* PENDING */}
      <button
        onClick={() => setFilter("pending")}
        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition ${
          filter === "pending"
            ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        <div className="flex items-center gap-2">
          <Clock size={18} />
          {!collapsed && <span>Pending</span>}
        </div>
        {!collapsed && <span className="text-xs">{pending}</span>}
      </button>

    </div>
  </div>

  {/* BOTTOM */}
  <button
    onClick={() => setDark(!dark)}
    className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white transition"
  >
    <span className="text-lg">🌙</span>
    {!collapsed && <span>Toggle Theme</span>}
  </button>

</div>

      {/* MAIN */}
      <div className="flex-1 p-8">

        {/* TOP */}
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl dark:text-white">My Tasks</h2>

          <button onClick={logout} className="text-red-500 flex gap-1">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* ADD */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded mb-6 flex gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write a task..."
            className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white"
          />

          <button
            onClick={addTask}
            className="bg-black text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-4">

          {loading && <p className="text-center">Loading...</p>}

          {!loading && filteredTasks.length === 0 && (
            <p className="text-center text-gray-400">
              No tasks yet 🚀
            </p>
          )}

          {!loading &&
            filteredTasks.map((task) => (
              <div key={task.id} className="bg-white dark:bg-gray-800 p-4 rounded flex justify-between">

                <div className="flex items-center gap-3">

                  {task.status === "completed" ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <Circle className="text-gray-400" />
                  )}

                  {editingId === task.id ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    <p className={task.status === "completed" ? "line-through" : ""}>
                      {task.title}
                    </p>
                  )}

                </div>

                <div className="flex gap-3">

                  <button onClick={() => completeTask(task.id)}>
                    <CheckCircle />
                  </button>

                  {editingId === task.id ? (
                    <button onClick={() => updateTask(task.id)}>
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(task.id);
                        setEditTitle(task.title);
                      }}
                    >
                      Edit
                    </button>
                  )}

                  <button onClick={() => deleteTask(task.id)}>
                    <Trash2 />
                  </button>

                </div>
              </div>
            ))}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;