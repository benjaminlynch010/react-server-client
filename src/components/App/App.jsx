import {useState, useEffect} from 'react';
import axios from 'axios'

function App () {

  // Will fetch creatures from server, and will set value of creatureListFetch to the axios response.
  const fetchCreature = () => {
    console.log('inside of fetchCreature()')
     axios.get('/creature')
     .then((response) => {
      console.log(response.data)

      // This wont work, because react does not do a rerender
      // creatureListFetch = response.dat
      setCreatureList(response.data)
     }).catch((error) => {
      console.log('Error GET /creature', error)
     })
  }

  const [creatureList, setCreatureList] = useState([]);
  // State for name
  const [newCreatureName, setNewCreatureName] = useState('');
  // State for origin
  const [newCreatureOrigin, setNewCreatureOrigin] = useState('')

  useEffect(() => {
    fetchCreature()
  }, [])

  const addCreature = (event) => {
    event.preventDefault();
    console.group()
      console.log("Inside of addCreature()")
      console.log('New Name:', newCreatureName)
      console.log('New Origin:', newCreatureOrigin)
    console.groupEnd()
 
    // POST request to send new creature to express server
    axios.post('/creature', {name: newCreatureName, origin: newCreatureOrigin}
    ).then((response) => {
      console.log(response);
      fetchCreature()
    }).catch((error) => {
      console.log('Error POST /creature')
    })
  }
  
  return (
    <div>
      <h2>Add Creature</h2>
      <form onSubmit={addCreature}>

        <label>Name:</label>
        <input id="name" onChange={(event) => {setNewCreatureName(event.target.value)}}></input>

        <label>Origin:</label>
        <input id="origin" onChange={(event) => {setNewCreatureOrigin(event.target.value)}}></input>

        <button type="submit">Add New Creature</button>
      </form>
      <ul>
        {creatureList?.map(creature => (
          <li key={creature.id}>
            {creature.name} is from {creature.origin}
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App
