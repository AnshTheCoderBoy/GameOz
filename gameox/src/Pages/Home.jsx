import React, { useEffect, useState } from 'react'
import GenreList from '../Componenets/GenreList'
import GlobalApi from '../Services/GlobalApi'
import Banner from '../Componenets/Banner';
import Slider from '../Componenets/Slider';
import TrendingGames from '../Componenets/TrendingGames';
import GamesByGenresId from '../Componenets/GamesByGenresId';

function Home() {
  const [allGameList,setAllGameList]=useState();
  const [gameListByGenres,setGameListByGenres]=useState([]);
  const [selctedGenresName,setSelctedGenresName]=useState('Action');

  useEffect(()=>{
    getAllGamesList();
    getGameListByGenresId(4);
  },[])

  const getAllGamesList=()=>{
    GlobalApi.getAllGames.then((resp)=>{
      setAllGameList(resp.data.results)
      
    })
  }

  const getGameListByGenresId=(id)=>{
 
    GlobalApi.getGameListByGenreId(id).then((resp)=>{
     
      setGameListByGenres(resp.data.results)
    })
  }
  return (
    <div className='grid grid-cols-4 px-8'>
        <div className='  z-50'>
          <GenreList 
          genereId={(genereId)=>getGameListByGenresId(genereId)}
          selectedGenresName={(name)=>setSelctedGenresName(name)}
           />
        </div>
        <div className='col-span-4 z-10 md:col-span-3'>
         {allGameList?.length>0&&gameListByGenres.length>0?
         <div>
          
          <Banner gameBanner={allGameList[1]} />
          <Slider/>
          <TrendingGames gameList={allGameList} />
          <GamesByGenresId gameList={gameListByGenres} 
          selctedGenresName={selctedGenresName} />
          </div>
          :null}
          </div>

    </div>
  )
}

export default Home