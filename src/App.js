import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import FilmComponent from "./components/FilmComponent";
import FilmDodatniPodaci from "./components/FilmDodatniPodaci";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormGroup, Label, Input } from "reactstrap";

const readURL = "http://localhost/Videoteka-main/Videoteka_Martin/read.php";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  height: 100vh;
  overflow: hidden;

`;



const Container3 = styled.div`
  display: flex;
  margin-top:700px;
  flex-direction: column;
  background-color: ;
  height: ;
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

const Select = styled.select`
  font-size: 23px;
  font-weight: bold;
 border: none;
margin-top:10px;
  
  background-color: black;
  border-radius:25px;
  width: 150px;
  color: white;
  &:hover{
    border: 1px solid white;

  }
 
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

    :first-child {
      color: darkred;
    }
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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
  animation: ${fadeIn} 0.1s ease-in;
`;

const StyledSlider = styled(Slider)`
  margin-left: 80px;
  zoom: 0.7;
  width: 2700px;
  height: 100px;
  margin-top: 160px;

  .slick-prev,
  .slick-next {
    margin-top: 420px;
    margin-left: 20px;
    margin-right: 150px;
    transform: scale(4);
  }
`;

const DivNaslov = styled.div`
  color: white;
  font-size: 50px;
  text-transform: uppercase;
  margin-top: 200px;
  margin-left: 100px;
`;

function AnimatedText({ text }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

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
    }, 140);

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return <AppName>{isAnimationComplete ? text : displayedText}</AppName>;
}

const settings = {
  infinite: false,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 2,
  rows: 2,
};

function App() {
  const [filmovi, setFilmovi] = useState([]);
  const [odabraniFilm, onFilmSelect] = useState();
  const [odabraniFilmSifra, onFilmSifraSelect] = useState();
  const [query, setQuery] = useState("");
  const [zanr, setZanr] = useState("");
  const [Status, setStatus] = useState("");

  useEffect(() => {
    getFilmovi();
  }, [Status]);

  async function getFilmovi() {
    try {
      const response = await axios.get(readURL, { params: { status: Status } });
      setFilmovi(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleZanrChange(e) {
    setZanr(e.target.value);
  }
 

  function handleStatusChange(e) {
    setStatus(e.target.value);
  }



  return (
    <Container>
      
      <Header>
        <AnimatedText text="vuv Videoteka" />
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
          <SearchInput onChange={(e) => setQuery(e.target.value)} placeholder="PRETRAŽI FILM" />
        </SearchBox>
     
      </Header2>
  
   
      {odabraniFilm && (
        <FilmDodatniPodaci
          odabraniFilm={odabraniFilm}
          odabraniFilmSifra={odabraniFilmSifra}
          onFilmSelect={onFilmSelect}
          onFilmSifraSelect={onFilmSifraSelect}
        />
      )}
     <StyledSlider 
     
     
     
     
     {...settings}>
  {filmovi.length ? (
    filmovi
      .filter(
        (film) =>
          (film.Naziv.includes(query))  &&
          (zanr === "" || film.Zanr.includes(zanr)) &&
          (Status === "" || film.Status === Status)
      )
      .map((film, index) => (
        <FilmComponent
          key={index}
          film={film}
          onFilmSelect={onFilmSelect}
          onFilmSifraSelect={onFilmSifraSelect}
        />
      ))
  ) : (
    <DivNaslov>Videoteka je prazna</DivNaslov>
  )}
</StyledSlider>


  <Container3> 


  <FormGroup>
  <div style={{ display: "flex", justifyContent: "space-evenly" }}>
    <Select value={zanr} onChange={handleZanrChange}>
      <option value="">Svi žanrovi</option>
      <option value="Akcija">Akcija</option>
      <option value="Komedija">Komedija</option>
      <option value="Drama">Drama</option>
      <option value="Horor">Horor</option>
    
    </Select>

    <Select value={Status} onChange={handleStatusChange}>
      <option value="">Svi statusi</option>
      <option value="1">Dostupan</option>
      <option value="0">Nedostupan</option>
    </Select>
  </div>
</FormGroup>



  </Container3>

    </Container>
  
  );
}

export default App;
