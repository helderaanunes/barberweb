import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const Tables = () => {
  const [categorias, setCategorias] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [categoriaToDelete, setCategoriaToDelete] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categoria')
        setCategorias(response.data)
      } catch (error) {
        console.error('Erro ao buscar categorias:', error)
      }
    }

    fetchCategorias()
  }, [])

  const handleEdit = (id) => {
    navigate(`/categoria/edit/${id}`)
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/categoria/${categoriaToDelete}`)
      setCategorias(categorias.filter((categoria) => categoria.id !== categoriaToDelete))
      setModalVisible(false)
      setCategoriaToDelete(null)
    } catch (error) {

      setModalVisible(false)
      setCategoriaToDelete(null)

      if (error.response && error.response.status === 409) {
        // Exibe a mensagem de erro retornada pelo backend
        alert(error.response.data)
      } else {
        console.error('Erro ao remover categoria:', error)
        alert('Ocorreu um erro ao tentar excluir a categoria')
      }
    }
  }

  const confirmDelete = (id) => {
    setCategoriaToDelete(id)
    setModalVisible(true)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Listar Categorias</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {categorias.map((categoria, index) => (
                  <CTableRow key={categoria.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{categoria.nome}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" size="sm" onClick={() => handleEdit(categoria.id)}>
                        Editar
                      </CButton>{' '}
                      <CButton color="danger" size="sm" onClick={() => confirmDelete(categoria.id)}>
                        Remover
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Remoção</CModalTitle>
        </CModalHeader>
        <CModalBody>Tem certeza de que deseja remover esta categoria?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Remover
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Tables
