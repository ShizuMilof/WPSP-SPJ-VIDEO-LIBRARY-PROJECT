import React from "react";
import styled from "styled-components";

const FilmContainer = styled.div`
  margin-top:23px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: 350px; 
  border: 2px solid white;

   border-color: white;
  border-radius: 20px;
  cursor: pointer;
  height:450px;
margin-left:90px;

:hover{
border-color:red}
`;


const CoverImage = styled.img`
  object-fit: cover;
  height: 380px; 
  border-radius: 20px;
  padding: 5px;
  position: static;

`;


const FilmName = styled.span`
  font-size: 25px;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  
`;

const FilmComponent = (props) => {
    const {Film_Id, Film_Sifra, Naziv, Opis, Status, Godina_Izlaska, Trajanje, Poster, Zanr,Kolicina,Statistika} = props.film;
  
    return (
      <FilmContainer onClick={()=> {props.onFilmSelect(Film_Id); props.onFilmSifraSelect(Film_Sifra); window.scrollTo({ top: 0, behavior: "smooth" });}} >
        <CoverImage src={Poster} alt={Naziv} />
        <FilmName>{Naziv}</FilmName>
      </FilmContainer>
    );
  };
  export default FilmComponent;