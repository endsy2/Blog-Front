import { useState } from "react";
import { deleteBlog } from "../Fetch-Data/FetchAPI";
import { useNavigate } from "react-router-dom";

const DeleteBlog = ({ blogID }) => {
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await deleteBlog({ blogID }); // Pass blogID directly as an object
      console.log(res);
      nav('/'); // Redirect to home on successful deletion
    } catch (error) {
      console.log('Something went wrong');
      setError(error.message); // Set error message in state
    }
  };

  const handleCancel = () => {
    window.location.reload(); // Simply reloads the page
  };

  return (
    <section>
      <div className='bg-white p-12 rounded-xl z-10'>
        <h1 className="green-text text-center">Are you sure that you want to delete?</h1>
        <div className="flex gap-36">
          <button className="green-btn my-14 hover:bg-green-600" onClick={handleDelete}>Delete</button>
          <button className="green-btn my-14 bg-red-700 hover:bg-red-900" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
      {error && <p className="text-red-600">{error}</p>} {/* Display error if present */}
    </section>
  );
};

export default DeleteBlog;
