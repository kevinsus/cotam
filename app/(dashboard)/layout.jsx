import React from 'react'
import { Nav } from '@/components'

const DashboardLayout = ({ children }) => {
  return (
    <div>
        <Nav className="bg-blue-800" />
        { children }
    </div>
  )
}

export default DashboardLayout