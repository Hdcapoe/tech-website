import { Link } from "react-router-dom";

const customIcon = "https://cdn-icons-png.freepik.com/256/5758/5758545.png";

function Navbar({ username, setUser }) {

  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  return (
    <ul>
      <li>
        <Link to="/">
          <img src={customIcon} alt="Custom Icon" id="icon" />
        </Link>
      </li>
      {username ? 
        <>
          <li style={{ color: "black" }}>{username}</li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li onClick={logout}>
            <Link to="/login" style={{ color: "orange" }}>Logout</Link>
          </li>
        </>
       : 
        <>
          <li>
            <Link to="/login" style={{ color: "orange" }}>Login</Link>
          </li>
          <li>
            <Link to="/register" style={{ color: "orange" }}>Register</Link>
          </li>
        </>
      }
    </ul>
  );
}

export default Navbar;


