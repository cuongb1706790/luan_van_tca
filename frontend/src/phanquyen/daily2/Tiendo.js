import React, { useEffect, useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import styled from "styled-components";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
//
=======
import {
  BoxInfo,
  BoxInfoTitle,
  Container,
  Content,
  Form,
  FormGroup,
  TableSection,
  TableTitle,
  TiendoProcess,
  TiendoProcessText,
  Total,
  TotalValue,
} from "./styledComponents";
import ma from "../../assets/icons/ma.png";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import cmnd from "../../assets/icons/cmnd.png";
import diachi from "../../assets/icons/diachi.png";
import dssanpham from "../../assets/icons/dssanpham.png";
import dscongcu from "../../assets/icons/dscongcu.png";
import dsvattu from "../../assets/icons/dsvattu.png";
import dsnglieu from "../../assets/icons/dsnglieu.png";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
>>>>>>> khanhduy
=======
import {
  BoxInfo,
  BoxInfoTitle,
  Container,
  Content,
  Form,
  TableSection,
  TableTitle,
  TiendoProcess,
  TiendoProcessText,
  Total,
  TotalValue,
} from "./styledComponents";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import cmnd from "../../assets/icons/cmnd.png";
import diachi from "../../assets/icons/diachi.png";
import dssanpham from "../../assets/icons/dssanpham.png";
import dscongcu from "../../assets/icons/dscongcu.png";
import dsvattu from "../../assets/icons/dsvattu.png";
import dsnglieu from "../../assets/icons/dsnglieu.png";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import apiDonhang from "../../axios/apiDonhang";
import BackdropMaterial from "../../components/BackdropMaterial";
import TableSanphamDonhangChitiet from "./tables/TableSanphamDonhangChitiet";
import TableCongcuDonhang from "./tables/TableCongcuDonhang";
import TableVattuDonhang from "./tables/TableVattuDonhang";
import TableNguyenlieuDonhang from "./tables/TableNguyenlieuDonhang";
import apiDaily2 from "../../axios/apiDaily2";
import { formatMoney } from "../../utils";
import { MaDonhang } from "../bophankd/styledComponents";

const Tiendo = (props) => {
  const [dsSubDonhang, setDsSubDonhang] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("1");
  const { userInfo } = useSelector((state) => state.user);
  const { id: donhangId } = props.match.params;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchSubDonhang = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    const { donhang } = await apiDonhang.singleDonhang(donhangId);
<<<<<<< HEAD
<<<<<<< HEAD
=======
    if (!donhang.ngaydathang) {
      props.history.push(`/daily2/donhang/chitiet/${donhangId}`);
    }
>>>>>>> khanhduy
=======
    if (!donhang.ngaydathang) {
      props.history.push(`/daily2/donhang/chitiet/${donhangId}`);
    }
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
    let { subdonhang } = await apiDaily2.dsSubDonhang(daily2._id, donhang.ma);
    subdonhang = subdonhang.map((dh) => ({
      ...dh,
      dssanpham: dh.dssanpham.map((sp) => ({ ...sp.sanpham, ...sp })),
      dscongcu: dh.dscongcu.map((cc) => ({ ...cc.congcu, ...cc })),
      dsvattu: dh.dsvattu.map((vt) => ({ ...vt.vattu, ...vt })),
      dsnguyenlieu: dh.dsnguyenlieu.map((ngl) => ({
        ...ngl.nguyenlieu,
        ...ngl,
      })),
    }));
    setDsSubDonhang(subdonhang);
<<<<<<< HEAD
<<<<<<< HEAD
    setValue(subdonhang[0]._id);
=======
    setValue(subdonhang[0]?._id);
>>>>>>> khanhduy
=======
    setValue(subdonhang[0]?._id);
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
    setLoading(false);
  };

  useEffect(() => {
    fetchSubDonhang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách đơn hàng"
          titleBack
<<<<<<< HEAD
<<<<<<< HEAD
          onClick={() => props.history.push("/daily1/donhang")}
        />
        <Content>
          <Form>
            <Title>
              <TitleContent
=======
          onClick={() => props.history.push("/daily2/donhang")}
        />
        <Content>
          <Form>
            <TiendoProcess>
              <TiendoProcessText
>>>>>>> khanhduy
=======
          onClick={() => props.history.push("/daily2/donhang")}
        />
        <Content>
          <Form>
            <TiendoProcess>
              <TiendoProcessText
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                onClick={() =>
                  props.history.push(`/daily2/donhang/chitiet/${donhangId}`)
                }
              >
                <i class="fas fa-long-arrow-alt-left"></i>
                <span>Quay lại chi tiết đơn hàng</span>
<<<<<<< HEAD
<<<<<<< HEAD
              </TitleContent>
            </Title>
=======
              </TiendoProcessText>
            </TiendoProcess>
>>>>>>> khanhduy
=======
              </TiendoProcessText>
            </TiendoProcess>
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    {dsSubDonhang.map((dh) => (
                      <Tab label={dh?.to.hodan.daidien} value={dh?._id} />
                    ))}
                  </TabList>
                </Box>
                {dsSubDonhang.map((dh) => (
                  <TabPanel value={dh._id}>
                    <div className="text-right">
<<<<<<< HEAD
<<<<<<< HEAD
                      <FormGroup>
=======
                      <MaDonhang className="text-left">
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                        <span>Mã đơn hàng:</span>
                        <span>{dh?.ma}</span>
                      </MaDonhang>

                      <BoxInfo>
                        <BoxInfoTitle>Hộ dân</BoxInfoTitle>
<<<<<<< HEAD
                        <div className="d-flex">
                          <div style={{ width: 140 }}>
                            <Text>Tên:</Text>
                            <Text>SĐT:</Text>
                            <Text>CMND:</Text>
                            <Text>Năm sinh:</Text>
                            <Text>Địa chỉ:</Text>
                          </div>
                          <div>
                            <Text>{dh?.to.hodan.daidien}</Text>
                            <Text>{dh?.to.hodan.sdt}</Text>
                            <Text>{dh?.to.hodan.cmnd}</Text>
                            <Text>{dh?.to.hodan.namsinh}</Text>
                            <Text>{`${dh?.to.hodan.xa}, ${dh?.to.hodan.huyen}, ${dh?.to.hodan.tinh}`}</Text>
                          </div>
                        </div>
=======
                      <FormGroup className="dh text-left">
                        <img src={ma} alt="ma" />
                        <span>Mã đơn hàng:</span>
                        <span>{dh?.ma}</span>
                      </FormGroup>
                      <BoxInfo>
                        <BoxInfoTitle>Hộ dân</BoxInfoTitle>
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

                        <table>
                          <tr>
                            <td>
                              <img src={ten} alt="ten" />
                              <span>Tên:</span>
                            </td>
                            <td>{dh?.to.hodan.daidien}</td>
                          </tr>
                          <tr>
                            <td>
                              <img src={sdt} alt="sdt" />
                              <span>SĐT:</span>
                            </td>
                            <td>{dh?.to.hodan.sdt}</td>
                          </tr>
                          <tr>
                            <td>
                              <img src={cmnd} alt="cmnd" />
                              <span>CMND:</span>
                            </td>
                            <td>{dh?.to.hodan.cmnd}</td>
                          </tr>
                          <tr>
                            <td>
                              <img src={diachi} alt="diachi" />
                              <span>Địa chỉ:</span>
                            </td>
                            <td>{`${dh?.to.hodan.xa}, ${dh?.to.hodan.huyen}, ${dh?.to.hodan.tinh}`}</td>
                          </tr>
                        </table>
<<<<<<< HEAD
>>>>>>> khanhduy
                      </BoxInfo>
                    </div>

                    <TableSection>
<<<<<<< HEAD
                      <TableTitle>Danh sách sản phẩm</TableTitle>
=======
=======
                      </BoxInfo>
                    </div>

                    <TableSection className="noCheckbox">
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                      <TableTitle>
                        <img src={dssanpham} alt="dssanpham" />
                        <span>Danh sách sản phẩm</span>
                      </TableTitle>
<<<<<<< HEAD
>>>>>>> khanhduy
                      <TableSanphamDonhangChitiet dsSanpham={dh?.dssanpham} />
=======
                      <TableSanphamDonhangChitiet
                        dsSanpham={dh?.dssanpham}
                        hodanRole
                      />
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                      <div className="text-right mb-5">
                        <Total>Tổng đơn giá: </Total>
                        <TotalValue>{formatMoney(dh?.tongdongia)}</TotalValue>
                      </div>
                    </TableSection>

<<<<<<< HEAD
                    <TableSection>
<<<<<<< HEAD
                      <TableTitle>Danh sách công cụ</TableTitle>
=======
=======
                    <TableSection className="noCheckbox">
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                      <TableTitle>
                        <img src={dscongcu} alt="dscongcu" />
                        <span>Danh sách công cụ</span>
                      </TableTitle>
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                      <TableCongcuDonhang dsCongcu={dh?.dscongcu} />
                      <div className="text-right mb-3">
                        <Total>Tổng số lượng: </Total>
                        <TotalValue>{dh?.tongcongcu}</TotalValue>
                      </div>
                    </TableSection>

<<<<<<< HEAD
                    <TableSection>
<<<<<<< HEAD
                      <TableTitle>Danh sách vật tư</TableTitle>
=======
=======
                    <TableSection className="noCheckbox">
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                      <TableTitle>
                        <img src={dsvattu} alt="dsvattu" />
                        <span>Danh sách vật tư</span>
                      </TableTitle>
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                      <TableVattuDonhang dsVattu={dh?.dsvattu} />
                      <div className="text-right mb-3">
                        <Total>Tổng số lượng: </Total>
                        <TotalValue>{dh?.tongvattu}</TotalValue>
                      </div>
                    </TableSection>

<<<<<<< HEAD
                    <TableSection>
<<<<<<< HEAD
                      <TableTitle>Danh sách nguyên liệu</TableTitle>
=======
=======
                    <TableSection className="noCheckbox">
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                      <TableTitle>
                        <img src={dsnglieu} alt="dsnglieu" />
                        <span>Danh sách nguyên liệu</span>
                      </TableTitle>
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                      <TableNguyenlieuDonhang dsNguyenlieu={dh?.dsnguyenlieu} />
                      <div className="text-right mb-3">
                        <Total>Tổng khối lượng: </Total>
                        <TotalValue>{dh?.tongnguyenlieu}</TotalValue>
                      </div>
                    </TableSection>
                  </TabPanel>
                ))}
              </TabContext>
            </Box>
          </Form>
        </Content>
      </Container>
    </>
  );
};

<<<<<<< HEAD
<<<<<<< HEAD
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 36px;
  font-family: "Poppins", sans-serif;
`;
const Form = styled.div`
  background: #fff;
  padding: 36px 72px 60px 72px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
  min-height: 85vh;
  .MuiButtonBase-root {
    outline: none;
  }
`;
const FormGroup = styled.div`
  text-align: right;
  margin-bottom: 8px;
  span:nth-child(1) {
    margin-right: 14px;
  }
  span:nth-child(2) {
    font-weight: 500;
  }
`;
const Title = styled.div`
  text-align: left;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const TitleContent = styled.div`
  display: inline-block;
  font-size: 15px;
  color: #555;
  cursor: pointer;
  color: #1c7ed6;
  &:hover {
    color: #11548f;
  }
  span {
    margin-left: 8px;
  }
`;
const BoxInfo = styled.div`
  width: 380px;
  padding: 26px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  display: inline-block;
  text-align: left;
  font-family: "Poppins", sans-serif;
  margin-bottom: 36px;
  span {
    font-size: 15px;
    margin-right: 10px;
  }
`;
const BoxInfoTitle = styled.h6`
  margin-bottom: 16px;
`;
const Text = styled.div`
  font-size: 15px;
  margin-bottom: 4px;
`;
const TableSection = styled.div`
  margin-bottom: 36px;
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
  th:first-child,
  td:first-child {
    display: none;
  }
`;
const TableTitle = styled.div`
  font-size: 16px;
  display: inline-block;
  padding-left: 16px;
  margin-bottom: 16px;
  border-left: 10px solid green;
  line-height: 16px;
`;
const Total = styled.span`
  font-size: 15px;
  margin-right: 10px;
  font-weight: 400;
`;
const TotalValue = styled.span`
  font-size: 15px;
`;

=======
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
export default Tiendo;
