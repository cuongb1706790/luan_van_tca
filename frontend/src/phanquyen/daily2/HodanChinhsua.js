import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { apiTinhThanh } from "../../apiTinhThanh";
import apiHodan from "../../axios/apiHodan";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";
import { toast } from "react-toastify";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import InputPassword from "../../components/InputPassword";

const HodanChinhsua = (props) => {
  const [hodan, setHodan] = useState(null);
  const [dsLangnghe, setDsLangnghe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLangnghe, setSelectedLangnghe] = useState(null);
  const [tinh, setTinh] = useState(null);
  const [huyen, sethuyen] = useState(null);
  const [xa, setXa] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [dsLoaiSP, setdsLoaiSP] = useState([]);
  const [selectedLoaiSP, setselectedLoaiSP] = useState(null);
  const [matkhau, setMatkhau] = useState("");
  const [xnMatkhau, setXnMatkhau] = useState("");
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const { id: hodanId } = props.match.params;

  const dsXa = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.find((item) => item.name === huyen)
    ?.wards.map((item) => item.name);

  const handleChangeHodan = (e) => {
    setHodan({
      ...hodan,
      [e.target.name]: e.target.value,
    });
  };

  const emptyFields = () => {
    // thong tin ko dc de trong
    if (
      !hodan.daidien ||
      !hodan.sdt ||
      !hodan.cmnd ||
      !hodan.namsinh ||
      !selectedLangnghe ||
      !xa ||
      !selectedLoaiSP ||
      !hodan.taikhoan
    ) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (matkhau !== xnMatkhau) {
      return setPwdNotMatch(true);
    }
    if (!emptyFields()) {
      const dl = {
        daidien: hodan.daidien,
        xa,
        tinh,
        huyen,
        sdt: hodan.sdt,
        cmnd: hodan.cmnd,
        namsinh: hodan.namsinh,
        langnghe: selectedLangnghe,
        loaisanpham: selectedLoaiSP,
        matkhau,
      };
      const { success } = await apiHodan.suaHodan(hodanId, dl);
      if (success) {
        toast.success("Cập nhật thành công!", { theme: "colored" });
        props.history.push("/daily2/hodan");
      }
    }
  };

  const fetchDsLangnghe = async () => {
    setLoading(true);
    const { hodan } = await apiHodan.singleHodan(hodanId);
    const { langnghe } = await apiLangnghe.dsLangnghe();
    const { loaisanpham } = langnghe.find(
      (item) => item._id === hodan.langnghe._id
    );
    setHodan(hodan);
    setDsLangnghe(langnghe);
    setSelectedLangnghe(hodan.langnghe._id);
    setselectedLoaiSP(hodan.loaisanpham._id);
    setTinh(hodan.tinh);
    sethuyen(hodan.huyen);
    setXa(hodan.xa);
    setdsLoaiSP(loaisanpham);
    setLoading(false);
  };

  useEffect(() => {
    fetchDsLangnghe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Container>
      <Header
        title="Quay lại danh sách hộ dân"
        titleBack
        onClick={() => props.history.push("/daily2/hodan")}
        headerRight={
          <button className="btn btn-primary px-4" onClick={handleSubmit}>
            Lưu
          </button>
        }
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>Cập nhật hộ dân</FormTitle>

            <FormGroup>
              <Label>Tên hộ dân:</Label>
              <Input
                placeholder="Nhập tên"
                type="text"
                name="daidien"
                value={hodan?.daidien}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan?.daidien && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Số điện thoại:</Label>
              <Input
                placeholder="Nhập sđt"
                type="text"
                name="sdt"
                value={hodan?.sdt}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan?.sdt && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Chứng minh nhân dân:</Label>
              <Input
                placeholder="Nhập cmnd"
                type="text"
                name="cmnd"
                value={hodan?.cmnd}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan?.cmnd && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Năm sinh:</Label>
              <Input
                placeholder="Nhập năm sinh"
                type="text"
                name="namsinh"
                value={hodan?.namsinh}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan?.namsinh && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <div className="row">
              <div className="col-lg-6">
                <FormGroup>
                  <Label>Làng nghề</Label>
                  {dsLangnghe && dsLangnghe.length ? (
                    <DropdownMaterial2
                      label="Chọn Làng nghề"
                      value={selectedLangnghe}
                      onChange={(e) => {
                        setSelectedLangnghe(e.target.value);
                        const { tinh, huyen, sanphamchinh } = dsLangnghe.find(
                          (item) => item._id === e.target.value
                        );
                        setTinh(tinh);
                        sethuyen(huyen);
                        setdsLoaiSP(sanphamchinh);
                        setXa(null);
                        setselectedLoaiSP(null);
                      }}
                    >
                      {dsLangnghe &&
                        dsLangnghe.length &&
                        dsLangnghe.map((item) => (
                          <MenuItem value={item._id}>{item.ten}</MenuItem>
                        ))}
                    </DropdownMaterial2>
                  ) : (
                    <DropdownMaterial2 label="Chọn làng nghề" />
                  )}
                  {!selectedLangnghe && <ErrMsg>{errMsg}</ErrMsg>}
                </FormGroup>
              </div>

              <div className="col-lg-6">
                <FormGroup>
                  <Label>Nơi cư trú</Label>
                  {dsXa && dsXa.length ? (
                    <DropdownMaterial2
                      label="Chọn xã"
                      value={xa}
                      onChange={(e) => setXa(e.target.value)}
                    >
                      {dsXa.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </DropdownMaterial2>
                  ) : (
                    <DropdownMaterial2 label="Chọn xã" />
                  )}
                  {!xa && <ErrMsg>{errMsg}</ErrMsg>}
                </FormGroup>
              </div>
            </div>

            <FormGroup>
              <Label>Loại sản phẩm:</Label>
              {dsLoaiSP && dsLoaiSP.length ? (
                <DropdownMaterial2
                  label="Chọn loại sản phẩm"
                  value={selectedLoaiSP}
                  onChange={(e) => setselectedLoaiSP(e.target.value)}
                >
                  {dsLoaiSP.map((item) => (
                    <MenuItem value={item._id}>{item.ten}</MenuItem>
                  ))}
                </DropdownMaterial2>
              ) : (
                <DropdownMaterial2 label="Chọn loại sản phẩm" />
              )}
              {!selectedLoaiSP && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Tên tài khoản:</Label>
              <Input type="text" value={hodan?.taikhoan} />
            </FormGroup>

            {hodan?.active && (
              <div className="row">
                <div className="col-lg-6">
                  <FormGroup>
                    <Label>Mật khẩu:</Label>
                    <InputPassword
                      label="Mật khẩu"
                      name="matkhau"
                      value={matkhau}
                      onChange={(e) => setMatkhau(e.target.value)}
                      style={{ width: 362 }}
                    />
                  </FormGroup>
                </div>

                <div className="col-lg-6">
                  <FormGroup>
                    <Label>Xác nhận mật khẩu:</Label>
                    <InputPassword
                      label="Xác nhận"
                      name="xnmatkhau"
                      value={xnMatkhau}
                      onChange={(e) => {
                        setXnMatkhau(e.target.value);
                        setPwdNotMatch(false);
                      }}
                      style={{ width: 362 }}
                    />
                    {pwdNotMatch && (
                      <ErrMsg>Xác nhận mật khẩu không chính xác</ErrMsg>
                    )}
                  </FormGroup>
                </div>
              </div>
            )}
          </FormContent>
        </Form>
      </Content>
    </Container>
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
`;
const Form = styled.div`
  background: #fff;
  padding: 36px 26px 100px 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
`;
const FormContent = styled.div`
  width: 750px;
  margin: auto;
  font-family: "Poppins", sans-serif;
`;
const FormTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #555;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
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
const ErrMsg = styled.span`
  display: block;
  font-size: 15px;
  color: red !important;
  margin-top: 3px;
  width: 100%;
`;

export default HodanChinhsua;
