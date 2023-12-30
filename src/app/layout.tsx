import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import TodoNavbar from './components/TodoNavbar'
import MyProfilePic from './components/MyProfilePic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Faris's Blog",
  description: 'Created by Faris Abuali',
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en" className={inter.className}>
      <body className="dark:bg-slate-800">
        {/* <Navbar/> */}
        <TodoNavbar/>
        <MyProfilePic/>
        {children}
      </body>
    </html>
  )
}

export default RootLayout