import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { format } from 'date-fns';

import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {Link } from "react-router-dom";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRadio
} from 'mdb-react-ui-kit';

import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import hr from "date-fns/locale/hr";
registerLocale("hr", hr);

const readURL = "http://localhost/Videoteka-main/Videoteka_Martin/read_gledatelj.php";
// Stilizirane komponente za boju slova u tablici
const StyledTable = styled(MDBTable)`


`;

const StyledTableHead = styled(MDBTableHead)`
color:white;

text-align: center;
`;

const StyledTableBody = styled(MDBTableBody)`
color: grey; 
font-size:33px;
text-align: center;


tr:hover {
  background-color: initial !important;

  color: darkred !important;
}
`;
const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  box-sizing: border-box; // Dodani stil

  // Ostatak stilova...
`;


const Header = styled.div`
  background-color: black;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  align-items: center;
`;



const Header2 = styled.div`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: row;
  padding: 10px;
  height: 70px;
  font-size: 22px;
  font-weight: bold;
  box-shadow: 0 px 0 0 red;
  border-bottom: 1px solid red;

  .btn {
    font-size: 25px;
    color: grey;
   
    margin-left: 120px;

    &:hover {
      color: red;
    }

     :nth-child(3) {
      color: darkred;
    }
  }
`;


const Button = styled.button`
  margin-top: 9px;
  font-size: 20px;
  padding: 15px 15px;
  width:234px;
 
  border-radius: 5px;
  background-color: black;
  color: white;
  border: 3px;
  cursor: pointer;
  text-transform: uppercase;
  border: 2px solid white; 
  border-radius:20px;

  margin-bottom:52px;
  margin-left:830px;



`;


 
const Wrapper = styled.div`
  margin: 0 auto;
  width: 1400px;
margin-top:50px;
height:1000px;

overflow-y: auto; 
::-webkit-scrollbar {
  width: 9px;
}

::-webkit-scrollbar-track {
  background: black;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 4px;
}


`;
const SearchBox = styled.div`
  margin-top: 6px;
  border-radius: 20px;
  margin-left: auto;
  width: 270px;
  background-color: red;
  height: 40px;
`;

const SearchInput = styled.input`
  font-size: 19px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-top: 4px;
  margin-left: 15px;
  background-color: red;
  width: 230px;

  ::placeholder {
    color: black;
  }
`;



const AppName = styled.div`
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: #e50914;
  letter-spacing: 7px;
  text-transform: uppercase;
  padding: 10px;
  border: 2px solid #000;
  border-radius: 40px;

`;


const DivNaslov = styled.div`
  font-size: 18px;
  color: #e50914;
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-left:200px;

