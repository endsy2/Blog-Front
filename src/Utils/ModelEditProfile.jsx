
import UpdateAccountFrom from "../Conponents/UpdateAccountFrom";
import UpdateBlog from "../Conponents/UpdateBlog";
import CreateBlog from "../Conponents/CreateBlog";
import DeleteBlog from "../Conponents/DeleteBlog";


const ModelEditProfile = ({ isVisible, onClose, id,blogID }) => {
  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button
          className="text-primary text-2xl place-self-end"
          onClick={onClose}
        >
          X
        </button>
        {id === 'edit-profile' ? (
          <UpdateAccountFrom />
        ) : id === 'update-blog' ? (
          <UpdateBlog blogID={blogID}/>
        ) : id === 'delete-blog' ? (
          <DeleteBlog blogID={blogID}/>):(
          <CreateBlog/>)
          }
      </div>
    </div>
  );
};

export default ModelEditProfile;
