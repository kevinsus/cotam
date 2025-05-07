import React from 'react'
import { Nav } from '@/components'

const DashboardLayout = ({ children }) => {
  return (
    <div>
        <Nav className="bg-blue-800 absolute w-full" />
        { children }
    </div>
  )
}

export default DashboardLayout