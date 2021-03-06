import React, { useEffect, useState } from "react";
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
import Hodan from "./Hodan";
import HodanChitiet from "./HodanChitiet";
import Donhang from "./Donhang";
import DonhangChitiet from "./DonhangChitiet";
import DonhangThem from "./DonhangThem";
import Tiendo from "./Tiendo";
import Nguyenlieu from "./Nguyenlieu";
import Sanpham from "./Sanpham";
import splnIcon from "../../assets/icons/spln.png";
import dl2Icon from "../../assets/icons/daily2.png";
import hodanIcon from "../../assets/icons/hodan.png";
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import apiDaily1 from "../../axios/apiDaily1";
import BackdropMaterial from "../../components/BackdropMaterial";
<<<<<<< HEAD
>>>>>>> khanhduy
=======
import Hanggiaoden from "./Hanggiaoden";
import HanggiaodenChitiet from "./HanggiaodenChitiet";
import Hanggiaodi from "./Hanggiaodi";
import HanggiaodiChitiet from "./HanggiaodiChitiet";
import Giaohang from "./Giaohang";
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

const Dashboard = (props) => {
  const [loading, setLoading] = useState(false);
  const [dsBadge, setDsBadge] = useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  };

  const fetchDsBadge = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    const data = await apiDaily1.dsShowBadge(daily1._id);
    setDsBadge(data);
    setLoading(false);
  };

  useEffect(() => {
    setRefresh(false);
    fetchDsBadge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Container>
      <LeftMenu>
        <Logo>
          <img src={logo} alt="logo" />
          <span>L??ng Ngh???</span>
        </Logo>

        <Menu>
          <MenuItem>
            <NavLink
              to="/daily1"
              activeClassName={props.match.path === "/daily1" && "active"}
            >
              <i className="fas fa-home"></i>
              <span className="ml-3">T???ng quan</span>
<<<<<<< HEAD
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/sanpham" activeClassName="active">
              <Image src={splnIcon} alt="splangnghe" />
              <span className="ml-3">S???n ph???m</span>
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/sanpham" activeClassName="active">
              <Image src={splnIcon} alt="splangnghe" />
              <span className="ml-3">S???n ph???m</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/congcu" activeClassName="active">
              <i class="fas fa-tools"></i>
              <span className="ml-3">C??ng c???</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/vattu" activeClassName="active">
              <i class="fab fa-accusoft"></i>
              <span className="ml-3">V???t t??</span>
<<<<<<< HEAD
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/nguyenlieu" activeClassName="active">
              <i class="fab fa-bandcamp"></i>
              <span className="ml-3">Nguy??n li???u</span>
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/nguyenlieu" activeClassName="active">
              <i class="fab fa-bandcamp"></i>
              <span className="ml-3">Nguy??n li???u</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/daily2" activeClassName="active">
              <Image src={dl2Icon} alt="splangnghe" />
<<<<<<< HEAD
<<<<<<< HEAD
              <span>?????i l?? c???p 2</span>
=======
              <span className="ml-3">?????i l?? c???p 2</span>
>>>>>>> khanhduy
=======
              <span className="ml-3">?????i l?? c???p 2</span>
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/hodan" activeClassName="active">
<<<<<<< HEAD
<<<<<<< HEAD
              <Image src={hodanIcon} alt="hodan" />
              <span>H??? d??n</span>
=======
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
              {dsBadge?.hodanBadge > 0 ? (
                <Badge badgeContent={dsBadge?.hodanBadge} color="secondary">
                  <Image src={hodanIcon} alt="hodan" />
                </Badge>
              ) : (
                <Image src={hodanIcon} alt="hodan" />
              )}
              <span className="ml-3">H??? d??n</span>
<<<<<<< HEAD
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/donhang" activeClassName="active">
              {dsBadge?.donhangBadge > 0 ? (
                <Badge badgeContent={dsBadge?.donhangBadge} color="secondary">
                  <i class="far fa-newspaper"></i>
                </Badge>
              ) : (
                <i class="far fa-newspaper"></i>
              )}
              <span className="ml-3">????n h??ng</span>
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/donhang" activeClassName="active">
              {dsBadge?.donhangBadge > 0 ? (
                <Badge badgeContent={dsBadge?.donhangBadge} color="secondary">
                  <i class="far fa-newspaper"></i>
                </Badge>
              ) : (
                <i class="far fa-newspaper"></i>
              )}
              <span className="ml-3">????n h??ng</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/hanggiaoden" activeClassName="active">
              <i class="far fa-newspaper"></i>
              <span className="ml-3">H??ng giao ?????n</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily1/hanggiaodi" activeClassName="active">
              <i class="far fa-newspaper"></i>
              <span className="ml-3">H??ng giao ??i</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <LogoutButton onClick={handleLogout}>????ng xu???t</LogoutButton>
          </MenuItem>
        </Menu>
      </LeftMenu>

      <RightContent>
        <Route exact path="/daily1" component={Tongquan} />
        <Route exact path="/daily1/daily2" component={Daily2} />
        <Route path="/daily1/daily2/them" component={Daily2Them} />
        <Route path="/daily1/daily2/chitiet/:id" component={Daily2Chitiet} />
        <Route path="/daily1/daily2/chinhsua/:id" component={Daily2Chinhsua} />

        <Route exact path="/daily1/sanpham" component={Sanpham} />
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

        <Route exact path="/daily1/nguyenlieu" component={Nguyenlieu} />

<<<<<<< HEAD
<<<<<<< HEAD
        <Route exact path="/daily1/hodan" component={Hodan} />
=======
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
        <Route
          exact
          path="/daily1/hodan"
          render={(props) => <Hodan {...props} setRefresh={setRefresh} />}
        />
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
        <Route path="/daily1/hodan/chitiet/:id" component={HodanChitiet} />

        <Route exact path="/daily1/donhang" component={Donhang} />
        <Route
          exact
          path="/daily1/donhang/chitiet/:id"
<<<<<<< HEAD
<<<<<<< HEAD
          component={DonhangChitiet}
=======
          render={(props) => (
            <DonhangChitiet {...props} setRefresh={setRefresh} />
          )}
>>>>>>> khanhduy
=======
          render={(props) => (
            <DonhangChitiet {...props} setRefresh={setRefresh} />
          )}
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
        />
        <Route
          path="/daily1/donhang/chitiet/:id/them"
          component={DonhangThem}
        />
        <Route path="/daily1/donhang/chitiet/:id/tiendo" component={Tiendo} />

        <Route path="/daily1/sanpham/giaohang" component={Giaohang} />

        <Route exact path="/daily1/hanggiaoden" component={Hanggiaoden} />
        <Route
          path="/daily1/hanggiaoden/chitiet/:id"
          component={HanggiaodenChitiet}
        />

        <Route exact path="/daily1/hanggiaodi" component={Hanggiaodi} />
        <Route
          path="/daily1/hanggiaodi/chitiet/:id"
          component={HanggiaodiChitiet}
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
