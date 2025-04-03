import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Landing from './pages/landing/landing'
import ChatPage from './pages/chat/chat'
import Login from './pages/login/login'
import SignUp from './pages/signup/signup'


const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Landing/>
      },
      {
        path: 'chat',
        element: <ChatPage/>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'signup',
        element: <SignUp/>
      },
    ],
  },
])

function App() {
  return <RouterProvider router={route} />
}

export default App







