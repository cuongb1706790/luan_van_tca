import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDonhang from "../../axios/apiDonhang";
import { useSelector } from "react-redux";
import TableSanphamDonhang from "./tables/TableSanphamDonhang";
import TableDonhangGoc from "./tables/TableDonhangGoc";
import {
  formatMoney,
  getDsNguyenVatlieu,
  getTongNguyenVatlieu,
} from "../../utils";
import MultipleSelect from "../../components/MultipleSelect";
import apiDaily1 from "../../axios/apiDaily1";

const DonhangThem = (props) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [singleDonhang, setSingleDonhang] = useState(null);
  const [singleDaily1, setSingleDaily1] = useState(null);
  const [dsDaily2, setDsDaily2] = useState([]);
  const [selectedDaily2, setselectedDaily2] = useState([]);
  const { id: donhangId } = props.match.params;
  const { userInfo } = useSelector((state) => state.user);

  const getTongDonhang = (dssp) => {
    const { tongdongia } = getDsNguyenVatlieu(dssp);
    return tongdongia;
  };

  const handleChangeSlSanpham = (e, spId, gsvId) => {
    let tong =
      Number(e.target.value) || e.target.value === "" ? e.target.value : 1;
    let tongExceptGSV = 0;
    const slgoc = singleDonhang.dssanpham.find(
      (sp) => sp.sanpham._id === spId
    ).soluong;
    dsDaily2.forEach((dl2) => {
      if (dl2._id !== gsvId && selectedDaily2.includes(dl2._id)) {
        dl2.dsthoaman.forEach((sp) => {
          if (sp._id === spId) {
            tong = parseInt(tong) + parseInt(sp.soluong);
            tongExceptGSV = tongExceptGSV + parseInt(sp.soluong);
          }
        });
      }
    });
    setDsDaily2((prev) =>
      prev.map((dl2) =>
        dl2._id === gsvId
          ? {
              ...dl2,
              dsthoaman: dl2.dsthoaman.map((sp) =>
                sp._id === spId
                  ? {
                      ...sp,
                      soluong:
                        tong > slgoc
                          ? slgoc - tongExceptGSV
                          : Number(e.target.value) || e.target.value === ""
                          ? e.target.value
                          : 1,
                    }
                  : sp
              ),
            }
          : dl2
      )
    );
  };

  const handleChangeDaily2 = (e) => {
    const {
      target: { value },
    } = e;
    setselectedDaily2(typeof value === "string" ? value.split(",") : value);
  };

  const handleGetDsThoaman = (dssp, daily1) => {
    dssp.forEach((sp) => {
      setDsDaily2((prev) =>
        prev.length
          ? prev.map((dl2) =>
              dl2.loaisanpham.includes(sp.loaisanpham._id) && //*** */
              !dl2.dsthoaman
                .map((item) => item.loaisanpham)
                .includes(sp.loaisanpham._id)
                ? {
                    ...dl2,
                    dsthoaman: [{ ...sp, soluong: 1 }, ...dl2.dsthoaman],
                  }
                : dl2
            )
          : daily1.map((dl2) =>
              dl2.loaisanpham.includes(sp.loaisanpham._id) &&
              !dl2.dsthoaman
                .map((item) => item.loaisanpham)
                .includes(sp.loaisanpham._id)
                ? {
                    ...dl2,
                    dsthoaman: [{ ...sp, soluong: 1 }, ...dl2.dsthoaman],
                  }
                : dl2
            )
      );
    });
  };

  const emptyFields = () => {
    if (!selectedDaily2.length) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      let dsdonhang = [];
      dsDaily2.forEach((dl2) => {
        if (selectedDaily2.includes(dl2._id)) {
          const {
            danhsachcongcu,
            danhsachvattu,
            danhsachnguyenlieu,
            tongdongia,
          } = getDsNguyenVatlieu(dl2.dsthoaman);
          let dl = {
            ma: singleDonhang.ma,
            dssanpham: dl2.dsthoaman.map((item) => ({
              sanpham: item._id,
              soluong: item.soluong,
              soluonghoanthanh: 0,
            })),
            tongsanpham: getTongNguyenVatlieu(dl2.dsthoaman, "sanpham"),
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
            tongnguyenlieu: getTongNguyenVatlieu(
              danhsachnguyenlieu,
              "nguyenlieu"
            ),
            tongdongia,
            from: {
              daily1: singleDaily1._id,
            },
            to: {
              daily2: dl2._id,
            },
          };
          dsdonhang.push(dl);
        }
      });
      const { success } = await apiDonhang.daily1ToDaily2({
        donhangId: singleDonhang._id,
        dsdonhang,
        daily1Id: singleDaily1._id,
      });
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        props.history.push(`/daily1/donhang/chitiet/${donhangId}/tiendo`);
      }
    }
  };

  const fetchDsDonhang = async () => {
    setLoading(true);
    const { donhang } = await apiDonhang.singleDonhang(donhangId);
    if (!donhang.xacnhan) {
      props.history.push(`/daily1/donhang/chitiet/${donhangId}`);
    }
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    let { daily2 } = await apiDaily1.dsDaily2(daily1._id);
    daily2 = daily2.filter((dl2) => dl2.user);
    daily2 = daily2.map((item) => ({ ...item, dsthoaman: [] }));
    setSingleDonhang(donhang);
    setSingleDaily1(daily1);

    // get ds thoa man
    const dssp = donhang.dssanpham.map((sp) => ({
      ...sp.sanpham,
      soluong: sp.soluong,
    }));
    handleGetDsThoaman(dssp, daily2);
    setLoading(false);
  };

  const getMappedDSSP = (dssp) => {
    let arr =
      dssp &&
      dssp.length &&
      dssp.map((sp) => ({ ...sp.sanpham, soluong: sp.soluong }));
    return arr;
  };

  useEffect(() => {
    fetchDsDonhang();
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
          onClick={() => props.history.push("/daily1/donhang")}
          headerRight={
            <button className="btn btn-primary px-4" onClick={handleSubmit}>
              Lưu
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Phân phát đơn hàng</FormTitle>
              <FormGroup>
                <Label>Mã đơn hàng:</Label>
                <Input type="text" defaultValue={singleDonhang?.ma} />
              </FormGroup>

              <FormGroup>
                <Label>Đại lý cấp 2:</Label>
                {dsDaily2 && dsDaily2.length ? (
                  <MultipleSelect
                    label="Chọn đại lý cấp 2"
                    value={selectedDaily2}
                    onChange={handleChangeDaily2}
                  >
                    {dsDaily2.map((dl2) =>
                      dl2.dsthoaman.length ? (
                        <MenuItem key={dl2._id} value={dl2._id}>
                          {dl2.ten}
                        </MenuItem>
                      ) : null
                    )}
                  </MultipleSelect>
                ) : (
                  <MultipleSelect label="Chọn đại lý cấp 1" />
                )}
                {selectedDaily2.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>
            </FormContent>

            <TableSection>
              <TableTitle>Sản phẩm đơn hàng</TableTitle>
              <TableDonhangGoc donhang={singleDonhang} />
              <div className="text-right">
                <Total>Tổng đơn hàng:</Total>
                <TotalValue>
                  {formatMoney(
                    singleDonhang?.dssanpham.length &&
                      getTongDonhang(getMappedDSSP(singleDonhang?.dssanpham))
                  )}
                </TotalValue>
              </div>
            </TableSection>

            {dsDaily2.map((dl2) =>
              selectedDaily2.includes(dl2._id) ? (
                <TableSection>
                  <TableTitle>{dl2?.ten}</TableTitle>
                  <TableSanphamDonhang
                    dsSanpham={dl2?.dsthoaman}
                    handleChangeSlSanpham={handleChangeSlSanpham}
                    dl2Id={dl2._id}
                  />
                  <div className="text-right">
                    <Total>Tổng đơn hàng:</Total>
                    <TotalValue>
                      {formatMoney(getTongDonhang(dl2?.dsthoaman))}
                    </TotalValue>
                  </div>
                </TableSection>
              ) : null
            )}
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

export default DonhangThem;
