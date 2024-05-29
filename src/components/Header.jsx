import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProfessorContext } from './context/ProfessorProvider';
import { StudentContext } from './context/StudentProvider';
import './Header.css'; // Importa el archivo CSS

export const Header = () => {
    const { professorName, professorId, clearProfessorData } = useContext(ProfessorContext);
    const { studentName, studentId, clearStudentData } = useContext(StudentContext);
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (studentName) {
            setNombre(studentName);
        } else if (professorName) {
            setNombre(professorName);
        }
    }, [studentName, professorName]);

    const handleLogout = () => {
        clearProfessorData();
        clearStudentData();
        setNombre('');
    };

    return (
        <div className="header-container">
            <header className="header">
                <div className="header-decoration"></div>
                <h1>Examenes para estudiantes</h1>
            </header>
            <nav className="nav">
                <ul className="nav-list">
                    <li>
                        <Link to={professorId ? `/home_profesor/${professorId}` : `/home_estudiante/${studentId}`} className="nav-link">
                            Hola <b>{nombre ? nombre : 'identifiquese '}</b>
                        </Link>
                    </li>
                    <li>
                        <Link to={professorId ? `/listarExamenes/${professorId}` : `/listarExamenesEstudiante/${studentId}`} className="nav-link">
                            Examenes
                        </Link>
                    </li>
                    <li>
                        <Link to="/" onClick={handleLogout} className="nav-link logout-link">
                            Inicio de Sesión
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
