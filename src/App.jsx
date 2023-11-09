import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isUpperCase,setIsUpperCase] = useState(false);
  const [isLowerCase,setIsLowerCase] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isUpperCase){
      str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    } 
    if(isLowerCase){
      str="abcdefghijklmnopqrstuvwxyz";
    }       
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()_-/*-+";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      console.log(char)
      pass += str.charAt(char);
      console.log(pass);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword,isUpperCase,isLowerCase]);

  const copyPasswordToClipbord = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator,isUpperCase,isLowerCase]);

  return (
    <>
      <div className="w-full body-font font-rubik max-w-4xl mx-auto h-60 shadow-md rounded-lg px-4 py-5 my-8 text-red-600 bg-gray-700">
        <h1 className="text-white text-center text-4xl my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-4  px-3  font-semibold"
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={copyPasswordToClipbord}
            className="outlint-none bg-red-600 text-lg px-3 py-0.5 shrink-0 group relative overflow-hidden shadow"
          >  
          <div className="absolute inset-0 w-3 bg-white-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span className="relative font-semibold	 text-white group-hover:text-black">Copy</span>
          </button>
        </div>
        <div className="flex text-lg gap-x-2">
          <div className="flex items-center gap-x-1 font-semibold	">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:<span className="text-white text-2xl">{length}</span></label>
          </div>
          <div className="flex text-lg items-center gap-x-1 font-semibold	">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex text-lg items-center gap-x-1 font-semibold	">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
          <div className="flex text-lg items-center gap-x-1 font-semibold	">
            <input
              type="checkbox"
              defaultChecked={isUpperCase}
              id="upperCaseInput"
              onChange={()=>{
                setIsUpperCase((prev)=> !prev)
              }}
            />
            <label>Uppercase</label>
          </div>
          <div className="flex items-center gap-x-1 font-semibold	">
            <input
              type="checkbox"
              defaultChecked={isLowerCase}
              id="characterInput"
               onChange={() => {
                 setIsLowerCase((prev) => !prev);
               }}
            />
            <label>Lowercase</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
