import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  AddButton,
  Container,
  Content,
  Filter,
  FilterSection,
  SearchBox,
  TableSection,
  Title,
  TitleWrapper,
} from "./styledComponents";
import TableHodan from "./tables/TableHodan";
import BackdropMaterial from "../../components/BackdropMaterial";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";

const Hodan = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState([
    "daidien",
    "sdt",
    "cmnd",
    "taikhoan",
    "namsinh",
  ]);
  const [dsHodan, setDsHodan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsHodan = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    let { dshodan } = await apiBophankd.dsHodan(bophankd._id);
    dshodan = dshodan.map((hd) => ({ ...hd, langnghe: hd.langnghe.ten }));
    setDsHodan(dshodan);
    // setDsHodan(
    //   hodan && hodan.length
    //     ? hodan.map((item) => ({
    //         ...item,
    //         taikhoan: item.user ? item.user?.taikhoan : "",
    //         langnghe: item.langnghe ? item.langnghe?.ten : "",
    //         langngheId: item.langnghe?._id,
    //       }))
    //     : []
    // );
    setLoading(false);
  };

  const search = (dsHodan) => {
    return (
      dsHodan &&
      dsHodan.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsHodan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Hộ dân" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách hộ dân</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim hộ dân theo tên đại diện, số điện thoại, cmnd, tài khoản, năm sinh"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSection className="noCheckbox">
              <TableHodan
                dsHodan={search(dsHodan)}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Hodan;
