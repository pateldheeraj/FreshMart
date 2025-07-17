import React, { useEffect, useState } from 'react'
import { CardLoading } from '../components/CardLoading'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { CardProduct } from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation, useParams } from 'react-router-dom'
import { NoData } from '../components/NoData'

export const Searchpage = () => {

  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const loadingArrayCard = new Array(10).fill(null)
  const [page,setPage] = useState(1)
  const [totalPage,setTotalPage] = useState(1)
  const params = useLocation()
  const searchText = params.search.slice(3)
  
  const fetchData = async() =>{
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data : {
          search : searchText,
          page : page,
          limit : 12
        }
      })
      const {data : responseData} = response
      
      if (responseData.message == "success") {
        if(responseData.data.page == 1 ){
          setData(responseData.data.data)
        } else {
          setData((prev)=>{
            return[
              ...prev,
              ...responseData.data.data
            ]
          })
        }
        setTotalPage(responseData.data.totalNoPage)
      }
    } catch (error) { 
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
     fetchData()
  },[page,searchText])
  const handleFetchMore = () =>{
    setPage(prev => prev+1)
  }
  return (
    <section className='bg-white'>
      <div className='container mx-auto p-4'>
        <p className='font-bold'>Search Results:{data.length}</p>
        <InfiniteScroll
        dataLength = {data.length}
        hasMore={true}
        next={handleFetchMore}
        >
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4'>
          {
            data.map((card,index)=>{
              return (
                <CardProduct key={index+"searchComponent"+card} data={card}/>
              )
            })
          }

          {
            loading && (
              loadingArrayCard.map((_,index)=>{
                return(
                  <CardLoading key={"loadingSearchPage"+index}/>
                )
              })
            )
          }
        </div>
        </InfiniteScroll>
        {
          <NoData/>
        }
      </div>
    </section>
  )
}
