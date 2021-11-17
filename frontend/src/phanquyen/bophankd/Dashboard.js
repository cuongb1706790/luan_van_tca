import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Route, NavLink } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import TongQuan from "./Tongquan";
import Sanpham from "./Sanpham";
import SanphamChitiet from "./SanphamChitiet";
import Congcu from "./Congcu";
import CongcuChitiet from "./CongcuChitiet";
import Daily1 from "./Daily1";
import Vattu from "./Vattu";
import Nguyenlieu from "./Nguyenlieu";
import VattuChitiet from "./VattuChitiet";
import NguyenlieuChitiet from "./NguyenlieuChitiet";
import LogoutButton from "../../components/LogoutButton";
import styled from "styled-components";
import Daily1Chitiet from "./Daily1Chitiet";
import splnIcon from "../../assets/icons/spln.png";
import daily1Icon from "../../assets/icons/daily1.png";
import Giamsatvung from "./Giamsatvung";
import GiamsatvungThem from "./GiamsatvungThem";
import Daily2 from "./Daily2";
import Daily2Chitiet from "./Daily2Chitiet";
import Donhang from "./Donhang";
import DonhangThem from "./DonhangThem";
import DonhangChitiet from "./DonhangChitiet";
import Tiendo from "./Tiendo";

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
              to="/bophankd"
              activeClassName={props.match.path === "/bophankd" && "active"}
            >
              <i className="fas fa-home"></i>
              <span>Tổng quan</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/sanpham" activeClassName="active">
              <Image src={splnIcon} alt="splangnghe" />
              <span>Sản phẩm</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/vattu" activeClassName="active">
              <i class="fab fa-accusoft"></i>
              <span>Vật tư</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/nguyenlieu" activeClassName="active">
              <i class="fab fa-bandcamp"></i>
              <span>Nguyên liệu</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/congcu" activeClassName="active">
              <i class="fas fa-tools"></i>
              <span>Công cụ</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/daily1" activeClassName="active">
              <Image src={daily1Icon} alt="splangnghe" />
              <span>Đại lý cấp 1</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/daily2" activeClassName="active">
              <Image src={daily1Icon} alt="splangnghe" />
              <span>Đại lý cấp 2</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/giamsatvung" activeClassName="active">
              <Image src={daily1Icon} alt="splangnghe" />
              <span>Giám sát vùng</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/donhang" activeClassName="active">
              <i class="far fa-newspaper"></i>
              <span>Đơn hàng</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
          </MenuItem>
        </Menu>
      </LeftMenu>

      <RightContent>
        <Route exact path="/bophankd" component={TongQuan} />
        <Route exact path="/bophankd/sanpham" component={Sanpham} />
        <Route
          path="/bophankd/sanpham/chitiet/:id"
          component={SanphamChitiet}
        />
        <Route exact path="/bophankd/congcu" component={Congcu} />
        <Route path="/bophankd/congcu/chitiet/:id" component={CongcuChitiet} />
        <Route exact path="/bophankd/daily1" component={Daily1} />
        <Route exact path="/bophankd/vattu" component={Vattu} />
        <Route path="/bophankd/vattu/chitiet/:id" component={VattuChitiet} />
        <Route exact path="/bophankd/nguyenlieu" component={Nguyenlieu} />
        <Route
          path="/bophankd/nguyenlieu/chitiet/:id"
          component={NguyenlieuChitiet}
        />
        <Route path="/bophankd/daily1/chitiet/:id" component={Daily1Chitiet} />
        <Route exact path="/bophankd/giamsatvung" component={Giamsatvung} />
        <Route path="/bophankd/giamsatvung/them" component={GiamsatvungThem} />

        <Route exact path="/bophankd/daily2" component={Daily2} />
        <Route path="/bophankd/daily2/chitiet/:id" component={Daily2Chitiet} />

        <Route exact path="/bophankd/donhang" component={Donhang} />
        <Route path="/bophankd/donhang/them" component={DonhangThem} />
        <Route
          exact
          path="/bophankd/donhang/chitiet/:id"
          component={DonhangChitiet}
        />
        <Route path="/bophankd/donhang/chitiet/:id/tiendo" component={Tiendo} />
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
