/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import PropTypes from 'prop-types';

export function Timer({ timer, status, setTimer }) {
  useEffect(
    () => {
      const unsubscribe$ = new Subject(); // create a new subject

      interval(1000) // create an obsarvable that emits sequential numbers every second
        .pipe(takeUntil(unsubscribe$)) // the interval observable will emit values until unsubscribe emits a value
        .subscribe(() => { // by subscribtion we connect the observer to the observable to execute a following code block
          if (status === 'running') { // if status is 'running' we increase the timer by a second
            setTimer(value => value + 1000);
          }
        });

      return () => { // emiting a value of 'unsubscribe' to stop takeUntil
        unsubscribe$.next();
        unsubscribe$.complete();
      };
    },
    [status] // useEffected callback is executed every time when status is changes
  );

  return (
    <div className="timer box">
      {new Date(timer).toISOString().slice(11, 19)}
    </div>
  )
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  setTimer: PropTypes.func.isRequired,
};
