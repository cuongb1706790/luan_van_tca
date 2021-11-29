import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ma from "../../assets/icons/ma.png";
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
  FormGroup,
  TableSection,
  TableTitle,
  TiendoProcess,
  TiendoProcessText,
  Total,
  TotalValue,
} from "./styledComponents";
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDonhang from "../../axios/apiDonhang";
import TableSanphamDonhangChitiet from "./tables/TableSanphamDonhangChitiet";
import TableCongcuDonhang from "./tables/TableCongcuDonhang";
import TableVattuDonhang from "./tables/TableVattuDonhang";
import TableNguyenlieuDonhang from "./tables/TableNguyenlieuDonhang";
import { formatMoney } from "../../utils";
import DialogMaterial from "../../components/DialogMaterial";

const DonhangChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [singleDonhang, setSingleDonhang] = useState(null);
  const { id: donhangId } = props.match.params;
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleXacnhan = async () => {
    const { success } = await apiDonhang.xacnhan(donhangId);
    if (success) {
      handleClose();
      setSuccess(true);
      props.setRefresh(true);
      toast.success("Xác nhận thành công!", {
        theme: "colored",
      });
    }
  };

  const fetchDonhang = async () => {
    setLoading(true);
    let { donhang } = await apiDonhang.singleDonhang(donhangId);
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
    setSingleDonhang(donhang);
    setLoading(false);
  };

  useEffect(() => {
    setSuccess(false);
    fetchDonhang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

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
              </BoxInfo>
            </div>

            <TableSection className="noCheckbox">
              <TableTitle>
                <img src={dssanpham} alt="dssanpham" />
                <span>Sản phẩm đơn hàng</span>
              </TableTitle>
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

            <TableSection className="noCheckbox">
              <TableTitle>
                <img src={dscongcu} alt="dscongcu" />
                <span>Công cụ đơn hàng</span>
              </TableTitle>
              <TableCongcuDonhang dsCongcu={singleDonhang?.dscongcu} />
              <div className="text-right mb-3">
                <Total>Tổng số lượng: </Total>
                <TotalValue>{singleDonhang?.tongcongcu}</TotalValue>
              </div>
            </TableSection>

            <TableSection className="noCheckbox">
              <TableTitle>
                <img src={dsvattu} alt="dsvattu" />
                <span>Vật tư đơn hàng</span>
              </TableTitle>
              <TableVattuDonhang dsVattu={singleDonhang?.dsvattu} />
              <div className="text-right mb-3">
                <Total>Tổng số lượng: </Total>
                <TotalValue>{singleDonhang?.tongvattu}</TotalValue>
              </div>
            </TableSection>

            <TableSection className="noCheckbox">
              <TableTitle>
                <img src={dsnglieu} alt="dsnglieu" />
                <span>Nguyên liệu đơn hàng</span>
              </TableTitle>
              <TableNguyenlieuDonhang
                dsNguyenlieu={singleDonhang?.dsnguyenlieu}
              />
              <div className="text-right mb-3">
                <Total>Tổng khối lượng: </Total>
                <TotalValue>{singleDonhang?.tongnguyenlieu}</TotalValue>
              </div>
            </TableSection>

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
    </>
  );
};

export default DonhangChitiet;
