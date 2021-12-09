import React, { useEffect, useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import styled from "styled-components";
=======
import { toast } from "react-toastify";
import ma from "../../assets/icons/ma.png";
=======
import { toast } from "react-toastify";
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import dssanpham from "../../assets/icons/dssanpham.png";
import dscongcu from "../../assets/icons/dscongcu.png";
import dsvattu from "../../assets/icons/dsvattu.png";
import dsnglieu from "../../assets/icons/dsnglieu.png";
import {
  BoxInfo,
  BoxInfoTitle,
  Container,
  Content,
  Form,
<<<<<<< HEAD
  FormGroup,
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
  TableSection,
  TableTitle,
  TiendoProcess,
  TiendoProcessText,
  Total,
  TotalValue,
} from "./styledComponents";
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDonhang from "../../axios/apiDonhang";
import TableSanphamDonhangChitiet from "./tables/TableSanphamDonhangChitiet";
import TableCongcuDonhang from "./tables/TableCongcuDonhang";
import TableVattuDonhang from "./tables/TableVattuDonhang";
import TableNguyenlieuDonhang from "./tables/TableNguyenlieuDonhang";
import { formatMoney } from "../../utils";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import DialogMaterial from "../../components/DialogMaterial";
>>>>>>> khanhduy
=======
import DialogMaterial from "../../components/DialogMaterial";
import { useSelector } from "react-redux";
import apiDaily2 from "../../axios/apiDaily2";
import { MaDonhang } from "../bophankd/styledComponents";
import HorizontalBarChart from "../../components/HorizontalBarChart";
import HorizontalBarChartItem from "../../components/HorizontalBarChartItem";
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

const DonhangChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [singleDonhang, setSingleDonhang] = useState(null);
  const { id: donhangId } = props.match.params;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
=======
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [tiLePhanphat, setTiLePhanphat] = useState(null);
  const [tiendoHT, setTiendoHT] = useState(null);
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleXacnhan = async () => {
    const { success } = await apiDonhang.xacnhan(donhangId);
    if (success) {
      handleClose();
      setSuccess(true);
      props.setRefresh(true);
<<<<<<< HEAD
=======
      props.history.push(`/daily2/donhang/chitiet/${donhangId}/them`);
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
      toast.success("Xác nhận thành công!", {
        theme: "colored",
      });
    }
  };
<<<<<<< HEAD
>>>>>>> khanhduy
=======

  const getChartData = (dssubdh) => {
    let fullPercent = 0;
    dssubdh.forEach((dh) => {
      let sum = dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0);
      fullPercent = fullPercent + sum;
    });
    // ti le phan phat
    const tilephanphat = dssubdh.map((dh) => ({
      label: `${dh.to.hodan.daidien} (${dh.to.hodan.xa}, ${dh.to.hodan.huyen}, ${dh.to.hodan.tinh})`,
      percent:
        (dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0) * 100) /
        fullPercent,
    }));
    // tien do hoan thanh
    const tiendoHT = dssubdh.map((dh) => ({
      label: `${dh.to.hodan.daidien} (${dh.to.hodan.xa}, ${dh.to.hodan.huyen}, ${dh.to.hodan.tinh})`,
      percent:
        (dh.dssanpham.reduce((acc, sp) => acc + sp.soluonghoanthanh, 0) * 100) /
        dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0),
    }));
    setTiLePhanphat(tilephanphat);
    setTiendoHT(tiendoHT);
  };
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

  const fetchDonhang = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    let { donhang } = await apiDonhang.singleDonhang(donhangId);
    const { subdonhang } = await apiDaily2.dssubdonhangOfSingleDH(
      daily2._id,
      donhang.ma
    );
    donhang = {
      ...donhang,
      dssanpham: donhang.dssanpham.map((sp) => ({ ...sp, ...sp.sanpham })),
      dscongcu: donhang.dscongcu.map((cc) => ({ ...cc, ...cc.congcu })),
      dsvattu: donhang.dsvattu.map((vt) => ({ ...vt, ...vt.vattu })),
      dsnguyenlieu: donhang.dsnguyenlieu.map((ngl) => ({
        ...ngl,
        ...ngl.nguyenlieu,
      })),
    };
    getChartData(subdonhang);
    setSingleDonhang(donhang);
    setLoading(false);
  };

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
    fetchDonhang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
=======
    setSuccess(false);
    fetchDonhang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);
>>>>>>> khanhduy
=======
    setSuccess(false);
    fetchDonhang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách đơn hàng"
          titleBack
          onClick={() => props.history.push("/daily2/donhang")}
        />
        <Content>
