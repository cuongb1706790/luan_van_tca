import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { apiTinhThanh } from "../../apiTinhThanh";
import apiDaily2 from "../../axios/apiDaily2";
import BackdropMaterial from "../../components/BackdropMaterial";
import { toast } from "react-toastify";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import InputPassword from "../../components/InputPassword";

const Daily2Them = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [daily2, setDaily2] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [matkhau, setMatkhau] = useState("");
  const [xnMatkhau, setXnMatkhau] = useState("");
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const [tinh, setTinh] = useState(null);
  const [huyen, sethuyen] = useState(null);
  const [xa, setXa] = useState(null);
  const { id: daily2Id } = props.match.params;

  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);
  const dsXa = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.find((item) => item.name === huyen)
    ?.wards.map((item) => item.name);

  const handleChangeDaily2 = (e) => {
    setDaily2({
      ...daily2,
      [e.target.name]: e.target.value,
    });
  };

  const emptyFields = () => {
    // thong tin ko dc de trong
    if (
      !daily2.ten ||
      !tinh ||
      !huyen ||
      !xa ||
      !daily2.taikhoan ||
      !daily2.sdt ||
      !daily2.email
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
        ten: daily2.ten,
        sdt: daily2.sdt,
        email: daily2.email,
        xa,
        huyen,
        tinh,
        matkhau,
      };
      const { success } = await apiDaily2.suaDaily2(daily2Id, dl);
      if (success) {
        toast.success("Cập nhật thành công!", { theme: "colored" });
        props.history.push("/daily1/daily2");
      }
    }
  };

  const fetchSingleDaily2 = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2(daily2Id);
    setDaily2(daily2);
    setXa(daily2.xa);
    sethuyen(daily2.huyen);
    setTinh(daily2.tinh);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleDaily2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách đại lý 2"
          titleBack
          onClick={() => props.history.push("/daily1/daily2")}
          headerRight={
            <button className="btn btn-primary px-4" onClick={handleSubmit}>
              Lưu
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Cập nhật đại lý</FormTitle>

              <FormGroup>
                <Label>Tên đại lý:</Label>
                <Input
                  placeholder="Nhập tên đại lý"
                  type="text"
                  name="ten"
                  value={daily2?.ten}
                  onChange={handleChangeDaily2}
                />
                {!daily2?.ten && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Số điện thoại:</Label>
                <Input
                  placeholder="Nhập số điện thoại"
                  type="text"
                  name="sdt"
                  value={daily2?.sdt}
                  onChange={handleChangeDaily2}
                />
                {!daily2?.sdt && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>E-mail:</Label>
                <Input
                  placeholder="Nhập email"
                  type="text"
                  name="email"
                  value={daily2?.email}
                  onChange={handleChangeDaily2}
                />
                {!daily2?.email && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Địa chỉ:</Label>
                <div className="row">
                  <div className="col-lg-4">
                    {dsTinh && dsTinh.length ? (
                      <DropdownMaterial2
                        label="Chọn Tỉnh/Thành Phố"
                        value={tinh}
                        onChange={(e) => {
                          setTinh(e.target.value);
                          sethuyen(null);
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
                    {!tinh && <ErrMsg>{errMsg}</ErrMsg>}
                  </div>

                  <div className="col-lg-4">
                    {dsHuyen && dsHuyen.length ? (
                      <DropdownMaterial2
                        label="Chọn Quận/Huyện"
                        value={huyen}
                        onChange={(e) => {
                          sethuyen(e.target.value);
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
                    {!huyen && <ErrMsg>{errMsg}</ErrMsg>}
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
                      <DropdownMaterial2 label="Chọn Quận/Huyện" />
                    )}
                    {!xa && <ErrMsg>{errMsg}</ErrMsg>}
                  </div>
                </div>
              </FormGroup>

              <FormGroup>
                <Label>Tên tài khoản:</Label>
                <Input type="text" value={daily2?.taikhoan} disabled />
              </FormGroup>

              {daily2?.active && (
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
  padding: 36px 20px 100px 20px;
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

export default Daily2Them;
