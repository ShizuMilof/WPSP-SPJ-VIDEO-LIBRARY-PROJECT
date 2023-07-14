import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {  MDBModal, MDBModalContent,MDBModalHeader, MDBModalTitle, MDBModalBody,}
 from 'mdb-react-ui-kit';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
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


const Slicica = styled.img`
    max-width:100%;
    height: 60px;
`;


const Container2 = styled.div`
display: flex;
  flex-direction: column;
  background-color: black;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  
`;

const Naslov2 = styled.div`
  color: white;
  font-size: 25px;
  text-transform: uppercase;
  margin-top: 10px;
  margin-bottom: -40px;
  margin-left: 300px;
  letter-spacing: 4px; /* Dodajte željeni razmak između slova */
`;


const ModalDialog=styled.div`

width:400px;
margin-left:40vw;
margin-top:410px;

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
const Wrapper = styled.div`
 
  width: 1365px;
margin-top:50px;
height:700px;
margin-left:-58px;

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

const Button = styled.button`

  font-size: 20px;
  padding: 15px 15px;
  width:234px;
margin-top:75px;

 margin-left:400px;
  border-radius: 5px;
  background-color: black;
  color: white;
  border: 3px;
  cursor: pointer;
  text-transform: uppercase;
  border: 2px solid white; 
  border-radius:20px;


`;


const Button2 = styled.button`

  font-size: 20px;
  padding: 15px 15px;
  width:234px;


 margin-left:20px;
  border-radius: 5px;
  background-color: black;
  color: white;
  border: 3px;
  cursor: pointer;
  text-transform: uppercase;
  border: 2px solid white; 
  border-radius:20px;

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




export default function DodatneOpcije()
{



  const navigate = useNavigate();
  
  
      let { GledateljId } = useParams();
      let {Kolicina} =useParams();

      const handleClick = () => {
        const gledateljID = GledateljId; // Zamijenite sa stvarnim ID-om ili pročitajte iz nekog izvora podataka
        navigate(`/zapisi?gledateljID=${gledateljID}`);
        console.log("Gledatelj ID:", gledateljID);
      };



    const [IzdaniFilmoviGledatelja, setIzdaniFilmoviGledatelja] = useState([]);
    useEffect(() => {
        getIzdaniFilmoviGledatelja();
    },[]);



    async function getIzdaniFilmoviGledatelja()
    {
        try
        {
            const response = await Axios.get(`http://localhost/Videoteka-main/Videoteka_Martin/get_IzdaniFilmGledatelj.php?Id=${GledateljId}`).then((response) =>
            {
                setIzdaniFilmoviGledatelja(response.data);
            });
            
        }
        catch(error)
        {
          
        }
    }


    const [GledateljInfo, setGledateljInfo] = useState([]);
    useEffect(() => {
        getGledateljInfo();
    },[]);

    async function getGledateljInfo()
    {
        try
        {
            const response = await Axios.get(`http://localhost/Videoteka-main/Videoteka_Martin/read_specificGledatelj.php?Id=${GledateljId}`).then((response) =>
            {
                setGledateljInfo(response.data);
            });
            
        }
        catch(error)
        {
      
        }
    }


    async function deleteConfirm(id)
    {
        try 
        {
           
            const readUrl = "http://localhost/Videoteka-main/Videoteka_Martin/query.php";
            Axios({
                method: "post",url: readUrl,data: {"Id":id, "gledatelj_id":GledateljId, "json":"povratFilma"},headers: { "Content-Type": "multipart/form-data" },})
                .then(function (response) {console.log(response);})
                .catch(function (response) {console.log(response);});
                setIzdaniFilmoviGledatelja([]);
                getIzdaniFilmoviGledatelja();
                setDostupniFilmovi([]);
                getFilmovi();
            
                
        } 
        catch (error) {
            
        }
    }


    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);



    const [DostupniFilmovi, setDostupniFilmovi] = useState([]);
    useEffect(() => {
        getFilmovi(GledateljId); // Proslijedi gledatelj_id funkciji getFilmovi
    },[GledateljId]); // Dodaj GledateljId kao ovisnost
    
    async function getFilmovi(gledateljId) { // Dodaj gledateljId kao argument
        try {
            const response = await Axios.get(`http://localhost/Videoteka-main/Videoteka_Martin/get_DostupniFilmovi.php?gledateljId=${gledateljId}`).then((response) => {
                setDostupniFilmovi(response.data);
            });
        } catch(error) {
            // Obrada greške
        }
    }


  const options = (
    
    DostupniFilmovi.map((film,index) => (
      {   
        
        value: film.Film_Id, label: film.Naziv +" (" + film.Kolicina + ")"}
    )) 
  );
  console.log(options);


    
 

    const [userChoice, setUserChoice] = useState("");
    console.log(userChoice);


    const [inputs, setInputs] = useState({});
  

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
      } 

      const handleSubmit = (event) => {
        
        event.preventDefault();
      
        const readUrl = "http://localhost/Videoteka-main/Videoteka_Martin/updateIFG.php";
        Axios({
          method: "post",
          url: readUrl,
          data: {
            film_id: userChoice,
            gledatelj_id: GledateljId,
            vrijeme_izdavanja: new Date().toLocaleString() + "",
            kolicina: Kolicina,
          },
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            console.log(response);
            // Remove the issued film from the list of available films
            setDostupniFilmovi((prevFilms) =>
              prevFilms.filter((film) => film.Film_Id !== userChoice)
            );
            // Refresh the list of issued films and remove the issued film from the list
            setIzdaniFilmoviGledatelja((prevFilms) =>
              prevFilms.filter((film) => film.Id_Film !== userChoice)
            );
          })
          .catch(function (response) {
            console.log(response);
          });
      };
      
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

