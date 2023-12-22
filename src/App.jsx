import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

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

    // if(search.match(/^\)){
    //   setError('La busqueda debe tener al menos 3 caracteres')
    //   return
    // }
    if(search.length < 3){
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  },[search])

  return {search, updateSearch, error}
}
function App() {

  const {movies} = useMovies()
  const {search, updateSearch, error} = useSearch()
  
 

 const handleChange =(event)=>{
  updateSearch(event.target.value)
 }

 const handleSubmit=(e)=>{
  e.preventDefault()
  console.log({search}) 

 }

  return (
    <div className='page'>
     <header>
      <h1>Buscardor de peliculas</h1>
     <form className='form' onSubmit={handleSubmit}>
      <input value={search} onChange={handleChange} name='query' type="text" />
      
      <button type='submit'>Buscar</button>
     </form>
     {error  && <p style={{color:'red'}}>{error}</p>}
     </header>

     <main>
      <Movies movies={movies}></Movies>
     </main>
    </div>
  )
}

export default App
