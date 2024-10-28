
import { useState } from "react"
import { editBlog } from "../Fetch-Data/FetchAPI"


const UpdateBlog = ({blogID}) => {

  const [img,setImg]=useState(null)
  const [imgError,setImgError]=useState('')
  const [title,setTitle]=useState('');
  const [category,setCategory]=useState('');
  const [description,setDescription]=useState('');
  const [error,setError]=useState("");

  const HandleImg=(event)=>{
    const file=event.target.files[0];

    if(file&&file.type.startsWith('image/')){
      setImg(file);
      setImgError(null);
    }else{
      setImg(null);
      setImgError("please upload a valid image");

    }
  };

  const handleEdit=async(event)=>{
    event.preventDefault();
    try {
      
      const datafrom =new FormData();
      datafrom.append("id",blogID);
      datafrom.append("newTitle",title);
      datafrom.append("category",category);
      datafrom.append("description",description)
      datafrom.append("file",img);
      const res=await editBlog(datafrom);
      console.log(res);
      window.location.reload();
      
    } catch (error) {
      console.log('Something went wrong');
      setError(error);
    }
  }
  return (
    <section>
      <div className='bg-white p-12'>
        <form onSubmit={handleEdit}>
        
        <label className='green-label pr-[90px]'>Title</label>
        <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} className='input-style' /><br /><br /><br />
        <label className='green-label pr-11'>Category:</label>
        <input type="text" placeholder='Category' value={category} onChange={(e)=>setCategory(e.target.value)} className='input-style'/><br /><br /><br />
        <label className='green-label pr-5'>Description:</label>
        <input type="text" placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)} className='input-style'/><br /><br /><br />
        <label className='green-label pr-5'>Banner Image:</label>
        <input type="file" accept="image/*" onChange={HandleImg} required className='input-style'/><br /><br /><br />
        <div className='flex flex-row-reverse'>
        <input type="submit" value="Update" className='green-btn '/>
        
        </div>
      </form>
      </div>
      <p>{error}</p>
      <p>{imgError}</p>
    </section>
  )
}

export default UpdateBlog
