import React, { useEffect, useRef, useState } from "react";
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
import {
  Container,
  Content,
  ErrMsg,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  Input,
  Label,
  TableSection,
  TableTitle,
  Total,
  TotalValue,
} from "./styledComponents";
import ma from "../../assets/icons/ma.png";
import daily2 from "../../assets/icons/daily2_2.png";
import dssanpham from "../../assets/icons/dssanpham.png";
import DialogMaterial from "../../components/DialogMaterial";
import CustomAlert from "../../components/CustomAlert";

const DonhangThem = (props) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [singleDonhang, setSingleDonhang] = useState(null);
  const [singleDaily1, setSingleDaily1] = useState(null);
  const [selectedDaily2, setselectedDaily2] = useState([]);
  const { id: donhangId } = props.match.params;
  const { userInfo } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const stateRef = useRef();
  const [dsThoaman, setDsThoaman] = useState([
    {
      daily2: null,
      dssanpham: [],
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const lackOfTotalSoluong = () => {
    let tongSLSPGoc = singleDonhang.dssanpham.reduce((acc, item) => {
      return acc + item.soluong;
    }, 0);
    let tongSLSPPhanphat = 0;
    dsThoaman.forEach((tm) => {
      let tongsl = tm.dssanpham.reduce((acc, item) => {
        return acc + parseInt(item.soluongpp);
      }, 0);
      tongSLSPPhanphat = tongSLSPPhanphat + tongsl;
    });
    if (tongSLSPGoc !== tongSLSPPhanphat) {
      setAlertMsg(`T???ng s??? l?????ng s???n ph???m ph??n ph??t ch??a ?????t: ${tongSLSPGoc}`);
      handleOpen();
      return true;
    }
    return false;
  };

  const getTongDonhang = (dssp) => {
    dssp = dssp.map((item) =>
      item.soluongpp ? { ...item, soluong: item.soluongpp } : item
    );
    const { tongdongia } = getDsNguyenVatlieu(dssp);
    return tongdongia;
  };

  const handleChangeSlSanpham = (e, spId, daily2Id) => {
    const val = e.target.value;
    if (!exceedSoluong(val, spId, daily2Id)) {
      setDsThoaman(
        dsThoaman.map((tm) =>
          tm.daily2._id === daily2Id
            ? {
                ...tm,
                dssanpham: tm.dssanpham.map((sp) =>
                  sp._id === spId
                    ? {
                        ...sp,
                        soluongpp: val,
                      }
                    : sp
                ),
              }
            : tm
        )
      );
    }
  };

  const calcTongSoluong1Sanpham = (val, spId, daily2Id) => {
    stateRef.current = stateRef.current.map((tm) =>
      tm.daily2._id === daily2Id
        ? {
            ...tm,
            dssanpham: tm.dssanpham.map((sp) =>
              sp._id === spId
                ? {
                    ...sp,
                    soluongpp: val,
                  }
                : sp
            ),
          }
        : tm
    );

    let tongsl = parseInt(val);
    stateRef.current.forEach((tm) => {
      if (tm.daily2._id !== daily2Id) {
        const sp = tm.dssanpham.find((sp) => sp._id === spId);
        if (sp) {
          tongsl = tongsl + parseInt(sp.soluongpp);
        }
      }
    });

    return tongsl;
  };

  const exceedSoluong = (val, spId, daily2Id) => {
    const sanphamGoc = singleDonhang.dssanpham.find(
      (sp) => sp.sanpham._id === spId
    );
    const tongsl = calcTongSoluong1Sanpham(val, spId, daily2Id);
    if (tongsl > sanphamGoc.soluong) {
      let msg = `
      T???ng s??? l?????ng s???n ph???m "${sanphamGoc.sanpham.ma}" v?????t qu?? ${
        tongsl - sanphamGoc.soluong
      } so v???i s??? l?????ng g???c ${sanphamGoc.soluong}
      `;
      setAlertMsg(msg);
      handleOpen();
      return true;
    }
    return false;
  };

  const handleChangeDaily2 = (e) => {
    const {
      target: { value },
    } = e;
    setselectedDaily2(typeof value === "string" ? value.split(",") : value);
    let temp = [...dsThoaman];
    temp = temp.map((tm) =>
      value.includes(tm.daily2._id)
        ? {
            ...tm,
            dssanpham: tm.dssanpham.map((sp) => ({ ...sp, soluongpp: 1 })),
          }
        : {
            ...tm,
            dssanpham: tm.dssanpham.map((sp) => ({ ...sp, soluongpp: 0 })),
          }
    );
    stateRef.current = temp;
    setDsThoaman(temp);
  };

  const getDsThoaman = (donhang, dsDaily2) => {
    let temp = [
      {
        daily2: null,
        dssanpham: [],
      },
    ];
    dsDaily2.forEach((daily2) => {
      temp = [
        {
          daily2: {
            _id: daily2._id,
            ten: daily2.ten,
          },
          dssanpham: [],
        },
        ...temp,
      ];
      donhang.dssanpham.forEach((sp) => {
        if (daily2.loaisanpham.includes(sp.sanpham.loaisanpham._id)) {
          temp = temp.map((t) =>
            t.daily2 !== null && t.daily2._id === daily2._id
              ? {
                  ...t,
                  dssanpham: [
                    ...t.dssanpham,
                    { ...sp.sanpham, soluong: sp.soluong },
                  ],
                }
              : t
          );
        }
      });
    });
    temp = temp.filter(
      (item) => item.daily2 !== null && item.dssanpham.length > 0
    );
    temp =
      temp.length > 1
        ? temp.map((item) => ({
            ...item,
            dssanpham: item.dssanpham.map((sp) => ({ ...sp, soluongpp: 1 })),
          }))
        : temp.map((item) => ({
            ...item,
            dssanpham: item.dssanpham.map((sp) => ({
              ...sp,
              soluongpp: sp.soluong,
            })),
          }));

    setDsThoaman(temp);
    stateRef.current = temp;
  };

  const emptyFields = () => {
    if (!selectedDaily2.length) {
      setErrMsg("Th??ng tin kh??ng ???????c ????? tr???ng");
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      if (!lackOfTotalSoluong()) {
        let dsdonhang = [];

        let dsthoamanTemp = [...dsThoaman];
        dsthoamanTemp = dsthoamanTemp.map((tm) => ({
          ...tm,
          dssanpham: tm.dssanpham.map((sp) => ({
            ...sp,
            soluong: sp.soluongpp,
          })),
        }));
        dsthoamanTemp.forEach((tm) => {
          if (selectedDaily2.includes(tm.daily2._id)) {
            const {
              danhsachcongcu,
              danhsachvattu,
              danhsachnguyenlieu,
              tongdongia,
            } = getDsNguyenVatlieu(tm.dssanpham);
            let dl = {
              ma: singleDonhang.ma,
              dssanpham: tm.dssanpham.map((item) => ({
                sanpham: item._id,
                soluong: item.soluong,
                soluonghoanthanh: 0,
              })),
              tongsanpham: getTongNguyenVatlieu(tm.dssanpham, "sanpham"),
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
                daily2: tm.daily2._id,
              },
            };
            dsdonhang.push(dl);
          }
        });
        console.log({ dsdonhang });
        const { success } = await apiDonhang.daily1ToDaily2({
          donhangId: singleDonhang._id,
          dsdonhang,
          daily1Id: singleDaily1._id,
        });
        if (success) {
          toast.success("Th??m th??nh c??ng!", { theme: "colored" });
          props.history.push(`/daily1/donhang/chitiet/${donhangId}/tiendo`);
        }
      }
    }
  };

  const fetchDsDonhang = async () => {
    setLoading(true);
    const { donhang } = await apiDonhang.singleDonhang(donhangId);
<<<<<<< HEAD
<<<<<<< HEAD
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    let { daily2 } = await apiDaily1.dsDaily2(daily1._id);
=======
    if (!donhang.xacnhan) {
      props.history.push(`/daily1/donhang/chitiet/${donhangId}`);
    }
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    let { daily2 } = await apiDaily1.dsDaily2(daily1._id);
    daily2 = daily2.filter((dl2) => dl2.user);
>>>>>>> khanhduy
    daily2 = daily2.map((item) => ({ ...item, dsthoaman: [] }));
=======
    if (!donhang.xacnhan) {
      props.history.push(`/daily1/donhang/chitiet/${donhangId}`);
    }
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    let { daily2 } = await apiDaily1.dsDaily2(daily1._id);
    daily2 = daily2.filter((dl2) => dl2.user);

    getDsThoaman(donhang, daily2);
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
    setSingleDonhang(donhang);
    setSingleDaily1(daily1);
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
          title="Quay l???i danh s??ch ????n h??ng"
          titleBack
          onClick={() => props.history.push("/daily1/donhang")}
          headerRight={
            <button className="btn btn-primary px-3" onClick={handleSubmit}>
              <span>L??u</span>
              <i class="fas fa-save"></i>
            </button>
          }
        />
        <Content>
          <Form className="px-5">
            <FormContent>
              <FormTitle>Ph??n ph??t ????n h??ng</FormTitle>
              <FormGroup>
                <Label>
                  <img src={ma} alt="ma" />
                  <span>M?? ????n h??ng:</span>
                </Label>
                <Input type="text" defaultValue={singleDonhang?.ma} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={daily2} alt="daily2" />
                  <span>?????i l?? c???p 2:</span>
                </Label>
                {dsThoaman && dsThoaman.length ? (
                  <MultipleSelect
                    label="Ch???n ?????i l?? c???p 2"
                    value={selectedDaily2}
                    onChange={handleChangeDaily2}
                  >
                    {dsThoaman.map((dl2) => (
                      <MenuItem key={dl2?.daily2?._id} value={dl2?.daily2?._id}>
                        {dl2?.daily2?.ten}
                      </MenuItem>
                    ))}
                  </MultipleSelect>
                ) : (
                  <MultipleSelect label="Ch???n ?????i l?? c???p 1" />
                )}
                {selectedDaily2.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>
            </FormContent>

            <TableSection className="noCheckbox">
              <TableTitle>
                <img src={dssanpham} alt="dssanpham" />
                <span>S???n ph???m ????n h??ng</span>
              </TableTitle>
              <TableDonhangGoc donhang={singleDonhang} />
              <div className="text-right">
                <Total>T???ng ????n h??ng:</Total>
                <TotalValue>
                  {formatMoney(
                    singleDonhang?.dssanpham.length &&
                      getTongDonhang(getMappedDSSP(singleDonhang?.dssanpham))
                  )}
                </TotalValue>
              </div>
            </TableSection>

            {dsThoaman.map((tm) =>
              selectedDaily2.includes(tm?.daily2?._id) ? (
                <TableSection className="noCheckbox">
                  <TableTitle>
                    <img src={daily2} alt="daily2" />
                    <span>{tm?.daily2?.ten}</span>
                  </TableTitle>
                  <TableSanphamDonhang
                    dsSanpham={tm?.dssanpham}
                    handleChangeSlSanpham={handleChangeSlSanpham}
                    dl2Id={tm?.daily2?._id}
                  />
                  <div className="text-right">
                    <Total>T???ng ????n h??ng:</Total>
                    <TotalValue>
                      {formatMoney(getTongDonhang(tm?.dssanpham))}
                    </TotalValue>
                    <CustomAlert title="S??? l?????ng c??n l???i">
                      {tm?.dssanpham.map((sp) => (
                        <p>
                          {`${sp?.ten} (${sp?.ma})`}:
                          <span>
                            {isNaN(
                              sp?.soluong -
                                calcTongSoluong1Sanpham(
                                  sp?.soluongpp,
                                  sp?._id,
                                  tm?.daily2?._id
                                )
                            )
                              ? ""
                              : sp?.soluong -
                                calcTongSoluong1Sanpham(
                                  sp?.soluongpp,
                                  sp?._id,
                                  tm?.daily2?._id
                                )}
                          </span>
                        </p>
                      ))}
                    </CustomAlert>
                  </div>
                </TableSection>
              ) : null
            )}
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="L???i s??? l?????ng"
        content={alertMsg}
        text2="OK"
        onClick2={handleClose}
      />
    </>
  );
};

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

=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
export default DonhangThem;

// import React, { useEffect, useState } from "react";
// import Header from "../../components/Header";
// import { toast } from "react-toastify";
// import MenuItem from "@mui/material/MenuItem";
// import BackdropMaterial from "../../components/BackdropMaterial";
// import apiDonhang from "../../axios/apiDonhang";
// import { useSelector } from "react-redux";
// import TableSanphamDonhang from "./tables/TableSanphamDonhang";
// import TableDonhangGoc from "./tables/TableDonhangGoc";
// import {
//   formatMoney,
//   getDsNguyenVatlieu,
//   getTongNguyenVatlieu,
// } from "../../utils";
// import MultipleSelect from "../../components/MultipleSelect";
// import apiDaily1 from "../../axios/apiDaily1";
// import {
//   Container,
//   Content,
//   ErrMsg,
//   Form,
//   FormContent,
//   FormGroup,
//   FormTitle,
//   Input,
//   Label,
//   TableSection,
//   TableTitle,
//   Total,
//   TotalValue,
// } from "./styledComponents";
// import ma from "../../assets/icons/ma.png";
// import daily2 from "../../assets/icons/daily2_2.png";
// import dssanpham from "../../assets/icons/dssanpham.png";

// const DonhangThem = (props) => {
//   const [loading, setLoading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const [singleDonhang, setSingleDonhang] = useState(null);
//   const [singleDaily1, setSingleDaily1] = useState(null);
//   const [dsDaily2, setDsDaily2] = useState([]);
//   const [selectedDaily2, setselectedDaily2] = useState([]);
//   const { id: donhangId } = props.match.params;
//   const { userInfo } = useSelector((state) => state.user);

//   const getTongDonhang = (dssp) => {
//     const { tongdongia } = getDsNguyenVatlieu(dssp);
//     return tongdongia;
//   };

//   const handleChangeSlSanpham = (e, spId, gsvId) => {
//     let tong =
//       Number(e.target.value) || e.target.value === "" ? e.target.value : 1;
//     let tongExceptGSV = 0;
//     const slgoc = singleDonhang.dssanpham.find(
//       (sp) => sp.sanpham._id === spId
//     ).soluong;
//     dsDaily2.forEach((dl2) => {
//       if (dl2._id !== gsvId && selectedDaily2.includes(dl2._id)) {
//         dl2.dsthoaman.forEach((sp) => {
//           if (sp._id === spId) {
//             tong = parseInt(tong) + parseInt(sp.soluong);
//             tongExceptGSV = tongExceptGSV + parseInt(sp.soluong);
//           }
//         });
//       }
//     });
//     setDsDaily2((prev) =>
//       prev.map((dl2) =>
//         dl2._id === gsvId
//           ? {
//               ...dl2,
//               dsthoaman: dl2.dsthoaman.map((sp) =>
//                 sp._id === spId
//                   ? {
//                       ...sp,
//                       soluong:
//                         tong > slgoc
//                           ? slgoc - tongExceptGSV
//                           : Number(e.target.value) || e.target.value === ""
//                           ? e.target.value
//                           : 1,
//                     }
//                   : sp
//               ),
//             }
//           : dl2
//       )
//     );
//   };

//   const handleChangeDaily2 = (e) => {
//     const {
//       target: { value },
//     } = e;
//     setselectedDaily2(typeof value === "string" ? value.split(",") : value);
//   };

//   const handleGetDsThoaman = (dssp, daily1) => {
//     dssp.forEach((sp) => {
//       setDsDaily2((prev) =>
//         prev.length
//           ? prev.map((dl2) =>
//               dl2.loaisanpham.includes(sp.loaisanpham._id) && //*** */
//               !dl2.dsthoaman
//                 .map((item) => item.loaisanpham)
//                 .includes(sp.loaisanpham._id)
//                 ? {
//                     ...dl2,
//                     dsthoaman: [{ ...sp, soluong: 1 }, ...dl2.dsthoaman],
//                   }
//                 : dl2
//             )
//           : daily1.map((dl2) =>
//               dl2.loaisanpham.includes(sp.loaisanpham._id) &&
//               !dl2.dsthoaman
//                 .map((item) => item.loaisanpham)
//                 .includes(sp.loaisanpham._id)
//                 ? {
//                     ...dl2,
//                     dsthoaman: [{ ...sp, soluong: 1 }, ...dl2.dsthoaman],
//                   }
//                 : dl2
//             )
//       );
//     });
//   };

//   const emptyFields = () => {
//     if (!selectedDaily2.length) {
//       setErrMsg("Th??ng tin kh??ng ???????c ????? tr???ng");
//       return true;
//     }
//     return false;
//   };

//   const handleSubmit = async () => {
//     if (!emptyFields()) {
//       let dsdonhang = [];
//       dsDaily2.forEach((dl2) => {
//         if (selectedDaily2.includes(dl2._id)) {
//           const {
//             danhsachcongcu,
//             danhsachvattu,
//             danhsachnguyenlieu,
//             tongdongia,
//           } = getDsNguyenVatlieu(dl2.dsthoaman);
//           let dl = {
//             ma: singleDonhang.ma,
//             dssanpham: dl2.dsthoaman.map((item) => ({
//               sanpham: item._id,
//               soluong: item.soluong,
//               soluonghoanthanh: 0,
//             })),
//             tongsanpham: getTongNguyenVatlieu(dl2.dsthoaman, "sanpham"),
//             dscongcu: danhsachcongcu.map((item) => ({
//               congcu: item.congcu._id,
//               soluong: item.soluong,
//             })),
//             tongcongcu: getTongNguyenVatlieu(danhsachcongcu, "congcu"),
//             dsvattu: danhsachvattu.map((item) => ({
//               vattu: item.vattu._id,
//               soluong: item.soluong,
//             })),
//             tongvattu: getTongNguyenVatlieu(danhsachvattu, "vattu"),
//             dsnguyenlieu: danhsachnguyenlieu.map((item) => ({
//               nguyenlieu: item.nguyenlieu._id,
//               khoiluong: item.khoiluong,
//             })),
//             tongnguyenlieu: getTongNguyenVatlieu(
//               danhsachnguyenlieu,
//               "nguyenlieu"
//             ),
//             tongdongia,
//             from: {
//               daily1: singleDaily1._id,
//             },
//             to: {
//               daily2: dl2._id,
//             },
//           };
//           dsdonhang.push(dl);
//         }
//       });
//       const { success } = await apiDonhang.daily1ToDaily2({
//         donhangId: singleDonhang._id,
//         dsdonhang,
//         daily1Id: singleDaily1._id,
//       });
//       if (success) {
//         toast.success("Th??m th??nh c??ng!", { theme: "colored" });
//         props.history.push(`/daily1/donhang/chitiet/${donhangId}/tiendo`);
//       }
//     }
//   };

//   const fetchDsDonhang = async () => {
//     setLoading(true);
//     const { donhang } = await apiDonhang.singleDonhang(donhangId);
//     if (!donhang.xacnhan) {
//       props.history.push(`/daily1/donhang/chitiet/${donhangId}`);
//     }
//     const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
//     let { daily2 } = await apiDaily1.dsDaily2(daily1._id);
//     daily2 = daily2.filter((dl2) => dl2.user);
//     daily2 = daily2.map((item) => ({ ...item, dsthoaman: [] }));
//     setSingleDonhang(donhang);
//     setSingleDaily1(daily1);

//     // get ds thoa man
//     const dssp = donhang.dssanpham.map((sp) => ({
//       ...sp.sanpham,
//       soluong: sp.soluong,
//     }));
//     handleGetDsThoaman(dssp, daily2);
//     setLoading(false);
//   };

//   const getMappedDSSP = (dssp) => {
//     let arr =
//       dssp &&
//       dssp.length &&
//       dssp.map((sp) => ({ ...sp.sanpham, soluong: sp.soluong }));
//     return arr;
//   };

//   useEffect(() => {
//     fetchDsDonhang();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (loading) {
//     return <BackdropMaterial />;
//   }

//   return (
//     <>
//       <Container>
//         <Header
//           title="Quay l???i danh s??ch ????n h??ng"
//           titleBack
//           onClick={() => props.history.push("/daily1/donhang")}
//           headerRight={
//             <button className="btn btn-primary px-3" onClick={handleSubmit}>
//               <span>L??u</span>
//               <i class="fas fa-save"></i>
//             </button>
//           }
//         />
//         <Content>
//           <Form className="px-5">
//             <FormContent>
//               <FormTitle>Ph??n ph??t ????n h??ng</FormTitle>
//               <FormGroup>
//                 <Label>
//                   <img src={ma} alt="ma" />
//                   <span>M?? ????n h??ng:</span>
//                 </Label>
//                 <Input type="text" defaultValue={singleDonhang?.ma} disabled />
//               </FormGroup>

//               <FormGroup>
//                 <Label>
//                   <img src={daily2} alt="daily2" />
//                   <span>?????i l?? c???p 2:</span>
//                 </Label>
//                 {dsDaily2 && dsDaily2.length ? (
//                   <MultipleSelect
//                     label="Ch???n ?????i l?? c???p 2"
//                     value={selectedDaily2}
//                     onChange={handleChangeDaily2}
//                   >
//                     {dsDaily2.map((dl2) =>
//                       dl2.dsthoaman.length ? (
//                         <MenuItem key={dl2._id} value={dl2._id}>
//                           {dl2.ten}
//                         </MenuItem>
//                       ) : null
//                     )}
//                   </MultipleSelect>
//                 ) : (
//                   <MultipleSelect label="Ch???n ?????i l?? c???p 1" />
//                 )}
//                 {selectedDaily2.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
//               </FormGroup>
//             </FormContent>

//             <TableSection className="noCheckbox">
//               <TableTitle>
//                 <img src={dssanpham} alt="dssanpham" />
//                 <span>S???n ph???m ????n h??ng</span>
//               </TableTitle>
//               <TableDonhangGoc donhang={singleDonhang} />
//               <div className="text-right">
//                 <Total>T???ng ????n h??ng:</Total>
//                 <TotalValue>
//                   {formatMoney(
//                     singleDonhang?.dssanpham.length &&
//                       getTongDonhang(getMappedDSSP(singleDonhang?.dssanpham))
//                   )}
//                 </TotalValue>
//               </div>
//             </TableSection>

//             {dsDaily2.map((dl2) =>
//               selectedDaily2.includes(dl2._id) ? (
//                 <TableSection className="noCheckbox">
//                   <TableTitle>
//                     <img src={daily2} alt="daily2" />
//                     <span>{dl2?.ten}</span>
//                   </TableTitle>
//                   <TableSanphamDonhang
//                     dsSanpham={dl2?.dsthoaman}
//                     handleChangeSlSanpham={handleChangeSlSanpham}
//                     dl2Id={dl2._id}
//                   />
//                   <div className="text-right">
//                     <Total>T???ng ????n h??ng:</Total>
//                     <TotalValue>
//                       {formatMoney(getTongDonhang(dl2?.dsthoaman))}
//                     </TotalValue>
//                   </div>
//                 </TableSection>
//               ) : null
//             )}
//           </Form>
//         </Content>
//       </Container>
//     </>
//   );
// };

// export default DonhangThem;
