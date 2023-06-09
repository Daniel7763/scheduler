import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  //keeps a history of states in an array
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      //if replace is true, change mode, don't add to history so that back calls the last time replace was not true.
      setMode(newMode);
    } else {
      setMode(newMode);
      //copies everything that already exists in history AND newMode
      setHistory((prev) => [...prev, newMode]);
    }
  }

  function back() {
    history.pop();
    if (history.length >= 1) {
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}