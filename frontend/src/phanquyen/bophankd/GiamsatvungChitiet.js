import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import splnIcon from "../../assets/icons/spln.png";
import dl2Icon from "../../assets/icons/daily2.png";
import langngheIcon from "../../assets/icons/langnghe.png";
import dl1Icon from "../../assets/icons/daily1.png";
import apiGSV from "../../axios/apiGSV";
import TableSanpham from "../giamsatvung/tables/TableSanpham";
import TableCongcu from "../giamsatvung/tables/TableCongcu";
import TableVattu from "../giamsatvung/tables/TableVattu";
import TableNguyenlieu from "../giamsatvung/tables/TableNguyenlieu";
import TableDaily1 from "../giamsatvung/tables/TableDaily1";
import TableDaily2 from "../giamsatvung/tables/TableDaily2";
import TableLangnghe from "../giamsatvung/tables/TableLangnghe";
import TableDonhang from "../giamsatvung/tables/TableDonhang";
import apiLangnghe from "../../axios/apiLangnghe";

const GiamsatvungChitiet = (props) => {
  const [active, setActive] = useState({
    code: 1,
    present: "congcu",
    payload: "",
  });
  const [loading, setLoading] = useState(false);
  const [dsLangnghe, setDsLangnghe] = useState([]);
  const [singleGSV, setSingleGSV] = useState(null);
  const { id: gsvId } = props.match.params;

  const fetchSingleGSV = async () => {
    setLoading(true);
    const { langnghe } = await apiLangnghe.dsLangnghe();
    let { gsv } = await apiGSV.singleGsv(gsvId);
    gsv = {
      ...gsv,
      dssanpham: gsv.dssanpham.map((sp) => ({ ...sp, ...sp.sanpham })),
      dscongcu: gsv.dscongcu.map((cc) => ({ ...cc, ...cc.congcu })),
      dsvattu: gsv.dsvattu.map((vt) => ({ ...vt, ...vt.vattu })),
      dsnguyenlieu: gsv.dsnguyenlieu.map((ngl) => ({
        ...ngl,
        ...ngl.nguyenlieu,
      })),
    };
    setDsLangnghe(langnghe);
    setSingleGSV(gsv);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleGSV();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header
          title="Quay lại danh sách giám sát vùng"
          titleBack
          onClick={() => props.history.push("/bophankd/giamsatvung")}
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
              <img src={splnIcon} width="30" alt="splangnghe" />
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
                  present: "daily1",
                  payload: "",
                })
              }
              className={active.code === 5 && "active"}
            >
              <img src={dl1Icon} width="30" alt="dl1" />
              <BoxTitle>Đại lý cấp 1</BoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 6,
                  present: "daily2",
                  payload: "",
                })
              }
              className={active.code === 6 && "active"}
            >
              <img src={dl2Icon} width="30" alt="dl2" />
              <BoxTitle>Đại lý cấp 2</BoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 7,
                  present: "langnghe",
                  payload: "",
                })
              }
              className={active.code === 7 && "active"}
            >
              <img src={langngheIcon} width="30" alt="lannghe" />
              <BoxTitle>Làng nghề</BoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 8,
                  present: "donhang",
                  payload: "",
                })
              }
              className={active.code === 8 && "active"}
            >
              <i class="far fa-newspaper"></i>
              <BoxTitle>Đơn hàng</BoxTitle>
            </Box>
          </Boxes>

          <SubComponents>
            {active.code === 1 ? (
              <TableSanpham dsSanpham={singleGSV?.dssanpham} />
            ) : active.code === 2 ? (
              <TableCongcu dsCongcu={singleGSV?.dscongcu} />
            ) : active.code === 3 ? (
              <TableVattu dsVattu={singleGSV?.dsvattu} />
            ) : active.code === 4 ? (
              <TableNguyenlieu dsNguyenlieu={singleGSV?.dsnguyenlieu} />
            ) : active.code === 5 ? (
              <TableDaily1 dsDaily1={singleGSV?.daily1} readOnly />
            ) : active.code === 6 ? (
              <TableDaily2 dsDaily2={singleGSV?.daily2} readOnly />
            ) : active.code === 7 ? (
              <TableLangnghe dsLangnghe={dsLangnghe} readOnly />
            ) : (
              <TableDonhang dsDonhang={singleGSV?.donhang} readOnly />
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
  width: 170px;
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
  &:nth-child(1),
  &:nth-child(8) {
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
  &:nth-child(7) {
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
  &:nth-child(6) {
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
  &:nth-child(4),
  &:nth-child(5) {
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
  font-size: 15px;
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

export default GiamsatvungChitiet;
