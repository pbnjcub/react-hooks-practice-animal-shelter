import React from "react";

function Pet({pet, onAdoptPet}) {

function onAdopt(e) {
  e.preventDefault()
  fetch(`http://localhost:3001/pets/${pet.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        isAdopted: !pet.isAdopted
      }),
  })
  .then(resp => resp.json())
  .then(data => onAdoptPet(data))
}

  return (
    <div className="card" data-testid="pet">
      <div className="content">
        <span className="header">
          {pet.gender === 'male' ? '♂' : '♀'} {pet.name}
        </span>
        <div className="meta">
          <span className="date">{pet.type}</span>
        </div>
        <div className="description">
          <p>Age: {pet.age}</p>
          <p>Weight: {pet.weight}</p>
        </div>
      </div>
      <div className="extra content">
        <button className={pet.isAdopted ? "ui primary button" : "ui disabled button"} onClick={onAdopt}>Already adopted</button>
        <button className={pet.isAdopted ? "ui disabled button" : "ui primary button"} onClick={onAdopt}>Adopt pet</button>
      </div>
    </div>
  );
}

export default Pet;
