import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import img_placeholder from "../../assets/images/img_placeholder.png";
import apiVattu from "../../axios/apiVattu";
import styled from "styled-components";
import Header from "../../components/Header";

const VattuChitiet = (props) => {
  const { id: vattuId } = props.match.params;
  const [loading, setLoading] = useState(false);
  const [vattu, setVattu] = useState({});

  const fetchVattuObj = async () => {
    setLoading(true);
    const { vattu } = await apiVattu.singleVattu(vattuId);
    setVattu(vattu);
    setLoading(false);
  };

  useEffect(() => {
    fetchVattuObj();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại trang danh sách vật tư"
          titleBack
          onClick={() => props.history.push("/bophankd/vattu")}
        />
        <Content>
          <Form>
            <FormTitle>Chi tiết vật tư</FormTitle>
            <div className="row">
              <div className="col-lg-6">
                <FormGroup>
                  <Label>Tên công cụ:</Label>
                  <Input type="text" value={vattu.ten} />
                </FormGroup>

                <FormGroup>
                  <Label>Mô tả:</Label>
                  <TextArea value={vattu.mota} rows="5" />
                </FormGroup>

                <FormGroup>
                  <Label>Hình ảnh:</Label>
                  <Image
                    src={
                      vattu.hinhanh
                        ? `/uploads/${vattu.hinhanh}`
                        : img_placeholder
                    }
                    alt="anhcongcu"
                    className={!vattu.hinhanh && "noImage"}
                  />
                </FormGroup>
              </div>

              <div className="col-lg-6">
                <FormGroup>
                  <Label>Công dụng:</Label>
                  <Input type="text" value={vattu.congdung} />
                </FormGroup>

                <FormGroup>
                  <Label>Số lượng:</Label>
                  <Input type="text" value={vattu.soluong} />
                </FormGroup>

                <FormGroup>
                  <Label>Thuộc tính:</Label>
                  {vattu.thuoctinh && !vattu.thuoctinh.length && (
                    <span>Không</span>
                  )}
                  {vattu.thuoctinh &&
                    vattu.thuoctinh.map((item) => (
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
  padding: 20px 36px;
  font-family: "Poppins", sans-serif;
`;
const Form = styled.div`
  background: #fff;
  padding: 36px;
`;
const FormGroup = styled.div`
  margin-bottom: 26px;
`;
const FormTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  color: #555;
  margin-bottom: 26px;
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

export default VattuChitiet;
