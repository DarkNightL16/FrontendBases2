import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { ProfessorContext } from './context/ProfessorProvider';

const IngresoProfesor = () => {
  const [id, setId] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar modal
  const [userType, setUserType] = useState(null); // Estado para guardar el tipo de usuario
  const { setProfessorName, setProfessorId } = useContext(ProfessorContext);
  const navigate = useNavigate(); // Utiliza useNavigate para la redirección

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setContrasena(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:9009/usuarios/buscarUsuarioPorIdYContraseña?id_usuario=${id}&contrasena=${contrasena}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserType(data.idTipoUsuario.id);

        if (data.idTipoUsuario.id === 2) {
          setProfessorName(data.nombre); // Setea el nombre del profesor en el contexto
          setProfessorId(data.usuariosIdUsuario); // Setea el ID del profesor en el contexto
          navigate(`/home_profesor/${data.usuariosIdUsuario}`); // Redirige al usuario
        } else {
          setShowModal(true); // Mostrar modal si el usuario no es un profesor
        }
      } else {
        setShowModal(true); // Mostrar modal si no se encuentra el usuario
      }
    } catch (error) {
      setShowModal(true); // Mostrar modal si hay un error en la solicitud
      console.error('Error:', error);
    }
  };

  // Estilos
  const styles = {
    container: {
      backgroundColor: '#00000',
      padding: '100px',
      borderRadius: '10px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    input: {
      width: '250px',
      padding: '15px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '5px'
    },
    button: {
      backgroundColor: '#33B5FF',
      color: 'white',
      padding: '15px 107px',
      border: '2px',
      borderRadius: '5px',
      cursor: 'pointer', 
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '50px',
      borderRadius: '5px'
    }
  };


  return (
    <div style={styles.container}>
      <h2>Inicio de Sesión Docente</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={id}
        onChange={handleIdChange}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={handlePasswordChange}
        style={styles.input}
      />

      <button
        onClick={handleSubmit}
        style={styles.button}
      >
        INICIAR SESIÓN
      </button>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
            {userType === 2 ? (
              <p>Bienvenido Profesor.</p>
            ) : (
              <p>No se encontró usuario.</p>
            )}
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngresoProfesor;