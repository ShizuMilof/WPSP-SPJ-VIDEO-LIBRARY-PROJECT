import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import {Link } from "react-router-dom";


const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  background-color:black;
  height:160px;

`;



const CoverImage = styled.img`
  object-fit: cover;
  border-radius:15px;
  height: 250px;
  width:200px;

 
`;


const InfoColumn = styled.div`

  display: flex;
  flex-direction: column;
  margin: 10px;
  border-radius:15px;
  height:250px;
  text-transform: uppercase;

`;


const MovieName = styled.span`
  font-size: 30px;
  font-weight: 600;
  margin-top:-20px;
  color:white;
  margin-bottom:20px;
`;


const MovieInfo = styled.span`
  font-size: 19px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin-top: -8px ;
  font-weight: bold;
  color:white;

`;





const UpdateLink = styled(Link)`
  color: white;
  border: 1px solid white;
  padding: 4.5px 8px;
  border-radius: 5px;
  margin-top:15px;

  font-size:13px;
  &:hover {
    border: 2px solid red;
    color: white;
  }
`;



const DeleteButton = styled.button`
  color: white;
  border: 1px solid white;
  padding: 2px 8px;
  border-radius: 5px;

  background-color: black;

  margin-left:5px;
  font-size:15px;


  &:hover {
    border: 2px solid red;
    color: white;
  }
  &.btn-delete-disabled {
    border: 2px solid black;
    color: black;
  }

`;


const FilmDodatniPodaci = (props) => {
  const [FilmInfo, setFilmInfo] = useState();
  const { odabraniFilm } = props;
 


  const [iznajmljen ] = useState('');
  console.log(iznajmljen);



    const [Zanrovi, setZanrovi] = useState([]);
    useEffect(() => {
        getZanrovi();
    },[]);

    async function getZanrovi()
    {
        try
        {
            const response = await Axios.get(`http://localhost/Videoteka-main/Videoteka_Martin/get_Zanrovi.php?Id=${odabraniFilm}`).then((response) =>
            {
              setZanrovi(response.data);
            });
            
        }
        catch(error)
        {
            
        }
    }

function getStatus(index) {

 /* setIznajmljen(index);*/

  if (index==1)
    return 'dostupan';
  else
    return 'nedostupan'  
}



  useEffect(() => {
    Axios.get(`http://localhost/Videoteka-main/Videoteka_Martin/read_specific_film.php?Id=${odabraniFilm}` ).then((response) => setFilmInfo(response.data));
    Axios.get(`http://localhost/Videoteka-main/Videoteka_Martin/get_Zanrovi.php?Id=${odabraniFilm}` ).then((response) => setZanrovi(response.data));
    
  }, [odabraniFilm]);


  async function deleteConfirm(id)
  {

      
        try 
        {    
            
            if(window.confirm("Jeste li sigurni da želite ukloniti film iz videoteke?"))
            { 
              
              
                
                  const readUrl = "http://localhost/Videoteka-main/Videoteka_Martin/query.php"
                  Axios({
                      method: "post",url: readUrl,data: {"Id":id,"json":"Obrisi"},headers: { "Content-Type": "multipart/form-data" },})
                      .then(function (response) {console.log(response);})
                      .catch(function (response) {console.log(response);});
                     
                
                window.location.reload();
            }
                
        } 
        catch (error) {
            
        }
    }

   return (

      FilmInfo?.length ? (
          FilmInfo.map((film) => (
              
            <Container  onClick={() => props.onFilmSelect()}  >

              <CoverImage src={film.Poster}  onClick={() => props.onFilmSelect()}    />
              <InfoColumn>
              
                <MovieName>
                {film.Naziv}
                </MovieName>
                <MovieInfo>
                  Šifra: #{film.Film_Id}
                </MovieInfo>
                <MovieInfo>
                  Opis: {film.Opis}
                </MovieInfo>
                <MovieInfo>
                  Trajanje: {film.Trajanje}h
                </MovieInfo>
                <MovieInfo>
                  Godina Izlaska: {film.Godina_Izlaska}.
                </MovieInfo>
                <MovieInfo>
                  Status: {getStatus(film.Status)}
                </MovieInfo>
                <MovieInfo>
                 Žanr: {film.Zanr}
                </MovieInfo>
                <MovieInfo>
                 Količina kopija: {film.Kolicina}
                </MovieInfo>

                <MovieInfo>


                <UpdateLink to={`/Edit/${odabraniFilm}`} className="btn btn-outline-primary update-link"> Ažuriraj </UpdateLink>

                
                 {film.Status==1?
                 <DeleteButton  className='btn-delete' color='dark'onClick={() => deleteConfirm(odabraniFilm)}>OBRIŠI</DeleteButton >
               :<DeleteButton  className='btn-delete'  color='dark'onClick={() => deleteConfirm(odabraniFilm)}>OBRIŠI</DeleteButton >}

                </MovieInfo>

              </InfoColumn>

            

            </Container>
          ))
        ) : (
          console.log("nema filma!")
        )

     
      
    
  );
};
export default FilmDodatniPodaci;