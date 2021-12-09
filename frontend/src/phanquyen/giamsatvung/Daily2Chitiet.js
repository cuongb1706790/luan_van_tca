import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import splnIcon from "../../assets/icons/spln.png";
import hodanIcon from "../../assets/icons/hodan.png";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDaily2 from "../../axios/apiDaily2";
import TableSanpham from "../daily2/tables/TableSanpham";
import TableCongcu from "../daily2/tables/TableCongcu";
import TableVattu from "../daily2/tables/TableVattu";
import TableNguyenlieu from "../daily2/tables/TableNguyenlieu";
import TableDonhang from "../daily2/tables/TableDonhang";
import TableHodan from "../daily2/tables/TableHodan";

const Daily2Chitiet = (props) => {
  const [active, setActive] = useState({
    code: 1,
    present: "congcu",
    payload: "",
  });
  const [loading, setLoading] = useState(false);
  const [singleDaily2, setSingleDaily2] = useState(null);
  const { id: daily2Id } = props.match.params;

  const fetchSingleDL2 = async () => {
    setLoading(true);
    let { daily2 } = await apiDaily2.singleDaily2(daily2Id);
    daily2 = {
      ...daily2,
      dssanpham: daily2.dssanpham.map((sp) => ({ ...sp, ...sp.sanpham })),
      dscongcu: daily2.dscongcu.map((cc) => ({ ...cc, ...cc.congcu })),
      dsvattu: daily2.dsvattu.map((vt) => ({ ...vt, ...vt.vattu })),
      dsnguyenlieu: daily2.dsnguyenlieu.map((ngl) => ({
        ...ngl,
        ...ngl.nguyenlieu,
      })),
      hodan: daily2.hodan.map((hd) => ({ ...hd, langnghe: hd.langnghe.ten })),
    };
    setSingleDaily2(daily2);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleDL2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header
          title="Quay lại danh sách đại lý 2"
          titleBack
          onClick={() => props.history.push("/giamsatvung/daily2")}
        />
        <Content>
          <Boxes>
            <Box
              onClick={() =>
                setActive({
                  code: 1,
                  present: "sanpham",
                  payload: "",
                })
              }
              className={active.code === 1 && "active"}
            >
              <img src={splnIcon} width="36" alt="splangnghe" />
              <BoxTitle>Sản phẩm</BoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 2,
                  present: "congcu",
                  payload: "",
                })
              }
              className={active.code === 2 && "active"}
            >
              <i class="fas fa-tools"></i>
              <BoxTitle>Công cụ</BoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 3,
                  present: "vattu",
                  payload: "",
                })
              }
              className={active.code === 3 && "active"}
            >
              <i class="fab fa-accusoft"></i>
              <BoxTitle>Vật tư</BoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 4,
                  present: "nguyenlieu",
                  payload: "",
                })
              }
              className={active.code === 4 && "active"}
            >
              <i class="fab fa-bandcamp"></i>
              <BoxTitle>Nguyên liệu</BoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 5,
                  present: "hodan",
                  payload: "",
                })
              }
              className={active.code === 5 && "active"}
            >
              <img src={hodanIcon} width="36" alt="hodan" />
              <BoxTitle>Hộ dân</BoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 6,
                  present: "donhang",
                  payload: "",
                })
              }
              className={active.code === 6 && "active"}
            >
              <i class="far fa-newspaper"></i>
              <BoxTitle>Đơn hàng</BoxTitle>
            </Box>
          </Boxes>

          <SubComponents>
            {active.code === 1 ? (
              <TableSanpham dsSanpham={singleDaily2?.dssanpham} />
            ) : active.code === 2 ? (
              <TableCongcu dsCongcu={singleDaily2?.dscongcu} />
            ) : active.code === 3 ? (
              <TableVattu dsVattu={singleDaily2?.dsvattu} />
            ) : active.code === 4 ? (
              <TableNguyenlieu dsNguyenlieu={singleDaily2?.dsnguyenlieu} />
            ) : active.code === 5 ? (
              <TableHodan dsHodan={singleDaily2?.hodan} readOnly />
            ) : (
              <TableDonhang dsDonhang={singleDaily2?.donhang} readOnly />
            )}
          </SubComponents>
        </Content>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 26px 36px;
  font-family: "Poppins", sans-serif;
`;
const Boxes = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Box = styled.div`
  width: 200px;
  padding: 14px 28px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgb(0 0 20 / 8%), 0 1px 2px rgb(0 0 20 / 8%);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 0%;
    bottom: -16px;
    height: 6px;
    border-radius: 4px;
    transition: width 350ms;
  }
  &.active {
    &::after {
      width: 100%;
    }
  }
  i {
    color: #fff;
    font-size: 23px;
  }
  &:nth-child(1) {
    background: #da542e;
    &::after {
      background: #da542e;
    }
    &:hover {
      background: #b03e1e;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #b03e1e;
    }
  }
  &:nth-child(2),
  &:nth-child(6) {
    background: #2255a4;
    &::after {
      background: #2255a4;
    }
    &:hover {
      background: #163d7a;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #163d7a;
    }
  }
  &:nth-child(3),
  &:nth-child(5) {
    background: #27a9e3;
    &::after {
      background: #27a9e3;
    }
    &:hover {
      background: #1d86b5;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #1d86b5;
    }
  }
  &:nth-child(4) {
    background: #28b779;
    &::after {
      background: #28b779;
    }
    &:hover {
      background: #1c8c5c;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #1c8c5c;
    }
  }
`;
const BoxTitle = styled.div`
  font-size: 16px;
  color: #fff;
  margin-top: 10px;
  font-family: "Poppins", sans-serif;
`;
const SubComponents = styled.div`
  display: block;
  margin-top: 72px;
  th:first-child,
  td:first-child {
    display: none;
  }
`;

export default Daily2Chitiet;
