import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiSanpham from "../../axios/apiSanpham";
import styled from "styled-components";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import apiCongcu from "../../axios/apiCongcu";
import apiVattu from "../../axios/apiVattu";
import apiNguyenlieu from "../../axios/apiNguyenlieu";
import apiLoaiSanpham from "../../axios/apiLoaiSanpham";
import MaterialCard from "./MaterialCard";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import MultipleSelect from "../../components/MultipleSelect";
<<<<<<< HEAD
<<<<<<< HEAD
import { formatMoney } from "../../utils";
=======
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
import overall from "../../assets/icons/overall.png";
import congcu from "../../assets/icons/congcu.png";
import vt from "../../assets/icons/vattu.png";
import nglieu from "../../assets/icons/nglieu.png";
import _loai from "../../assets/icons/loai.png";
import anh from "../../assets/icons/anh.png";
import tt from "../../assets/icons/thuoctinh.png";
import _gia from "../../assets/icons/gia.png";
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

const SanphamChinhsua = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [hinhanh, setHinhAnh] = useState(null);
  const [imgToDisplay, setImgToDisplay] = useState(null);
  const [loai, setLoai] = useState(null);
  const [dsloai, setDsloai] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [dsCongcu, setDsCongcu] = useState([]);
  const [selectedCongcu, setSelectedCongcu] = useState([]);
  const [multipleCongcu, setMultipleCongcu] = useState([]);
  const [dsVattu, setDsVattu] = useState([]);
  const [multipleVattu, setMultipleVattu] = useState([]);
  const [selectedVattu, setSelectedVattu] = useState([]);
  const [dsNguyenlieu, setDsNguyenlieu] = useState([]);
  const [multipleNguyenlieu, setMultipleNguyenlieu] = useState([]);
  const [selectedNguyenlieu, setSelectedNguyenlieu] = useState([]);
  const [singleSanpham, setSingleSanpham] = useState(null);
  const { id: sanphamId } = props.match.params;

  const fetchData = async () => {
    setLoading(true);
    const { sanpham } = await apiSanpham.singleSanpham(sanphamId);
    const { loaiSanpham } = await apiLoaiSanpham.dsLoaiSanpham();
    const { congcu } = await apiCongcu.dsCongcu();
    const { vattu } = await apiVattu.dsVattu();
    const { nguyenlieu } = await apiNguyenlieu.dsNguyenlieu();
    setSingleSanpham(sanpham);
    setDsloai(loaiSanpham);
    setDsCongcu(congcu);
    setSelectedCongcu(sanpham.dscongcu.map((item) => item.congcu._id));
    setMultipleCongcu(
      sanpham.dscongcu.map((item) => ({
        congcu: item.congcu._id,
        soluong: item.soluong,
      }))
    );
    setDsVattu(vattu);
    setSelectedVattu(sanpham.dsvattu.map((item) => item.vattu._id));
    setMultipleVattu(
      sanpham.dsvattu.map((item) => ({
        vattu: item.vattu._id,
        soluong: item.soluong,
      }))
    );
    setDsNguyenlieu(nguyenlieu);
    setSelectedNguyenlieu(
      sanpham.dsnguyenlieu.map((item) => item.nguyenlieu._id)
    );
    setMultipleNguyenlieu(
      sanpham.dsnguyenlieu.map((item) => ({
        nguyenlieu: item.nguyenlieu._id,
        khoiluong: item.khoiluong,
        donvitinh: item.donvitinh,
      }))
    );
    setThuoctinh(sanpham.thuoctinh.length ? sanpham.thuoctinh : thuoctinh);
    setLoai(sanpham.loaisanpham._id);
    setImgToDisplay(`/uploads/${sanpham.hinhanh}`);
    setLoading(false);
  };

  useEffect(() => {
    setSuccess(false);
    setLoading(false);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const getThuocTinh = () => {
    if (
      thuoctinh.length === 1 &&
      thuoctinh[0].ten === "" &&
      thuoctinh[0].giatri === ""
    ) {
      return [];
    }
    return thuoctinh;
  };

  const emptyFields = () => {
    if (
      !singleSanpham.ma ||
      !singleSanpham.ten ||
      !multipleCongcu.length ||
      !multipleVattu.length ||
      !multipleNguyenlieu.length ||
      !loai ||
      !singleSanpham.gia
    ) {
      setErrMsg("Th??ng tin kh??ng ???????c ????? tr???ng");
      return true;
    } else {
      setErrMsg("");
      return false;
    }
  };

  const submitForm = async () => {
    if (!emptyFields()) {
      // console.log({
      //   ma,
      //   ten,
      //   mota,
      //   hinhanh,
      //   loai,
      //   thuoctinh: getThuocTinh(),
      //   dscongcu: multipleCongcu,
      //   dsvattu: multipleVattu,
      //   dsnguyenlieu: multipleNguyenlieu,
      //   gia,
      // });

      const formData = new FormData();
      formData.append("ma", singleSanpham.ma);
      formData.append("ten", singleSanpham.ten);
      formData.append("mota", singleSanpham.mota);
      formData.append("hinhanh", hinhanh);
      formData.append("loaisanpham", loai);
      formData.append("thuoctinh", JSON.stringify(getThuocTinh()));
      formData.append("dscongcu", JSON.stringify(multipleCongcu));
      formData.append("dsvattu", JSON.stringify(multipleVattu));
      formData.append("dsnguyenlieu", JSON.stringify(multipleNguyenlieu));
      formData.append("gia", singleSanpham.gia);

      const { success } = await apiSanpham.suaSanpham(sanphamId, formData);
      if (success) {
        toast.success("C???p nh???t th??nh c??ng!", { theme: "colored" });
        props.history.push("/admin/sanpham");
      }
    }
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...thuoctinh];
    list[index][name] = value;
    setThuoctinh(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...thuoctinh];
    list.splice(index, 1);
    setThuoctinh(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setThuoctinh([...thuoctinh, { ten: "", giatri: "" }]);
  };

  // handle select cong cu
  const handleSelectCongcu = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedCongcu(typeof value === "string" ? value.split(",") : value);
    setMultipleCongcu((prev) => {
      let temp = prev.map((item) => item.congcu);
      let arr = [];
      for (let x of value) {
        if (temp.includes(x)) {
          arr.push(prev.find((y) => y.congcu === x));
        } else {
          arr.push({ congcu: x, soluong: 1 });
        }
      }
      return arr;
    });
    console.log({ value });
  };

  // handle select vattu
  const handleSelectVattu = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedVattu(typeof value === "string" ? value.split(",") : value);
    setMultipleVattu((prev) => {
      let temp = prev.map((item) => item.vattu);
      let arr = [];
      for (let x of value) {
        if (temp.includes(x)) {
          arr.push(prev.find((y) => y.vattu === x));
        } else {
          arr.push({ vattu: x, soluong: 1 });
        }
      }
      return arr;
    });
  };

  // handle select nglieu
  const handleSelectNguyenlieu = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedNguyenlieu(typeof value === "string" ? value.split(",") : value);
    setMultipleNguyenlieu((prev) => {
      let temp = prev.map((item) => item.nguyenlieu);
      let arr = [];
      for (let x of value) {
        if (temp.includes(x)) {
          arr.push(prev.find((y) => y.nguyenlieu === x));
        } else {
          arr.push({ nguyenlieu: x, khoiluong: 1, donvitinh: "" });
        }
      }
      return arr;
    });
  };

  // get ten congcu / vattu / nguyenlieu
  const getTenNgVatlieu = (ngvatlieuId, ngvatlieuArr) => {
    return ngvatlieuArr.find((item) => item._id === ngvatlieuId).ten;
  };

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay l???i trang danh s??ch s???n ph???m"
          titleBack
          onClick={() => props.history.push("/admin/sanpham")}
          headerRight={
            <button className="btn btn-primary px-3" onClick={submitForm}>
              L??u
              <i class="fas fa-save"></i>
            </button>
          }
        />

        <Content>
          <div className="row">
            <div className="col-lg-8">
              <Box>
                <BoxTitle>
                  <img src={overall} alt="overall" />
                  <h5>Th??ng tin chung</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Label>M?? s???n ph???m:</Label>
                    <Input
                      type="text"
                      placeholder="Nh???p m??"
                      value={singleSanpham?.ma}
                      onChange={(e) =>
                        setSingleSanpham({
                          ...singleSanpham,
                          ma: e.target.value,
                        })
                      }
                      style={{ width: "50%" }}
                    />
                    {!singleSanpham?.ma && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>T??n s???n ph???m:</Label>
                    <Input
                      type="text"
                      placeholder="Nh???p t??n"
                      value={singleSanpham?.ten}
                      onChange={(e) =>
                        setSingleSanpham({
                          ...singleSanpham,
                          ten: e.target.value,
                        })
                      }
                    />
                    {!singleSanpham?.ten && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>M?? t??? s???n ph???m:</Label>
                    <TextArea
                      value={singleSanpham?.mota}
                      onChange={(e) =>
                        setSingleSanpham({
                          ...singleSanpham,
                          mota: e.target.value,
                        })
                      }
                      rows="5"
                    />
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={congcu} alt="congcu" />
                  <h5>C??ng c???</h5>
                </BoxTitle>
                <BoxContent>
                  {dsCongcu && dsCongcu.length ? (
                    <MultipleSelect
                      label="Ch???n c??ng c???"
                      value={selectedCongcu}
                      onChange={handleSelectCongcu}
                    >
                      {dsCongcu.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.ten}
                        </MenuItem>
                      ))}
                    </MultipleSelect>
                  ) : (
                    <MultipleSelect label="Ch???n c??ng c???" />
                  )}
                  {multipleCongcu.map((x, index) => (
                    <MaterialCard style={{ marginTop: 16 }}>
                      <CardTitle>{`${index + 1}. ${getTenNgVatlieu(
                        x.congcu,
                        dsCongcu
                      )}`}</CardTitle>
                      <InputSection>
                        <span>S??? l?????ng:</span>
                        <input
                          type="text"
                          value={x.soluong}
                          onChange={(e) =>
                            setMultipleCongcu(
                              multipleCongcu.map((y) =>
                                y.congcu === x.congcu
                                  ? { ...y, soluong: e.target.value }
                                  : y
                              )
                            )
                          }
                        />
                      </InputSection>
                    </MaterialCard>
                  ))}
                  {selectedCongcu.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={vt} alt="vt" />
                  <h5>V???t t??</h5>
                </BoxTitle>
                <BoxContent>
                  {dsVattu && dsVattu.length ? (
                    <MultipleSelect
                      label="Ch???n v???t t??"
                      value={selectedVattu}
                      onChange={handleSelectVattu}
                    >
                      {dsVattu.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.ten}
                        </MenuItem>
                      ))}
                    </MultipleSelect>
                  ) : (
                    <MultipleSelect label="Ch???n v???t t??" />
                  )}
                  {multipleVattu.map((x, index) => (
                    <MaterialCard style={{ marginTop: 16 }}>
                      <CardTitle>{`${index + 1}. ${getTenNgVatlieu(
                        x.vattu,
                        dsVattu
                      )}`}</CardTitle>
                      <InputSection>
                        <span>S??? l?????ng:</span>
                        <input
                          type="text"
                          value={x.soluong}
                          onChange={(e) =>
                            setMultipleVattu(
                              multipleVattu.map((y) =>
                                y.vattu === x.vattu
                                  ? { ...y, soluong: e.target.value }
                                  : y
                              )
                            )
                          }
                        />
                      </InputSection>
                    </MaterialCard>
                  ))}
                  {selectedVattu.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={nglieu} alt="nglieu" />
                  <h5>Nguy??n li???u</h5>
                </BoxTitle>
                <BoxContent>
                  {dsNguyenlieu && dsNguyenlieu.length ? (
                    <MultipleSelect
                      label="Ch???n nguy??n li???u"
                      value={selectedNguyenlieu}
                      onChange={handleSelectNguyenlieu}
                    >
                      {dsNguyenlieu.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.ten}
                        </MenuItem>
                      ))}
                    </MultipleSelect>
                  ) : (
                    <MultipleSelect label="Ch???n nguy??n li???u" />
                  )}
                  {multipleNguyenlieu.map((x, index) => (
                    <MaterialCard style={{ marginTop: 16 }}>
                      <CardTitle>{`${index + 1}. ${getTenNgVatlieu(
                        x.nguyenlieu,
                        dsNguyenlieu
                      )}`}</CardTitle>
                      <InputSection>
                        <span>Kh???i l?????ng:</span>
                        <input
                          type="text"
                          value={x.khoiluong}
                          onChange={(e) =>
                            setMultipleNguyenlieu(
                              multipleNguyenlieu.map((y) =>
                                y.nguyenlieu === x.nguyenlieu
                                  ? { ...y, khoiluong: e.target.value }
                                  : y
                              )
                            )
                          }
                        />
                      </InputSection>
                      <InputSection>
                        <span>????n v??? t??nh:</span>
                        <input
                          type="text"
                          style={{ width: 100 }}
                          value={x.donvitinh}
                          onChange={(e) =>
                            setMultipleNguyenlieu(
                              multipleNguyenlieu.map((y) =>
                                y.nguyenlieu === x.nguyenlieu
                                  ? { ...y, donvitinh: e.target.value }
                                  : y
                              )
                            )
                          }
                        />
                      </InputSection>
                    </MaterialCard>
                  ))}
                  {dsNguyenlieu.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
                </BoxContent>
              </Box>
            </div>

            <div className="col-lg-4">
              <Box>
                <BoxTitle>
                  <img src={_loai} alt="loai" />
                  <h5>Lo???i s???n ph???m</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    {dsloai && dsloai.length ? (
                      <DropdownMaterial2
                        label="Ch???n lo???i s???n ph???m"
                        value={loai}
                        onChange={(e) => setLoai(e.target.value)}
                      >
                        {dsloai.map((item) => (
                          <MenuItem value={item._id}>{item.ten}</MenuItem>
                        ))}
                      </DropdownMaterial2>
                    ) : (
                      <DropdownMaterial2 label="Ch???n lo???i s???n ph???m" />
                    )}
                    {!loai && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={anh} alt="anh" />
                  <h5>???nh s???n ph???m</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <input
                      type="file"
                      style={{ border: "none" }}
                      onChange={(e) => {
                        setHinhAnh(e.target.files[0]);
                        setImgToDisplay(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                    <div className="d-flex justify-content-center">
                      {imgToDisplay && (
                        <Image src={imgToDisplay} alt="chosenImage" />
                      )}
                    </div>
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={tt} alt="tt" />
                  <h5>Thu???c t??nh</h5>
                </BoxTitle>
                <BoxContent>
                  {thuoctinh &&
                    thuoctinh.length &&
                    thuoctinh.map((item, key) => {
                      return (
                        <div className="row">
                          <div className="col-lg-6">
                            <FormGroup style={{ marginBottom: 10 }}>
                              <Input
                                type="text"
                                name="ten"
                                value={item.ten}
                                onChange={(e) => handleInputChange(e, key)}
                                placeholder="T??n thu???c t??nh"
                              />
                            </FormGroup>
                          </div>
                          <div className="col-lg-6">
                            <div className="d-flex align-items-center">
                              <Input
                                type="text"
                                name="giatri"
                                value={item.giatri}
                                onChange={(e) => handleInputChange(e, key)}
                                placeholder="Gi?? tr???"
                              />
                              {thuoctinh.length !== 1 && (
                                <CrossButton
                                  onClick={() => handleRemoveClick(key)}
                                >
                                  <i class="fas fa-times"></i>
                                </CrossButton>
                              )}
                            </div>
                          </div>

                          <div className="addElementBtn">
                            {thuoctinh.length - 1 === key && (
                              <PlusButton onClick={handleAddClick}>
                                <i class="fas fa-plus"></i>
                                <span>Th??m thu???c t??nh kh??c</span>
                              </PlusButton>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={_gia} alt="_gia" />
                  <h5>Gi?? s???n ph???m</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Input
                      type="text"
                      placeholder="Nh???p gi??"
                      value={singleSanpham?.gia}
                      onChange={(e) =>
                        setSingleSanpham({
                          ...singleSanpham,
                          gia: e.target.value,
                        })
                      }
                    />
                    {!singleSanpham?.gia && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>
                </BoxContent>
              </Box>
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 125vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 36px;
  font-family: "Poppins", sans-serif;
`;
const Box = styled.div`
  background: #fff;
  margin-bottom: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
`;
const BoxTitle = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
<<<<<<< HEAD
  font-family: "Roboto", sans-serif;
=======
  font-family: "Montserrat", sans-serif;
  color: #333;
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
  display: flex;
  align-items: center;
  padding: 20px;
  img {
<<<<<<< HEAD
    width: 36px;
    margin-right: 8px;
=======
    width: 24px;
    margin-right: 8px;
    opacity: 0.7;
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
  }
  h5 {
    font-size: 16px;
    display: inline-block;
    margin-bottom: 0;
  }
`;
const BoxContent = styled.div`
  padding: 28px;
`;
const FormGroup = styled.div`
  margin-bottom: 26px;
  .MuiMenuItem-root {
    display: block;
  }
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
const TextArea = styled.textarea`
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
const CrossButton = styled.button`
  border: none;
  margin-left: 10px;
  background: #fff;
  outline: none;
  i {
    font-size: 26px;
    color: rgba(0, 0, 0, 0.3);
  }
  &:active {
    outline: none;
  }
`;
const PlusButton = styled.button`
  margin-left: 20px;
  background: #fff;
  border: none;
  outline: none;
  i {
    font-size: 13px;
    color: #0088ff;
    width: 25px;
    height: 25px;
    line-height: 20px;
    border: 3px solid #0088ff;
    text-align: center;
    border-radius: 50%;
  }
  span {
    color: #0088ff;
    margin-left: 8px;
  }
  &:active {
    outline: none;
  }
`;
const ErrMsg = styled.span`
  display: block;
  font-size: 15px;
  color: red;
`;
const Image = styled.img`
  width: 150px;
  display: block;
  margin-top: 16px;
`;
const CardTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
`;
const InputSection = styled.div`
  display: inline-block;
  margin-top: 16px;
  margin-right: 36px;
  padding-left: 36px;
  span {
    font-size: 14px;
  }
  input {
    margin-left: 10px;
    width: 60px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 3px 10px;
    outline: none;
    color: #333;
    border-radius: 3px;
    &:focus {
      border: 1px solid blue;
    }
  }
`;

export default SanphamChinhsua;
