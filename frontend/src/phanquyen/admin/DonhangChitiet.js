import React, { useEffect, useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import styled from "styled-components";
=======
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
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
  TableSection,
  TableTitle,
  Total,
  TotalValue,
} from "./styledComponents";
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import TableCongcuDonhang from "./tables/TableCongcuDonhang";
import TableVattuDonhang from "./tables/TableVattuDonhang";
import TableNguyenlieuDonhang from "./tables/TableNguyenlieuDonhang";
import apiDonhang from "../../axios/apiDonhang";
import TableSanphamDonhangChitiet from "./tables/TableSanphamDonhangChitiet";
import { formatMoney } from "../../utils";
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
import chitiet from "../../assets/icons/chitiet.png";
import _ma from "../../assets/icons/ma.png";
import sp from "../../assets/icons/sanpham.png";
import dssanpham from "../../assets/icons/dssanpham.png";
import dscongcu from "../../assets/icons/dscongcu.png";
import dsvattu from "../../assets/icons/dsvattu.png";
import dsnglieu from "../../assets/icons/dsnglieu.png";
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

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
          title="Quay l???i danh s??ch ????n h??ng"
          titleBack
          onClick={() => props.history.push("/admin/donhang")}
        />
        <Content>
          <Form>
            <FormContent>
<<<<<<< HEAD
<<<<<<< HEAD
              <FormTitle>Chi ti???t ????n h??ng</FormTitle>
              <FormGroup>
                <Label>M?? ????n h??ng:</Label>
=======
              <FormTitle>
                <span>Chi ti???t ????n h??ng</span>
              </FormTitle>

              <FormGroup>
=======
              <FormTitle>
                <span>Chi ti???t ????n h??ng</span>
              </FormTitle>

              <FormGroup>
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                <Label>
                  <img src={_ma} alt="ma" />
                  <span>M?? ????n h??ng:</span>
                </Label>
<<<<<<< HEAD
>>>>>>> khanhduy
                <Input type="text" value={singleDonhang?.ma} />
              </FormGroup>
            </FormContent>

<<<<<<< HEAD
            <TableSection>
              <TableTitle>S???n ph???m ????n h??ng</TableTitle>
              <TableSanphamDonhangChitiet
                dsSanpham={singleDonhang?.dssanpham}
              />
              <div className="text-right">
                <Total>T???ng ????n gi??:</Total>
                <TotalValue>
                  {formatMoney(singleDonhang?.tongdongia)}
                </TotalValue>
              </div>
            </TableSection>
=======
                <Input type="text" value={singleDonhang?.ma} disabled />
              </FormGroup>
            </FormContent>

            <div className="px-5">
              <TableSection className="noCheckbox">
                <TableTitle>
                  <img src={dssanpham} alt="dssanpham" />
                  <span>Danh s??ch s???n ph???m</span>
                </TableTitle>
                <TableSanphamDonhangChitiet
                  dsSanpham={singleDonhang?.dssanpham}
                />
                <div className="text-right">
                  <Total>T???ng ????n gi??:</Total>
                  <TotalValue>
                    {formatMoney(singleDonhang?.tongdongia)}
                  </TotalValue>
                </div>
              </TableSection>
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8

              <TableSection className="noCheckbox">
                <TableTitle>
                  <img src={dscongcu} alt="dscongcu" />
                  <span>Danh s??ch c??ng c???</span>
                </TableTitle>
                <TableCongcuDonhang dsCongcu={singleDonhang?.dscongcu} />
                <div className="text-right">
                  <Total>T???ng s??? l?????ng:</Total>
                  <TotalValue>{singleDonhang?.tongcongcu}</TotalValue>
                </div>
              </TableSection>

              <TableSection className="noCheckbox">
                <TableTitle>
                  <img src={dsvattu} alt="dsvattu" />
                  <span>Danh s??ch v???t t??</span>
                </TableTitle>
                <TableVattuDonhang dsVattu={singleDonhang?.dsvattu} />
                <div className="text-right">
                  <Total>T???ng s??? l?????ng:</Total>
                  <TotalValue>{singleDonhang?.tongvattu}</TotalValue>
                </div>
              </TableSection>

<<<<<<< HEAD
            <TableSection>
              <TableTitle>Nguy??n li???u ????n h??ng</TableTitle>
              <TableNguyenlieuDonhang
                dsNguyenlieu={singleDonhang?.dsnguyenlieu}
              />
              <div className="text-right">
                <Total>T???ng kh???i l?????ng:</Total>
                <TotalValue>{singleDonhang?.tongnguyenlieu}</TotalValue>
              </div>
            </TableSection>
=======
            <div className="px-5">
              <TableSection>
                <TableTitle>
                  <img src={dssanpham} alt="dssanpham" />
                  <span>Danh s??ch s???n ph???m</span>
                </TableTitle>
                <TableSanphamDonhangChitiet
                  dsSanpham={singleDonhang?.dssanpham}
                />
                <div className="text-right">
                  <Total>T???ng ????n gi??:</Total>
                  <TotalValue>
                    {formatMoney(singleDonhang?.tongdongia)}
                  </TotalValue>
                </div>
              </TableSection>

              <TableSection>
                <TableTitle>
                  <img src={dscongcu} alt="dscongcu" />
                  <span>Danh s??ch c??ng c???</span>
                </TableTitle>
                <TableCongcuDonhang dsCongcu={singleDonhang?.dscongcu} />
                <div className="text-right">
                  <Total>T???ng s??? l?????ng:</Total>
                  <TotalValue>{singleDonhang?.tongcongcu}</TotalValue>
                </div>
              </TableSection>

              <TableSection>
                <TableTitle>
                  <img src={dsvattu} alt="dsvattu" />
                  <span>Danh s??ch v???t t??</span>
                </TableTitle>
                <TableVattuDonhang dsVattu={singleDonhang?.dsvattu} />
                <div className="text-right">
                  <Total>T???ng s??? l?????ng:</Total>
                  <TotalValue>{singleDonhang?.tongvattu}</TotalValue>
                </div>
              </TableSection>

              <TableSection>
=======
              <TableSection className="noCheckbox">
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
                <TableTitle>
                  <img src={dsnglieu} alt="dsnglieu" />
                  <span>Danh s??ch nguy??n li???u</span>
                </TableTitle>
                <TableNguyenlieuDonhang
                  dsNguyenlieu={singleDonhang?.dsnguyenlieu}
                />
                <div className="text-right">
                  <Total>T???ng kh???i l?????ng:</Total>
                  <TotalValue>{singleDonhang?.tongnguyenlieu}</TotalValue>
                </div>
              </TableSection>
            </div>
<<<<<<< HEAD
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
          </Form>
        </Content>
      </Container>
    </>
  );
};

<<<<<<< HEAD
<<<<<<< HEAD
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

=======
>>>>>>> khanhduy
=======
>>>>>>> bbf5b29963d128c09b482ee7239901ce78c4a2b8
export default DonhangChitiet;
