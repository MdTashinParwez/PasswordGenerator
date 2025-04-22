import { useCallback, useState , useEffect ,useRef} from 'react'
import { Toaster, toast } from 'react-hot-toast'

import './App.css'

function App() {
  // State variables
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(true)
  const [Password, setPassword] = useState('')


  // useRef is used to create a mutable object that persists for the full lifetime of the component
  // useRef is used to create a reference to the password input field
  const passwordRef = useRef(null)

  const passwordGenerator =  useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str +="0123456789"
    if (charAllowed) str +="!@#$%^&*()_+[]{}|;:,.<>?~`"


    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length))
    }

    setPassword(pass)



  },[length, numberAllowed, charAllowed,setPassword])  

   const copyPassword = () => {
    passwordRef.current?.select();
     navigator.clipboard.writeText(Password);
      toast.success("Password copied to clipboard")
   }
   

   // Toaster is a component that displays notifications to the user


// useEffect kya h 
// useEffect is a hook that allows you to perform side effects in function components 
// useEffect to call passwordGenerator when any of the dependencies change
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed,passwordGenerator])
  
  return (
    <>

    {/*  HEADER  */}

    
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }}
    />
   
  <div className="w-full  max-w-md mx-auto shadow-md rounded-lg px-4 my-4 bg-gradient-to-r from-blue-400 to-blue-500 ">
    <h1 className="text-2xl  font-bold text-center text-white  py-4">Password Generator</h1>
  </div>

{/* w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-4 bg-gradient-to-r from-blue-400 to-blue-500 */}

  {/*  BODY  */}


  {/*    MAIN DIV  */}
  <div className=" w-full max-w-md mx-auto shadow-md  rounded-lg px- my-4 bg-gradient-to-r from-gray-700 to-gray-900  ring-1 ring-gray-800

 ">
   
    {/* password */}

  <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-white m-0 px-4 py-2'> 
    <input type="text"  value={Password} className='outline-none w-full py-1 px-3 ' placeholder='Password' readOnly
     ref={passwordRef} />
    
    <button onClick={copyPassword} className='rounded-xl outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-900 transition duration-300'>Copy</button>
  </div>

        {/*   OPTIONS */}

  <div className="flex text-sm  text-white gap-x-2">
    <div className="flex items-center gap-x-1">
      <input type="range"
      min={6} max={20} value={length}  className='cursor-pointer'
      onChange={(e) => setLength(e.target.value)} />
        <label>Length: {length}</label>
    </div>


    <div className="flex items-center gap-x-1">
      <input type="checkbox" checked={numberAllowed} onChange={(e) => {
        setNumberAllowed((Prev) => !Prev)
      }} />
      <label>Numbers</label>
    </div>


    <div className="flex items-center gap-x-1">
      <input type="checkbox" checked={charAllowed} onChange={(e) => {
        setCharAllowed((Prev) => !Prev)
      }} />
      <label>Special Characters</label>
      </div>


  </div>
  </div>
    </>
  )
}

export default App
