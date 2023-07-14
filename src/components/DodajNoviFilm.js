import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";






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

    :nth-child(2) {
      color: darkred;
    }
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



const Container2 = styled.div`
display: flex;
  flex-direction: column;
  background-color: black;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  
`;

const FormGroup = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
margin-top:19px;
  `;

const Label = styled.label`

display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
color:white;
text-transform: uppercase;


`;

const Select = styled.select`
width:600px;

  padding: 8px;
  border-radius: 20px;
  background-color: grey;
  color: black;
  font-weight: bold;
  font-size: 20px;

  &:hover {
    font-size: 20px;
    color: black;
    border-color: red;
  }
`;


const Input = styled.input`
border-radius:20px;
padding:8px;
width:600px;
background-color:grey;
color: black;
font-size:20px;
font-weight: bold; 
  &:hover {
   
    font-size:20px;
    color: black;
    border-color: red;
  }
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
  margin-top:155px;

  &:hover {
    background-color: black;
    color:red;
    border: 4px solid red; 

  }
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
    },0.1 );

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return <AppName>{isAnimationComplete ? text : displayedText}</AppName>;
}



export default function DodajNoviFilm()
{

    const [inputs, setInputs] = useState({}); 
    console.log(inputs.naziv);
    
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const readUrl = "http://localhost/Videoteka-main/Videoteka_Martin/query.php";
        Axios({
            method: "post",
            url: readUrl,
            data: 
            {
                
              "sifra": inputs.sifra,
              "naziv": inputs.naziv,
              "opis": inputs.opis,
              "god": inputs.godina,
              "trajanje": inputs.trajanje,
              "poster": inputs.poster,
              "zanr":inputs.zanr,
              "kolicina":inputs.kolicina,
              "json":"addFilm"
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
           
            navigate('/');
        }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        } 
    
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

              <form className="form" onSubmit={handleSubmit}>
           

<FormGroup>
  <Label htmlFor="txtnaziv">Naziv filma</Label>
  <Input
    required
    id="txtnaziv"
    type="text"
    onChange={handleChange}
    name="naziv"
    value={inputs.naziv || ""}
  />
</FormGroup>

<FormGroup>
  <Label htmlFor="txtopis">Sinopsis(kratak sadržaj)</Label>
  <Input
    required
    id="txtopis"
    type="textarea"
    onChange={handleChange}
    name="opis"
    value={inputs.opis || ""}
  />
</FormGroup>

<FormGroup>
  <Label htmlFor="txttrajanje">Trajanje</Label>
  <Input
    required
    id="txttrajanje"
    type="text"
    onChange={handleChange}
    name="trajanje"
    value={inputs.trajanje || ""}
  />
</FormGroup>

<FormGroup>
  <Label htmlFor="txtgod">Godina izdavanja</Label>
  <Input
    required
    id="txtgod"
    type="date{text}"
    onChange={handleChange}
    name="godina"
    value={inputs.godina || ""}
  />
</FormGroup>

<FormGroup>
  <Label htmlFor="txtposter">URL - poster</Label>
  <Input
    required
    id="txtposter"
    type="text"
    onChange={handleChange}
    name="poster"
    value={inputs.poster || ""}
  />
</FormGroup>


<FormGroup>
  <Label htmlFor="txtzanr">Žanr</Label>
  <Select
    required
    id="txtzanr"
    onChange={handleChange}
    name="zanr"
    value={inputs.zanr }
  >
      <option value="">Odaberi žanr</option>
    <option value="Akcija">Akcija</option>
    <option value="Komedija">Komedija</option>
    <option value="Drama">Drama</option>
    <option value="Horor">Horor</option>
    {/* Add more genre options as needed */}
  </Select>
</FormGroup>



<FormGroup>
  <Label htmlFor="txtkolicina">Količina</Label>
  <Input
    required
    id="txtkolicina"
    type="text"
    onChange={handleChange}
    name="kolicina"
    value={inputs.kolicina || ""}
  />


  
<Button type="submit">dodaj film</Button>
</FormGroup>
       



</form>     

</Container2> 



        );
}   