</Header2>
        
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
      

          {GledateljInfo.map((ifg) => {

return(
  
 
 

<Naslov2>{"PREGLED PROFILA KORISNIKA  " + ifg.Ime + "  " +"" + ifg.Prezime }</Naslov2>   
 




  );
  
})}




              <Wrapper>

              <StyledTable  borderColor='white' className='m-table'>
              <StyledTableHead>
                  <tr>
                  <th scope='col'>POSTER</th>
                  <th scope='col'>NAZIV</th>
                  <th scope='col'>ŠIFRA</th>
                  <th scope='col'>GODINA IZLASKA</th>
                  <th scope='col'>POVRAT FILMA</th>
                  
                  </tr>
                  </StyledTableHead>
                  <StyledTableBody>
  {IzdaniFilmoviGledatelja?.length ? (
    IzdaniFilmoviGledatelja.filter((ifg) => ifg.Naziv_Film.includes(query)).map((ifg) => {
      return (
        <tr key={ifg.Id ? ifg.Id.toString() : ''}>

          <td><Slicica src={ifg.Poster_Film} /></td>
       
          <td>{ifg.Naziv_Film}</td>
          <td>{ifg.Id_Film}</td>
          <td>{ifg.Godina_Izlaska_Film}</td>
          <td>  <button className="btn btn-outline-danger" onClick={() => { deleteConfirm(ifg.Id_Film);window.location.reload();}}> Povrat </button></td>

        </tr>
      );
    })
    ) : (
      <td colSpan={6}>JOŠ NEMA POSUĐENIH FILMOVA</td>
      )}
 </StyledTableBody>

</StyledTable>
</Wrapper>
      <Button onClick={toggleShow}>Izdaj Novi Film</Button>

      <Button2  className="btn2" onClick={handleClick} > Zapisi korisnika </Button2>
  
     
          </div>
          <div className="col-md-2">
              
            
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
              <ModalDialog>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>ODABERITE FILM</MDBModalTitle>
                  </MDBModalHeader>

                  <MDBModalBody>
                    
                    <form className="form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>FILM:</label>
                        <Select options={options} onChange={(choice) => setUserChoice(choice.value)}
                         
                          
                        />
                        {}
                      </div>
                      <div className="form-group">
                      <button type="submit" className="btn btn-primary mt-1 end-0" onClick={() => {  toggleShow();  window.location.reload(); }} >Dodaj</button>


                      </div>
                    </form>    
                    
                  </MDBModalBody>
                </MDBModalContent>
              </ModalDialog>
            </MDBModal>
            
          </div>
        </div>
          
      
    </Container2>
    );
}
