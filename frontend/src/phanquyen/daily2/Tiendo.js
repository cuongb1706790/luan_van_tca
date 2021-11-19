import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
//
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
    setValue(subdonhang[0]._id);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubDonhang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  console.log({ dsSubDonhang });

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách đơn hàng"
          titleBack
          onClick={() => props.history.push("/daily1/donhang")}
        />
        <Content>
          <Form>
            <Title>
              <TitleContent
                onClick={() =>
                  props.history.push(`/daily2/donhang/chitiet/${donhangId}`)
                }
              >
                <i class="fas fa-long-arrow-alt-left"></i>
                <span>Quay lại chi tiết đơn hàng</span>
              </TitleContent>
            </Title>

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
                      <FormGroup>
                        <span>Mã đơn hàng:</span>
                        <span>{dh?.ma}</span>
                      </FormGroup>

                      <BoxInfo>
                        <BoxInfoTitle>Hộ dân</BoxInfoTitle>
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
                      </BoxInfo>
                    </div>

                    <TableSection>
                      <TableTitle>Danh sách sản phẩm</TableTitle>
                      <TableSanphamDonhangChitiet dsSanpham={dh?.dssanpham} />
                      <div className="text-right mb-5">
                        <Total>Tổng đơn giá: </Total>
                        <TotalValue>{formatMoney(dh?.tongdongia)}</TotalValue>
                      </div>
                    </TableSection>

                    <TableSection>
                      <TableTitle>Danh sách công cụ</TableTitle>
                      <TableCongcuDonhang dsCongcu={dh?.dscongcu} />
                      <div className="text-right mb-3">
                        <Total>Tổng số lượng: </Total>
                        <TotalValue>{dh?.tongcongcu}</TotalValue>
                      </div>
                    </TableSection>

                    <TableSection>
                      <TableTitle>Danh sách vật tư</TableTitle>
                      <TableVattuDonhang dsVattu={dh?.dsvattu} />
                      <div className="text-right mb-3">
                        <Total>Tổng số lượng: </Total>
                        <TotalValue>{dh?.tongvattu}</TotalValue>
                      </div>
                    </TableSection>

                    <TableSection>
                      <TableTitle>Danh sách nguyên liệu</TableTitle>
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

export default Tiendo;
