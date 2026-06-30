import { useState } from 'react'
import { Outlet } from 'react-router'
import Header from './components/header/Header.jsx'

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
