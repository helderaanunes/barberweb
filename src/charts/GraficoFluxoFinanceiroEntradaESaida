import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCol, CCardHeader } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';

const Charts = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Função para buscar os dados do backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/fluxoFinanceiro/GraficoFluxoFinanceiroEntradaESaida', {
          params: {
            startDate: '2024-07-01', // Ajuste a data de início conforme necessário
            endDate: '2024-07-31'   // Ajuste a data de fim conforme necessário
          }
        });

        const { data } = response;

        // Processar dados para o gráfico
        const labels = data.map(item => item.data);
        const entradas = data.map(item => item.totalEntradas);
        const saidas = data.map(item => item.totalSaidas);

        setData({
          labels,
          datasets: [
            {
              label: 'Entradas',
              backgroundColor: '#42A5F5',
              data: entradas,
            },
            {
              label: 'Saídas',
              backgroundColor: '#FF7043',
              data: saidas,
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>Gráfico de Entrada e Saída por dia</CCardHeader>
        <CCardBody>
          <CChartBar
            data={data}
            labels="auto" // Ajuste o label conforme necessário
          />
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default GraficoFluxoFinanceiroEntradaESaida;
