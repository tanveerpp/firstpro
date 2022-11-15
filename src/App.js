import { useEffect, useState } from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const App=()=> {
  var [pid,updatepid]=useState();
  var [data,updatedata]=useState([]);
  var [pro,updatepro]=useState({id:'',name:'',price:0,cat:'',cmp:''});
  useEffect(
    function()
    {
      async function getData()
      {
        var res=await axios.get('http://restapittt.herokuapp.com/products/');
        //console.log(res.data);
        updatedata(res.data);
      }
      getData();
    }
  );
  function changeval(e)
  {
    updatepid(e.target.value);      
  }
  const prochange=(e)=>{
    updatepro({...pro,[e.target.name]:e.target.value});
  }
  return(
    <>
        <h1>App component is running.....</h1>
        <form onSubmit={(e)=>{
          e.preventDefault();
          if(pro.id==='')
          {
            async function addpro()
            {
              var res=await axios.post("http://restapittt.herokuapp.com/products/",{name:pro.name,price:pro.price,cat:pro.cat,cmp:pro.cmp});
              if(res.status===201)
              {
                alert('product added sucessfully');
              }
            }
          addpro();
          }
          else
          {
            async function updatepro()
            {
                var res=await axios.put(`http://restapittt.herokuapp.com/products/${pro.id}/`,pro);
                if(res.status===200)
                {
                  alert('product updated sucessfully');
                }
            }
            updatepro();
          }
          updatepro({id:'',name:'',price:0,cat:'',cmp:''});
          //console.log(pro);
        }}>
          Name<input type="text" name="name" value={pro.name} onChange={prochange} /><br/>
          Price<input type="number" name="price" value={pro.price} onChange={prochange} /><br/>
          Category<input type="text" name="cat" value={pro.cat} onChange={prochange} /><br/>
          Company<input type="text" name="cmp" value={pro.cmp} onChange={prochange} /><br/>
          <button name="b1" className='btn btn-primary'>Add Product</button>
          <button name="b2" className='btn btn-primary'>Update Product</button>
        </form>
        <input type="number" name="pid" value={pid} onChange={changeval} />
        <button onClick={()=>{
          async function search()
          {
            var resp=await axios.get(`http://restapittt.herokuapp.com/products/${pid}/`);
            updatedata([resp.data])
          }
          search();
        }}>search</button>
        <table className='table table-bordered table-center'>
          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>PRODUCT Name</th>
              <th>PRODUCT PRICE</th>
              <th>PRODUCT CATEGORY</th>
              <th>PRODUCT COMPANY</th>
            </tr>
          </thead>
          <tbody>
            {data.map((v)=>{
                return(
                  
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.name}</td>
                    <td>{v.price}</td>
                    <td>{v.cat}</td>
                    <td>{v.cmp}</td>
                    <td><button className='btn btn-danger' onClick={()=>{
                      async function delpro()
                      {
                        var res=await axios.delete(`http://restapittt.herokuapp.com/products/${v.id}`)
                        if(res.status===204)
                        {
                          alert("product deleted sucessfully");
                        }
                      }
                      delpro();
                    }}>Delete</button></td>
                    <td><button className='btn btn-warning' onClick={()=>{
                      updatepro(v);
                      
                    }}>Update</button></td>
                  </tr>
                  
                )
            })}
          </tbody>
        </table>
    </>
  )
}
export default App;
