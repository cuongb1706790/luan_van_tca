import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
import DialogMaterial from "../../components/DialogMaterial";
import { toast } from "react-toastify";

const BophankdChitiet = (props) => {
  const [bophankd, setBophankd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { id: bophankdId } = props.match.params;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleXoaBophankd = async () => {
    const { success } = await apiBophankd.xoa1Bophankd(bophankdId);
    if (success) {
      toast.success("Xóa thành công!", { theme: "colored" });
      props.history.push("/admin/bophankd");
    }
  };

  const fetchBophankd = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.singleBophankd(bophankdId);
    setBophankd(bophankd);
    setLoading(false);
  };

  useEffect(() => {
    fetchBophankd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách bộ phận kinh doanh"
          titleBack
          onClick={() => props.history.push("/admin/bophankd")}
          headerRight={
            <>
              <button className="btn btn-danger px-4" onClick={handleOpen}>
                Xóa
              </button>

              <button
                className="btn btn-primary px-4 ml-3"
                onClick={() =>
                  props.history.push(`/admin/bophankd/chinhsua/${bophankdId}`)
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
              <FormTitle>Chi tiết bộ phận kinh doanh</FormTitle>
              <FormGroup>
                <Label>Tên bộ phận kinh doanh:</Label>
                <Input type="text" name="ten" value={bophankd?.ten} />
              </FormGroup>

              <FormGroup>
                <Label>Tên tài khoản:</Label>
                <Input
                  type="text"
                  name="taikhoan"
                  value={bophankd?.user?.taikhoan}
                />
              </FormGroup>

              <FormGroup>
                <Label>Số điện thoại:</Label>
                <Input type="text" name="sdt" value={bophankd?.sdt} />
              </FormGroup>

              <FormGroup>
                <Label>E-mail:</Label>
                <Input type="text" name="email" value={bophankd?.email} />
              </FormGroup>

              <FormGroup>
                <Label>Địa chỉ:</Label>
                <TextArea
                  value={`${bophankd?.xa}, ${bophankd?.huyen}, ${bophankd?.tinh}`}
                  rows="3"
                />
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa bộ phận kinh doanh"
        content="Bạn chắc xóa bộ phận kinh doanh này chứ?"
        text1="Hủy"
        text2="Xóa"
        onClick1={handleClose}
        onClick2={handleXoaBophankd}
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
  padding: 36px 20px 80px 20px;
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

export default BophankdChitiet;
