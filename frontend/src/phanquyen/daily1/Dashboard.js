import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Route, NavLink } from "react-router-dom";
import Daily2 from "./Daily2";
import Tongquan from "./Tongquan";
import Daily2Them from "./Daily2Them";
import { logout } from "../../redux/actions/userActions";
import Daily2Chitiet from "./Daily2Chitiet";
import Daily2Chinhsua from "./Daily2Chinhsua";
import Congcu from "./Congcu";
import CongcuChitiet from "./CongcuChitiet";
import Vattu from "./Vattu";
import VattuChitiet from "./VattuChitiet";
import LogoutButton from "../../components/LogoutButton";
import styled from "styled-components";
import daily2Icon from "../../assets/icons/daily2.png";
import Hodan from "./Hodan";
import HodanChitiet from "./HodanChitiet";

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
              to="/daily1"
              activeClassName={props.match.path === "/daily1" && "active"}
            >
              <i className="fas fa-home"></i>
              <span>Tổng quan</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/congcu" activeClassName="active">
              <i class="fas fa-tools"></i>
              <span>Công cụ</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/vattu" activeClassName="active">
              <i class="fab fa-accusoft"></i>
              <span>Vật tư</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/daily2" activeClassName="active">
              <Image src={daily2Icon} alt="daily2" />
              <span>Đại lý cấp 2</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/hodan" activeClassName="active">
              <Image src={daily2Icon} alt="hodan" />
              <span>Hộ dân</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
          </MenuItem>
        </Menu>
      </LeftMenu>

      <RightContent>
        <Route exact path="/daily1" component={Tongquan} />
        <Route exact path="/daily1/daily2" component={Daily2} />
        <Route path="/daily1/daily2/them" component={Daily2Them} />
        <Route path="/daily1/daily2/chitiet/:id" component={Daily2Chitiet} />
        <Route path="/daily1/daily2/chinhsua/:id" component={Daily2Chinhsua} />

        <Route exact path="/daily1/congcu" component={Congcu} />
        <Route
          exact
          path="/daily1/congcu/chitiet/:id"
          component={CongcuChitiet}
        />

        <Route exact path="/daily1/vattu" component={Vattu} />
        <Route
          exact
          path="/daily1/vattu/chitiet/:id"
          component={VattuChitiet}
        />

        <Route exact path="/daily1/hodan" component={Hodan} />
        <Route path="/daily1/hodan/chitiet/:id" component={HodanChitiet} />
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
