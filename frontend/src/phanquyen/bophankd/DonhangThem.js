import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  ErrMsg,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  Label,
  TableSection,
  TableTitle,
  Total,
  TotalValue,
} from "./styledComponents";
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
import them from "../../assets/icons/them.png";
import ma from "../../assets/icons/ma.png";
import _gsv from "../../assets/icons/giamsatvung.png";
import dhgoc from "../../assets/icons/dhgoc.png";

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
      const { success, savedDonhang } = await apiDonhang.bophankdToGsv({
        donhangId: selectedDonhang,
        dsdonhang,
        bophankdId: singleBophankd._id,
      });
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        props.history.push(
          `/bophankd/donhang/chitiet/${savedDonhang._id}/tiendo`
        );
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
            <button className="btn btn-primary px-3" onClick={handleSubmit}>
              Lưu
              <i class="fas fa-save"></i>
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>Thêm đơn hàng</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={ma} alt="ma" />
                  <span>Mã đơn hàng:</span>
                </Label>
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
                <Label>
                  <img src={_gsv} alt="gsv" />
                  <span>Giám sát vùng:</span>
                </Label>
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

            <div className="px-5">
              {selectedDonhang ? (
                <TableSection>
                  <TableTitle>
                    <img src={dhgoc} alt="dhgoc" />
                    <span>Đơn hàng gốc</span>
                  </TableTitle>
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
                    <TableTitle>
                      <img src={_gsv} alt="gsv" />
                      <span>{gsv?.ten}</span>
                    </TableTitle>
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
            </div>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default DonhangThem;
