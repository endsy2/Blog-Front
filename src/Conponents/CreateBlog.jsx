import { useState } from "react";
import { createBlog } from "../Fetch-Data/FetchAPI.js";


const CreateBlog = () => {
    const [profile, setProfile] = useState(null);
    const [errorImg, setImgError] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    

    const handleImage = (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            setProfile(file); // Store the file object
            setImgError('');
        } else {
            setImgError("Please upload a valid image.");
            setProfile(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setError(''); // Reset any previous error
    
        try {
            // Attempt to create the blog post
            const response = await createBlog({ title, category, description, profile });
    
            // Check if the response indicates success (you might want to customize this based on your API)
            if (response.status === 200) { // Assuming 200 is the success status code
                window.location.reload(); // Navigate to the home/index page after successful creation
            } else {
                // Handle specific error responses from the API if needed
                setError("Failed to create blog. Please try again."); 
            }
        } catch (error) {
            // Handle any errors that occur during the API request
            setError("Failed to create blog. Please try again."); 
            console.error(error); // Log the error for debugging
        }
    };
    

    return (
        <section>
            <div className='bg-white p-12 rounded-xl'>
                <form onSubmit={handleSubmit}>
                    <label className='green-label pr-[90px]'>Title</label>
                    <input 
                        type="text" 
                        placeholder='Title' 
                        className='input-style'
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    /><br /><br /><br />

                    <label className='green-label pr-11'>Category:</label>
                    <input 
                        type="text" 
                        placeholder='Category' 
                        className='input-style' 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        required
                    /><br /><br /><br />

                    <label className='green-label pr-5'>Description:</label>
                    <input 
                        type="text" 
                        placeholder='Description' 
                        className='input-style' 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    /><br /><br /><br />

                    <label className='green-label pr-5'>Banner Image:</label>
                    <input 
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleImage}
                        className="text-xl ml-[10px] text-center w-[100px] h-12 text-primary inline-block"
                        required
                    /><br /><br /><br />
                    
                    <input type="submit" value="Create" className='green-btn' />
                </form>
            </div>
            {errorImg && <p className="text-red-600">{errorImg}</p>}
            {error && <p className="text-red-600">{error}</p>}
        </section>
    );
}

export default CreateBlog;
