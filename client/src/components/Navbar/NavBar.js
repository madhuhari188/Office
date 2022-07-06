//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { NavLink,Link } from "react-router-dom";
import {FcHome} from 'react-icons/fc'

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./Nav.css";
import logo from '../../assets/logo.jpg'
const NavBar = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  const [activePage, setActivePage] = useState(null) ;

function handleActive(event) {
  if (!event.target.classList.value.includes("active")) {
    event.target.classList.toggle('active') ;
    if (activePage)
      activePage.classList.remove("active") ;
    setActivePage(event.target) ;
  }
}
  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              {/* <p>{menuCollapse ? "Logo" : "Big Logo"}</p> */}
             <Link to="/"> <img className="logo" src={logo} alt="logo"/></Link>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem onClick={handleActive} icon={<FcHome/>}>
                Home<Link to='/'/>
              </MenuItem>
             
              <MenuItem  icon={<FaList />}>Report<NavLink  to="/csv"></NavLink></MenuItem>
              <MenuItem icon={<FaRegHeart />}>Login<Link to='/login'/></MenuItem>
              <MenuItem icon={<RiPencilLine />}>Dashboard<Link to='/dashboard'/></MenuItem>
              <MenuItem icon={<BiCog />}>Register<Link to='/register'/></MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <div className="side-menu-footer">
            <div className="avatar">
              <img src="" alt="user-logo"/>
            </div>
            <div className="user-info">
              <h5>user name</h5>
              <p>usermail</p>
            </div></div>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default NavBar;
