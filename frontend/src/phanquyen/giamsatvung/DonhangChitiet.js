import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDonhang from "../../axios/apiDonhang";
import TableSanphamDonhangChitiet from "./tables/TableSanphamDonhangChitiet";
import TableCongcuDonhang from "./tables/TableCongcuDonhang";
import TableVattuDonhang from "./tables/TableVattuDonhang";
import TableNguyenlieuDonhang from "./tables/TableNguyenlieuDonhang";
import { formatMoney } from "../../utils";
import DialogMaterial from "../../components/DialogMaterial";

const DonhangChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [singleDonhang, setSingleDonhang] = useState(null);
  const { id: donhangId } = props.match.params;
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleXacnhan = async () => {
    const { success } = await apiDonhang.xacnhan(donhangId);
    if (success) {
      handleClose();
      setSuccess(true);
      props.setRefresh(true);
      toast.success("Xác nhận thành công!", {
        theme: "colored",
      });
    }
  };

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
    setSuccess(false);
    fetchDonhang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách đơn hàng"
          titleBack
          onClick={() => props.history.push("/giamsatvung/donhang")}
        />
        <Content>
          <Form>
            <Title>
              <TitleWrapper>
                <TitleContent>
                  <span>Mã đơn hàng:</span>
                  <span style={{ fontWeight: 500 }}>{singleDonhang?.ma}</span>
                </TitleContent>

                {singleDonhang?.ngaydathang ? (
                  <TitleContent
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      props.history.push(
                        `/giamsatvung/donhang/chitiet/${donhangId}/tiendo`
                      )
                    }
                  >
                    <span>Theo dõi tiến độ</span>
                    <i class="fas fa-long-arrow-alt-right"></i>
                  </TitleContent>
                ) : (
                  <TitleContent
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (singleDonhang?.xacnhan) {
                        props.history.push(
                          `/giamsatvung/donhang/chitiet/${donhangId}/them`
                        );
                      } else {
                        toast.warning("Vui lòng xác nhận đơn hàng!", {
                          theme: "colored",
                        });
                      }
                    }}
                  >
                    <span>Tiến hành phân phát</span>
                    <i class="fas fa-long-arrow-alt-right"></i>
                  </TitleContent>
                )}
              </TitleWrapper>
            </Title>

            <div className="text-left">
              <BoxInfo>
                <BoxInfoTitle>Bộ phận kinh doanh</BoxInfoTitle>
                <div className="d-flex">
                  <div className="pr-3">
                    <Text>Tên:</Text>
                    <Text>SĐT:</Text>
                    <Text>Email:</Text>
                    <Text>Địa chỉ:</Text>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text>{singleDonhang?.from.bophankd.ten}</Text>
                    <Text>{singleDonhang?.from.bophankd.sdt}</Text>
                    <Text>{singleDonhang?.from.bophankd.email}</Text>
                    <Text>{singleDonhang?.from.bophankd.cmnd}</Text>
                    <Text>{`${singleDonhang?.from.bophankd.xa}, ${singleDonhang?.from.bophankd.huyen}, ${singleDonhang?.from.bophankd.tinh}`}</Text>
                  </div>
                </div>
              </BoxInfo>
            </div>

            <TableSection>
              <TableTitle>Sản phẩm đơn hàng</TableTitle>
              <TableSanphamDonhangChitiet
                dsSanpham={singleDonhang?.dssanpham}
              />
              <div className="text-right mb-3">
                <Total>Tổng đơn giá: </Total>
                <TotalValue>
                  {formatMoney(singleDonhang?.tongdongia)}
                </TotalValue>
              </div>
            </TableSection>

            <TableSection>
              <TableTitle>Công cụ đơn hàng</TableTitle>
              <TableCongcuDonhang dsCongcu={singleDonhang?.dscongcu} />
              <div className="text-right mb-3">
                <Total>Tổng số lượng: </Total>
                <TotalValue>{singleDonhang?.tongcongcu}</TotalValue>
              </div>
            </TableSection>

            <TableSection>
              <TableTitle>Vật tư đơn hàng</TableTitle>
              <TableVattuDonhang dsVattu={singleDonhang?.dsvattu} />
              <div className="text-right mb-3">
                <Total>Tổng số lượng: </Total>
                <TotalValue>{singleDonhang?.tongvattu}</TotalValue>
              </div>
            </TableSection>

            <TableSection>
              <TableTitle>Nguyên liệu đơn hàng</TableTitle>
              <TableNguyenlieuDonhang
                dsNguyenlieu={singleDonhang?.dsnguyenlieu}
              />
              <div className="text-right mb-3">
                <Total>Tổng khối lượng: </Total>
                <TotalValue>{singleDonhang?.tongnguyenlieu}</TotalValue>
              </div>
            </TableSection>

            <div className="text-left mt-4">
              {singleDonhang?.xacnhan ? (
                <button type="button" class="btn btn-outline-success">
                  <i class="fas fa-check"></i> Đã duyệt
                </button>
              ) : (
                <button className="btn btn-success px-4" onClick={handleOpen}>
                  Xác nhận
                </button>
              )}
            </div>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xác nhận"
        content="Xác nhận đơn hàng ?"
        text1="Hủy"
        text2="Đồng ý"
        onClick1={handleClose}
        onClick2={handleXacnhan}
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
  font-family: "Poppins", sans-serif;
`;
const Form = styled.div`
  background: #fff;
  padding: 36px 72px 60px 72px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
`;
const Title = styled.div`
  text-align: right;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const TitleWrapper = styled.div`
  font-size: 16px;
  color: #555;
  color: #1c7ed6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    color: #11548f;
  }
  span {
    margin-right: 8px;
  }
`;
const TitleContent = styled.div`
  display: inline-block;
`;
const TableSection = styled.div`
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
const BoxInfo = styled.div`
  width: 380px;
  padding: 26px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  display: inline-block;
  text-align: left;
  font-family: "Poppins", sans-serif;
  margin-bottom: 36px;
  span {
    font-size: 15px;
    margin-right: 10px;
  }
`;
const BoxInfoTitle = styled.h6`
  margin-bottom: 16px;
`;
const Text = styled.div`
  font-size: 15px;
  margin-bottom: 4px;
`;

export default DonhangChitiet;
