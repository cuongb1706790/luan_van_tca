import React, { useEffect, useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import styled from "styled-components";
=======
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
import ma from "../../assets/icons/ma.png";
=======
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
  MaDonhang,
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
import HorizontalBarChart from "../../components/HorizontalBarChart";
import HorizontalBarChartItem from "../../components/HorizontalBarChartItem";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

const DonhangChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [singleDonhang, setSingleDonhang] = useState(null);
  const { id: donhangId } = props.match.params;
  const { userInfo } = useSelector((state) => state.user);
  const [tiLePhanphat, setTiLePhanphat] = useState(null);
  const [tiendoHT, setTiendoHT] = useState(null);

  const getChartData = (dssubdh) => {
    let fullPercent = 0;
    dssubdh.forEach((dh) => {
      let sum = dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0);
      fullPercent = fullPercent + sum;
    });
    // ti le phan phat
    const tilephanphat = dssubdh.map((dh) => ({
      label: dh.to.giamsatvung.ten,
      percent:
        (dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0) * 100) /
        fullPercent,
    }));
    // tien do hoan thanh
    const tiendoHT = dssubdh.map((dh) => ({
      label: dh.to.giamsatvung.ten,
      percent:
        (dh.dssanpham.reduce((acc, sp) => acc + sp.soluonghoanthanh, 0) * 100) /
        dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0),
    }));
    setTiLePhanphat(tilephanphat);
    setTiendoHT(tiendoHT);
  };

  const fetchDonhang = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    let { donhang } = await apiDonhang.singleDonhang(donhangId);
    const { subdonhang } = await apiBophankd.dssubdonhangOfSingleDH(
      bophankd._id,
      donhang.ma
    );
    donhang = {
      ...donhang,
<<<<<<< HEAD
<<<<<<< HEAD
      dssanpham: donhang.dssanpham.map((sp) => ({ ...sp, ...sp.sanpham })),
      dscongcu: donhang.dscongcu.map((cc) => ({ ...cc, ...cc.congcu })),
      dsvattu: donhang.dsvattu.map((vt) => ({ ...vt, ...vt.vattu })),
      dsnguyenlieu: donhang.dsnguyenlieu.map((ngl) => ({
=======
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
      dssanpham: donhang?.dssanpham.map((sp) => ({ ...sp, ...sp.sanpham })),
      dscongcu: donhang?.dscongcu.map((cc) => ({ ...cc, ...cc.congcu })),
      dsvattu: donhang?.dsvattu.map((vt) => ({ ...vt, ...vt.vattu })),
      dsnguyenlieu: donhang?.dsnguyenlieu.map((ngl) => ({
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
        ...ngl,
        ...ngl.nguyenlieu,
      })),
    };
<<<<<<< HEAD
<<<<<<< HEAD
    console.log({ donhang });
=======
>>>>>>> khanhduy
=======
    //
    getChartData(subdonhang);
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
    setSingleDonhang(donhang);
    setLoading(false);
  };

  useEffect(() => {
    fetchDonhang();
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
          onClick={() => props.history.push("/bophankd/donhang")}
        />
        <Content>
<<<<<<< HEAD
<<<<<<< HEAD
          <Form>
            <Title>
              <TitleContent
=======
          <Form className="px-5">
            <TiendoProcess className="text-right">
              <TiendoProcessText
>>>>>>> khanhduy
=======
          <Form className="px-5">
            <TiendoProcess className="text-right">
              <TiendoProcessText
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                onClick={() =>
                  props.history.push(
                    `/bophankd/donhang/chitiet/${donhangId}/tiendo`
                  )
                }
              >
                <span>Theo dõi tiến độ</span>
                <i class="fas fa-long-arrow-alt-right"></i>
<<<<<<< HEAD
<<<<<<< HEAD
              </TitleContent>
            </Title>

            <div className="text-left">
              <FormGroup>
=======
              </TiendoProcessText>
            </TiendoProcess>

            <div className="text-left">
              <FormGroup className="dh">
                <img src={ma} alt="ma" />
>>>>>>> khanhduy
                <span>Mã đơn hàng:</span>
                <span>{singleDonhang?.ma}</span>
              </FormGroup>

              <BoxInfo>
                <BoxInfoTitle>Bộ phận kinh doanh</BoxInfoTitle>
<<<<<<< HEAD
                <div className="d-flex">
                  <div style={{ width: 120 }}>
                    <Text>Tên:</Text>
                    <Text>SĐT:</Text>
                    <Text>Email:</Text>
                    <Text>Địa chỉ:</Text>
                  </div>
                  <div>
                    <Text>{singleDonhang?.from.bophankd.ten}</Text>
                    <Text>{singleDonhang?.from.bophankd.sdt}</Text>
                    <Text>{singleDonhang?.from.bophankd.email}</Text>
                    <Text>{singleDonhang?.from.bophankd.cmnd}</Text>
                    <Text>{`${singleDonhang?.from.bophankd.xa}, ${singleDonhang?.from.bophankd.huyen}, ${singleDonhang?.from.bophankd.tinh}`}</Text>
                  </div>
                </div>
=======

                <table>
                  <tr>
                    <td>
                      <img src={ten} alt="ten" />
                      <span>Tên:</span>
                    </td>
                    <td>{singleDonhang?.from.bophankd.ten}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={sdt} alt="sdt" />
                      <span>SĐT:</span>
                    </td>
                    <td>{singleDonhang?.from.bophankd.sdt}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={email} alt="email" />
                      <span>E-mail:</span>
                    </td>
                    <td>{singleDonhang?.from.bophankd.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={diachi} alt="diachi" />
                      <span>Địa chỉ:</span>
                    </td>
                    <td>{`${singleDonhang?.from.bophankd.xa}, ${singleDonhang?.from.bophankd.huyen}, ${singleDonhang?.from.bophankd.tinh}`}</td>
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
              </TiendoProcessText>
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
              </>
            ) : (
              <div className="text-left">
                <MaDonhang>
                  <span>Mã đơn hàng:</span>
                  <span>{singleDonhang?.ma}</span>
                </MaDonhang>
                <BoxInfo>
                  <BoxInfoTitle>Bộ phận kinh doanh</BoxInfoTitle>
                  <table>
                    <tr>
                      <td>
                        <img src={ten} alt="ten" />
                        <span>Tên:</span>
                      </td>
                      <td>{singleDonhang?.from.bophankd.ten}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={sdt} alt="sdt" />
                        <span>SĐT:</span>
                      </td>
                      <td>{singleDonhang?.from.bophankd.sdt}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={email} alt="email" />
                        <span>E-mail:</span>
                      </td>
                      <td>{singleDonhang?.from.bophankd.email}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={diachi} alt="diachi" />
                        <span>Địa chỉ:</span>
                      </td>
                      <td>{`${singleDonhang?.from.bophankd.xa}, ${singleDonhang?.from.bophankd.huyen}, ${singleDonhang?.from.bophankd.tinh}`}</td>
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
`;
const Title = styled.div`
  text-align: right;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const TitleContent = styled.div`
  display: inline-block;
  font-size: 16px;
  color: #555;
  cursor: pointer;
  color: #1c7ed6;
  &:hover {
    color: #11548f;
  }
  span {
    margin-right: 8px;
  }
`;
const FormGroup = styled.div`
  margin-bottom: 8px;
  span:nth-child(1) {
    margin-right: 14px;
  }
  span:nth-child(2) {
    font-weight: 500;
  }
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
