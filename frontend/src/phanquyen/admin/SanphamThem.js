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

const SanphamThem = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [ma, setMa] = useState("");
  const [ten, setTen] = useState("");
  const [mota, setMota] = useState("");
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
  const [gia, setGia] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const { loaiSanpham } = await apiLoaiSanpham.dsLoaiSanpham();
    const { congcu } = await apiCongcu.dsCongcu();
    const { vattu } = await apiVattu.dsVattu();
    const { nguyenlieu } = await apiNguyenlieu.dsNguyenlieu();
    setDsloai(loaiSanpham);
    setDsCongcu(congcu);
    setDsVattu(vattu);
    setDsNguyenlieu(nguyenlieu);
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
      !ma ||
      !ten ||
      !multipleCongcu.length ||
      !multipleVattu.length ||
      !multipleNguyenlieu.length ||
      !loai ||
      !gia
    ) {
      setErrMsg("Thông tin không được để trống");
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
      formData.append("ma", ma);
      formData.append("ten", ten);
      formData.append("mota", mota);
      formData.append("hinhanh", hinhanh);
      formData.append("loaisanpham", loai);
      formData.append("thuoctinh", JSON.stringify(getThuocTinh()));
      formData.append("dscongcu", JSON.stringify(multipleCongcu));
      formData.append("dsvattu", JSON.stringify(multipleVattu));
      formData.append("dsnguyenlieu", JSON.stringify(multipleNguyenlieu));
      formData.append("gia", gia);

      const { success } = await apiSanpham.themSanpham(formData);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        resetFields();
        setErrMsg("");
      }
    }
  };

  // reset fields
  const resetFields = () => {
    setMa("");
    setTen("");
    setMota("");
    setSelectedCongcu([]);
    setMultipleCongcu([]);
    setSelectedVattu([]);
    setMultipleVattu([]);
    setSelectedNguyenlieu([]);
    setMultipleNguyenlieu([]);
    setLoai(null);
    setHinhAnh(null);
    setThuoctinh([{ ten: "", giatri: "" }]);
    setGia("");
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
          arr.push({ nguyenlieu: x, khoiluong: 1, donvitinh: "kg" });
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
          title="Quay lại trang danh sách sản phẩm"
          titleBack
          onClick={() => props.history.push("/admin/sanpham")}
          headerRight={
            <button className="btn btn-primary px-4" onClick={submitForm}>
              Lưu
            </button>
          }
        />

        <Content>
          <div className="row">
            <div className="col-lg-8">
              <Box>
                <BoxTitle>
                  <h5>Thông tin chung</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Label>Mã sản phẩm:</Label>
                    <Input
                      type="text"
                      placeholder="Nhập mã"
                      value={ma}
                      onChange={(e) => setMa(e.target.value)}
                      style={{ width: "50%" }}
                    />
                    {!ma && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Tên sản phẩm:</Label>
                    <Input
                      type="text"
                      placeholder="Nhập tên"
                      value={ten}
                      onChange={(e) => setTen(e.target.value)}
                    />
                    {!ten && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Mô tả sản phẩm:</Label>
                    <TextArea
                      value={mota}
                      onChange={(e) => setMota(e.target.value)}
                      rows="5"
                    />
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Công cụ</h5>
                </BoxTitle>
                <BoxContent>
                  {dsCongcu && dsCongcu.length ? (
                    <MultipleSelect
                      label="Chọn công cụ"
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
                    <MultipleSelect label="Chọn công cụ" />
                  )}
                  {multipleCongcu.map((x, index) => (
                    <MaterialCard style={{ marginTop: 16 }}>
                      <CardTitle>{`${index + 1}. ${getTenNgVatlieu(
                        x.congcu,
                        dsCongcu
                      )}`}</CardTitle>
                      <InputSection>
                        <span>Số lượng:</span>
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
                  <h5>Vật tư</h5>
                </BoxTitle>
                <BoxContent>
                  {dsVattu && dsVattu.length ? (
                    <MultipleSelect
                      label="Chọn vật tư"
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
                    <MultipleSelect label="Chọn vật tư" />
                  )}
                  {multipleVattu.map((x, index) => (
                    <MaterialCard style={{ marginTop: 16 }}>
                      <CardTitle>{`${index + 1}. ${getTenNgVatlieu(
                        x.vattu,
                        dsVattu
                      )}`}</CardTitle>
                      <InputSection>
                        <span>Số lượng:</span>
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
                  <h5>Nguyên liệu</h5>
                </BoxTitle>
                <BoxContent>
                  {dsNguyenlieu && dsNguyenlieu.length ? (
                    <MultipleSelect
                      label="Chọn nguyên liệu"
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
                    <MultipleSelect label="Chọn nguyên liệu" />
                  )}
                  {multipleNguyenlieu.map((x, index) => (
                    <MaterialCard style={{ marginTop: 16 }}>
                      <CardTitle>{`${index + 1}. ${getTenNgVatlieu(
                        x.nguyenlieu,
                        dsNguyenlieu
                      )}`}</CardTitle>
                      <InputSection>
                        <span>Khối lượng:</span>
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
                        <span>Đơn vị tính:</span>
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
                  {selectedNguyenlieu.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
                </BoxContent>
              </Box>
            </div>

            <div className="col-lg-4">
              <Box>
                <BoxTitle>
                  <h5>Loại sản phẩm</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    {dsloai && dsloai.length ? (
                      <DropdownMaterial2
                        label="Chọn loại sản phẩm"
                        value={loai}
                        onChange={(e) => setLoai(e.target.value)}
                      >
                        {dsloai.map((item) => (
                          <MenuItem value={item._id}>{item.ten}</MenuItem>
                        ))}
                      </DropdownMaterial2>
                    ) : (
                      <DropdownMaterial2 label="Chọn loại sản phẩm" />
                    )}
                    {!loai && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Ảnh sản phẩm</h5>
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
                    {imgToDisplay && (
                      <Image src={imgToDisplay} alt="chosenImage" />
                    )}
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Thuộc tính</h5>
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
                                placeholder="Tên thuộc tính"
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
                                placeholder="Giá trị"
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
                                <span>Thêm thuộc tính khác</span>
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
                  <h5>Giá sản phẩm</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Input
                      type="text"
                      placeholder="Nhập giá"
                      value={gia}
                      onChange={(e) => setGia(e.target.value)}
                    />
                    {!gia && <ErrMsg>{errMsg}</ErrMsg>}
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
  font-family: "Roboto", sans-serif;
  h5 {
    font-size: 16px;
    display: inline-block;
    padding: 20px;
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
  font-size: 13px;
  color: red;
  margin-top: 3px;
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

export default SanphamThem;
