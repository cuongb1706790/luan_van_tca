import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import apiHodan from "../../../axios/apiHodan";
import BackdropMaterial from "../../../components/BackdropMaterial";
import ModalChitietVattu from "../../../components/ModalChitietVattu";
import InputText from "../../../components/InputText";
import TablePhanphatChitiet2 from "../tables/subtables/TablePhanphatChitiet2";
import ButtonMaterial from "../../../components/ButtonMaterial";

const HDVattuPPChitiet = ({ payload: phanphatId, hodanId, setActive }) => {
  const [loading, setLoading] = useState(false);
  const [phanphat, setPhanphat] = useState(null);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const [hodanInfo, setHodanInfo] = useState(null);
  const [daily1Info, setDaily1Info] = useState(null);
  const [dsVattu, setDsVattu] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [vattu, setVattu] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleOpenModal = async () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const fetchSinglePhanphat = async () => {
    setLoading(true);
    const { hodan } = await apiHodan.singleHodan(hodanId);
    const { phanphat } = await apiHodan.singlePhanphat(hodan._id, phanphatId);
    // set data
    setPhanphat(phanphat);
    setBophankdInfo(phanphat.phanphat.from.bophankd);
    setHodanInfo(phanphat.phanphat.to.hodan);
    setDaily1Info(phanphat.phanphat.to.daily1);
    setDsVattu(phanphat.phanphat.items);
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
            <div className="col-lg-4">
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
            <div className="col-lg-4">
              <Title>Đại lý cấp 1</Title>
              <FormGroup>
                <InputText label="Tên bên cấp" value={daily1Info?.ten} />
              </FormGroup>

              <FormGroup>
                <InputText label="Số điện thoại" value={daily1Info?.sdt} />
              </FormGroup>

              <FormGroup>
                <InputText label="E-mail" value={daily1Info?.email} />
              </FormGroup>

              <FormGroup>
                <InputText
                  label="Địa chỉ"
                  rows={5}
                  multiline
                  value={daily1Info?.diachi}
                />
              </FormGroup>
            </div>
            <div className="col-lg-4">
              <Title>Đại lý cấp 2</Title>
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
          <Title style={{ textAlign: "left" }}>Danh sách vật tư</Title>
          <TableSection>
            <TablePhanphatChitiet2
              dsVattu={dsVattu}
              phanphat={phanphat}
              setVattu={setVattu}
              handleOpenModal={handleOpenModal}
            />
          </TableSection>
        </Section>
        <ButtonRight>
          {phanphat?.daxacnhan ? (
            <ButtonMaterial variant="outlined">
              <CheckIcon /> Đã xác nhận
            </ButtonMaterial>
          ) : (
            <ButtonMaterial variant="contained">Xác nhận</ButtonMaterial>
          )}
        </ButtonRight>
      </Wrapper>

      <ModalChitietVattu
        open={modalOpen}
        onClose={handleCloseModal}
        vattu={vattu}
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
  text-align: center;
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

export default HDVattuPPChitiet;
