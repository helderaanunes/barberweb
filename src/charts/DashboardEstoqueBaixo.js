import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CCard, CCardBody, CCol, CCardHeader } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'

const Charts = () => {
  // Estado para armazenar os dados dos produtos
  const [produtos, setProdutos] = useState([])

  // Buscar os dados dos produtos com estoque baixo ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/produto/estoque-baixo?quantidadeMinima=10')
        setProdutos(response.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos produtos:', error)
      }
    }
    fetchData()
  }, [])

  // Processar os dados para o gráfico
  const labels = produtos.map(produto => produto.nome)
  const data = produtos.map(produto => produto.quantidadeEstoque)

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>Produtos com Estoque Baixo</CCardHeader>
        <CCardBody>
          <CChartBar
            data={{
              labels: labels,
              datasets: [
                {
                  label: 'Quantidade em Estoque',
                  backgroundColor: '#f87979',
                  data: data,
                },
              ],
            }}
            labels="Produtos"
          />
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default DashboardEstoqueBaixo;
