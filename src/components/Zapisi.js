import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link, useLocation } from "react-router-dom";

const StyledTable = styled(MDBTable)`


`;


const StyledTableHead = styled(MDBTableHead)`
color:white;

text-align: center;
`;
const Button = styled.button`
  margin-top: 9px;
  font-size: 20px;
  padding: 15px 15px;
  border-radius: 5px;
  background-color: black;
  color: white;
  border: 3px;
  cursor: pointer;
  text-transform: uppercase;
  border: 2px solid white; 
  border-radius:20px;
  margin-top:59px;
width:234px;
margin-bottom:51px;
margin-left:835px;
  &:hover {
    background-color: black;
    color:red;
    border: 4px solid red; 

  }
`;


const StyledTableBody = styled(MDBTableBody)`
color: grey; 
font-size:30px;
text-align: center;


tr:hover {
  background-color: initial !important;

  color: darkred !important;
}
`;


const SearchBox = styled.div`
  margin-top: 6px;
  border-radius: 20px;
  margin-left: auto;
  width: 250px;
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
  width: 200px;

  ::placeholder {
    color: black;
  }
`;


const SearchInput2 = styled.input`
  font-size: 19px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-top: 4px;
  margin-left: 15px;
  background-color: black;
  width: 10px;

  ::placeholder {
    color: black;
  }
`;


const Container2 = styled.div`
display: flex;
  flex-direction: column;
  background-color: black;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  
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

    :nth-child(4) {
      color: darkred;
    }
  }
`;


const Wrapper = styled.div`
  margin: 0 auto;
  width: 1450px;
margin-top:50px;
height:870px;

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


<div class="row">
  <div class="col-sm-3">col-sm-3
  </div>
  <div class="col-sm-6">col-sm-6
  </div>
  <div class="col-sm-3">col-sm-3
  </div>
</div>



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


export default function Zapisi() {
  
  const [gledateljIDInputValue, setGledateljIDInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [zapisi, setZapisi] = useState([]);
  
  useEffect(() => {
    getZapisi();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('gledateljID');


    setTimeout(() => {
      if (id) { // Provjera je li gledateljID dostupan
        setGledateljIDInputValue(id);
      }
    }, 10);

  }, []);

  


  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setGledateljIDInputValue(inputValue);
    setSearchQuery(inputValue);

  };

  const handleSearch = () => {
    const filteredZapisi = zapisi.filter((zapis) =>
      zapis.Id.includes(gledateljIDInputValue)
    );
    setZapisi(filteredZapisi);
  };


  async function getZapisi() {
    try {
      const response = await Axios.get(
        "http://localhost/Videoteka-main/Videoteka_Martin/read_zapis.php"
      );
      const filteredZapisi = response.data.filter((zapis) => zapis.Id.includes(gledateljIDInputValue));
      setZapisi(filteredZapisi);
    } catch (error) {
      // Handle error
    }
  }

  const formatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    separator: '.',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  
  
const renderCustomInput = ({ value, onClick }) => (
  <SearchInput
    onClick={onClick}
    value={value && value.toLocaleDateString('hr', formatOptions)}
    placeholder="Odaberite datum"
    readOnly
  />
);

  async function deleteZapisi() {
    try {
      await Axios.delete(
        "http://localhost/Videoteka-main/Videoteka_Martin/delete_zapisi.php"
      );
      setZapisi([]);
    } catch (error) {
      // Handle error
    }
  }

  const [query, setQuery] = useState("");

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
          <SearchInput value={searchQuery} onChange={handleInputChange} placeholder="PRETRAŽI ZAPIS" />
        </SearchBox>
      </Header2>


      {/* to je taj input */}
      <SearchInput2
        type="text"
        value={gledateljIDInputValue}
        onChange={handleInputChange}
      />
  

      
          <Wrapper>
        <StyledTable borderColor="white" className="m-table">
          <StyledTableHead>
            <tr>
            <th scope="col">ID</th>
              <th scope="col">IME</th>
              <th scope="col">PREZIME</th>
              <th scope="col">FILM</th>
              <th scope="col">IZDAVANJE</th>
              <th scope="col">POVRAT</th>
            </tr>
          </StyledTableHead>
         
          <StyledTableBody>
  {zapisi
    .filter((zapis) => zapis.Id.includes(gledateljIDInputValue))
    .map((zapis) => {
      const vrijemeIzdavanja = new Date(zapis.Vrijeme_Izdavanja);
      const formattedVrijemeIzdavanja = vrijemeIzdavanja.toLocaleTimeString('hr', formatOptions);
      
      const vrijemePovrata = new Date(zapis.Vrijeme_Povrata);
      const formattedVrijemePovrata = zapis.Vrijeme_Povrata ? vrijemePovrata.toLocaleTimeString('hr', formatOptions) : '';

      return (
        <tr>
          <td>{zapis.Id}</td>
          <td>{zapis.Ime}</td>
          <td>{zapis.Prezime}</td>
          <td>{zapis.Naziv}</td>
          <td>{formattedVrijemeIzdavanja}</td>
          <td>{formattedVrijemePovrata}</td>
        </tr>
      );
    })}
</StyledTableBody>


        </StyledTable>
      </Wrapper>

      <Button className="btn" onClick={deleteZapisi}>
        Obriši sve zapise
      </Button>
    </Container2>
  );
}

