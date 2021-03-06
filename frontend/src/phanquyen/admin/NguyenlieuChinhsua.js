import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import _ten from "../../assets/icons/ten.png";
import capnhat from "../../assets/icons/capnhat.png";
import _mota from "../../assets/icons/mota.png";
import anh from "../../assets/icons/anh.png";
import tt from "../../assets/icons/thuoctinh.png";
import cd from "../../assets/icons/congdung.png";
import Header from "../../components/Header";
import apiNguyenlieu from "../../axios/apiNguyenlieu";
import { toast } from "react-toastify";
import {
  Container,
  Content,
  CrossButton,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  Input,
  Label,
  PlusButton,
  TextArea,
} from "./styledComponents";

const NguyenlieuChinhsua = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [loading, setLoading] = useState(false);
  const [nguyenlieu, setNguyenlieu] = useState(null);
  const { id: nguyenlieuId } = props.match.params;

  const fetchSingleNguyenlieu = async () => {
    setLoading(true);
    const { nguyenlieu } = await apiNguyenlieu.singleNguyenlieu(nguyenlieuId);
    setNguyenlieu(nguyenlieu);
    setThuoctinh(
      nguyenlieu.thuoctinh.length ? nguyenlieu.thuoctinh : thuoctinh
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleNguyenlieu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("ten", nguyenlieu.ten);
    formData.append("mota", nguyenlieu.mota);
    formData.append("hinhanh", nguyenlieu.hinhanh);
    formData.append("congdung", nguyenlieu.congdung);
    formData.append("thuoctinh", JSON.stringify(getThuocTinh()));
    formData.append("nguyenlieuId", nguyenlieuId);

    const { success } = await apiNguyenlieu.suaNguyenlieu(
      nguyenlieuId,
      formData
    );
    if (success) {
      toast.success("C???p nh???t th??nh c??ng!", { theme: "colored" });
      props.history.push("/admin/nguyenlieu");
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

  // general handlechange
  const handleChange = (e) => {
    setNguyenlieu({
      ...nguyenlieu,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay l???i trang danh s??ch nguy??n li???u"
          titleBack
          onClick={() => props.history.push("/admin/nguyenlieu")}
          headerRight={
            <button className="btn btn-primary px-3" onClick={submitForm}>
              L??u
              <i class="fas fa-save"></i>
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle></FormTitle>
              <FormTitle>
                <span>C???p nh???t nguy??n li???u</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={_ten} alt="ten" />
                  <span>T??n nguy??n li???u:</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Nh???p t??n nguy??n li???u"
                  value={nguyenlieu?.ten}
                  name="ten"
                  onChange={handleChange}
                />
                {/* {!ten && <ErrMsg>{errMsg}</ErrMsg>} */}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={_mota} alt="mota" />
                  <span>M?? t???:</span>
                </Label>
                <TextArea
                  value={nguyenlieu?.mota}
                  name="mota"
                  onChange={handleChange}
                  rows="5"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={anh} alt="anh" />
                  <span>Ch???n ???nh:</span>
                </Label>
                <input
                  type="file"
                  onChange={(e) =>
                    setNguyenlieu({
                      ...nguyenlieu,
                      hinhanh: e.target.files[0],
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={cd} alt="cd" />
                  <span>C??ng d???ng:</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Nh???p c??ng d???ng"
                  value={nguyenlieu?.congdung}
                  name="congdung"
                  onChange={handleChange}
                />
                {/* {!ten && <ErrMsg>{errMsg}</ErrMsg>} */}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={tt} alt="tt" />
                  <span>Thu???c t??nh:</span>
                </Label>
                {thuoctinh.map((item, key) => {
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
                            <CrossButton onClick={() => handleRemoveClick(key)}>
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
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default NguyenlieuChinhsua;
