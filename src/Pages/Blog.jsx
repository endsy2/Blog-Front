import { useEffect, useState } from "react";
import ModelEditProfile from "../Utils/ModelEditProfile";
import { useParams } from "react-router-dom";
import { getOneBlog } from "../Fetch-Data/FetchAPI";

const Blog = () => {
  const [isVisible, setVisible] = useState(false);
  const [isVisible2, setVisible2] = useState(false);
  const { id } = useParams(); // Call useParams as a function
  const [response, setResponse] = useState(null); // Initialize to null
  const [error, setError] = useState('');

  const handleData = async () => {
    try {
      console.log("id"+id);
      
      const res = await getOneBlog({ id });
      setResponse(res.data.data[0]); // Set the response directly
       // Log the response
    } catch (error) {
      setError("Failed to fetch blog data."); // Update error message for clarity
      console.error(error); // Log the error for debugging
    }
  };

  useEffect(() => {
    handleData();
  }, [id]); // Add id as a dependency

  return (
    <section className="w-[1350px] border-2 my-10 flex flex-col justify-center items-center mr-96">
      <div className="flex justify-center p-10">
        {response && <img src={`http://localhost:3000/${response.banner_image}`} alt="" className="w-[600px] rounded-xl h-[350px] object-cover" />}
      </div>
      <div className="mr-60">
        <h1 className="green-text text-4xl ml-56">Title: {response ? response.title : "Loading..."}</h1>
        <h2 className="green-text ml-52 text-3xl">Category: {response ? response.category : "Loading..."}</h2>
        <p className="green-text ml-40">Description: {response ? response.description : "Loading..."}</p>
      </div>
      <button className="green-btn absolute right-64 bottom-[350px] bg-red-600 hover:bg-red-300" onClick={()=>setVisible2(true)} >DELETE</button>
      <button className="green-btn absolute right-64 bottom-[450px]" onClick={() => setVisible(true)}>EDIT</button>
      {error && <p className="text-red-600">{error}</p>}
      <ModelEditProfile blogID={id} id='update-blog' isVisible={isVisible} onClose={() => setVisible(false)} />
      <ModelEditProfile blogID={id} id='delete-blog' isVisible={isVisible2} onClose={() => setVisible2(false)} />
    </section>
  );
};

export default Blog;
