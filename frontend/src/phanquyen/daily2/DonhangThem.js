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
import apiDaily2 from "../../axios/apiDaily2";

const DonhangThem = (props) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [singleDonhang, setSingleDonhang] = useState(null);
  const [singleDaily2, setSingleDaily2] = useState(null);
  const [dsHodan, setDsHodan] = useState([]);
  const [selectedHodan, setselectedHodan] = useState([]);
  const { id: donhangId } = props.match.params;
  const { userInfo } = useSelector((state) => state.user);

  const getTongDonhang = (dssp) => {
    const { tongdongia } = getDsNguyenVatlieu(dssp);
    return tongdongia;
  };

  const handleChangeSlSanpham = (e, spId, dl2Id) => {
    let tong =
      Number(e.target.value) || e.target.value === "" ? e.target.value : 1;
    let tongExceptGSV = 0;
    const slgoc = singleDonhang.dssanpham.find(
      (sp) => sp.sanpham._id === spId
    ).soluong;
    dsHodan.forEach((hd) => {
      if (hd._id !== dl2Id && selectedHodan.includes(hd._id)) {
        hd.dsthoaman.forEach((sp) => {
          if (sp._id === spId) {
            tong = parseInt(tong) + parseInt(sp.soluong);
            tongExceptGSV = tongExceptGSV + parseInt(sp.soluong);
          }
        });
      }
    });
    setDsHodan((prev) =>
      prev.map((hd) =>
        hd._id === dl2Id
          ? {
              ...hd,
              dsthoaman: hd.dsthoaman.map((sp) =>
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
          : hd
      )
    );
  };

  const handleChangeDaily2 = (e) => {
    const {
      target: { value },
    } = e;
    setselectedHodan(typeof value === "string" ? value.split(",") : value);
  };

<<<<<<< HEAD
  const handleGetDsThoaman = (dssp, daily1) => {
=======
  const handleGetDsThoaman = (dssp, hodan) => {
    console.log({ dssp, hodan });
>>>>>>> khanhduy
    dssp.forEach((sp) => {
      setDsHodan((prev) =>
        prev.length
          ? prev.map((hd) =>
<<<<<<< HEAD
              hd.loaisanpham.includes(sp.loaisanpham._id) && //*** */
=======
              hd.loaisanpham._id === sp.loaisanpham._id && //*** */
>>>>>>> khanhduy
              !hd.dsthoaman
                .map((item) => item.loaisanpham)
                .includes(sp.loaisanpham._id)
                ? {
                    ...hd,
                    dsthoaman: [{ ...sp, soluong: 1 }, ...hd.dsthoaman],
                  }
                : hd
            )
<<<<<<< HEAD
          : daily1.map((hd) =>
              hd.loaisanpham.includes(sp.loaisanpham._id) &&
=======
          : hodan.map((hd) =>
              hd.loaisanpham._id === sp.loaisanpham._id &&
>>>>>>> khanhduy
              !hd.dsthoaman
                .map((item) => item.loaisanpham)
                .includes(sp.loaisanpham._id)
                ? {
                    ...hd,
                    dsthoaman: [{ ...sp, soluong: 1 }, ...hd.dsthoaman],
                  }
                : hd
            )
      );
    });
  };

  const emptyFields = () => {
    if (!selectedHodan.length) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      let dsdonhang = [];
      dsHodan.forEach((hd) => {
        if (selectedHodan.includes(hd._id)) {
          const {
            danhsachcongcu,
            danhsachvattu,
            danhsachnguyenlieu,
            tongdongia,
          } = getDsNguyenVatlieu(hd.dsthoaman);
          let dl = {
            ma: singleDonhang.ma,
            dssanpham: hd.dsthoaman.map((item) => ({
              sanpham: item._id,
              soluong: item.soluong,
              soluonghoanthanh: 0,
            })),
            tongsanpham: getTongNguyenVatlieu(hd.dsthoaman, "sanpham"),
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
              daily2: singleDaily2._id,
            },
            to: {
              hodan: hd._id,
            },
          };
          dsdonhang.push(dl);
        }
      });
      const { success } = await apiDonhang.daily2ToHodan({
        donhangId: singleDonhang._id,
        dsdonhang,
        daily2Id: singleDaily2._id,
      });
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        props.history.push(`/daily2/donhang/chitiet/${donhangId}/tiendo`);
      }
    }
  };

  const fetchDsDonhang = async () => {
    setLoading(true);
    const { donhang } = await apiDonhang.singleDonhang(donhangId);
<<<<<<< HEAD
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    let { hodan } = await apiDaily2.dsHodan(daily2._id);
=======
    if (!donhang.xacnhan) {
      props.history.push(`/daily2/donhang/chitiet/${donhangId}`);
    }
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    let { hodan } = await apiDaily2.dsHodan(daily2._id);
    hodan = hodan.filter((hd) => hd.user);
>>>>>>> khanhduy
    hodan = hodan.map((item) => ({ ...item, dsthoaman: [] }));
    setSingleDonhang(donhang);
    setSingleDaily2(daily2);

    // get ds thoa man
    const dssp = donhang.dssanpham.map((sp) => ({
      ...sp.sanpham,
      soluong: sp.soluong,
    }));
    handleGetDsThoaman(dssp, hodan);
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
          onClick={() => props.history.push("/daily2/donhang")}
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
                <Label>Hộ dân:</Label>
                {dsHodan && dsHodan.length ? (
                  <MultipleSelect
                    label="Chọn hộ dân"
                    value={selectedHodan}
                    onChange={handleChangeDaily2}
                  >
                    {dsHodan.map((hd) =>
                      hd.dsthoaman.length ? (
                        <MenuItem key={hd._id} value={hd._id}>
                          {hd.daidien}
                        </MenuItem>
                      ) : null
                    )}
                  </MultipleSelect>
                ) : (
                  <MultipleSelect label="Chọn hộ dân" />
                )}
                {selectedHodan.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
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

            {dsHodan.map((hd) =>
              selectedHodan.includes(hd._id) ? (
                <TableSection>
                  <TableTitle>{hd?.daidien}</TableTitle>
                  <TableSanphamDonhang
                    dsSanpham={hd?.dsthoaman}
                    handleChangeSlSanpham={handleChangeSlSanpham}
                    dl2Id={hd._id}
                  />
                  <div className="text-right">
                    <Total>Tổng đơn hàng:</Total>
                    <TotalValue>
                      {formatMoney(getTongDonhang(hd?.dsthoaman))}
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
<<<<<<< HEAD
=======
  font-family: "Roboto", sans-serif;
>>>>>>> khanhduy
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
