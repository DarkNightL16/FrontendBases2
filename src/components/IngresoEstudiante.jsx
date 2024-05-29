import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { StudentContext } from './context/StudentProvider'; // Asegúrate de que la ruta es correcta

const IngresoEstudiante = () => {
  const [idUsuario, setIdUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar modal
  const [userType, setUserType] = useState(null); // Estado para guardar el tipo de usuario
  const { setStudentName, setStudentId } = useContext(StudentContext);
  const navigate = useNavigate(); // Utiliza useNavigate para la redirección

  const handleIdChange = (event) => {
    setIdUsuario(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setContrasena(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:9009/usuarios/buscarUsuarioPorIdYContraseña?id_usuario=${idUsuario}&contrasena=${contrasena}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserType(data.idTipoUsuario.id);

        if (data.idTipoUsuario.id === 1) {
          setStudentName(data.nombre); // Setea el nombre del estudiante en el contexto
          setStudentId(data.idUsuario); // Setea el ID del estudiante en el contexto
          navigate(`/home_estudiante/${data.idUsuario}`); // Redirige al usuario
        } else {
          setShowModal(true); // Mostrar modal si el usuario no es un estudiante
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
      <h2>Inicio de Sesión Estudiante</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={idUsuario}
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
        INGRESAR
      </button>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            {userType === 1 ? (
              <p>Bienvenido Estudiante.</p>
            ) : (
              <p>Usuario o contraseña incorrecta.</p>
            )}
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngresoEstudiante;
