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
import apiHodan from "../../axios/apiHodan";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";
import { toast } from "react-toastify";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import InputPassword from "../../components/InputPassword";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import diachi from "../../assets/icons/diachi.png";
import taikhoan from "../../assets/icons/taikhoan.png";
import cmnd from "../../assets/icons/cmnd.png";
import loai from "../../assets/icons/loai.png";
import namsinh from "../../assets/icons/namsinh.png";
import langnghe from "../../assets/icons/langnghe_2.png";
import _matkhau from "../../assets/icons/matkhau.png";

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
        toast.success("C???p nh???t th??nh c??ng!", { theme: "colored" });
        props.history.push("/daily2/hodan");
      }
    }
  };

  const fetchDsLangnghe = async () => {
    setLoading(true);
    const { hodan } = await apiHodan.singleHodan(hodanId);
    const { langnghe } = await apiLangnghe.dsLangnghe();
    const { loaisanpham } = langnghe.find(
      (item) => item._id === hodan.langnghe
    );
    setHodan(hodan);
    setDsLangnghe(langnghe);
    setSelectedLangnghe(hodan.langnghe);
    setselectedLoaiSP(hodan.loaisanpham);
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
        title="Quay l???i danh s??ch h??? d??n"
        titleBack
        onClick={() => props.history.push("/daily2/hodan")}
        headerRight={
          <button className="btn btn-primary px-4" onClick={handleSubmit}>
            L??u
            <i class="fas fa-save"></i>
          </button>
        }
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>C???p nh???t h??? d??n</FormTitle>

            <FormGroup>
              <Label>
                <img src={ten} alt="ten" />
                <span>T??n h??? d??n:</span>
              </Label>
              <Input
                placeholder="Nh???p t??n"
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
              <Label>
                <img src={sdt} alt="sdt" />
                <span>S??? ??i???n tho???i:</span>
              </Label>
              <Input
                placeholder="Nh???p s??t"
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
              <Label>
                <img src={cmnd} alt="cmnd" />
                <span>Ch???ng minh nh??n d??n:</span>
              </Label>
              <Input
                placeholder="Nh???p cmnd"
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
              <Label>
                <img src={namsinh} alt="namsinh" />
                <span>N??m sinh:</span>
              </Label>
              <Input
                placeholder="Nh???p n??m sinh"
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
                  <Label>
                    <img src={langnghe} alt="langnghe" />
                    <span>L??ng ngh???:</span>
                  </Label>
                  {dsLangnghe && dsLangnghe.length ? (
                    <DropdownMaterial2
                      label="Ch???n L??ng ngh???"
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
                    <DropdownMaterial2 label="Ch???n l??ng ngh???" />
                  )}
                  {!selectedLangnghe && <ErrMsg>{errMsg}</ErrMsg>}
                </FormGroup>
              </div>

              <div className="col-lg-6">
                <FormGroup>
                  <Label>
                    <img src={diachi} alt="diachi" />
                    <span>N??i c?? tr??:</span>
                  </Label>
                  {dsXa && dsXa.length ? (
                    <DropdownMaterial2
                      label="Ch???n x??"
                      value={xa}
                      onChange={(e) => setXa(e.target.value)}
                    >
                      {dsXa.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </DropdownMaterial2>
                  ) : (
                    <DropdownMaterial2 label="Ch???n x??" />
                  )}
                  {!xa && <ErrMsg>{errMsg}</ErrMsg>}
                </FormGroup>
              </div>
            </div>

            <FormGroup>
              <Label>
                <img src={loai} alt="loai" />
                <span>Lo???i s???n ph???m:</span>
              </Label>
              {dsLoaiSP && dsLoaiSP.length ? (
                <DropdownMaterial2
                  label="Ch???n lo???i s???n ph???m"
                  value={selectedLoaiSP}
                  onChange={(e) => setselectedLoaiSP(e.target.value)}
                >
                  {dsLoaiSP.map((item) => (
                    <MenuItem value={item._id}>{item.ten}</MenuItem>
                  ))}
                </DropdownMaterial2>
              ) : (
                <DropdownMaterial2 label="Ch???n lo???i s???n ph???m" />
              )}
              {!selectedLoaiSP && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={taikhoan} alt="taikhoan" />
                <span>T??n t??i kho???n:</span>
              </Label>
              <Input type="text" value={hodan?.taikhoan} />
            </FormGroup>

            {hodan?.active && (
              <div className="row">
                <div className="col-lg-6">
                  <FormGroup>
                    <Label>
                      <img src={_matkhau} alt="matkhau" />
                      <span>M???t kh???u:</span>
                    </Label>
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
                    <Label>
                      <img src={_matkhau} alt="matkhau" />
                      <span>X??c nh???n m???t kh???u:</span>
                    </Label>
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
  );
};

export default HodanChinhsua;
