import { Link, useNavigate } from 'react-router-dom';
import ModelEditProfile from '../../Utils/ModelEditProfile';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../Fetch-Data/FetchAPI';

const ProfileHeader = () => {
  const [showModelEdit, setShowModelEdit] = useState(false);
  const [showModelCreate, setShowModelCreate] = useState(false);
  const [error, setError] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');
  const navigate = useNavigate();

  const handleInfo = async () => {
    try {
      const res = await getUserInfo();
      setUserName(res.data.data[0].username);
      setEmail(res.data.data[0].email);
      const profileUrl = `http://localhost:3000/${res.data.data[0].profile}`;
      setProfile(profileUrl);
    } catch (err) {
      setError('Failed to fetch user info. Please try again later.');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('Access-token');
    navigate('/auth/login');
  };

  useEffect(() => {
    handleInfo();
  }, []);

  return (
    <section className="w-full max-w-[1350px] mx-auto">
      <div className="flex justify-between items-center gap-20">
        <div className="flex items-center gap-10">
          <div>
            <img
              src={profile || 'default-profile.png'}
              alt={username || 'User Profile'}
              className="w-48 h-48 my-16 rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center items-start p-10 bg-lightGray rounded-xl">
            <p className="text-green-700">Name: {username}</p>
            <p className="text-green-700">Email: {email}</p>
          </div>
        </div>
        <div className="flex">
          <button className="green-btn ml-10 hover:bg-green-700" onClick={() => setShowModelCreate(true)}>
            Create Blog
          </button>
          <button className="green-btn ml-10 hover:bg-green-700" onClick={() => setShowModelEdit(true)}>
            Edit Profile
          </button>
          <button className="green-btn ml-10 bg-red-600 hover:bg-red-800" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
      
      <ModelEditProfile id="edit-profile" isVisible={showModelEdit} onClose={() => setShowModelEdit(false)} />
      <ModelEditProfile id="create" isVisible={showModelCreate} onClose={() => setShowModelCreate(false)} />
      {error && <p className="text-red-500">{error}</p>}
    </section>
  );
};

export default ProfileHeader;
