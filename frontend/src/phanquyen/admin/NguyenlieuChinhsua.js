import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import styled from "styled-components";
import Header from "../../components/Header";
import apiNguyenlieu from "../../axios/apiNguyenlieu";
import { toast } from "react-toastify";

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
      toast.success("Cập nhật thành công!", { theme: "colored" });
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
          title="Quay lại trang danh sách nguyên liệu"
          titleBack
          onClick={() => props.history.push("/admin/nguyenlieu")}
          headerRight={
            <button className="btn btn-primary px-4" onClick={submitForm}>
              Cập nhật
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Cập nhật nguyên liệu</FormTitle>
              <FormGroup>
                <Label>Tên nguyên liệu:</Label>
                <Input
                  type="text"
                  placeholder="Nhập tên nguyên liệu"
                  value={nguyenlieu?.ten}
                  name="ten"
                  onChange={handleChange}
                />
                {/* {!ten && <ErrMsg>{errMsg}</ErrMsg>} */}
              </FormGroup>

              <FormGroup>
                <Label>Mô tả nguyên liệu:</Label>
                <TextArea
                  value={nguyenlieu?.mota}
                  name="mota"
                  onChange={handleChange}
                  rows="5"
                />
              </FormGroup>

              <FormGroup>
                <Label>Chọn ảnh:</Label>
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
                <Label>Công dụng:</Label>
                <Input
                  type="text"
                  placeholder="Nhập công dụng"
                  value={nguyenlieu?.congdung}
                  name="congdung"
                  onChange={handleChange}
                />
                {/* {!ten && <ErrMsg>{errMsg}</ErrMsg>} */}
              </FormGroup>

              <FormGroup>
                <Label>Thuộc tính:</Label>
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
                            <span>Thêm thuộc tính khác</span>
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
  color: #555;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
`;
const FormGroup = styled.div`
  margin-bottom: 26px;
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

export default NguyenlieuChinhsua;
