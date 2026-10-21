export default function Search({city, setCity}){
    return(


    <form className="form" onSubmit={handleSubmit}>

        <input placeholder="Enter city..." value={city} onChange={(e)=>{setCity(e.target.value)}}></input>
        <button>Submit</button>

    </form>
    )
}