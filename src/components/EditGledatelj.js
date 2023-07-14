import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";





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
  font-weight: bold ;
  box-shadow: 0 px 0 0 red;
  border-bottom: 1px solid red;

  .btn {
    font-size: 25px;
    color: grey;
    margin-right: 40px;
    margin-left:160px;

 

    &:hover {
      color: red;
    }
    
      :nth-child(3) {
       color:darkred;
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


const Input = styled.input`
border-radius:20px;
padding:8px;
width:600px;
background-color:grey;
color: black;
font-weight: bold; 
font-size:20px;
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
  margin-top:342px;

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
      }, 140);
  
      return () => {
        clearInterval(interval);
      };
    }, [text]);
  
    return <AppName>{isAnimationComplete ? text : displayedText}</AppName>;
  }
  

export default function EditGledatelj()
{
    const [inputs, setInputs] = useState({});
    console.log(inputs.ime);
    let params = useParams();
    let GledId = params.GledId;
    const [id, setId] = useState('');
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [spol, setSpol] = useState('');
    const [dat_rod, setDat_Rod] = useState('');
    //console.log(selectedOptions);
    const navigate = useNavigate();

    useEffect(() => {
        getGledatelji(GledId);
    },[]);
  
    async function getGledatelji(GledId)
    {
        try
        {
            const response = await Axios.get(`http://localhost/Videoteka-main/Videoteka_Martin/read_specificGledatelj.php?Id=${GledId}`).then((response) =>
            {
                setId(response.data[0].OIB);
                setIme(response.data[0].Ime);
                setPrezime(response.data[0].Prezime);
                setSpol(response.data[0].Spol);
                setDat_Rod(response.data[0].Datum_Rod);
            });
            
        }
        catch(error)
        {
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const readUrl = "http://localhost/Videoteka-main/Videoteka_Martin/query.php";
        Axios({
            method: "post",
            url: readUrl,
            data: 
            {   
                "Id": inputs.id || GledId,
                "ime": inputs.ime || ime,
                "prezime": inputs.prezime || prezime,
             
                "json": "updateGledatelj"

                
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
           
            navigate('/listagledatelja');
        }


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }


    function formatirajDatum(datum) {
      const d = new Date(datum);
      const dan = d.getDate().toString().padStart(2, '0');
      const mjesec = (d.getMonth() + 1).toString().padStart(2, '0');
      const godina = d.getFullYear().toString();
      return `${dan}.${mjesec}.${godina}.`;
    }
    return(


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

</Header2>



<form className="form" onSubmit={handleSubmit}>





<FormGroup>
  <Label htmlFor="txtgled_id"> ID </Label>
  <Input
    required
    id="txtid"
    type="text"
    onChange={handleChange}
    name="id"
    value={  GledId }
  />
</FormGroup>



<FormGroup>
  <Label htmlFor="txtgled_ime">IME </Label>
  <Input
    required
    id="txtime"
    type="text"
    onChange={handleChange}
    name="ime"
    value={ inputs.ime || ime }
  />
</FormGroup>


<FormGroup>
  <Label htmlFor="txtgled_prez">PREZIME </Label>
  <Input
    required
    id="txtprez"
    type="text"
    onChange={handleChange}
    name="prezime"
    value={ inputs.prezime || prezime }
  />
</FormGroup>


<FormGroup>
  <Label htmlFor="txtgled_spol">SPOL </Label>
  <Input
    required
    id="txtspol"
    type="text"
    onChange={handleChange}
    name="spol"
    value={ spol} 
  />
</FormGroup>

       

<FormGroup>
  <Label htmlFor="txtgled_datrod">DATUM ROĐENJA</Label>
  <Input
    required
    id="txtdatrod"
    type="text"
    onChange={handleChange}
    name="dat_rod"
    value={formatirajDatum(dat_rod)}
  />
  <div className="form-group">
    <label></label>
    <Button type="submit">ažuriraj osobu</Button>
  </div>
</FormGroup>
           
            
           


               









                </form>
    </Container2>
    );
}