import { useCallback, useEffect, useState,useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [numberAdd, setNumberAdd] = useState(false);
  const [characterAdd, setCharacterAdd] = useState(false);
  const [password, setPassword] = useState("");

  const passGenerator = useCallback(() => {
    let pass = ""; // Use 'let' to allow reassignment
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAdd) {
      str += "0123456789";
    }
    if (characterAdd) {
      str += "!@#$%^&*-_+=[]{}~`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAdd, characterAdd]); // Add dependencies

  useEffect(() => {
    passGenerator();
  }, [passGenerator]); // Update effect dependencies

  const passwordRef = useRef(); // user get know copied text selected

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password); //select the text from input field
  }, [password])
  return (
    <>
      <div className="container mx-auto my-4 p-3 bg-dark text-warning rounded shadow-lg">
        <h1 className="text-white text-center mb-3">Password generator</h1>
        <div className="input-group mb-4 shadow-sm rounded">
          <input
            type="text"
            value={password}
            className="form-control"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="btn btn-primary">
            Copy
          </button>
        </div>
        <div className="d-flex flex-wrap gap-2 text-sm">
          <div className="d-flex align-items-center">
            <input
              type="range"
              min="6"
              max="100"
              value={length}
              className="form-range me-3"
              onChange={(e) => {
                setLength(Number(e.target.value)); // Ensure length is a number
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={numberAdd}
              id="numberInput"
              onChange={() => {
                setNumberAdd((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={characterAdd}
              id="characterInput"
              onChange={() => {
                setCharacterAdd((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
