import axios from "axios"

const UsingAxios = () => {
    const handleFetch = async () => {
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
    }
  return (
    <div>
        <button onClick={handleFetch}>Fetch Data</button>
    </div>
  )
}

export default UsingAxios
