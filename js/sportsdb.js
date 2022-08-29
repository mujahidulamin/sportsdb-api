const loadSportsPlayer = (search) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${search}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySportsPlayer(data.player))
}

const displaySportsPlayer = (players) =>{
    const sportsContainer = document.getElementById('sports-container');
    sportsContainer.innerHTML = ``;
    players.forEach(player => {
        console.log(player);
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('col');
        playerDiv.innerHTML = `
        <div onclick = "loadPlayerDetail(${player.idPlayer})" class="card">
        <img src="${player.strThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Name: ${player.strPlayer}</h5>
          <p class="card-text">Team: ${player.strTeam}</p>
          <p class="card-text">Gender: ${player.strGender}</p>
          <p class="card-text">Date of Birth: ${player.dateBorn}</p>
        </div>
      </div>  
        `
        sportsContainer.appendChild(playerDiv);
    })

}

const searchPlayer = () => {
    const searchField = document.getElementById('search-feild');
    const searchText = searchField.value;
    loadSportsPlayer(searchText);
    searchField.value = '';
}

const loadPlayerDetail = (idPlayer) =>{
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${idPlayer}`
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displyPlayerDetail(data.players[0]))
}

const displyPlayerDetail = player =>{
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = ``;
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('card');
    detailDiv.innerHTML = `
    <img src="${player.strThumb}" class="card-img-top " alt="..." height="500px">
    <div class="card-body">
      <h5 class="card-title">Name: ${player.strPlayer}</h5>
      <p class="card-text "><span class="fw-bold">Description:</span> ${player.strDescriptionEN.slice(0, 200)}</p>
      <p class="card-text "><span class="fw-bold">Gender:</span> ${player.strGender}</p>
      <p class="card-text "><span class="fw-bold">Nationality:</span> ${player.strNationality}</p>
      <p class="card-text "><span class="fw-bold">Sport:</span> ${player.strSport}</p>
      <p class="card-text "><span class="fw-bold">Team:</span> ${player.strTeam}</p>
      <p class="card-text "><span class="fw-bold">Position:</span> ${player.strPosition}</p>
      <p class="card-text "><span class="fw-bold">Weight:</span> ${player.strWeight}</p>
    </div>
    `
    detailContainer.appendChild(detailDiv);
}

loadSportsPlayer('');