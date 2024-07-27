import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CCard, CCardBody, CCol, CCardHeader } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'

const Charts = () => {
  const [data, setData] = useState({ labels: [], datasets: [] })

  useEffect(() => {
    axios.get('/categoriamaisvendida')
      .then(response => {
        const categorias = response.data
        const labels = categorias.map(categoria => categoria.nomeCategoria)
        const quantidadeVendida = categorias.map(categoria => categoria.quantidadeVendida)

        setData({
          labels,
          datasets: [
            {
              label: 'Quantidade Vendida',
              backgroundColor: '#f87979',
              data: quantidadeVendida,
            },
          ],
        })
      })
      .catch(error => {
        console.error("Houve um erro ao buscar os dados:", error)
      })
  }, [])

  return (
    <CCol xs={6}>
      <CCard className="mb-4">
        <CCardHeader>Categoria mais vendida</CCardHeader>
        <CCardBody>
          <CChartBar
            data={data}
            labels="categories"
          />
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default GraficoCategoriaMaisVendida
