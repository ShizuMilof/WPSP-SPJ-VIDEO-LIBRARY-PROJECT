import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import Chart from 'chart.js';

const StyledTable = styled(MDBTable)`
`;

const StyledTableHead = styled(MDBTableHead)`
  color: white;
  font-size: 25px;
  text-align: center;
`;

const StyledTableBody = styled(MDBTableBody)`
  color: grey; 
  font-size: 33px;
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
  box-sizing: border-box;
`;

const DivNaslov = styled.div`
  font-size: 16px;
  color: #e50914;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-left: 150px;
`;

const Header = styled.div`
  background-color: black;
  height: 68px;
  display: flex;
  justify-content: center;
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
  box-shadow: 0px 0 0 red;
  border-bottom: 1px solid red;
  
  .btn {
    font-size: 25px;
    color: grey;
    margin-left: 120px;
    
    &:hover {
      color: red;
    }
    
    :nth-child(5) {
      color: darkred;
    }
  }
`;

const WrapperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  width: 43%;
  height: 990px;
  overflow-y: auto;
  margin-left: 100px;
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

const Wrapper1 = styled.div`
  width: 43%;
  height: 990px;
  overflow-y: auto;
  margin-right: 100px;
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

const LineSeparator = styled.div`
  width: 2px;
  background-color: grey;
  margin: 30px 0;
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

const readURL = "http://localhost/Videoteka-main/Videoteka_Martin/read2.php";
const readGledateljiURL = "http://localhost/Videoteka-main/Videoteka_Martin/read3.php";

export default function Statistika() {
  const [filmovi, setFilmovi] = useState([]);
  const [gledatelji, setGledatelji] = useState([]);

  useEffect(() => {
    async function dohvatiFilmove() {
      try {
        const response = await Axios.get(readURL);
        setFilmovi(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function dohvatiGledatelje() {
      try {
        const response = await Axios.get(readGledateljiURL); // Zamijenite readGledateljiURL s odgovarajućim URL-om za dohvaćanje gledatelja
        setGledatelji(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    dohvatiFilmove();
    dohvatiGledatelje();
  }, []);

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
      </Header2>

      <WrapperContainer>
        <Wrapper>
          <DivNaslov> TOP 5 NAJPOSUĐENIJIH FILMOVA vuv VIDEOTEKE </DivNaslov>
          <StyledTable>
            <StyledTableHead>
              <tr>
                <th>NAZIV FILMA</th>
                <th>ŽANR</th>
                <th>BROJ POSUDBI</th>
              </tr>
            </StyledTableHead>
            <StyledTableBody>
              {filmovi.map((film) => (
                <tr key={film.Film_Id}>
                  <td>{film.Naziv}</td>
                  <td>{film.Zanr}</td>
                  <td>{film.Statistika}</td>
                </tr>
              ))}
            </StyledTableBody>
          </StyledTable>
        </Wrapper>

        <LineSeparator />

        <Wrapper1>
          <DivNaslov> TOP 5 NAJAKTIVNIJIH KORISNIKA vuv VIDEOTEKE </DivNaslov>
          <StyledTable>
            <StyledTableHead>
              <tr>
                <th>IME</th>
                <th>PREZIME</th>
                <th>BROJ POSUDBI</th>
              </tr>
            </StyledTableHead>
            <StyledTableBody>
              {gledatelji.map((gled) => (
                <tr key={gled.Oib}>
                  <td>{gled.Ime}</td>
                  <td>{gled.Prezime}</td>
                  <td>{gled.Statistika}</td>
                </tr>
              ))}
            </StyledTableBody>
          </StyledTable>
        </Wrapper1>
      </WrapperContainer>
    </Container2>
  );
}
