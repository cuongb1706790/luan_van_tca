import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import bpkd from "../../assets/icons/bpkd2.png";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiGSV from "../../axios/apiGSV";
import apiLoaiSanpham from "../../axios/apiLoaiSanpham";
import apiCongcu from "../../axios/apiCongcu";
import apiVattu from "../../axios/apiVattu";
import apiNguyenlieu from "../../axios/apiNguyenlieu";
import apiSanpham from "../../axios/apiSanpham";
import apiDonhang from "../../axios/apiDonhang";
import gsv from "../../assets/icons/gsv_2.png";
import spln from "../../assets/icons/spln_2.png";

const TongQuan = (props) => {
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({
    bpkd: 0,
    gsv: 0,
    loaisanpham: 0,
    congcu: 0,
    vattu: 0,
    nguyenlieu: 0,
    sanpham: 0,
    donhang: 0,
  });

  const fetchData = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.dsBophankd();
    const { gsv } = await apiGSV.dsGsv();
    const { loaiSanpham } = await apiLoaiSanpham.dsLoaiSanpham();
    const { congcu } = await apiCongcu.dsCongcu();
    const { vattu } = await apiVattu.dsVattu();
    const { nguyenlieu } = await apiNguyenlieu.dsNguyenlieu();
    const { sanpham } = await apiSanpham.dsSanpham();
    const { donhang } = await apiDonhang.dsDonhang();
    setCounts({
      bpkd: bophankd && bophankd.length ? bophankd.length : 0,
      gsv: gsv && gsv.length ? gsv.length : 0,
      loaisanpham: loaiSanpham && loaiSanpham.length ? loaiSanpham.length : 0,
      congcu: congcu && congcu.length ? congcu.length : 0,
      vattu: vattu && vattu.length ? vattu.length : 0,
      nguyenlieu: nguyenlieu && nguyenlieu.length ? nguyenlieu.length : 0,
      sanpham: sanpham && sanpham.length ? sanpham.length : 0,
      donhang: donhang && donhang.length ? donhang.length : 0,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Wrapper>
      <Header title="Tổng quan" />
      <Content>
        <div className="row mb-4">
          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/bophankd")}>
              <CardContent>
                <TextInfo>
                  <div>{counts.bpkd}</div>
                  <span>Bộ phận kinh doanh</span>
                </TextInfo>
                <Icon>
                  <Image src={bpkd} alt="bpkd" />
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/gsv")}>
              <CardContent>
                <TextInfo>
                  <div>{counts.gsv}</div>
                  <span>Giám sát vùng</span>
                </TextInfo>
                <Icon>
                  <Image src={gsv} alt="daily1" />
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/loaisanpham")}>
              <CardContent>
                <TextInfo>
                  <div>{counts.loaisanpham}</div>
                  <span>Loại sản phẩm</span>
                </TextInfo>
                <Icon>
                  <i class="fab fa-centercode"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/hodan")}>
              <CardContent>
                <TextInfo>
                  <div>{counts.congcu}</div>
                  <span>Công cụ</span>
                </TextInfo>
                <Icon>
                  <i class="fas fa-tools"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/vattu")}>
              <CardContent>
                <TextInfo>
                  <div>{counts.vattu}</div>
                  <span>Vật tư</span>
                </TextInfo>
                <Icon>
                  <i class="fab fa-accusoft"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/nguyenlieu")}>
              <CardContent>
                <TextInfo>
                  <div>{counts.nguyenlieu}</div>
                  <span>Nguyên liệu</span>
                </TextInfo>
                <Icon>
                  <i class="fab fa-bandcamp"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/sanpham")}>
              <CardContent>
                <TextInfo>
                  <div>{counts.sanpham}</div>
                  <span>Sản phẩm</span>
                </TextInfo>
                <Icon>
                  <Image src={spln} alt="splangnghe" />
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/donhang")}>
              <CardContent>
                <TextInfo>
                  <div>{counts.donhang}</div>
                  <span>Đơn hàng</span>
                </TextInfo>
                <Icon>
                  <i class="far fa-newspaper"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>
        </div>
      </Content>
    </Wrapper>
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
  padding: 26px 36px;
  font-family: "Poppins", sans-serif;
`;
const Card = styled.div`
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 24px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgb(0 0 20 / 8%), 0 1px 2px rgb(0 0 20 / 8%);
  cursor: pointer;
  &:hover {
    box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.2);
  }
`;
const CardContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TextInfo = styled.div`
  div {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #0f73ba;
  }
  span {
    color: #777;
    font-size: 16px;
  }
`;
const Icon = styled.div`
  i {
    font-size: 40px;
    opacity: 0.3;
  }
`;
const Image = styled.img`
  width: 40px;
  opacity: 0.35;
`;

export default TongQuan;
