import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormLabel,
    CFormSelect,
    CRow,
    CButton
} from '@coreui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Agendar = () => {
    const [barbeiros, setBarbeiros] = useState([]);
    const [selectedBarbeiro, setSelectedBarbeiro] = useState('');
    const [servicos, setServicos] = useState([]);
    const [selectedServico, setSelectedServico] = useState('');
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/barbeiros')
            .then(response => {
                setBarbeiros(response.data);
            })
            .catch(error => {
                console.error('Houve um erro ao buscar os barbeiros!', error);
            });
    }, []);

    useEffect(() => {
        if (selectedBarbeiro) {
            axios.get(`http://localhost:8080/barbeiros/${selectedBarbeiro}/servicos`)
                .then(response => {
                    setServicos(response.data);
                })
                .catch(error => {
                    console.error('Houve um erro ao buscar os serviços!', error);
                });
        } else {
            setServicos([]);
        }
    }, [selectedBarbeiro]);

    useEffect(() => {
        if (selectedBarbeiro && selectedServico) {
            axios.get(`http://localhost:8080/agendamento/${selectedBarbeiro}/${selectedServico}`)
                .then(response => {
                    // Certifique-se de que as datas estão sendo convertidas corretamente
                    const dates = response.data.map(dateString => {
                        const [year, month, day] = dateString.split('-');
                        return new Date(year, month - 1, day);  // Month is 0-indexed in JavaScript Date
                    });
                    setAvailableDates(dates);
                })
                .catch(error => {
                    console.error('Houve um erro ao buscar as datas disponíveis!', error);
                });
        } else {
            setAvailableDates([]);  // Limpe as datas disponíveis se não houver barbeiro/serviço selecionado
        }
    }, [selectedBarbeiro, selectedServico]);
    

    useEffect(() => {
    if (selectedDate && selectedBarbeiro) {
        axios.get(`http://localhost:8080/disponibilidade/${selectedBarbeiro}/${selectedDate.toISOString().split('T')[0]}`)
            .then(response => {
                const disponibilidades = response.data;

                axios.get(`http://localhost:8080/agendamentos/${selectedBarbeiro}/${selectedDate.toISOString().split('T')[0]}`)
                    .then(agendamentosResponse => {
                        const agendamentos = agendamentosResponse.data;
                        setAvailableTimes(generateTimeSlots(disponibilidades, agendamentos));
                    })
                    .catch(error => {
                        console.error('Houve um erro ao buscar os agendamentos!', error);
                    });
            })
            .catch(error => {
                console.error('Houve um erro ao buscar os horários disponíveis!', error);
            });
    } else {
        setAvailableTimes([]);
    }
}, [selectedDate, selectedBarbeiro]);


    const handleBarbeiroChange = (event) => {
        setSelectedBarbeiro(event.target.value);
        setSelectedServico(''); // Resetar o serviço selecionado quando o barbeiro muda
    };

    const handleServicoChange = (event) => {
        setSelectedServico(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime('');
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleSave = () => {
        if (!selectedBarbeiro || !selectedServico || !selectedDate || !selectedTime) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        const agendamento = {
            usuarioId: selectedBarbeiro,
            servicoId: selectedServico,
            data: selectedDate.toISOString().split('T')[0],
            horario: selectedTime
        };

        axios.post('http://localhost:8080/agendamento', agendamento)
            .then(response => {
                alert('Agendamento salvo com sucesso!');
                // Limpar os campos do formulário após salvar
                setSelectedBarbeiro('');
                setSelectedServico('');
                setSelectedDate(null);
                setSelectedTime('');
            })
            .catch(error => {
                console.error('Houve um erro ao salvar o agendamento!', error);
                alert('Erro ao salvar o agendamento. Tente novamente.');
            });
    };

    const tileDisabled = ({ date }) => {
        return !availableDates.some(availableDate =>
            availableDate.getFullYear() === date.getFullYear() &&
            availableDate.getMonth() === date.getMonth() &&
            availableDate.getDate() === date.getDate()
        );
    };

    const generateTimeSlots = (disponibilidades, agendamentos) => {
        const timeSlots = [];
        disponibilidades.forEach(disponibilidade => {
            let startTime = disponibilidade.horarioInicio.substring(0, 5);
            let endTime = disponibilidade.horarioFim.substring(0, 5);
    
            while (startTime < endTime) {
                if (!isTimeOccupied(startTime, agendamentos)) {
                    timeSlots.push(startTime);
                }
                startTime = addMinutes(startTime, 30);
            }
    
            if (disponibilidade.horarioInicioTarde && disponibilidade.horarioFimTarde) {
                let startTimeTarde = disponibilidade.horarioInicioTarde.substring(0, 5);
                let endTimeTarde = disponibilidade.horarioFimTarde.substring(0, 5);
    
                while (startTimeTarde < endTimeTarde) {
                    if (!isTimeOccupied(startTimeTarde, agendamentos)) {
                        timeSlots.push(startTimeTarde);
                    }
                    startTimeTarde = addMinutes(startTimeTarde, 30);
                }
            }
        });
    
        return timeSlots;
    };
    
    const isTimeOccupied = (time, agendamentos) => {
        return agendamentos.some(agendamento => {
            const agendamentoInicio = agendamento.horarioInicio.substring(0, 5);
            const agendamentoFim = agendamento.horarioFim.substring(0, 5);
            return time >= agendamentoInicio && time < agendamentoFim;
        });
    };

    const addMinutes = (time, minsToAdd) => {
        const [hours, minutes] = time.split(':').map(Number);
        let totalMinutes = hours * 60 + minutes + minsToAdd;
        const newHours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
        const newMinutes = (totalMinutes % 60).toString().padStart(2, '0');
        return `${newHours}:${newMinutes}`;
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Agendar</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm>
                            <div className="mb-3">
                                <CFormLabel htmlFor="barbeiro">Barbeiro</CFormLabel>
                                <CFormSelect id="barbeiro" value={selectedBarbeiro} onChange={handleBarbeiroChange}>
                                    <option value="">Selecione um barbeiro</option>
                                    {barbeiros.map(barbeiro => (
                                        <option key={barbeiro.id} value={barbeiro.id}>
                                            {barbeiro.nome}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>
                            {selectedBarbeiro && (
                                <div className="mb-3">
                                    <CFormLabel htmlFor="servico">Serviço</CFormLabel>
                                    <CFormSelect id="servico" value={selectedServico} onChange={handleServicoChange}>
                                        <option value="">Selecione um serviço</option>
                                        {servicos.map(servico => (
                                            <option key={servico.id} value={servico.id}>
                                                {servico.nome}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </div>
                            )}
                            {selectedBarbeiro && selectedServico && (
                                <div className="mb-3">
                                    <CFormLabel htmlFor="calendario">Datas Disponíveis</CFormLabel>
                                    <Calendar
                                        tileDisabled={tileDisabled}
                                        onClickDay={handleDateChange}
                                    />
                                </div>
                            )}
                            {selectedDate && availableTimes.length > 0 && (
                                <div className="mb-3">
                                    <CFormLabel htmlFor="horario">Horários Disponíveis</CFormLabel>
                                    <CFormSelect id="horario" value={selectedTime} onChange={handleTimeChange}>
                                        <option value="">Selecione um horário</option>
                                        {availableTimes.map((time, index) => (
                                            <option key={index} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </div>
                            )}
                            <div className="mb-3">
                                <CButton color="primary" onClick={handleSave}>Salvar</CButton>
                            </div>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Agendar;
