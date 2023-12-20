import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [iceCream, setIceCream] = useState([])

  useEffect(() => {
    const fetchFlavors = async () => {
      console.log("in fetch foods")
      const {data} = await axios.get('http://localhost:3001/api/flavors/')
      setIceCream(data)
    }

    fetchFlavors()
  },[])

  const deleteFlavor = async(flavorDlt) => {
  console.log(flavorDlt)
  try{
    const response = await axios.delete(`http://localhost:3001/api/flavors/${flavorDlt.id}`)
    const newFlavors = iceCream.filter((flavor) => {
      return flavor.id !== flavorDlt.id
    })
    setIceCream(newFlavors)
  } catch (error) {
    console.log(error)
  }
}
  return (
    <>
      <div>
        <h1>Ice-Land Ice-Cream Shop</h1>
        <p>We currently have {iceCream.length} different flavors available and we have highlighted our best sellers in blue!. If you do not like any of the available flavors please press the X button on the right to remove the obtion</p>
        {
          

          iceCream.map((flavor) => {
            return (
              <div key={flavor.id}>
                  <ul>
                  <li key={flavor.id} className={flavor.is_favorite ? 'favorite' : null}>{flavor.name}  <button onClick={() => {deleteFlavor(flavor)}}>X</button>  </li>
                    </ul>
                  </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