`;




function AnimatedText({ text }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimationComplete, setIsAnimationComplete] = useState(true);
 

  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;



    

    const interval = setInterval(() => {
      currentText += text[currentIndex];
      setDisplayedText(currentText);
      currentIndex++;

      if (currentIndex === text.length) {
        clearInterval(interval);
        setIsAnimationComplete(true);
      }
    }, 0.1);

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return <AppName>{isAnimationComplete ? text : displayedText}</AppName>;
}


export default function ListaGledatelja()
{
  const [queryIme] = useState('');

  const [sortOrder, setSortOrder] = useState({
    ime: 'ascending',
    prezime: 'ascending'
  });  const [gledatelji, setGledatelji] = useState([]);




  useEffect(() => {
    getGledatelji();
  }, [sortOrder]);


 
  const handleSort = (column) => {
    if (column === 'ime') {
      setSortOrder(prevSortOrder => ({
        ...prevSortOrder,
        ime: prevSortOrder.ime === 'ascending' ? 'descending' : 'ascending'
      }));
    } else if (column === 'prezime') {
      setSortOrder(prevSortOrder => ({
        ...prevSortOrder,
        prezime: prevSortOrder.prezime === 'ascending' ? 'descending' : 'ascending'
      }));
    }
  };

  async function getGledatelji() {
    try {
      const response = await Axios.get(readURL);
      let sortedGledatelji = [...response.data];
  
      if (sortOrder.ime === 'ascending') {
        sortedGledatelji.sort((a, b) => a.Ime.localeCompare(b.Ime));
      } else if (sortOrder.ime === 'descending') {
        sortedGledatelji.sort((a, b) => b.Ime.localeCompare(a.Ime));
      }
  
      if (sortOrder.prezime === 'ascending') {
        sortedGledatelji.sort((a, b) => a.Prezime.localeCompare(b.Prezime));
      } else if (sortOrder.prezime === 'descending') {
        sortedGledatelji.sort((a, b) => b.Prezime.localeCompare(a.Prezime));
      }
  
      setGledatelji(sortedGledatelji);
    } catch (error) {
      // handle error
    }
  }

    const [inputs, setInputs] = useState({});
    console.log(inputs.prezime);

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
      } 



      const handleDelete = (oib) => {
        if(window.confirm("Jeste li sigurni da želite ukloniti korisnika iz videoteke?"))
        { 
          
        const deleteUrl = `http://localhost/Videoteka-main/Videoteka_Martin/delete_gledatelj.php`;
        Axios({
          method: "post",
          url: deleteUrl,
          data: {
            "id": oib
          },
          headers: { "Content-Type": "application/json" },
        })
          .then(function (response) {
            // handle success
            console.log(response);
            setGledatelji(gledatelji.filter(gledatelj => gledatelj.OIB !== oib)); // Ažurirajte stanje gledatelja nakon brisanja
          })
          .catch(function (response) {
            // handle error
            console.log(response);
          });
        }
      };
      




       
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const [startDate, setStartDate] = useState(new Date());
    const formattedDate = startDate !== null ?
    `${startDate.getDate()}-${startDate.getMonth()+1}-${startDate.getFullYear()}`:null
    console.log(formattedDate);
    
    const handleSubmit = (event) => {
      event.preventDefault();

      const readUrl = "http://localhost/Videoteka-main/Videoteka_Martin/query.php";
      Axios({
          method: "post",
          url: readUrl,
          data: 
          {
              "id": inputs.id,
              "ime": inputs.ime,
              "prezime": inputs.prezime,
              "spol": inputs.inlineRadio,
              "dat_rod": formattedDate,
              "statistika":inputs.statistika,
              "json":"addGledatelj"
              
            
              
          },
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            //handle success
            console.log(response);
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
          setBasicModal(false);
          setGledatelji([]);
          getGledatelji();  
          
          
          
      }  

    const [query, setQuery] = useState('');
      

    return (
    
       
<Container2>


<Header>
        <AnimatedText text="vuv Videoteka " />
      </Header>


      <Header2>
        <Link className="btn" to="/">
          Početna
        </Link>
        <Link className="btn" to="/dodaj">
          Dodaj Film
        </Link>
        <Link className="btn" to="/listagledatelja">
          Lista Gledatelja
        </Link>
        <Link className="btn" to="/zapisi">
          Zapisi
        </Link>
        <Link className="btn" to="/statistika">
          STATISTIKA
        </Link>
        <SearchBox>
        <SearchInput onChange={(e) => {
  setQuery(e.target.value);

}} placeholder="PRETRAŽI GLEDATELJA (IME)" />
</SearchBox>
     
      </Header2>
        
        <Wrapper>
       
        <DivNaslov> SORTIRANJE SILAZNO/UZLAZNO SE VRšI KLIKOM NA STUPAC PREZIME  </DivNaslov>

          <StyledTable  borderColor='white' className='m-table'>
          <StyledTableHead>
  <tr>
    <th scope='col'>ID</th>
    <th scope='col' >IME</th>
    <th scope='col' onClick={() => handleSort('prezime')}>PREZIME</th>
    <th scope='col'>SPOL</th>
    <th scope='col'>DATUM ROĐENJA</th>


    <th scope='col'>PROFIL KORISNIKA</th>
    <th scope='col'>UREDI</th>
    <th scope='col'>OBRIŠI</th> 
  </tr>
</StyledTableHead>


        
<StyledTableBody>
  {gledatelji
    .filter((gledatelj) => {
    if (query && queryIme) {
      return (
        gledatelj.OIB.includes(query) && gledatelj.Ime.includes(queryIme)
      );
    } else if (query) {
      return gledatelj.OIB.includes(query);
    } else if (queryIme) {
      return gledatelj.Ime.includes(queryIme);
    } else {
      return true;
    }
  })
  .map((gledatelj) => {
      return (
        <tr key={gledatelj.OIB.toString()}>
          <td>{gledatelj.OIB}</td>
          <td>{gledatelj.Ime}</td>
          <td>{gledatelj.Prezime}</td>
          <td>{gledatelj.Spol}</td>
          <td>{format(new Date(gledatelj.Datum_Rod), 'dd.MM.yyyy')}</td>
       
          <td>
            <Link style={{ marginBottom: '10px' }}
              to={`/opcije/${gledatelj.OIB}`}
              type="button"
              className="btn btn-outline-light"
            >
              PROFIL
            </Link>
          </td>
          <td>
            <Link  style={{ marginBottom: '10px' }}
              to={`/editG/${gledatelj.OIB}`}
              type="button"
              className="btn btn-outline-light"
            >
              UREDI
            </Link>
          </td>
          <td>
            <button  style={{ marginBottom: '10px' }}
              type="button"
              className="btn btn-outline-light"
              onClick={() => handleDelete(gledatelj.OIB)} 
            >
              OBRIŠI
            </button>
          </td> {/* Dodana ćelija za brisanje */}
        </tr>
      );
    })}
</StyledTableBody>
  
      </StyledTable>
     
      </Wrapper>
      <Button className='' color='dark' onClick={toggleShow}>Dodaj gledatelja</Button>
     
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Novi Gledatelj</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              
              <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                  <label>ID:</label>
                  <input type="text" pattern="[0-9]*" required className="form-control" 
                    onChange={handleChange}
                    name="id"
                    value={inputs.id || ""} 
                  />
                  
                </div>
                <div className="form-group">
                  <label>IME:</label>
                  <input type="text" required className="form-control" 
                    onChange={handleChange}
                    name="ime"
                    value={inputs.ime || ""} 
                  />
                  
                </div>
                <div className="form-group">
                  <label>PREZIME:</label>
                  <input type="text" required className="form-control" 
                    onChange={handleChange}
                    name="prezime"
                    value={inputs.prezime || ""} 
                  />
                  
                </div>
                <div className="form-group">
                  <label>DATUM ROĐENJA:</label>
                  <DatePicker
  dateFormat="dd.MM.yyyy"
  selected={startDate}
  onChange={(date) => setStartDate(date)}
  locale="hr"
/>         
                </div>
                <div className="form-group">
                  <label>SPOL: </label>
                  <MDBRadio name='inlineRadio' id='inlineRadio1' value='Ž' label='Žensko' onChange={handleChange}/>
                  <MDBRadio name='inlineRadio' id='inlineRadio2' value='M' label='Muško' onChange={handleChange}/>
                  
                  
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary mt-1 end-0">Dodaj</button>
                </div>
              </form>    
              
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Zatvori
              </MDBBtn>
  
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
  

    </Container2>
    );
}
