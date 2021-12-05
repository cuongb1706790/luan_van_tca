import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
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
import apiGSV from "../../axios/apiGSV";
import { formatMoney } from "../../utils";
import StepperMaterial from "../../components/StepperMaterial";
import CustomModal from "../../components/CustomModal";
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
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import dssanpham from "../../assets/icons/dssanpham.png";
import dscongcu from "../../assets/icons/dscongcu.png";
import dsvattu from "../../assets/icons/dsvattu.png";
import dsnglieu from "../../assets/icons/dsnglieu.png";
import { MaDonhang } from "../bophankd/styledComponents";

const Tiendo = (props) => {
  const [dsSubDonhang, setDsSubDonhang] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("1");
  const { userInfo } = useSelector((state) => state.user);
  const { id: donhangId } = props.match.params;
  const [subDHPQuyen, setSubDHPQuyen] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPQ, setSelectedPQ] = useState({ subdh: [], type: "" });

  const handleClickDaily2 = () => {
    setSelectedPQ({
      subdh: subDHPQuyen.subdhDL1,
      type: "daily2",
    });
    handleOpen();
  };

  const handleClickHodan = () => {
    setSelectedPQ({
      subdh: subDHPQuyen.subdhAllDL2,
      type: "hodan",
    });
    handleOpen();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    fetchPhanquenSubDH(newValue);
  };

  const fetchPhanquenSubDH = async (donhangId) => {
    const data = await apiDonhang.subdhPhanquyenDuoiDL1(donhangId);
    setSubDHPQuyen(data);
  };

  const fetchSubDonhang = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
    const { donhang } = await apiDonhang.singleDonhang(donhangId);
    if (!donhang.ngaydathang) {
      props.history.push(`/giamsatvung/donhang/chitiet/${donhangId}`);
    }
    let { subdonhang } = await apiGSV.dsSubDonhang(gsv._id, donhang.ma);
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
    setValue(subdonhang[0]?._id);
    fetchPhanquenSubDH(subdonhang[0]?._id);
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
          onClick={() => props.history.push("/giamsatvung/donhang")}
        />
        <Content>
          <Form>
            <TiendoProcess>
              <TiendoProcessText
                onClick={() =>
                  props.history.push(
                    `/giamsatvung/donhang/chitiet/${donhangId}`
                  )
                }
              >
                <i class="fas fa-long-arrow-alt-left"></i>
                <span>Quay lại chi tiết đơn hàng</span>
              </TiendoProcessText>
            </TiendoProcess>

            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChangeTab}
                    aria-label="lab API tabs example"
                  >
                    {dsSubDonhang.map((dh) => (
                      <Tab label={dh?.to.daily1.ten} value={dh?._id} />
                    ))}
                  </TabList>
                </Box>
                {dsSubDonhang.map((dh) => (
                  <TabPanel value={dh._id}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="text-center" style={{ flex: 1 }}>
                        <StepperMaterial
                          dl2success={
                            subDHPQuyen?.subdhDL1?.length ? true : false
                          }
                          hdsuccess={
                            subDHPQuyen?.subdhAllDL2?.length ? true : false
                          }
                          onClickDl2={handleClickDaily2}
                          onClickHd={handleClickHodan}
                          numOfPhanquyen={2}
                        />
                      </div>

                      <div>
                        <MaDonhang>
                          <span>Mã đơn hàng:</span>
                          <span>{dh?.ma}</span>
                        </MaDonhang>

                        <BoxInfo>
                          <BoxInfoTitle>Đại lý cấp 1</BoxInfoTitle>

                          <table>
                            <tr>
                              <td>
                                <img src={ten} alt="ten" />
                                <span>Tên:</span>
                              </td>
                              <td>{dh?.to.daily1.ten}</td>
                            </tr>
                            <tr>
                              <td>
                                <img src={sdt} alt="sdt" />
                                <span>SĐT:</span>
                              </td>
                              <td>{dh?.to.daily1.sdt}</td>
                            </tr>
                            <tr>
                              <td>
                                <img src={email} alt="email" />
                                <span>E-mail:</span>
                              </td>
                              <td>{dh?.to.daily1.email}</td>
                            </tr>
                            <tr>
                              <td>
                                <img src={diachi} alt="diachi" />
                                <span>Địa chỉ:</span>
                              </td>
                              <td>{`${dh?.to.daily1.xa}, ${dh?.to.daily1.huyen}, ${dh?.to.daily1.tinh}`}</td>
                            </tr>
                          </table>
                        </BoxInfo>
                      </div>
                    </div>

                    <TableSection className="noCheckbox">
                      <TableTitle>
                        <img src={dssanpham} alt="dssanpham" />
                        <span>Danh sách sản phẩm</span>
                      </TableTitle>
                      <TableSanphamDonhangChitiet dsSanpham={dh?.dssanpham} />
                      <div className="text-right mb-5">
                        <Total>Tổng đơn giá: </Total>
                        <TotalValue>{formatMoney(dh?.tongdongia)}</TotalValue>
                      </div>
                    </TableSection>

                    <TableSection className="noCheckbox">
                      <TableTitle>
                        <img src={dscongcu} alt="dscongcu" />
                        <span>Danh sách công cụ</span>
                      </TableTitle>
                      <TableCongcuDonhang dsCongcu={dh?.dscongcu} />
                      <div className="text-right mb-3">
                        <Total>Tổng số lượng: </Total>
                        <TotalValue>{dh?.tongcongcu}</TotalValue>
                      </div>
                    </TableSection>

                    <TableSection className="noCheckbox">
                      <TableTitle>
                        <img src={dsvattu} alt="dsvattu" />
                        <span>Danh sách vật tư</span>
                      </TableTitle>
                      <TableVattuDonhang dsVattu={dh?.dsvattu} />
                      <div className="text-right mb-3">
                        <Total>Tổng số lượng: </Total>
                        <TotalValue>{dh?.tongvattu}</TotalValue>
                      </div>
                    </TableSection>

                    <TableSection className="noCheckbox">
                      <TableTitle>
                        <img src={dsnglieu} alt="dsnglieu" />
                        <span>Danh sách nguyên liệu</span>
                      </TableTitle>
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

      <CustomModal open={open} setOpen={setOpen} phanquyen={selectedPQ} />
    </>
  );
};

export default Tiendo;