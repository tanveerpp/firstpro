import { useEffect, useState } from 'react';
import axios from 'axios';
const App=()=> {
  useEffect(
    function()
    {
      async function getData()
      {
        var res=await axios.get('http://restapittt.herokuapp.com/products/');
        console.log(res.data);
      }
      getData();
    }
  );
  return(
    <>
        <h1>App component is running.....</h1>
    </>
  )
}
export default App;
