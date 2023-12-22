export function ListOfMovies({movies}){
    return(
        <ul className="movies">
            
            {
                movies.map(movie =>(
                <li className="movie" key={movie.id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.title} />
                </li>
            ))
            }
            
        </ul>
    )
}

export function RenderNoResult(){
    return(
        <p>No hay resultados</p>
    )
}

export function Movies({movies}){
    const hasMovies= movies.length>0
    return(
        hasMovies?(
            <ListOfMovies movies={movies}></ListOfMovies>
          ):(
            <RenderNoResult></RenderNoResult>
          )
    )
}