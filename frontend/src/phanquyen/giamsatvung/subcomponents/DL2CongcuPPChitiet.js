import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import apiDaily2 from "../../../axios/apiDaily2";
import apiLangnghe from "../../../axios/apiLangnghe";
import BackdropMaterial from "../../../components/BackdropMaterial";
import ModalChitietCongcu from "../../../components/ModalChitietCongcu";
import InputText from "../../../components/InputText";
import ButtonMaterial from "../../../components/ButtonMaterial";
import TablePhanphatChitiet from "../tables/subtables/TablePhanphatChitiet";

const DL2CongcuPPChitiet = ({ payload: phanphatId, daily2Id, setActive }) => {
  const [loading, setLoading] = useState(false);
  const [phanphat, setPhanphat] = useState(null);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const [langngheInfo, setLangngheInfo] = useState(null);
  const [hodanInfo, setHodanInfo] = useState(null);
  const [dsCongcu, setDsCongcu] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [congcu, setCongcu] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleOpenModal = async () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const fetchSinglePhanphat = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2(daily2Id);
    const { phanphat } = await apiDaily2.singlePhanphat(daily2._id, phanphatId);
    const { langnghe } = await apiLangnghe.singleLangnghe(
      phanphat.phanphat.to.hodan.langnghe
    );
    // set data
    setPhanphat(phanphat);
    setBophankdInfo(phanphat.phanphat.from.bophankd);
    setHodanInfo(phanphat.phanphat.to.hodan);
    setDsCongcu(phanphat.phanphat.items);
    setLangngheInfo(langnghe);
    setLoading(false);
  };

  useEffect(() => {
    setSuccess(false);
    fetchSinglePhanphat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <TitleBack
          TitleBack
          onClick={() => {
            setActive({
              code: 4,
              present: "congcupp",
              payload: "",
            });
          }}
        >
          <i class="fas fa-angle-left"></i>
          <span>Quay lại danh sách phân phát</span>
        </TitleBack>
        <Section>
          <div className="row">
            <div className="col-lg-6">
              <Title>Bộ phận kinh doanh</Title>
              <FormGroup>
                <InputText label="Tên bên cấp" value={bophankdInfo?.ten} />
              </FormGroup>

              <FormGroup>
                <InputText label="Số điện thoại" value={bophankdInfo?.sdt} />
              </FormGroup>

              <FormGroup>
                <InputText label="E-mail" value={bophankdInfo?.email} />
              </FormGroup>

              <FormGroup>
                <InputText
                  label="Địa chỉ"
                  rows={5}
                  multiline
                  value={bophankdInfo?.diachi}
                />
              </FormGroup>
            </div>
            <div className="col-lg-6">
              <Title>Hộ dân đích</Title>
              <FormGroup>
                <InputText label="Tên đại lý nhận" value={hodanInfo?.daidien} />
              </FormGroup>

              <FormGroup>
                <InputText label="Số điện thoại" value={hodanInfo?.sdt} />
              </FormGroup>

              <FormGroup>
                <InputText label="CMND" value={hodanInfo?.cmnd} />
              </FormGroup>

              <FormGroup>
                <InputText label="Năm sinh" value={hodanInfo?.namsinh} />
              </FormGroup>

              <FormGroup>
                <InputText label="Làng nghề" value={langngheInfo?.ten} />
              </FormGroup>

              <FormGroup>
                <InputText
                  label="Địa chỉ"
                  rows={5}
                  multiline
                  value={hodanInfo?.diachi}
                />
              </FormGroup>
            </div>
          </div>
        </Section>

        <Section>
          <Title>Danh sách công cụ</Title>
          <TableSection>
            <TablePhanphatChitiet
              dsCongcu={dsCongcu}
              phanphat={phanphat}
              setCongcu={setCongcu}
              handleOpenModal={handleOpenModal}
            />
          </TableSection>
        </Section>
        <ButtonRight>
          {phanphat?.danhapkho ? (
            <ButtonMaterial variant="outlined">
              <CheckIcon /> Đã nhập kho
            </ButtonMaterial>
          ) : (
            <ButtonMaterial variant="contained">Nhập kho</ButtonMaterial>
          )}

          {phanphat?.daphanphatxuong ? (
            <ButtonMaterial variant="outlined" style={{ marginLeft: 16 }}>
              <CheckIcon /> Đã chuyển tiếp
            </ButtonMaterial>
          ) : (
            <ButtonMaterial
              variant="contained"
              onClick={() => () => {}}
              style={{ marginLeft: 16 }}
            >
              Chuyển tiếp
            </ButtonMaterial>
          )}
        </ButtonRight>
      </Wrapper>

      <ModalChitietCongcu
        open={modalOpen}
        onClose={handleCloseModal}
        congcu={congcu}
      />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Section = styled.div`
  padding: 26px;
  background: #fff;
  margin-bottom: 20px;
`;
const Title = styled.h6`
  margin-bottom: 20px;
`;
const FormGroup = styled.div`
  margin-bottom: 20px;
  input,
  textarea {
    font-family: "Poppins", sans-serif;
  }
`;
const TableSection = styled.div`
  table {
    th,
    td {
      font-family: "Poppins", sans-serif;
    }
    th:first-child {
      display: none;
    }
    td:first-child {
      display: none;
    }
  }
`;
const ButtonRight = styled.div`
  text-align: right;
  padding: 20px;
  background-color: #fff;
`;
const TitleBack = styled.h5`
  margin-top: -10px;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  font-family: "Poppins", sans-serif;
  i {
    color: rgba(0, 0, 0, 0.35);
    margin-right: 10px;
    font-size: 20px;
  }
`;

export default DL2CongcuPPChitiet;
