import React from 'react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilCheck } from '@coreui/icons'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const AddOrdemServico = () => {
  const handlerEnviarFormulario = () =>{
    axios.post('', {    })
    .then(response => {console.log('Response:')})
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Adicionar Ordem Serviço</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="data">Data</CFormLabel>
                <CFormInput type="date" id="data" placeholder="Data" />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="hora">Hora</CFormLabel>
                <CFormInput type="time" id="hora" placeholder="Hora" />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="desconto">Desconto</CFormLabel>
                <CFormInput type="number" id="desconto" placeholder="Desconto" />
              </div>
              <div className="mb-3">
                <CButton color="success" onClick={}>
                  <CIcon icon={cilCheck} className="me-2"></CIcon>
                  Salvar
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddOrdemServico
