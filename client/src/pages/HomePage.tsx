import useAuth from "../store/useAuth";

const HomePage = () => {
  const { logout, user } = useAuth();
  console.log(user);

  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default HomePage;
