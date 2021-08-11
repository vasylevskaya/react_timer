import { useCallback, useState } from "react";
import "./App.css";
import 'bulma/css/bulma.min.css';

import { Timer } from "./Timer";

export default function App() {
  const [timer, setTimer] = useState(0); // timer value in ms
  const [status, setStatus] = useState('stopped'); // timer status (running, stopped, waiting)

  const start = useCallback(() => setStatus('running'), []);
  const wait = useCallback(() => setStatus('waiting'), []);

  const stop = useCallback(() => {
      setStatus('stopped');
      setTimer(0);
    },
    [],
  );

  const reset = useCallback(() => {
      setStatus('running');
      setTimer(0);
    },
    [],
  );

  return (
    <div className="container">

      <Timer
        timer={timer}
        status={status}
        setTimer={setTimer}
      />

      <div className="container buttons">
        {status !== 'running' && (
          <button className="button is-success" onClick={start} >
            Start
          </button>
          )
        }
        {status === 'running' && (
          <button className="button is-danger" onClick={stop}>
            Stop
          </button>
          )
        }
        <button
          className="button is-primary"
          onClick={reset}
          disabled={status === 'stopped'}
        >
          Reset
        </button>
        <button
          className="button is-primary"
          onClick={wait}
          disabled={status === 'waiting'}
        >
          Wait
        </button>
      </div>
    </div>
  );
}
