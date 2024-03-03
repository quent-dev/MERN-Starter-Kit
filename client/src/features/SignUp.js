import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function SignUp() {

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:2121/auth/signup', {username, email,password})
    .then((res) => {
      console.log(res)
      navigate('/')
    })
    .catch((err) => {
      console.log(err)
    })

  }

  return (
    <>
      <main className='flex flex-col justify-center items-center'>
        <h1 className='text-4xl text-center my-10'>Sign Up</h1>

        <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
        <form onSubmit={handleSubmit} className='card-body'>
          <label className='input input-bordered flex items-center gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          <input type='text' className="grow" name='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className='input input-bordered flex items-center gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
          <input type='text' className="grow" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className='input input-bordered flex items-center gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
          <input type='password' className="grow"name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label className="label">
            <a href="/login" className="label-text-alt link link-hover">Alreeady have an account?</a>
          </label>
          <button type="submit" className='btn btn-primary'>Sign up</button>
        </form>

        </div>
        
      </main>     
    </>
    
  )
}
