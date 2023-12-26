import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

import debounce  from 'just-debounce-it'

function useSearch() {
  
  const [search, updateSearch] = useState('')
  const [error , setError] = useState(null)
  const isFirtsInput = useRef(true)

  useEffect(()=>{

    if(isFirtsInput.current){
      isFirtsInput.current = search === ''
      return
    }
    if (search === ''){
      setError('Campo de busqueda vacio')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if(search.length < 3){
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  },[search])

  return {search, updateSearch, error}
}
function App() {

  const [sort , setSort] = useState(null)
  const {search, updateSearch, error} = useSearch()
  const {movies, getMovies, loading} = useMovies({search, sort})
  
 
const debounceGetMovies = useCallback(
  
  debounce(search =>{
    getMovies({search}) 
  },500)
,[])
  const handleSort =() =>{
    setSort(!sort)
  }
 const handleChange =(event)=>{
  const newSearch = event.target.value
  updateSearch(newSearch)
  debounceGetMovies(newSearch)
 }

 const handleSubmit=(e)=>{
  e.preventDefault()
  getMovies({search}) 

 }

  return (
    <div className='page'>
     <header>
      <h1>Buscardor de peliculas</h1>
     <form className='form' onSubmit={handleSubmit}>
      <input style={{border:'1px solid transparent ', borderColor: error ? 'red' : 'transparent'}}value={search} onChange={handleChange} name='query' type="text" />
      <input  type='checkbox' onChange={handleSort} checked={sort}/>
      <button type='submit'>Buscar</button>
     </form>
     {error  && <p style={{color:'red'}}>{error}</p>}
     </header>

     <main>
      {
        loading ? <p>Cargando</p>:<Movies movies={movies}></Movies>
      }
      
     </main>
    </div>
  )
}

export default App
