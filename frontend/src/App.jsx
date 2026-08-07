import { useState } from 'react'
import { Outlet } from 'react-router'
import Header from './components/header/Header.jsx'
import "./App.css"

export default function App() {
  return (
    <>
      <Header />
      <main className="page-body">
        <Outlet />
      </main>
    </>
  )
}
