import React, { useEffect, useState } from "react";
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
} from "./styledComponents";
import Header from "../../components/Header";
import { apiTinhThanh } from "../../apiTinhThanh";
import apiDaily2 from "../../axios/apiDaily2";
import BackdropMaterial from "../../components/BackdropMaterial";
import { toast } from "react-toastify";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import InputPassword from "../../components/InputPassword";
import capnhat from "../../assets/icons/capnhat.png";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import taikhoan from "../../assets/icons/taikhoan.png";

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
      setErrMsg("Th??ng tin kh??ng ???????c ????? tr???ng");
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
        toast.success("C???p nh???t th??nh c??ng!", { theme: "colored" });
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
          title="Quay l???i danh s??ch ?????i l?? 2"
          titleBack
          onClick={() => props.history.push("/daily1/daily2")}
          headerRight={
            <button className="btn btn-primary px-4" onClick={handleSubmit}>
              L??u
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>C???p nh???t ?????i l??</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={ten} alt="ten" />
                  <span>T??n ?????i l??:</span>
                </Label>
                <Input
                  placeholder="Nh???p t??n ?????i l??"
                  type="text"
                  name="ten"
                  value={daily2?.ten}
                  onChange={handleChangeDaily2}
                />
                {!daily2?.ten && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={sdt} alt="sdt" />
                  <span>S??? ??i???n tho???i:</span>
                </Label>
                <Input
                  placeholder="Nh???p s??? ??i???n tho???i"
                  type="text"
                  name="sdt"
                  value={daily2?.sdt}
                  onChange={handleChangeDaily2}
                />
                {!daily2?.sdt && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={email} alt="email" />
                  <span>E-mail:</span>
                </Label>
                <Input
                  placeholder="Nh???p email"
                  type="text"
                  name="email"
                  value={daily2?.email}
                  onChange={handleChangeDaily2}
                />
                {!daily2?.email && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={diachi} alt="diachi" />
                  <span>?????a ch???:</span>
                </Label>
                <div className="row">
                  <div className="col-lg-4">
                    {dsTinh && dsTinh.length ? (
                      <DropdownMaterial2
                        label="Ch???n T???nh/Th??nh Ph???"
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
                      <DropdownMaterial2 label="Ch???n T???nh/Th??nh Ph???" />
                    )}
                    {!tinh && <ErrMsg>{errMsg}</ErrMsg>}
                  </div>

                  <div className="col-lg-4">
                    {dsHuyen && dsHuyen.length ? (
                      <DropdownMaterial2
                        label="Ch???n Qu???n/Huy???n"
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
                      <DropdownMaterial2 label="Ch???n Qu???n/Huy???n" />
                    )}
                    {!huyen && <ErrMsg>{errMsg}</ErrMsg>}
                  </div>

                  <div className="col-lg-4">
                    {dsXa && dsXa.length ? (
                      <DropdownMaterial2
                        label="Ch???n Ph?????ng/X??"
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
                      <DropdownMaterial2 label="Ch???n Qu???n/Huy???n" />
                    )}
                    {!xa && <ErrMsg>{errMsg}</ErrMsg>}
                  </div>
                </div>
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={taikhoan} alt="taikhoan" />
                  <span>T??n t??i kho???n:</span>
                </Label>
                <Input type="text" value={daily2?.taikhoan} disabled />
              </FormGroup>

              {daily2?.active && (
                <div className="row">
                  <div className="col-lg-6">
                    <FormGroup>
                      <Label>M???t kh???u:</Label>
                      <InputPassword
                        label="M???t kh???u"
                        name="matkhau"
                        value={matkhau}
                        onChange={(e) => setMatkhau(e.target.value)}
                        style={{ width: 362 }}
                      />
                    </FormGroup>
                  </div>

                  <div className="col-lg-6">
                    <FormGroup>
                      <Label>X??c nh???n m???t kh???u:</Label>
                      <InputPassword
                        label="X??c nh???n"
                        name="xnmatkhau"
                        value={xnMatkhau}
                        onChange={(e) => {
                          setXnMatkhau(e.target.value);
                          setPwdNotMatch(false);
                        }}
                        style={{ width: 362 }}
                      />
                      {pwdNotMatch && (
                        <ErrMsg>X??c nh???n m???t kh???u kh??ng ch??nh x??c</ErrMsg>
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

export default Daily2Them;
