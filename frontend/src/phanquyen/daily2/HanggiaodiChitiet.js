import React, { useEffect, useState } from "react";
import apiGiaohang from "../../axios/apiGiaohang";
import BackdropMaterial from "../../components/BackdropMaterial";
import Header from "../../components/Header";
import {
  BoxInfo,
  BoxInfoTitle,
  Container,
  Content,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  Input,
  Label,
  TableSection,
} from "./styledComponents";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import { toast } from "react-toastify";
import DialogMaterial from "../../components/DialogMaterial";
import TableHanggiaodiChitiet from "./tables/TableHanggiaodiChitiet";

const HanggiaodiChitiet = (props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [singleGH, setSingleGH] = useState(null);
  const { id: giaohangId } = props.match.params;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleXacnhan = async () => {
    const { success } = await apiGiaohang.daily2Xacnhan(giaohangId);
    if (success) {
      //setRefresh(true);
      handleClose();
      toast.success("Xác nhận thành công!", { theme: "colored" });
      setSuccess(true);
    }
  };

  const mappedState = (giaohang) => {
    let dsspGiaohang = giaohang.dssanpham;
    dsspGiaohang = dsspGiaohang.map((item) => ({ ...item, ...item.sanpham }));
    return dsspGiaohang;
  };

  const fetchDsDonhang = async () => {
    setLoading(true);
    let { giaohang } = await apiGiaohang.singleGiaohang(giaohangId);
    const dsspTemp = mappedState(giaohang);
    setSingleGH({
      ...giaohang,
      dssanpham: dsspTemp,
    });
    setLoading(false);
  };

  useEffect(() => {
    setSuccess(false);
    fetchDsDonhang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  console.log({ singleGH });

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách sản phẩm"
          titleBack
          onClick={() => props.history.push("/daily2/hanggiaodi")}
        />
        <Content>
          <Form className="pb-2">
            <FormContent>
              <FormTitle>
                <span>Thông tin chi tiết</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <span>Mã đơn hàng:</span>
                </Label>
                <Input type="text" value={singleGH?.donhang.ma} disabled />
              </FormGroup>
            </FormContent>

            <div className="px-3 pt-5">
              <TableSection className="noCheckbox">
                <TableHanggiaodiChitiet dsGiaohang={singleGH?.dssanpham} />
              </TableSection>

              <div className="text-right">
                <BoxInfo style={{ boxShadow: "none" }}>
                  <BoxInfoTitle>Tới đại lý 1</BoxInfoTitle>
                  <table>
                    <tr>
                      <td>
                        <img src={ten} alt="ten" />
                        <span>Tên:</span>
                      </td>
                      <td>{singleGH?.donhang.from.daily1.ten}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={sdt} alt="sdt" />
                        <span>SĐT:</span>
                      </td>
                      <td>{singleGH?.donhang.from.daily1.sdt}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={email} alt="cmnd" />
                        <span>E-mail</span>
                      </td>
                      <td>{singleGH?.donhang.from.daily1.email}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={diachi} alt="diachi" />
                        <span>Địa chỉ:</span>
                      </td>
                      <td>{`${singleGH?.donhang.from.daily1.xa}, ${singleGH?.donhang.from.daily1.huyen}, ${singleGH?.donhang.from.daily1.tinh}`}</td>
                    </tr>
                  </table>
                </BoxInfo>
              </div>
            </div>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xác nhận"
        content="Xác nhận đơn hàng giao đến"
        text1="Hủy"
        text2="Đồng ý"
        onClick1={handleClose}
        onClick2={handleXacnhan}
      />
    </>
  );
};

export default HanggiaodiChitiet;
