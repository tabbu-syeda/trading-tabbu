import { useAuth } from "./context/AuthContext";
import BannerHome from "./components/BannerHome";
const Home = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    window.location.href = "/explore";
  }

  return (
    <div className=" text-[18px]">
      <BannerHome />
    </div>
  );
};

export default Home;
