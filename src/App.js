import logo from './logo.svg';
import './App.css';
import './loading.css'

import {useState, useEffect, useRef} from 'react'
import axios from 'axios';

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';

function App() {
  const [rutas, setRutas] = useState([]);
  const [allData, setAllData] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false) // loading
  const [noData, setNoData] = useState(false) // no data
  
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  
  const obtenerDatos = () => {
    // GET request for remote image in node.js
    axios.get('http://localhost:8080/api/products')
    //axios.get('https://rutasq2-back.vercel.app/api/products')
      .then(res => {
        //console.log(res.data);
        setRutas(res.data)
        setAllData(res.data)
        setLoading(true) // loading
      })
  }
  
  const obtenerCategorias = () => {
    // GET request for remote image in node.js
    axios.get('http://localhost:8080/api/categories')
    //axios.get('https://rutasq2-back.vercel.app/api/categories')
      .then(res => {
        //console.log(res.data);
        setCategorias(res.data)
      })
  }
  
  useEffect(() => {
    obtenerDatos();
    obtenerCategorias();
  },[])
  
  
  const handleSearch = (event) => {
    const keyword = event.target.value;
    
    if (keyword !== '') {
      const results = allData.filter((user) => {
        //return user.title.toLowerCase().startsWith(keyword.toLowerCase());
        return user.nombre.toLowerCase().includes(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });

      inputRef2.current.value = "--Todos--";
      setRutas(results);
      
      // NoData
      if (results.length === 0) {
        setNoData(true)
      }
      else setNoData(false)
      

    } else {
      setRutas(allData);
      setNoData(false) // Data
      // If the text field is empty, show all users
    }

  }
  
  
  const handleCategory = (event) => {
    const keyword = event.target.value;
    
    if (keyword !== '--Todos--') {
      const results = allData.filter((user) => {
        //return user.title.toLowerCase().startsWith(keyword.toLowerCase());
        return user.categoria.toLowerCase().includes(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });

      inputRef.current.value = "";
      setRutas(results);
      setNoData(false) // data

    } else {
      setRutas(allData);
      setNoData(false) // data
      // If the text field is empty, show all users
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="title">
          Resumen del Listado de Paginas
        </h1>
        
        <Form>
          <Container>
            <Row className='flexCol'>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Busqueda:</Form.Label>
                    <Form.Control
                      placeholder="Ingresar nombre"
                      aria-label="Ingresar nombre"
                      aria-describedby="basic-addon2"
                      className='inputLar'
                      autoComplete="off"
                      onChange={event => handleSearch(event)}
                      ref={inputRef}
                    />
                </Form.Group>
              </Col>
              
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Categoria:</Form.Label>
                  <Form.Select aria-label="Floating label select example" onChange={event => handleCategory(event)} ref={inputRef2}>
                    <option>--Todos--</option>
                    {
                      categorias.map(item => (
                        <option key={item.id} value={item.nombre}>{item.nombre}</option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
          
            </Row>
          </Container>
        </Form>
        
        {loading ? (
        
          <Card>
            <Card.Body>
          
              <Table striped bordered hover size="md" >
                <thead>
                  <tr>
                    <th className='text-center'>N°</th>
                    <th>Nombre de Requerimiento</th>
                    <th className='text-center'>Categoria</th>
                    <th className='text-center'>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {rutas.map((item,index) => (
                    <tr key={item.id}>
                      <td className='text-center'>{index+1}</td>
                      <td>{item.nombre}</td>
                      <td className='text-center'>{item.categoria}</td>
                      <td className='text-center'>
                      <a
                        className='btn btn-primary'
                        target="_blank"
                        rel="noreferrer"
                        href={item.link}
                      >
                        Ver
                      </a>
                      </td>
                    </tr>
                  ))}
                  
                  
                </tbody>
              </Table>
              
              {noData ? (
                <h3 className="text-center text-black mt-5">No Data to Show...</h3>
              ) : ("")}
          
            </Card.Body>
          </Card>
        
        ) : (
        
          <div className="flexLoad">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
        
        )}

        
        
      </header>
    </div>
  );
}

export default App;
