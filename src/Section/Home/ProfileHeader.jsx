import { Link } from 'react-router-dom';
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

  const handleInfo = async () => {
    try {
      const res = await getUserInfo();
      setUserName(res.data.data[0].username);
      setEmail(res.data.data[0].email);
      const profilefetch=`http://localhost:3000/${res.data.data[0].profile}`
      setProfile(profilefetch);
      console.log('username',username);
      
    } catch (err) {
      setError('Failed to fetch user info fetch. Please try again later.');
      console.error(err);
    }
  };
  console.log(profile);
  
  useEffect(() => {
    handleInfo();
  }, []);

  // If the profile image is not available, use a default image

  return (
    <section className="w-[1350px]">
      <div key={username} className="flex justify-between gap-20 items-center">
        <div className='flex items-center gap-10'>
          <div>
            <img src={profile} alt={username} className="w-48 rounded-full h-48 my-16" />
          </div>
          <div className="flex flex-col justify-center items-start p-10 bg-lightGray rounded-xl">
            <p className="green-text">Name: {username}</p>
            <p className="green-text">Email: {email}</p>
          </div>
        </div>
        <div className='flex'>
          <Link className='green-btn ml-64'  onClick={() => setShowModelCreate(true)}>Create Blog</Link>
          <Link className='green-btn ml-10'  onClick={() => setShowModelEdit(true)}>Edit Profile</Link>
        </div>
      </div>
      
      <ModelEditProfile id='edit-profile' isVisible={showModelEdit} onClose={() => setShowModelEdit(false)} />
      <ModelEditProfile id='create' isVisible={showModelCreate} onClose={() => setShowModelCreate(false)} />
      <p>{error}</p>
    </section>
  );
};


export default ProfileHeader;
