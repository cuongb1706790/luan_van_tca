import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiGiaohang from "../../axios/apiGiaohang";
import BackdropMaterial from "../../components/BackdropMaterial";
import DialogMaterial from "../../components/DialogMaterial";
import Header from "../../components/Header";
import {
  Container,
  Content,
  Filter,
  FilterSection,
  SearchBox,
  TableSection,
  Title,
  TitleWrapper,
} from "./styledComponents";
import { toast } from "react-toastify";
import TableHanggiaoden from "./tables/TableHanggiaoden";
import apiBophankd from "../../axios/apiBophankd";

const Hanggiaoden = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dsHanggiaoden, setDsHanggiaoden] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const [rowId, setRowId] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleXacnhanHanggiaoDen = async () => {
    const { success } = await apiGiaohang.bophankdXacnhan(rowId);
    if (success) {
      //setRefresh(true);
      handleClose();
      toast.success("Xác nhận thành công!", { theme: "colored" });
      setSuccess(true);
    }
  };

  const handleDuyetHanggiaoDen = (id) => {
    setRowId(id);
    handleOpen();
  };

  const fetchDsGiaohangDen = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    let { dsgiaohang } = await apiGiaohang.dsGiaohangDenGsvBophankd(
      bophankd._id
    );
    dsgiaohang = dsgiaohang
      .map((item) => ({
        ...item,
        tongsanpham: item.dssanpham.reduce((acc, sp) => acc + sp.dagiao, 0),
      }))
      .reverse();
    setDsHanggiaoden(dsgiaohang);
    setLoading(false);
  };

  useEffect(() => {
    setSuccess(false);
    fetchDsGiaohangDen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Hàng giao đến" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách hàng giao đến</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim hàng theo mã đơn hàng"
                  // value={query}
                  // onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSection className="noCheckbox">
              <TableHanggiaoden
                dsGiaohang={dsHanggiaoden}
                handleDuyetHanggiaoDen={handleDuyetHanggiaoDen}
                //   setSuccess={setSuccess}
                //   daily1Id={daily1Info?._id}
                //   setRefresh={props.setRefresh}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xác nhận"
        content="Xác nhận đơn hàng giao đến"
        text1="Hủy"
        text2="Đồng ý"
        onClick1={handleClose}
        onClick2={handleXacnhanHanggiaoDen}
      />
    </>
  );
};

export default Hanggiaoden;
