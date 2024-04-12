import { DashboardOutlined, HomeOutlined, PoweroffOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { Footer, Header } from 'antd/es/layout/layout'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Layout = () => {
  const navigate = useNavigate()
  return(
    <div>
      <Header />
      <div>
        <SideMenu />
        <Content />
      </div>
      <Footer />
</div>
  );
}

const Header = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", height: 60, color: "white", backgroundColor: "darkblue",
      alignItems: "center", fontWeight: "bold"}}>
      <h1>Header</h1>
      <h3>Welcome</h3>
    </div>)
}

const Footer = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1>Footer</h1>
      <h3>Copyright</h3>
    </div>)
}
const SideMenu = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
      <Menu
      onClick={({key}) => {
        if(key === "signout"){
          // signout
          localStorage.removeItem("token")
          window.location.href = "/"
        }else {
          navigate(key)
        }
      }}
            items={[                
                { label: "Home", key:"/", icon: <HomeOutlined />},
                { label: "Dashboard", key:"/dashboard", icon: <DashboardOutlined />},
                { label: "Users List", key:"/usersList", icon: <UnorderedListOutlined />,
                children: [
                { label: "Active Users",key:"/activeUsers"},
                
                { label: "Disabled Users", key:"/disabledUsers"},
              ]},
                { label: "Profile",key:"/profile", icon: <UserOutlined />},
                { label: "Signout",key:"signout", icon: <PoweroffOutlined />, danger: true},
            ]}
        >
      </Menu>
    </div>
  )
}
const Content = () => {
  return
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/activeUsers" element={<div>Active Users List</div> } />
      <Route path="/disabledUsers" element={<div>Disabled Users List</div>} />

      <Route path="/profile" element={<Profile />} />
    </Routes>
  </div>
}
 

export default Layout
