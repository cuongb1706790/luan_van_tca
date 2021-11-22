import React, { useEffect } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { formatMoney } from "../utils";
import TableNguyenlieuDonhang from "../phanquyen/bophankd/tables/TableNguyenlieuDonhang";
import TableSanphamDonhangChitiet from "../phanquyen/giamsatvung/tables/TableSanphamDonhangChitiet";
import TableCongcuDonhang from "../phanquyen/giamsatvung/tables/TableCongcuDonhang";
import TableVattuDonhang from "../phanquyen/giamsatvung/tables/TableVattuDonhang";

const CustomModal = ({ open, onClick, phanquyen }) => {
  const { subdh, type } = phanquyen;
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(subdh[0]?._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subdh]);

  return (
    <Container className={!open && "close"}>
      <Modal>
        <CloseWrapper>
          <CloseIcon onClick={onClick}>
            <i class="fas fa-times"></i>
          </CloseIcon>
        </CloseWrapper>
        <Content>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {subdh.map((dh) => (
                    <Tab
                      label={
                        type === "daily1"
                          ? dh?.to.daily1.ten
                          : type === "daily2"
                          ? dh?.to.daily2.ten
                          : dh?.to.hodan.daidien
                      }
                      value={dh?._id}
                    />
                  ))}
                </TabList>
              </Box>
              {subdh.map((dh) => (
                <TabPanel value={dh._id}>
                  <div className="text-right">
                    <div>
                      <FormGroup className="text-right">
                        <span>Mã đơn hàng:</span>
                        <span>{dh?.ma}</span>
                      </FormGroup>

                      <div className="d-flex justify-content-end">
                        <BoxInfo className="mr-5">
                          <BoxInfoTitle>
                            {type === "daily1"
                              ? "Giám sát vùng"
                              : type === "daily2"
                              ? "Đại lý cấp 1"
                              : "Đại lý cấp 2"}
                          </BoxInfoTitle>
                          <div className="d-flex">
                            <div className="pr-3">
                              {type === "daily1" ? (
                                <>
                                  <Text>Tên:</Text>
                                  <Text>SĐT:</Text>
                                  <Text>Email:</Text>
                                  <Text>CMND:</Text>
                                  <Text>Địa chỉ:</Text>
                                </>
                              ) : type === "daily2" ? (
                                <>
                                  <Text>Tên:</Text>
                                  <Text>SĐT:</Text>
                                  <Text>Email:</Text>
                                  <Text>Địa chỉ:</Text>
                                </>
                              ) : (
                                <>
                                  <Text>Tên:</Text>
                                  <Text>SĐT:</Text>
                                  <Text>Email:</Text>
                                  <Text>Địa chỉ:</Text>
                                </>
                              )}
                            </div>
                            <div style={{ flex: 1 }}>
                              {type === "daily1" ? (
                                <>
                                  <Text>{dh?.from.giamsatvung.ten}</Text>
                                  <Text>{dh?.from.giamsatvung.sdt}</Text>
                                  <Text>{dh?.from.giamsatvung.email}</Text>
                                  <Text>{dh?.from.giamsatvung.cmnd}</Text>
                                  <Text>{`${dh?.from.giamsatvung.xa}, ${dh?.from.giamsatvung.huyen}, ${dh?.from.giamsatvung.tinh}`}</Text>
                                </>
                              ) : type === "daily2" ? (
                                <>
                                  <Text>{dh?.from.daily1.ten}</Text>
                                  <Text>{dh?.from.daily1.sdt}</Text>
                                  <Text>{dh?.from.daily1.email}</Text>
                                  <Text>{dh?.from.daily1.cmnd}</Text>
                                  <Text>{`${dh?.from.daily1.xa}, ${dh?.from.daily1.huyen}, ${dh?.from.daily1.tinh}`}</Text>
                                </>
                              ) : (
                                <>
                                  <Text>{dh?.from.daily2.ten}</Text>
                                  <Text>{dh?.from.daily2.sdt}</Text>
                                  <Text>{dh?.from.daily2.email}</Text>
                                  <Text>{dh?.from.daily2.cmnd}</Text>
                                  <Text>{`${dh?.from.daily2.xa}, ${dh?.from.daily2.huyen}, ${dh?.from.daily2.tinh}`}</Text>
                                </>
                              )}
                            </div>
                          </div>
                        </BoxInfo>

                        <BoxInfo>
                          <BoxInfoTitle>
                            {type === "daily1"
                              ? "Đại lý cấp 1"
                              : type === "daily2"
                              ? "Đại lý cấp 2"
                              : "Hộ dân"}
                          </BoxInfoTitle>
                          <div className="d-flex">
                            <div className="pr-3">
                              {type === "daily1" ? (
                                <>
                                  <Text>Tên:</Text>
                                  <Text>SĐT:</Text>
                                  <Text>Email:</Text>
                                  <Text>Địa chỉ:</Text>
                                </>
                              ) : type === "daily2" ? (
                                <>
                                  <Text>Tên:</Text>
                                  <Text>SĐT:</Text>
                                  <Text>Email:</Text>
                                  <Text>Địa chỉ:</Text>
                                </>
                              ) : (
                                <>
                                  <Text>Tên:</Text>
                                  <Text>SĐT:</Text>
                                  <Text>CMND:</Text>
                                  <Text>Năm sinh:</Text>
                                  <Text>Địa chỉ:</Text>
                                </>
                              )}
                            </div>
                            <div style={{ flex: 1 }}>
                              {type === "daily1" ? (
                                <>
                                  <Text>{dh?.to.daily1.ten}</Text>
                                  <Text>{dh?.to.daily1.sdt}</Text>
                                  <Text>{dh?.to.daily1.email}</Text>
                                  <Text>{dh?.to.daily1.cmnd}</Text>
                                  <Text>{`${dh?.to.daily1.xa}, ${dh?.to.daily1.huyen}, ${dh?.to.daily1.tinh}`}</Text>
                                </>
                              ) : type === "daily2" ? (
                                <>
                                  <Text>{dh?.to.daily2.ten}</Text>
                                  <Text>{dh?.to.daily2.sdt}</Text>
                                  <Text>{dh?.to.daily2.email}</Text>
                                  <Text>{dh?.to.daily2.cmnd}</Text>
                                  <Text>{`${dh?.to.daily2.xa}, ${dh?.to.daily2.huyen}, ${dh?.to.daily2.tinh}`}</Text>
                                </>
                              ) : (
                                <>
                                  <Text>{dh?.to.hodan.daidien}</Text>
                                  <Text>{dh?.to.hodan.sdt}</Text>
                                  <Text>{dh?.to.hodan.cmnd}</Text>
                                  <Text>{dh?.to.hodan.namsinh}</Text>
                                  <Text>{`${dh?.to.hodan.xa}, ${dh?.to.hodan.huyen}, ${dh?.to.hodan.tinh}`}</Text>
                                </>
                              )}
                            </div>
                          </div>
                        </BoxInfo>
                      </div>
                    </div>
                  </div>

                  <TableSection>
                    <TableTitle>Danh sách sản phẩm</TableTitle>
                    <TableSanphamDonhangChitiet
                      dsSanpham={dh?.dssanpham.map((sp) => ({
                        ...sp.sanpham,
                        ...sp,
                      }))}
                    />
                    <div className="text-right mb-5">
                      <Total>Tổng đơn giá: </Total>
                      <TotalValue>{formatMoney(dh?.tongdongia)}</TotalValue>
                    </div>
                  </TableSection>

                  <TableSection>
                    <TableTitle>Danh sách công cụ</TableTitle>
                    <TableCongcuDonhang
                      dsCongcu={dh?.dscongcu.map((cc) => ({
                        ...cc,
                        ...cc.congcu,
                      }))}
                    />
                    <div className="text-right mb-3">
                      <Total>Tổng số lượng: </Total>
                      <TotalValue>{dh?.tongcongcu}</TotalValue>
                    </div>
                  </TableSection>

                  <TableSection>
                    <TableTitle>Danh sách vật tư</TableTitle>
                    <TableVattuDonhang
                      dsVattu={dh?.dsvattu.map((vt) => ({
                        ...vt,
                        ...vt.vattu,
                      }))}
                    />
                    <div className="text-right mb-3">
                      <Total>Tổng số lượng: </Total>
                      <TotalValue>{dh?.tongvattu}</TotalValue>
                    </div>
                  </TableSection>

                  <TableSection>
                    <TableTitle>Danh sách nguyên liệu</TableTitle>
                    <TableNguyenlieuDonhang
                      dsNguyenlieu={dh?.dsnguyenlieu.map((ngl) => ({
                        ...ngl,
                        ...ngl.nguyenlieu,
                      }))}
                    />
                    <div className="text-right mb-3">
                      <Total>Tổng khối lượng: </Total>
                      <TotalValue>{dh?.tongnguyenlieu}</TotalValue>
                    </div>
                  </TableSection>
                </TabPanel>
              ))}
            </TabContext>
          </Box>
        </Content>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  &.close {
    display: none;
  }
`;
const Modal = styled.div`
  background-color: #fff;
  width: 80%;
  height: 82%;
  border-radius: 4px;
  overflow-y: auto;
`;
const CloseWrapper = styled.div`
  text-align: right;
`;
const CloseIcon = styled.div`
  display: inline-block;
  padding: 13px 24px;
  cursor: pointer;
  i {
    font-size: 28px;
    color: #666;
  }
`;
const Content = styled.div`
  padding: 0 36px 36px 36px;
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

export default CustomModal;
