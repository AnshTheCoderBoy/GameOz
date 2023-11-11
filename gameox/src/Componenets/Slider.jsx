import React, { useEffect,useState,useRef} from 'react'
import GlobalApi from '../Services/GlobalApi'
import { HiChevronLeft,HiChevronRight } from "react-icons/hi2";
function Slider() {
    const [bestSeller,setBestSeller]=useState([]);
    const elementRef=useRef();
    
    useEffect(()=>{

        getBestSellerGames()

    },[])

    const getBestSellerGames=()=>{
        GlobalApi.getAllGames.then((resp)=>{
            console.log(resp.data.results)
            setBestSeller(resp.data.results)
        })
    }
    const sliderRight=(element)=>{
      element.scrollLeft+=950
    }
    const sliderLeft=(element)=>{
      element.scrollRight-=950
      console.log('left')
    }
  return (
   <div className='w-full relative'>
      <div className='w-full h-fit md:flex justify-between absolute hidden  z-50'>
        <HiChevronLeft  onClick={()=>sliderLeft(elementRef.current)} className='  text-white text-[30px]  mx-8 mt-[200px]  cursor-pointer font-bold ' />
        <HiChevronRight onClick={()=>sliderRight(elementRef.current)} className='  text-white text-[30px]  mx-8 mt-[200px] cursor-pointer float-right font-bold ' />
     
      </div>
     <div className='flex overflow-x-auto relative scrollbar-none scroll-smooth z-0' ref={elementRef}>
      {bestSeller.map((item,index)=>index<5&&(

      <div className='shrink-0 w-full' key='index'>
        <div className='absolute lg:bottom-0 lg:top-auto top-[10px] p-5   lg:bg-gradient-to-t from-slate-900 to-transparent w-full'>
          <h1 className='lg:text-[24px] text-[18px] text-white font-bold mb-5'>{item.name}</h1>
          <buttom className='bg-blue-700 text-white px-2 py-1 rounded-lg'>Get Now</buttom>
        </div>
        <img src={item.background_image} className=' w-full  lg:h-[410px] object-fit rounded-lg' />
       

      </div>

     ))}
     
    </div>
   </div>
  )
}

export default Slider
