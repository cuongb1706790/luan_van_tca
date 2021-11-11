import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import DropdownCustom from "../../components/DropdownCustom";
import { apiTinhThanh } from "../../apiTinhThanh";
import { useSelector } from "react-redux";
import apiGSV from "../../axios/apiGSV";
import apiLangnghe from "../../axios/apiLangnghe";
import MultipleSelectCheckmarks from "../../components/MultipleSelect";
import BackdropMaterial from "../../components/BackdropMaterial";
import { toast } from "react-toastify";
import apiLoaiSanpham from "../../axios/apiLoaiSanpham";
import MenuItem from "@mui/material/MenuItem";
import DropdownMaterial2 from "../../components/DropdownMaterial2";

const LangngheChinhsua = (props) => {
  const { id: langngheId } = props.match.params;
  const [loading, setLoading] = useState(false);
  const [spChinh, setSPChinh] = React.useState([]);
  const [gsvInfo, setGsvInfo] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [ten, setTen] = useState("");
  const [dsLoaiSp, setDsLoaiSp] = useState([]);
  const [tinh, setTinh] = useState("Chọn Tỉnh/Thành Phố");
  const [huyen, sethuyen] = useState("Chọn Quận/Huyện");
  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);

  const [errMsg, setErrMsg] = useState("");

  const handleChangeSPChinh = (e) => {
    const {
      target: { value },
    } = e;
    setSPChinh(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const emptyFields = () => {
    if (
      !ten ||
      tinh === "Chọn Tỉnh/Thành Phố" ||
      huyen === "Chọn Quận/Huyện" ||
      spChinh.length === 0
    ) {
      setErrMsg("Trường không đươc để trống");
      return true;
    } else {
      setErrMsg("");
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      const dl = {
        gsvId: gsvInfo._id,
        ten,
        tinh,
        huyen,
        sanphamchinh: spChinh.map(
          (ten) => dsLoaiSp.find((_item) => _item.ten === ten)._id
        ),
      };
      const { success } = await apiLangnghe.chinhsuaLangnghe(langngheId, dl);
      if (success) {
        toast.success("Cập nhật thành công!", { theme: "colored" });
        props.history.push("/giamsatvung/langnghe");
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    // fetch single langnghe
    const { langnghe } = await apiLangnghe.singleLangnghe(langngheId);
    // fetch gsv info
    const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
    // fetch sanpham langnghe (loai sp)
    const { loaiSanpham } = await apiLoaiSanpham.dsLoaiSanpham();
    // set data
    setGsvInfo(gsv);
    setDsLoaiSp(loaiSanpham);
    setTen(langnghe.ten);
    setTinh(langnghe.tinh);
    sethuyen(langnghe.huyen);
    setSPChinh(langnghe.sanphamchinh.map((item) => item.ten));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Container>
      <Header
        title="Quay lại danh sách làng nghề"
        titleBack
        onClick={() => props.history.push("/giamsatvung/langnghe")}
        headerRight={
          <button className="btn btn-primary px-4" onClick={handleSubmit}>
            Cập nhật
          </button>
        }
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>Cập nhật làng nghề</FormTitle>

            <FormGroup>
              <Label>Tên làng:</Label>
              <Input
                placeholder="Nhập tên"
                type="text"
                value={ten}
                onChange={(e) => {
                  setTen(e.target.value);
                }}
              />
              {!ten && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Tỉnh:</Label>
              {dsTinh && dsTinh.length ? (
                <DropdownMaterial2
                  label="Chọn Tỉnh/Thành Phố"
                  value={tinh}
                  onChange={(e) => {
                    setTinh(e.target.value);
                    sethuyen(null);
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
            </FormGroup>

            <FormGroup>
              <Label>Huyện:</Label>
              {dsHuyen && dsHuyen.length ? (
                <DropdownMaterial2
                  label="Chọn Quận/Huyện"
                  value={huyen}
                  onChange={(e) => {
                    sethuyen(e.target.value);
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
            </FormGroup>

            <FormGroup>
              <Label>Sản phẩm chính:</Label>
              <MultipleSelectCheckmarks
                label="Chọn sản phẩm"
                value={spChinh}
                onChange={handleChangeSPChinh}
                renderData={
                  dsLoaiSp && dsLoaiSp.length
                    ? dsLoaiSp.map((item) => item.ten)
                    : []
                }
              />
              {spChinh.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>
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
  padding: 36px 20px 100px 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
`;
const FormContent = styled.div`
  width: 570px;
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
const ErrMsg = styled.div`
  font-size: 13px;
  color: red;
  margin-top: 4px;
`;

export default LangngheChinhsua;
