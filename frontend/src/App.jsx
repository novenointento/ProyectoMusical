import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchHealth } from './services/api';
import TaskTemplateCard from './components/TaskTemplateCard';

function App() {
  const [health, setHealth] = useState({ status: 'loading', service: 'backend-template' });

  useEffect(() => {
    let ignore = false;

    fetchHealth()
      .then((data) => {
        if (!ignore) {
          setHealth(data);
        }
      })
      .catch(() => {
        if (!ignore) {
          setHealth({ status: 'offline', service: 'backend-template' });
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Project template</p>
        <h1>Frontend + backend + IA listos para arrancar</h1>
        <p className="hero-copy">
          Este esqueleto deja el repositorio preparado para empezar un proyecto nuevo
          sin arrastrar dominio anterior. Sustituye los ejemplos por tus primeras
          pantallas, endpoints y tareas reales.
        </p>
      </section>

      <section className="status-panel">
        <div>
          <p className="panel-label">Backend</p>
          <strong>{health.service}</strong>
        </div>
        <span className={`badge badge-${health.status}`}>{health.status}</span>
      </section>

      <section className="cards-grid">
        <TaskTemplateCard
          title="Primera tarea sugerida"
          description="Define un caso de uso real y crea un cambio nuevo en OpenSpec."
          items={[
            'Actualizar README y contexto del proyecto.',
            'Crear un change en openspec/changes.',
            'Dividir el trabajo en tareas pequenas.',
          ]}
        />
        <TaskTemplateCard
          title="Capas listas"
          description="La estructura minima ya existe para que puedas crecer sin rehacer la base."
          items={[
            'Backend Express con /health y ejemplo JSON.',
            'Frontend React con comprobacion de salud.',
            'Prisma con modelos genericos Project y Task.',
          ]}
        />
      </section>
    </main>
  );
}

export default App;
