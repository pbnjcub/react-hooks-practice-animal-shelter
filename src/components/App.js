import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState('all');

  useEffect(() => {
    fetch('http://localhost:3001/pets')
    .then((resp) => resp.json())
    .then((data) => setPets(data))
  }, [])

  function onChangeType(filterType) {
    setFilters(filterType)
  }

  function onFindPetsClick() {
    let searchType = ''
    if (filters === 'all') {
      searchType = '/pets'
    } else if (filters === 'cat') {
      searchType = '/pets?type=cat'
    } else if (filters === 'dog') {
      searchType = '/pets?type=dog'
    } else {
      searchType = '/pets?type=micropig'
    }
    let fetchUrl = `http://localhost:3001${searchType}`
      fetch(fetchUrl)
      .then((resp) => resp.json())
      .then((data) => {
        setPets(data)
      })
    }

    function onAdoptPet(updatedPet) {
      console.log(updatedPet)
      const updatedPets = pets.map((pet) => {
        if (pet.id === updatedPet.id) {
          return updatedPet;
        } else {
          return pet;
        }
      });
      setPets(updatedPets);
    }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} filters={filters} setFilters={setFilters} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
