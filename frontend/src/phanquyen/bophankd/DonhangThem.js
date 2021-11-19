import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDonhang from "../../axios/apiDonhang";
import apiBophankd from "../../axios/apiBophankd";
import { useSelector } from "react-redux";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import TableSanphamDonhang from "./tables/TableSanphamDonhang";
import TableDonhangGoc from "./tables/TableDonhangGoc";
import {
  formatMoney,
  getDsNguyenVatlieu,
  getTongNguyenVatlieu,
} from "../../utils";
import MultipleSelect from "../../components/MultipleSelect";

const DonhangThem = (props) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [dsDonhang, setDsDonhang] = useState([]);
  const [selectedDonhang, setSelectedDonhang] = useState(null);
  const [singleDonhang, setSingleDonhang] = useState(null);
  const [singleBophankd, setSingleBophankd] = useState(null);
  const [dsGSV, setDsGSV] = useState([]);
  const [selectedGSV, setselectedGSV] = useState([]);
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
    dsGSV.forEach((gsv) => {
      if (gsv._id !== gsvId && selectedGSV.includes(gsv._id)) {
        gsv.dsthoaman.forEach((sp) => {
          if (sp._id === spId) {
            tong = parseInt(tong) + parseInt(sp.soluong);
            tongExceptGSV = tongExceptGSV + parseInt(sp.soluong);
          }
        });
      }
    });
    setDsGSV((prev) =>
      prev.map((gsv) =>
        gsv._id === gsvId
          ? {
              ...gsv,
              dsthoaman: gsv.dsthoaman.map((sp) =>
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
          : gsv
      )
    );
  };

  const handleChangeGSV = (e) => {
    const {
      target: { value },
    } = e;
    setselectedGSV(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeDonhang = (e) => {
    const val = e.target.value;
    setSelectedDonhang(val);
    const donhang = dsDonhang.find((item) => item._id === val);
    setSingleDonhang(donhang);
    // set ds gsv thoa man
    let dssp = donhang.dssanpham.map((sp) => ({
      ...sp.sanpham,
      soluong: sp.soluong,
    }));
    setselectedGSV([]);
    setDsGSV(dsGSV.map((item) => ({ ...item, dsthoaman: [] })));
    dssp.forEach((sp) => {
      setDsGSV((prev) =>
        prev.map((gsv) =>
          gsv.loaisanpham.includes(sp.loaisanpham) &&
          !gsv.dsthoaman.map((item) => item._id).includes(sp._id)
            ? {
                ...gsv,
                dsthoaman: [{ ...sp, soluong: 1 }, ...gsv.dsthoaman],
              }
            : gsv
        )
      );
    });
  };

  const emptyFields = () => {
    if (!selectedDonhang || !selectedGSV.length) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      let dsdonhang = [];
      dsGSV.forEach((gsv) => {
        if (selectedGSV.includes(gsv._id)) {
          const {
            danhsachcongcu,
            danhsachvattu,
            danhsachnguyenlieu,
            tongdongia,
          } = getDsNguyenVatlieu(gsv.dsthoaman);
          let dl = {
            ma: singleDonhang.ma,
            dssanpham: gsv.dsthoaman.map((item) => ({
              sanpham: item._id,
              soluong: item.soluong,
              soluonghoanthanh: 0,
            })),
            tongsanpham: getTongNguyenVatlieu(gsv.dsthoaman, "sanpham"),
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
              bophankd: singleBophankd._id,
            },
            to: {
              giamsatvung: gsv._id,
            },
          };
          dsdonhang.push(dl);
        }
      });
      const { success } = await apiDonhang.bophankdToGsv({
        donhangId: selectedDonhang,
        dsdonhang,
        bophankdId: singleBophankd._id,
      });
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        props.history.push("/bophankd/donhang");
      }
    }
  };

  const fetchDsDonhang = async () => {
    setLoading(true);
    const { donhang } = await apiDonhang.dsDonhang();
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const { giamsatvung } = await apiBophankd.bophankdDsGSV(bophankd._id);
    setDsGSV(giamsatvung.map((item) => ({ ...item, dsthoaman: [] })));
    setDsDonhang(donhang);
    setSingleBophankd(bophankd);
    setLoading(false);
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
          onClick={() => props.history.push("/bophankd/donhang")}
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
                {dsDonhang && dsDonhang.length ? (
                  <DropdownMaterial2
                    label="Chọn mã đơn hàng"
                    value={selectedDonhang}
                    onChange={handleChangeDonhang}
                  >
                    {dsDonhang.map((item) => (
                      <MenuItem value={item._id}>{item.ma}</MenuItem>
                    ))}
                  </DropdownMaterial2>
                ) : (
                  <DropdownMaterial2 label="Chọn mã đơn hàng" />
                )}
                {!selectedDonhang && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Giám sát vùng:</Label>
                {dsGSV && dsGSV.length ? (
                  <MultipleSelect
                    label="Chọn gám sát vùng"
                    value={selectedGSV}
                    onChange={handleChangeGSV}
                  >
                    {dsGSV.map((gsv) =>
                      gsv.dsthoaman.length ? (
                        <MenuItem key={gsv._id} value={gsv._id}>
                          {gsv.ten}
                        </MenuItem>
                      ) : null
                    )}
                  </MultipleSelect>
                ) : (
                  <MultipleSelect label="Chọn gám sát vùng" />
                )}
                {selectedGSV.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>
            </FormContent>

            {selectedDonhang ? (
              <TableSection>
                <TableTitle>Đơn hàng gốc</TableTitle>
                <TableDonhangGoc donhang={singleDonhang} />
                <div className="text-right">
                  <Total>Tổng đơn hàng:</Total>
                  <TotalValue>
                    {formatMoney(
                      getTongDonhang(
                        singleDonhang.dssanpham.map((sp) => ({
                          ...sp.sanpham,
                          soluong: sp.soluong,
                        }))
                      )
                    )}
                  </TotalValue>
                </div>
              </TableSection>
            ) : null}

            {dsGSV.map((gsv) =>
              selectedGSV.includes(gsv._id) ? (
                <TableSection>
                  <TableTitle>{gsv?.ten}</TableTitle>
                  <TableSanphamDonhang
                    dsSanpham={gsv?.dsthoaman}
                    handleChangeSlSanpham={handleChangeSlSanpham}
                    gsvId={gsv._id}
                  />
                  <div className="text-right">
                    <Total>Tổng đơn hàng:</Total>
                    <TotalValue>
                      {formatMoney(getTongDonhang(gsv?.dsthoaman))}
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
export default DonhangThem;
