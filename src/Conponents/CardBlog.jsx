import { Link } from "react-router-dom";
import Blog from "../Pages/blog";
import { useEffect, useState } from "react";
import { getAllBlog } from "../Fetch-Data/FetchAPI";


const CardBlog = () => {
  const [res, setRes] = useState([]);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      const response = await getAllBlog();
      setRes(response.data.data);
    } catch (error) {
      setError("Failed to fetch blogs. Please try again.");
      console.log(error);
      
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <section className="flex flex-wrap">
      <section className="flex flex-wrap gap-14 mt-10">
        {res && res.length > 0 ? (
          res.map((element) => (
            <Link
              to={`/blog/${element.id}`}
              element={<Blog />}
              key={`:${element.id}`}
              className="w-[300px] bg-lightGray border-primary border-2 rounded-2xl"
            >
              <div>
                <img
                  src={`http://localhost:3000/${element.banner_image}`}
                  alt={element.title}
                  className="rounded-t-2xl h-[250px] w-[296px]"
                />
              </div>
              <div className="pb-7 pt-1">
                <h1 className="green-text text-center">Title: {element.title}</h1>
                <h2 className="green-text text-center text-xl">Category: {element.category}</h2>
                <p className="green-text text-center text-lg">{element.description}</p>
              </div>
              
            </Link>
          ))
        ) : (
          <p>{error || "Create a blog"}</p>
        )}
        
      </section>
    </section>
  );
};

export default CardBlog;
