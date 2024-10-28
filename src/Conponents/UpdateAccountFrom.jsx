import { useState } from "react";
import { deleteAccount, editInfo } from "../Fetch-Data/FetchAPI.js";
import { useNavigate } from "react-router-dom";

const UpdateAccountForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState(null);
  const [imgError, setImgError] = useState('');
  const [error, setError] = useState('');
  const [errorDelete,setErrorDelete]=useState("");
  const nav=useNavigate();
  const handleImage = (event) => {
    const file = event.target.files[0]; // Correctly accessing files array

    if (file && file.type.startsWith('image/')) {
      setProfile(file);
      setImgError('');
      console.log('token here'+localStorage.getItem('Access-token'));
      
    } else {
      setImgError("Please upload a valid image.");
      setProfile(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await editInfo({ username, email, password, profile });
      const token=res.data.token;
      localStorage.setItem('Access-token',token);
      window.location.reload();
      
      
    } catch (error) {
      setError("Something went wrong: " + error.message); // Display a meaningful error message
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {

    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        const res=await deleteAccount();
        console.log(res);
        nav('/auth/login')
      } catch (error) {
        setErrorDelete(error);
        console.log('something went wrong');
      }
    }
  };
  return (
    <section>
      <div className='bg-white p-12 rounded-xl z-10'>
        <form onSubmit={handleSubmit}>
          <label className='green-label pr-6'>UserName:</label>
          <input 
            type="text" 
            placeholder='UserName' 
            className='input-style' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          /><br /><br /><br />
          
          <label className='green-label pr-16'>Email:</label>
          <input 
            type="email" 
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className='input-style' 
            required
          /><br /><br /><br />
          <label className='green-label pr-6'>Password:</label>
          <input 
            type="password" 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className='input-style' 
            required
          /><br /><br /><br />
          
          <label className='green-label pr-6'>Profile:</label>
          <input 
            type="file" 
            id="imageInput" 
            accept="image/*"  // Fixed accept attribute
            onChange={handleImage} 
            className='input-style ml-9' 
            required
          /><br /><br /><br />
          
          <div className='flex justify-between'>
            <input type="submit" className='green-btn' />
            <button 
              type="button" // Change type to button to prevent form submission
              onClick={handleDeleteAccount} 
              className='green-btn bg-red-600 hover:bg-red-400'
            >
              Account Delete
            </button>
          </div>
        </form>
      </div>
      {error && <p className="text-red-600">{error}</p>} {/* Display error messages */}
      {imgError && <p className="text-red-600">{imgError}</p>} {/* Display image error messages */}
      {errorDelete && <p className="text-red-600">{errorDelete}</p>}
    </section>
  );
};

export default UpdateAccountForm;
