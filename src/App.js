import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

// Queries
const GET_TODOS = gql`
  query GetTasks {
    getTasks {
      _id
      title
    }
  }
`;

// Mutations
const CREATE_TODO = gql`
  mutation CreateTask(
    $title: String!
    $description: String!
    $status: String!
  ) {
    createTask(title: $title, description: $description, status: $status) {
      _id
      title
      description
      status
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $description: String
    $status: String
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      status: $status
    ) {
      _id
      title
      description
      status
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      _id
    }
  }
`;


function App() {
  const { data, loading, refetch } = useQuery(GET_TODOS);
  const [createTask] = useMutation(CREATE_TODO);
  const [updateTask] = useMutation(UPDATE_TODO);
  const [deleteTask] = useMutation(DELETE_TODO);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [currentTaskId, setCurrentTaskId] = useState(null);

  if (loading) return <h1>Loading...</h1>;

  // Create or Update Task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentTaskId) {
      await updateTask({
        variables: { id: currentTaskId, title, description, status },
      });
    } else {
      await createTask({ variables: { title, description, status } });
    }
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setCurrentTaskId(null);
    refetch(); // Refresh the data
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
    await deleteTask({ variables: { id } });
    refetch(); // Refresh the data
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        ></textarea>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
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
          {data.getTasks.map((task) => (
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
