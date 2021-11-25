import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import InputPassword from "../../components/InputPassword";
import { apiTinhThanh } from "../../apiTinhThanh";
import { toast } from "react-toastify";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiGSV from "../../axios/apiGSV";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";

const GSVChinhsua = (props) => {
  const [gsv, setGsv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tinh, setTinh] = useState(null);
  const [huyen, setHuyen] = useState(null);
  const [xa, setXa] = useState(null);
  const [matkhau, setMatkhau] = useState("");
  const [xnMatkhau, setXnMatkhau] = useState("");
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const { id: gsvId } = props.match.params;

  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);
  const dsXa = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.find((item) => item.name === huyen)
    ?.wards.map((item) => item.name);

  const handleSubmit = async () => {
    if (matkhau !== xnMatkhau) {
      return setPwdNotMatch(true);
    }
    const dl = {
      ten: gsv.ten,
      sdt: gsv.sdt,
      cmnd: gsv.cmnd,
      email: gsv.email,
      xa,
      huyen,
      tinh,
      matkhau,
    };
    const { success } = await apiGSV.chinhsuaGsv(gsvId, dl);
    if (success) {
      toast.success("Cập nhật thành công!", { theme: "colored" });
      props.history.push("/admin/gsv");
    }
  };

  const fetchGSV = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.singleGsv(gsvId);
    setXa(gsv.xa);
    setHuyen(gsv.huyen);
    setTinh(gsv.tinh);
    setGsv(gsv);
    setLoading(false);
  };

  useEffect(() => {
    fetchGSV();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách giám sát vùng"
          titleBack
          onClick={() => props.history.push("/admin/gsv")}
          headerRight={
            <button className="btn btn-primary" onClick={handleSubmit}>
              Cập nhật
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Cập nhật giám sát vùng</FormTitle>
              <FormGroup>
                <Label>Tên giám sát vùng:</Label>
                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="ten"
                  value={gsv?.ten}
                  onChange={(e) =>
                    setGsv({
                      ...gsv,
                      ten: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>Số điện thoại:</Label>
                <Input
                  placeholder="Nhập số điện thoại"
                  type="text"
                  name="sdt"
                  value={gsv?.sdt}
                  onChange={(e) =>
                    setGsv({
                      ...gsv,
                      sdt: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>Số chứng minh nhân dân:</Label>
                <Input
                  placeholder="Nhập cmnd"
                  type="text"
                  name="cmnd"
                  value={gsv?.cmnd}
                  onChange={(e) =>
                    setGsv({
                      ...gsv,
                      cmnd: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>E-mail:</Label>
                <Input
                  placeholder="Nhập email"
                  type="text"
                  name="email"
                  value={gsv?.email}
                  onChange={(e) =>
                    setGsv({
                      ...gsv,
                      email: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>Địa chỉ</Label>
                <div className="row">
                  <div className="col-lg-4">
                    {dsTinh && dsTinh.length ? (
                      <DropdownMaterial2
                        label="Chọn Tỉnh/Thành Phố"
                        value={tinh}
                        onChange={(e) => {
                          setTinh(e.target.value);
                          setHuyen(null);
                          setXa(null);
                        }}
                      >
                        {dsTinh.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </DropdownMaterial2>
                    ) : (
                      <DropdownMaterial2 label="Chọn Tỉnh/Thành Phố" />
                    )}
                  </div>

                  <div className="col-lg-4">
                    {dsHuyen && dsHuyen.length ? (
                      <DropdownMaterial2
                        label="Chọn Quận/Huyện"
                        value={huyen}
                        onChange={(e) => {
                          setHuyen(e.target.value);
                          setXa(null);
                        }}
                      >
                        {dsHuyen.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </DropdownMaterial2>
                    ) : (
                      <DropdownMaterial2 label="Chọn Quận/Huyện" />
                    )}
                  </div>

                  <div className="col-lg-4">
                    {dsXa && dsXa.length ? (
                      <DropdownMaterial2
                        label="Chọn Phường/Xã"
                        value={xa}
                        onChange={(e) => {
                          setXa(e.target.value);
                        }}
                      >
                        {dsXa.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </DropdownMaterial2>
                    ) : (
                      <DropdownMaterial2 label="Chọn Phường/Xã" />
                    )}
                  </div>
                </div>
              </FormGroup>

              <FormGroup>
                <Label>Tên tài khoản:</Label>
                <Input type="text" value={gsv?.user?.taikhoan} />
              </FormGroup>

              <div className="row">
                <div className="col-lg-6">
                  <FormGroup>
                    <Label>Mật khẩu:</Label>
                    <InputPassword
                      label="Mật khẩu"
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
            </FormContent>
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
`;
const Form = styled.div`
  background: #fff;
  padding: 36px 20px 70px 20px;
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
  text-align: center;
  color: #555;
  margin-bottom: 20px;
  margin-top: 20px;
  font-family: "Roboto", sans-serif;
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

export default GSVChinhsua;
