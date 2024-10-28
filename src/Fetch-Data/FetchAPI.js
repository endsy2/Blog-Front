
import axios from 'axios';

const API_URL = 'http://localhost:3000/user/auth';
const API_URL2 = 'http://localhost:3000/user/functionality';



export const signIn = async ({ email, password }) => {
  return axios.post(`${API_URL}/login`, { email, password });
};
export const register = async ({ profile, username, email, password }) => {
    const formData = new FormData();
    formData.append('profile', profile);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
  
    return axios.post(`${API_URL}/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
};
export const getUserInfo = async () => {
  try {
    const token = localStorage.getItem('Access-token');
    const response = await axios.get(`${API_URL2}/getAllInfo`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const getAllBlog =async ()=>{
  console.log('token fetch',localStorage.getItem('Access-token'));
  
  return axios.get(`${API_URL2}/getAllBlog`,{
    headers:{
      'Content-Type':'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Access-token')
    }
  })
}

export const createBlog = async ({ title, category, description, profile }) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', category);
  formData.append('description', description);
  
  if (profile) {
      formData.append('file', profile); // Pass the file object
  }

  return axios.post(`${API_URL2}/createBlog`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + localStorage.getItem('Access-token'),
      },
  });
};

export const editInfo=async({username,email,password,profile})=>{
  const fromdata=new FormData();
  fromdata.append('newUserName',username);
  fromdata.append('email',email);
  fromdata.append('password',password);
  fromdata.append('file',profile); 

  return axios.put(`${API_URL2}/updateInfo`,fromdata,{
    headers:{
      'Content-Type':'mutipart/from-data',
      Authorization:'Bearer '+localStorage.getItem("Access-token") 
    },
  });
};
export const getOneBlog = async ({ id }) => {
  // Send the blogID as a query parameter
  return axios.get(`${API_URL2}/getSpecificBlog`, {
    params: { id }, // Include the id in the query parameters
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("Access-token"),
    },
  });
};
export const editBlog=async(datafrom)=>{

  return axios.put(`${API_URL2}/updateBlog`,datafrom,{
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('Access-token'),
  },
  });
};

export const deleteBlog = async ({ blogID }) => {
  return axios.delete(`${API_URL2}/deleteBlog`, {
    data: {
      blogID: blogID // Include the blogID in the request body
    },
    headers: {
      'Content-Type': 'application/json', // Ensure the content type is set correctly
      Authorization: 'Bearer ' + localStorage.getItem('Access-token'), // Correct token spelling
    },
  });
};
export const deleteAccount =async ()=>{
  return axios.delete(`${API_URL2}/deleteAccount`,{
    headers:{
      'Content-Type':'application/json',
      Authorization:'Bearer '+localStorage.getItem('Access-token'),
    },
  });
};