<<<<<<< HEAD
<<<<<<< HEAD
          <Form>
            <Title>
              <TitleWrapper>
                <TitleContent>
                  <span>Mã đơn hàng:</span>
                  <span style={{ fontWeight: 500 }}>{singleDonhang?.ma}</span>
                </TitleContent>

                {singleDonhang?.ngaydathang ? (
                  <TitleContent
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      props.history.push(
                        `/daily2/donhang/chitiet/${donhangId}/tiendo`
                      )
                    }
                  >
                    <span>Theo dõi tiến độ</span>
                    <i class="fas fa-long-arrow-alt-right"></i>
                  </TitleContent>
                ) : (
                  <TitleContent
                    style={{ cursor: "pointer" }}
                    onClick={() =>
=======
          <Form className="px-5">
            <TiendoProcess className="text-right">
              {singleDonhang?.ngaydathang ? (
                <TiendoProcessText
                  onClick={() =>
                    props.history.push(
                      `/daily2/donhang/chitiet/${donhangId}/tiendo`
                    )
                  }
                >
                  <span>Theo dõi tiến độ</span>
                  <i class="fas fa-long-arrow-alt-right"></i>
                </TiendoProcessText>
              ) : (
                <TiendoProcessText
                  onClick={() => {
                    if (singleDonhang?.xacnhan) {
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                      props.history.push(
                        `/daily2/donhang/chitiet/${donhangId}/them`
                      );
                    } else {
                      toast.warning("Vui lòng xác nhận đơn hàng!", {
                        theme: "colored",
                      });
                    }
                  }}
                >
                  <span>Tiến hành phân phát</span>
                  <i class="fas fa-long-arrow-alt-right"></i>
                </TiendoProcessText>
              )}
            </TiendoProcess>

            {singleDonhang?.ngaydathang ? (
              <>
                <MaDonhang>
                  <span>Mã đơn hàng:</span>
                  <span>{singleDonhang?.ma}</span>
                </MaDonhang>

                <div className="d-flex justify-content-between">
                  <HorizontalBarChart title="Tỉ lệ phân phát">
                    {tiLePhanphat &&
                      tiLePhanphat.length &&
                      tiLePhanphat.map((tl) => (
                        <HorizontalBarChartItem
                          label={tl?.label}
                          percent={Math.round(tl?.percent)}
                        />
                      ))}
                  </HorizontalBarChart>
                  <HorizontalBarChart title="Tiến độ hoàn thành">
                    {tiendoHT &&
                      tiendoHT.length &&
                      tiendoHT.map((td) => (
                        <HorizontalBarChartItem
                          label={td?.label}
                          percent={Math.round(td?.percent)}
                        />
                      ))}
                  </HorizontalBarChart>
                </div>
<<<<<<< HEAD
=======
          <Form className="px-5">
            <TiendoProcess className="text-right">
              {singleDonhang?.ngaydathang ? (
                <TiendoProcessText
                  onClick={() =>
                    props.history.push(
                      `/daily2/donhang/chitiet/${donhangId}/tiendo`
                    )
                  }
                >
                  <span>Theo dõi tiến độ</span>
                  <i class="fas fa-long-arrow-alt-right"></i>
                </TiendoProcessText>
              ) : (
                <TiendoProcessText
                  onClick={() => {
                    if (singleDonhang?.xacnhan) {
                      props.history.push(
                        `/daily2/donhang/chitiet/${donhangId}/them`
                      );
                    } else {
                      toast.warning("Vui lòng xác nhận đơn hàng!", {
                        theme: "colored",
                      });
                    }
                  }}
                >
                  <span>Tiến hành phân phát</span>
                  <i class="fas fa-long-arrow-alt-right"></i>
                </TiendoProcessText>
              )}
            </TiendoProcess>

            <div className="text-left">
              <FormGroup className="dh">
                <img src={ma} alt="ma" />
                <span>Mã đơn hàng:</span>
                <span>{singleDonhang?.ma}</span>
              </FormGroup>

              <BoxInfo>
                <BoxInfoTitle>Đại lý cấp 1</BoxInfoTitle>

                <table>
                  <tr>
                    <td>
                      <img src={ten} alt="ten" />
                      <span>Tên:</span>
                    </td>
                    <td>{singleDonhang?.from.daily1.ten}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={sdt} alt="sdt" />
                      <span>SĐT:</span>
                    </td>
                    <td>{singleDonhang?.from.daily1.sdt}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={email} alt="email" />
                      <span>E-mail:</span>
                    </td>
                    <td>{singleDonhang?.from.daily1.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={diachi} alt="diachi" />
                      <span>Địa chỉ:</span>
                    </td>
                    <td>{`${singleDonhang?.from.daily1.xa}, ${singleDonhang?.from.daily1.huyen}, ${singleDonhang?.from.daily1.tinh}`}</td>
                  </tr>
                </table>
>>>>>>> khanhduy
              </BoxInfo>
            </div>

            <TableSection>
<<<<<<< HEAD
              <TableTitle>Sản phẩm đơn hàng</TableTitle>
=======
=======
              </>
            ) : (
              <div className="text-left">
                <MaDonhang>
                  <span>Mã đơn hàng:</span>
                  <span>{singleDonhang?.ma}</span>
                </MaDonhang>

                <BoxInfo>
                  <BoxInfoTitle>Đại lý cấp 1</BoxInfoTitle>
                  <table>
                    <tr>
                      <td>
                        <img src={ten} alt="ten" />
                        <span>Tên:</span>
                      </td>
                      <td>{singleDonhang?.from.daily1.ten}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={sdt} alt="sdt" />
                        <span>SĐT:</span>
                      </td>
                      <td>{singleDonhang?.from.daily1.sdt}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={email} alt="email" />
                        <span>E-mail:</span>
                      </td>
                      <td>{singleDonhang?.from.daily1.email}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={diachi} alt="diachi" />
                        <span>Địa chỉ:</span>
                      </td>
                      <td>{`${singleDonhang?.from.daily1.xa}, ${singleDonhang?.from.daily1.huyen}, ${singleDonhang?.from.daily1.tinh}`}</td>
                    </tr>
                  </table>
                </BoxInfo>
              </div>
            )}

            <TableSection className="noCheckbox">
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
              <TableTitle>
                <img src={dssanpham} alt="dssanpham" />
                <span>Sản phẩm đơn hàng</span>
              </TableTitle>
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
              <TableSanphamDonhangChitiet
                dsSanpham={singleDonhang?.dssanpham}
              />
              <div className="text-right mb-3">
                <Total>Tổng đơn giá: </Total>
                <TotalValue>
                  {formatMoney(singleDonhang?.tongdongia)}
                </TotalValue>
              </div>
            </TableSection>

<<<<<<< HEAD
            <TableSection>
<<<<<<< HEAD
              <TableTitle>Công cụ đơn hàng</TableTitle>
=======
=======
            <TableSection className="noCheckbox">
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
              <TableTitle>
                <img src={dscongcu} alt="dscongcu" />
                <span>Công cụ đơn hàng</span>
              </TableTitle>
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
              <TableCongcuDonhang dsCongcu={singleDonhang?.dscongcu} />
              <div className="text-right mb-3">
                <Total>Tổng số lượng: </Total>
                <TotalValue>{singleDonhang?.tongcongcu}</TotalValue>
              </div>
            </TableSection>

<<<<<<< HEAD
            <TableSection>
<<<<<<< HEAD
              <TableTitle>Vật tư đơn hàng</TableTitle>
=======
=======
            <TableSection className="noCheckbox">
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
              <TableTitle>
                <img src={dsvattu} alt="dsvattu" />
                <span>Vật tư đơn hàng</span>
              </TableTitle>
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
              <TableVattuDonhang dsVattu={singleDonhang?.dsvattu} />
              <div className="text-right mb-3">
                <Total>Tổng số lượng: </Total>
                <TotalValue>{singleDonhang?.tongvattu}</TotalValue>
              </div>
            </TableSection>

<<<<<<< HEAD
            <TableSection>
<<<<<<< HEAD
              <TableTitle>Nguyên liệu đơn hàng</TableTitle>
=======
=======
            <TableSection className="noCheckbox">
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
              <TableTitle>
                <img src={dsnglieu} alt="dsnglieu" />
                <span>Nguyên liệu đơn hàng</span>
              </TableTitle>
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
              <TableNguyenlieuDonhang
                dsNguyenlieu={singleDonhang?.dsnguyenlieu}
              />
              <div className="text-right mb-3">
                <Total>Tổng khối lượng: </Total>
                <TotalValue>{singleDonhang?.tongnguyenlieu}</TotalValue>
              </div>
            </TableSection>
<<<<<<< HEAD
<<<<<<< HEAD
          </Form>
        </Content>
      </Container>
=======
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

            <div className="text-left mt-4">
              {singleDonhang?.xacnhan ? (
                <button type="button" class="btn btn-outline-success">
                  <i class="fas fa-check"></i> Đã duyệt
                </button>
              ) : (
                <button className="btn btn-success px-4" onClick={handleOpen}>
                  Xác nhận
                </button>
              )}
            </div>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xác nhận"
        content="Xác nhận đơn hàng ?"
        text1="Hủy"
        text2="Đồng ý"
        onClick1={handleClose}
        onClick2={handleXacnhan}
      />
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
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
`;
const Title = styled.div`
  text-align: right;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const TitleWrapper = styled.div`
  font-size: 16px;
  color: #555;
  color: #1c7ed6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    color: #11548f;
  }
  span {
    margin-right: 8px;
  }
`;
const TitleContent = styled.div`
  display: inline-block;
`;
const TableSection = styled.div`
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

=======
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
export default DonhangChitiet;
