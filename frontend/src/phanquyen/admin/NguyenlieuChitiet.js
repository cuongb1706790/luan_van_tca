import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import img_placeholder from "../../assets/images/img_placeholder.png";
import DialogMaterial from "../../components/DialogMaterial";
import styled from "styled-components";
import Header from "../../components/Header";
import apiNguyenlieu from "../../axios/apiNguyenlieu";
import { toast } from "react-toastify";

const NguyenlieuChitiet = (props) => {
  const [open, setOpen] = React.useState(false);
  const { id: nguyenlieuId } = props.match.params;
  const [loading, setLoading] = useState(false);
  const [nguyenlieu, setNguyenlieu] = useState(null);

  const fetchSingleNguyenlieu = async () => {
    setLoading(true);
    const { nguyenlieu } = await apiNguyenlieu.singleNguyenlieu(nguyenlieuId);
    setNguyenlieu(nguyenlieu);
    setLoading(false);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    const { success } = await apiNguyenlieu.xoa1Nglieu(nguyenlieuId);
    if (success) {
      toast.success("Xóa nguyên liệu thành công!", { theme: "colored" });
      props.history.push("/admin/nguyenlieu");
    }
  };

  useEffect(() => {
    fetchSingleNguyenlieu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <>
              <button className="btn btn-danger px-4" onClick={handleClickOpen}>
                Xóa
              </button>
              <button
                className="btn btn-primary px-4 ml-3"
                onClick={() =>
                  props.history.push(
                    `/admin/nguyenlieu/chinhsua/${nguyenlieuId}`
                  )
                }
              >
                Chỉnh sửa
              </button>
            </>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Chi tiết nguyên liệu</FormTitle>
              <FormGroup>
                <Label>Tên nguyên liệu:</Label>
                <Input type="text" value={nguyenlieu?.ten} />
              </FormGroup>

              <FormGroup>
                <Label>Mô tả nguyên liệu:</Label>
                <TextArea value={nguyenlieu?.mota} rows="5" />
              </FormGroup>

              <FormGroup>
                <Label>Hình ảnh:</Label>
                <Image
                  src={
                    nguyenlieu?.hinhanh
                      ? `/uploads/${nguyenlieu?.hinhanh}`
                      : img_placeholder
                  }
                  alt="anhcongcu"
                  className={!nguyenlieu?.hinhanh && "noImage"}
                />
              </FormGroup>

              <FormGroup>
                <Label>Công dụng:</Label>
                <Input type="text" value={nguyenlieu?.congdung} />
              </FormGroup>

              <FormGroup>
                <Label>Thuộc tính:</Label>
                {nguyenlieu && nguyenlieu.thuoctinh.length
                  ? nguyenlieu.thuoctinh.map((item, key) => {
                      return (
                        <div className="row">
                          <div className="col-lg-6">
                            <FormGroup
                              style={{ width: "100%", marginBottom: 10 }}
                            >
                              <Input type="text" value={item.ten} />
                            </FormGroup>
                          </div>
                          <div className="col-lg-6">
                            <div className="d-flex align-items-center">
                              <FormGroup
                                style={{ width: "100%", marginBottom: 10 }}
                              >
                                <Input type="text" value={item.giatri} />
                              </FormGroup>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : "Không có"}
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa nguyên liệu"
        content="Bạn chắc xóa nguyên liệu này chứ?"
        text1="Hủy"
        text2="Xóa"
        onClick1={handleClose}
        onClick2={handleDelete}
      />
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
const Image = styled.img`
  width: 100px;
  &.noImage {
    opacity: 0.15;
  }
`;

export default NguyenlieuChitiet;
