import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleMessage = (event:MessageEvent) => {
      // Verifica que el mensaje proviene del dominio esperado
      if (event.origin !== 'https://master.d19gi5htckg2p9.amplifyapp.com/') return;

      // Procesa el mensaje
      const { count } = event.data;
      if (typeof count === 'number') {
        console.log('Count received:', count);
        setCount(count);
      }
    };

    // Escucha el evento de mensaje
    window.addEventListener('message', handleMessage);

    // Limpieza cuando el componente se desmonte
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  const sendMessageToMain = () => {
    if (window.parent) {
      window.parent.postMessage(
        { message: 'Mensaje enviado del microfront-2' },
        'https://master.d19gi5htckg2p9.amplifyapp.com/'
      );
    }
  };
  return (
    <>
    <p>MICROFRONT 2 HOLA MUNDO</p>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>MICROFRONT 2</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={sendMessageToMain}>
          Send message to main
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}