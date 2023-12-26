import { useCallback, useMemo, useRef, useState } from 'react'
import {searchMovies} from '../services/movies'
import responseMovies from '../mocks/with-result.json'
import withOutResult from '../mocks/without-result.json'

export function useMovies({search, sort}){
    const [movies, setMovies] = useState([])
    const [loading,setLodaing] = useState(false)
    const [error,setError] = useState(null) 

    // se guarda la busqueda anterior
    const previousSearch = useRef(search)

    const getMovies = useCallback( async ({search})=>{
            if(search === previousSearch.current) return
        
            try {
                setLodaing(true)
                setError(null)
                const newMovies = await searchMovies({search})
                setMovies(newMovies)
            } catch (error) {
                setError(error.message)
            }finally{
                setLodaing(false)
            }
    },[])

   

    const sortMovies = useMemo (() =>{
        return sort 
        ? 
        [...movies].sort((a,b) => a.title.localeCompare(b.title)) 
        :
        movies

    }, [sort, movies])
    

    return {movies:sortMovies,getMovies, loading}
}