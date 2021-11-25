import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import img_placeholder from "../../assets/images/img_placeholder.png";
import DialogMaterial from "../../components/DialogMaterial";
import apiCongcu from "../../axios/apiCongcu";
import apiBophankd from "../../axios/apiBophankd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../components/Header";
import { toast } from "react-toastify";

const CongcuChitiet = (props) => {
  const [open, setOpen] = React.useState(false);
  const { id: congcuId } = props.match.params;
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [congcu, setCongcu] = useState({});

  const fetchCongcu = async () => {
    setLoading(true);
    const { congcu } = await apiCongcu.singleCongcu(congcuId);
    setCongcu(congcu);
    setLoading(false);
  };

  const fetchBophankdInfo = async () => {
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    setBophankdInfo(bophankd);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    const { success } = await apiBophankd.bophankdXoaCongcu({
      bophankdId: bophankdInfo._id,
      congcuId,
    });
    if (success) {
      toast.success("Xóa thành công!", { theme: "colored" });
      props.history.push("/bophankd/congcu");
    }
  };

  useEffect(() => {
    fetchCongcu();
    fetchBophankdInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại trang danh sách công cụ"
          titleBack
          onClick={() => props.history.push("/admin/congcu")}
          headerRight={
            <>
              <button className="btn btn-danger px-4" onClick={handleClickOpen}>
                Xóa
              </button>
              <button
                className="btn btn-primary px-4 ml-3"
                onClick={() =>
                  props.history.push(`/admin/congcu/chinhsua/${congcuId}`)
                }
              >
                Chỉnh sửa
              </button>
            </>
          }
        />
        <Content>
          <Form>
            <FormTitle>Chi tiết công cụ</FormTitle>
            <div className="row">
              <div className="col-lg-6">
                <FormGroup>
                  <Label>Tên công cụ:</Label>
                  <Input type="text" value={congcu.ten} />
                </FormGroup>

                <FormGroup>
                  <Label>Mô tả công cụ:</Label>
                  <TextArea value={congcu.mota} rows="5" />
                </FormGroup>

                <FormGroup>
                  <Label>Hình ảnh:</Label>
                  <Image
                    src={
                      congcu.hinhanh
                        ? `/uploads/${congcu.hinhanh}`
                        : img_placeholder
                    }
                    alt="anhcongcu"
                    className={!congcu.hinhanh && "noImage"}
                  />
                </FormGroup>
              </div>

              <div className="col-lg-6">
                <FormGroup>
                  <Label>Công dụng:</Label>
                  <Input type="text" value={congcu.congdung} />
                </FormGroup>

                <FormGroup>
                  <Label>Thuộc tính:</Label>
                  {congcu.thuoctinh && !congcu.thuoctinh.length && (
                    <div>Không có</div>
                  )}
                  {congcu.thuoctinh &&
                    congcu.thuoctinh.map((item) => (
                      <div className="row mt-3">
                        <div className="col-4">
                          <FormGroup style={{ marginBottom: 0 }}>
                            <Input type="text" value={item.ten} />
                          </FormGroup>
                        </div>
                        <div className="col-8">
                          <Input type="text" value={item.giatri} />
                        </div>
                      </div>
                    ))}
                </FormGroup>
              </div>
            </div>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa công cụ?"
        text2="Xóa"
        text1="Hủy"
        content=" Bạn chắc xóa công cụ này chứ ?"
        onClick2={handleDelete}
        onClick1={handleClose}
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
  padding: 36px;
  font-family: "Poppins", sans-serif;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
`;
const FormGroup = styled.div`
  margin-bottom: 26px;
`;
const FormTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #555;
  margin-bottom: 26px;
  font-family: "Roboto", sans-serif;
`;
const Image = styled.img`
  width: 200px;
  &.noImage {
    opacity: 0.15;
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

export default CongcuChitiet;
