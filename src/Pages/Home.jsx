import ProfileHeader from "../Section/Home/ProfileHeader.jsx";
import CardBlog from "../Conponents/CardBlog.jsx";
import Default from "./Default.jsx";

const Home = () => {
  const isAuthenticated = !!localStorage.getItem("Access-token");

  return (
    <section className="flex flex-col flex-wrap">
      {isAuthenticated ? (
        <>
          <ProfileHeader />
          <CardBlog />
        </>
      ) : (
        <Default />
      )}
    </section>
  );
};

export default Home;
