import  { useEffect, useState } from "react";
// import {server as axios} from "../api/axios";
import useServerInterceptor from "../hooks/useServerInterceptor";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const serverInterceptor = useServerInterceptor();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    // new support axios js abort request
    const controller = new AbortController();

    const getUsers = async() => {
      try {
        const response = await serverInterceptor.get("/users", {
          // this will help to cancel the signal whenwe want.
          signal: controller.signal(),
        });
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
        //this is usefull when the refresh token expires. we need to redirect back the user to the login page first.
        // so after they login, they are to be redirect back where they were before the refresh token expires.
        navigate('/login', {state: {from: location}, replace: true})
      }
    };

    getUsers();
    // cleanup to abort any pending request when the component unmount
    return () => {
      isMounted = false;
      controller.abort();
    }
  },[])

  return (
    <article>
      <h2>Users Lists</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
