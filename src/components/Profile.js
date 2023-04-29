const Profile = () => {
  // const { user } = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="taskForm">
              <h2>User not login</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="taskForm">
            <h2>Profile</h2>
            <h2>Name : {user.username}</h2>
            <p>Email : {user.email}</p>
            <p>Id : {user._id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
