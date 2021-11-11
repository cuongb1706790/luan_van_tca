import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Route, NavLink } from "react-router-dom";
import Tongquan from "./Tongquan";
import { logout } from "../../redux/actions/userActions";
import Langnghe from "./Langnghe";
import LangngheThem from "./LangngheThem";
import LangngheChinhsua from "./LangngheChinhsua";
import LangngheChitiet from "./LangngheChitiet";
import LogoutButton from "../../components/LogoutButton";
import styled from "styled-components";
import homeIcon from "../../assets/icons/home.png";
import langngheIcon from "../../assets/icons/langnghe.png";
import Daily1 from "./Daily1";
import Daily1Them from "./Daily1Them";
import Daily1Chitiet from "./Daily1Chitiet";
import Daily1Chinhsua from "./Daily1Chinhsua";
import Daily2 from "./Daily2";
import Daily2Chitiet from "./Daily2Chitiet";

const Dashboard = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  };

  return (
    <Container>
      <LeftMenu>
        <Logo>
          <img src={logo} alt="logo" />
          <span>Craft Village</span>
        </Logo>

        <Menu>
          <MenuItem>
            <NavLink
              to="/giamsatvung/"
              activeClassName={props.match.path === "/giamsatvung" && "active"}
            >
              <Image src={homeIcon} alt="home" />
              <span>Tổng quan</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/langnghe" activeClassName="active">
              <Image src={langngheIcon} alt="lannghe" />
              <span>Làng nghề</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/daily1" activeClassName="active">
              <Image src={langngheIcon} alt="lannghe" />
              <span>Đại lý cấp 1</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/daily2" activeClassName="active">
              <Image src={langngheIcon} alt="lannghe" />
              <span>Đại lý cấp 2</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
          </MenuItem>
        </Menu>
      </LeftMenu>

      <RightContent>
        <Route exact path="/giamsatvung" component={Tongquan} />
        <Route exact path="/giamsatvung/langnghe" component={Langnghe} />
        <Route path="/giamsatvung/langnghe/them" component={LangngheThem} />
        <Route
          path="/giamsatvung/langnghe/chinhsua/:id"
          component={LangngheChinhsua}
        />
        <Route
          path="/giamsatvung/langnghe/chitiet/:id"
          component={LangngheChitiet}
        />

        <Route exact path="/giamsatvung/daily1" component={Daily1} />
        <Route path="/giamsatvung/daily1/them" component={Daily1Them} />
        <Route
          path="/giamsatvung/daily1/chitiet/:id"
          component={Daily1Chitiet}
        />
        <Route
          path="/giamsatvung/daily1/chinhsua/:id"
          component={Daily1Chinhsua}
        />

        <Route exact path="/giamsatvung/daily2" component={Daily2} />
        <Route
          path="/giamsatvung/daily2/chitiet/:id"
          component={Daily2Chitiet}
        />
      </RightContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
const LeftMenu = styled.div`
  width: 230px;
  height: 100vh;
  left: 0;
  top: 0;
  position: fixed;
  background-color: #202d3f;
`;
const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.7);

  img {
    width: 30px;
  }

  span {
    font-size: 20px;
    margin-left: 8px;
    color: #fff;
    font-weight: bold;
  }
`;
const Menu = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
`;
const MenuItem = styled.li`
  display: block;

  a {
    display: block;
    text-decoration: none;
    padding: 12px;
    display: flex;
    align-items: center;
    font-family: "Poppins", sans-serif;
    i {
      color: #cad6e2;
      font-size: 22px;
    }
    span {
      color: #cad6e2;
      margin-left: 14px;
    }
    &:hover {
      background: #304664;
      i,
      span {
        color: #fff;
      }
    }
    &.active {
      background: #2e96e0;
      i,
      span {
        color: #fff;
      }
    }
  }
`;
const RightContent = styled.div`
  margin-left: 230px;
  flex: 1;
`;
const Image = styled.img`
  width: 22px;
`;

export default Dashboard;
