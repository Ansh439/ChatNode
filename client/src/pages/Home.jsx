import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <p>Home</p>

      <section>
        <Outlet />
      </section>
    </div>
  )
}
