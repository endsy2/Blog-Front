import { useEffect, useState } from "react";
import axios from "axios";

const BlogPagination = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  const fetchBlogs = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/blogPagination?page=${page}`);
      setBlogs(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      setError("Failed to load blogs");
      setError(err)
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <div>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
          </div>
        ))}
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogPagination;
