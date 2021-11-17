import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import TableCongcuDonhang from "./tables/TableCongcuDonhang";
import TableVattuDonhang from "./tables/TableVattuDonhang";
import TableNguyenlieuDonhang from "./tables/TableNguyenlieuDonhang";
import apiDonhang from "../../axios/apiDonhang";
import TableSanphamDonhangChitiet from "./tables/TableSanphamDonhangChitiet";

const DonhangChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [singleDonhang, setSingleDonhang] = useState(null);
  const { id: donhangId } = props.match.params;

  const fetchDonhang = async () => {
    setLoading(true);
    let { donhang } = await apiDonhang.singleDonhang(donhangId);
    donhang = {
      ...donhang,
      dssanpham: donhang.dssanpham.map((sp) => ({ ...sp, ...sp.sanpham })),
      dscongcu: donhang.dscongcu.map((cc) => ({ ...cc, ...cc.congcu })),
      dsvattu: donhang.dsvattu.map((vt) => ({ ...vt, ...vt.vattu })),
      dsnguyenlieu: donhang.dsnguyenlieu.map((ngl) => ({
        ...ngl,
        ...ngl.nguyenlieu,
      })),
    };
    setSingleDonhang(donhang);
    setLoading(false);
  };

  useEffect(() => {
    fetchDonhang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách đơn hàng"
          titleBack
          onClick={() => props.history.push("/admin/donhang")}
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Chi tiết đơn hàng</FormTitle>
              <FormGroup>
                <Label>Mã đơn hàng:</Label>
                <Input type="text" value={singleDonhang?.ma} />
              </FormGroup>
            </FormContent>

            <TableSection>
              <TableTitle>Danh sách sản phẩm</TableTitle>
              <TableSanphamDonhangChitiet
                dsSanpham={singleDonhang?.dssanpham}
              />
              <div className="text-right">
                <Total>Tổng đơn giá:</Total>
                <TotalValue>{singleDonhang?.tongdongia}</TotalValue>
              </div>
            </TableSection>

            <TableSection>
              <TableTitle>Danh sách công cụ</TableTitle>
              <TableCongcuDonhang dsCongcu={singleDonhang?.dscongcu} />
              <div className="text-right">
                <Total>Tổng số lượng:</Total>
                <TotalValue>{singleDonhang?.tongcongcu}</TotalValue>
              </div>
            </TableSection>

            <TableSection>
              <TableTitle>Danh sách vật tư</TableTitle>
              <TableVattuDonhang dsVattu={singleDonhang?.dsvattu} />
              <div className="text-right">
                <Total>Tổng số lượng:</Total>
                <TotalValue>{singleDonhang?.tongvattu}</TotalValue>
              </div>
            </TableSection>

            <TableSection>
              <TableTitle>Danh sách nguyên liệu</TableTitle>
              <TableNguyenlieuDonhang
                dsNguyenlieu={singleDonhang?.dsnguyenlieu}
              />
              <div className="text-right">
                <Total>Tổng khối lượng:</Total>
                <TotalValue>{singleDonhang?.tongnguyenlieu}</TotalValue>
              </div>
            </TableSection>
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
  font-family: "Poppins", sans-serif;
`;
const Form = styled.div`
  background: #fff;
  padding: 36px 72px 60px 72px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
`;
const FormContent = styled.div`
  width: 600px;
  margin: auto;
  font-family: "Poppins", sans-serif;
  margin-bottom: 72px;
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
const TableSection = styled.div`
  margin-bottom: 36px;
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
  th:first-child,
  td:first-child {
    display: none;
  }
`;
const TableTitle = styled.div`
  font-size: 16px;
  display: inline-block;
  padding-left: 16px;
  margin-bottom: 16px;
  border-left: 10px solid green;
  line-height: 16px;
`;
const Total = styled.span`
  font-size: 15px;
  margin-right: 10px;
  font-weight: 400;
`;
const TotalValue = styled.span`
  font-size: 15px;
`;

export default DonhangChitiet;
