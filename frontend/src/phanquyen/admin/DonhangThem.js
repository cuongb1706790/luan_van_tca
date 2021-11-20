import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import MultipleSelect from "../../components/MultipleSelect";
import MenuItem from "@mui/material/MenuItem";
import apiSanpham from "../../axios/apiSanpham";
import BackdropMaterial from "../../components/BackdropMaterial";
import TableSanphamDonhang from "./tables/TableSanphamDonhang";
import TableCongcuDonhang from "./tables/TableCongcuDonhang";
import {
  formatMoney,
  getDsNguyenVatlieu,
  getTongNguyenVatlieu,
} from "../../utils";
import TableVattuDonhang from "./tables/TableVattuDonhang";
import TableNguyenlieuDonhang from "./tables/TableNguyenlieuDonhang";
import apiDonhang from "../../axios/apiDonhang";

const DonhangThem = (props) => {
  const [loading, setLoading] = useState(false);
  const [ma, setMa] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [dsSanpham, setDsSanpham] = useState([]);
  const [dsSP, setDsSP] = useState([]);
  const [selectedSP, setSelectedSP] = useState([]);
  const { danhsachcongcu, danhsachvattu, danhsachnguyenlieu, tongdongia } =
    getDsNguyenVatlieu(dsSP);

  const emptyFields = () => {
    if (!ma || !selectedSP.length) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleChangeSP = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedSP(typeof value === "string" ? value.split(",") : value);
    setDsSP(dsSanpham.filter((item) => value.includes(item._id)));
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      const dl = {
        ma,
        dssanpham: dsSP.map((item) => ({
          sanpham: item._id,
          soluong: item.soluong,
          soluonghoanthanh: 0,
        })),
        tongsanpham: getTongNguyenVatlieu(dsSP, "sanpham"),
        dscongcu: danhsachcongcu.map((item) => ({
          congcu: item.congcu._id,
          soluong: item.soluong,
        })),
        tongcongcu: getTongNguyenVatlieu(danhsachcongcu, "congcu"),
        dsvattu: danhsachvattu.map((item) => ({
          vattu: item.vattu._id,
          soluong: item.soluong,
        })),
        tongvattu: getTongNguyenVatlieu(danhsachvattu, "vattu"),
        dsnguyenlieu: danhsachnguyenlieu.map((item) => ({
          nguyenlieu: item.nguyenlieu._id,
          khoiluong: item.khoiluong,
        })),
        tongnguyenlieu: getTongNguyenVatlieu(danhsachnguyenlieu, "nguyenlieu"),
        tongdongia,
      };
      // console.log({ dl });
      const { success } = await apiDonhang.themDonhang(dl);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        resetFields();
      }
    }
  };

  const resetFields = () => {
    setMa("");
    setErrMsg("");
    setDsSP([]);
    setSelectedSP([]);
  };

  const fetchDsSanpham = async () => {
    setLoading(true);
    let { sanpham } = await apiSanpham.dsSanpham();
    sanpham = sanpham.map((item) => ({
      ...item,
      soluong: 1,
    }));
    setDsSanpham(sanpham);
    setLoading(false);
  };

  useEffect(() => {
    fetchDsSanpham();
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
          onClick={() => props.history.push("/admin/donhang")}
          headerRight={
            <button className="btn btn-primary px-4" onClick={handleSubmit}>
              Lưu
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Thêm đơn hàng</FormTitle>
              <FormGroup>
                <Label>Mã đơn hàng:</Label>
                <Input
                  placeholder="Nhập mã"
                  type="text"
                  name="ma"
                  value={ma}
                  onChange={(e) => setMa(e.target.value)}
                />
                {!ma && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Chọn sản phẩm:</Label>
                {dsSanpham && dsSanpham.length ? (
                  <MultipleSelect
                    label="Chọn sản phẩm"
                    value={selectedSP}
                    onChange={handleChangeSP}
                  >
                    {dsSanpham.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.ten}
                      </MenuItem>
                    ))}
                  </MultipleSelect>
                ) : (
                  <MultipleSelect label="Chọn sản phẩm" />
                )}
                {selectedSP.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>
            </FormContent>

            {selectedSP.length ? (
              <>
                <TableSection>
                  <TableTitle>Danh sách sản phẩm</TableTitle>
                  <TableSanphamDonhang dsSanpham={dsSP} setDsSP={setDsSP} />
                  <div className="text-right">
                    <Total>Tổng đơn giá: </Total>
                    <TotalValue>{formatMoney(tongdongia)}</TotalValue>
                  </div>
                </TableSection>

                <TableSection>
                  <TableTitle>Danh sách công cụ</TableTitle>
                  <TableCongcuDonhang dsCongcu={danhsachcongcu} />
                  <div className="text-right">
                    <Total>Tổng số lượng: </Total>
                    <TotalValue>
                      {getTongNguyenVatlieu(danhsachcongcu, "congcu")}
                    </TotalValue>
                  </div>
                </TableSection>

                <TableSection>
                  <TableTitle>Danh sách vật tư</TableTitle>
                  <TableVattuDonhang dsVattu={danhsachvattu} />
                  <div className="text-right">
                    <Total>Tổng số lượng: </Total>
                    <TotalValue>
                      {getTongNguyenVatlieu(danhsachvattu, "vattu")}
                    </TotalValue>
                  </div>
                </TableSection>

                <TableSection>
                  <TableTitle>Danh sách nguyên liệu</TableTitle>
                  <TableNguyenlieuDonhang dsNguyenlieu={danhsachnguyenlieu} />
                  <div className="text-right">
                    <Total>Tổng khối lượng: </Total>
                    <TotalValue>
                      {getTongNguyenVatlieu(danhsachnguyenlieu, "nguyenlieu")}
                    </TotalValue>
                  </div>
                </TableSection>
              </>
            ) : null}
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
`;
const FormContent = styled.div`
  width: 600px;
  margin: auto;
  font-family: "Poppins", sans-serif;
  margin-bottom: 72px;
`;
const FormTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  color: #555;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const FormGroup = styled.div`
  margin-bottom: 26px;
`;
const Label = styled.span`
  font-size: 16px;
  color: #333;
  display: block;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 13px 16px;
  outline: none;
  color: #333;
  border-radius: 3px;
  &:focus {
    border: 1px solid blue;
  }
`;
const ErrMsg = styled.div`
  font-size: 13px;
  color: red;
  margin-top: 4px;
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

export default DonhangThem;