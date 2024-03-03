import React, { useEffect } from 'react'
import { UserContext } from "../contexts/user.context";

export default function Profile() {

  const { user, fetchUser } = React.useContext(UserContext);

  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        return fetchedUser;
      }
    }
  }

  useEffect(() => {
    loadUser();
  });


  return (
    <>
        <main className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-center my-10'>Profile Page</h1>

        </main>
    </>
  )
}
