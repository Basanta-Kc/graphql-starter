import { useState } from "react";

// Queries
// eg https://www.apollographql.com/docs/react/data/queries/

// Mutations
// eg https://www.apollographql.com/docs/react/data/mutations

const tasks = [
  {
    _id: 1,
    title: "Learn Grpahql",
    description: "Leanr graphql with react & express with apolloserver",
    status: "Pending",
  },
];

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Create or Update Task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentTaskId) {
      // graphql call to update
    } else {
      // grphql call to create
    }
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setCurrentTaskId(null);
    // refresh the data after edit or update
  };

  // Edit Task
  const handleEdit = (task) => {
    setCurrentTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  };

  // Delete Task
  const handleDelete = async (id) => {
    // grpahql deelte
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />{" "}
        <br></br>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        ></textarea>
        <br></br>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <br></br>
        <button type="submit">
          {currentTaskId ? "Update Task" : "Create Task"}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
