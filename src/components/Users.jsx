import  { useEffect, useState } from "react";
import server from "../api/axios";


const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    // new support axios js abort request
    const controller = new AbortController();

    const getUsers = async() => {
      try {
        const response = await server.get('/users', {
          // this will help to cancel the signal whenwe want. 
          signal: controller.signal(),
        });
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error)
      }
    };

    getUsers();
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
