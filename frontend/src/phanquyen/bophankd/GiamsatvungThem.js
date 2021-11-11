import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import DialogMaterial from "../../components/DialogMaterial";
import TableGiamsatvungThem from "./tables/TableGiamsatvungThem";
import apiGSV from "../../axios/apiGSV";
import { toast } from "react-toastify";

const GiamsatvungThem = (props) => {
  const [success, setSuccess] = React.useState(false);
  const [query, setQuery] = React.useState("");
  // const [searchColumns, setSearchColumns] = React.useState([
  //   "ten",
  //   "sdt",
  //   "email",
  //   "taikhoan",
  // ]);
  const [loading, setLoading] = React.useState(false);
  const [dsGiamsatvung, setDsGiamsatvung] = React.useState([]);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [dsSelectedGSV, setDsSelectedGSV] = useState([]);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleThemGSV = (gsvArr) => {
    setDsSelectedGSV(gsvArr);
    handleOpenDialog();
  };

  const handleSubmit = async () => {
    const dl = {
      bophankdId: bophankdInfo._id,
      giamsatvungArr: dsSelectedGSV,
    };
    // console.log({ dl });
    const { success } = await apiBophankd.bophankdThemGSV(dl);
    if (success) {
      toast.success("Thêm thành công!", { theme: "colored" });
      props.history.push("/bophankd/giamsatvung");
    }
  };

  // const search = (dsGsv) => {
  //   return (
  //     dsGsv &&
  //     dsGsv.filter((item) =>
  //       searchColumns.some(
  //         (col) =>
  //           item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
  //       )
  //     )
  //   );
  // };

  const fetchDsGiamsatvung = async () => {
    setLoading(true);
    const { giamsatvung } = await apiGSV.dsGSVBpkdNull();
    const data = await apiBophankd.bophankdBasedUserId(userInfo._id);
    // console.log({ daily1 });
    setDsGiamsatvung(
      giamsatvung && giamsatvung.length
        ? giamsatvung.map((item) => ({
            ...item,
            taikhoan: item.user ? item.user.taikhoan : "",
          }))
        : []
    );
    setBophankdInfo(data.bophankd);
    setLoading(false);
  };

  React.useEffect(() => {
    setSuccess(false);
    fetchDsGiamsatvung();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header
          title="Quay lại danh sách giám sát vùng"
          onClick={() => props.history.push("/bophankd/giamsatvung")}
          titleBack
        />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Thêm giám sát vùng</Title>
            </TitleWrapper>
            <FilterWrapper>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim theo tên, số điện thoại, email, tài khoản"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </FilterWrapper>
          </FilterSection>

          <TableSection>
            <TableGiamsatvungThem
              dsGiamsatvung={dsGiamsatvung}
              handleThemGSV={handleThemGSV}
            />
          </TableSection>
        </Content>
      </Wrapper>

      <DialogMaterial
        open={open}
        onClose={handleCloseDialog}
        title="Thêm giám sát vùng"
        content="Thêm tất cả các giám sát vùng đã chọn"
        text1="Hủy"
        text2="Thêm"
        onClick1={handleCloseDialog}
        onClick2={handleSubmit}
      />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 36px;
`;
const FilterSection = styled.div`
  background: #ffff;
`;
const Title = styled.div`
  margin: 0;
  padding: 14px 17px;
  font-weight: 500;
  color: #1e93e8;
  font-family: "Poppins", sans-serif;
  display: inline-block;
  border-bottom: 2px solid #1e93e8;
`;
const TitleWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const FilterWrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 14px;
  padding-left: 17px;
  padding-right: 17px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const SearchBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 50%;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  i {
    display: inline-block;
    padding: 10px;
    color: rgba(0, 0, 0, 0.35);
  }
  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 10px;
    color: #182537;
    font-size: 14px;
    font-family: "Poppins", sans-serif;
    &::placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.35);
      font-family: "Poppins", sans-serif;
    }
  }
`;
const TableSection = styled.div`
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
`;

export default GiamsatvungThem;
