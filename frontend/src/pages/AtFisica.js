import React, { useState } from 'react';
import api from '../services/api';
import '../styles/AtFisica.css';

const AtFisica = () => {
  const [modalidade, setModalidade] = useState('');
  const [tempo, setTempo] = useState(0);
  const [distancia, setDistancia] = useState(0);
  const [kcal, setKcal] = useState(0);
  const [tempoD, setTempoD] = useState(0);
  const [usuario, setUsuario] = useState('');  // Campo para o usuário
  const [historico, setHistorico] = useState([]);  // Estado para armazenar o histórico

  // Função para registrar a atividade física
  const handleSubmit = async () => {
    try {
      await api.post('/atfisica', {
        modalidade,
        tempo,
        distancia,
        kcal,
        tempoD,
        usuario,
      });
      alert('Registro de atividade física salvo com sucesso!');
      setModalidade('');
      setTempo(0);
      setDistancia(0);
      setKcal(0);
      setTempoD(0);
      setUsuario('');
    } catch (error) {
      alert('Erro ao salvar o registro de atividade física. Tente novamente.');
    }
  };

  // Função para exibir o histórico de atividades físicas
  const handleHistorico = async () => {
    try {
      const response = await api.get('/atfisica', {
        params: {
          usuario,
        },
      });
      setHistorico(response.data);  // Atualiza o estado com os dados do histórico
    } catch (error) {
      alert('Erro ao carregar o histórico. Tente novamente.');
    }
  };

  return (
    <div className="atfisica-container">
      <h1 className="atfisica-title">Registro de Atividade Física</h1>
      <input
        type="text"
        placeholder="Modalidade"
        value={modalidade}
        onChange={(e) => setModalidade(e.target.value)}
      />
      <input
        type="number"
        placeholder="Tempo (minutos)"
        value={tempo}
        onChange={(e) => setTempo(parseInt(e.target.value))}
      />
      <input
        type="number"
        placeholder="Distância (metros)"
        value={distancia}
        onChange={(e) => setDistancia(parseInt(e.target.value))}
      />
      <input
        type="number"
        placeholder="Calorias Queimadas (Kcal)"
        value={kcal}
        onChange={(e) => setKcal(parseInt(e.target.value))}
      />
      <input
        type="number"
        placeholder="Tempo de Descanso (minutos)"
        value={tempoD}
        onChange={(e) => setTempoD(parseInt(e.target.value))}
      />
      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <button onClick={handleSubmit}>Salvar</button>

      {/* Botão para exibir o histórico */}
      <button onClick={handleHistorico}>Exibir Histórico</button>

      {/* Exibindo o histórico de atividades */}
      {historico.length > 0 && (
        <div className="historico-container">
          <h2>Histórico de Atividades</h2>
          <ul>
            {historico.map((registro, index) => (
              <li key={index}>
                <p><strong>Modalidade:</strong> {registro.modalidade}</p>
                <p><strong>Tempo:</strong> {registro.tempo} minutos</p>
                <p><strong>Distância:</strong> {registro.distancia} metros</p>
                <p><strong>Calorias:</strong> {registro.kcal} Kcal</p>
                <p><strong>Tempo de Descanso:</strong> {registro.tempoD} minutos</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AtFisica;
