
import Header from './components/header'
import Couter from './components/couter'
import { useState } from 'react'
function App() {
  const [count, setCount] = useState(0);
  console.log("count : ", count);

  return (
    <>
      <Header name="vũ hoàng huy" />
      <Couter count={count} />
      <button onClick={() => setCount(prev => prev + 1)}>increse</button>
    </>
  )
}

export default App
