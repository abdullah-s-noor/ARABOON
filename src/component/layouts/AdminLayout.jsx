import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <>
    <div>
      <h1>AdminLayout</h1>
    </div>
    <Outlet />
    </>
  )
}

export default AdminLayout
