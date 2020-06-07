const  fs = require('fs');

let data = fs.readFileSync('../files/Estados.json', 'utf8');
const states = JSON.parse(data);

data = fs.readFileSync('../files/Cidades.json', 'utf8');
const cities = JSON.parse(data);

toPrintBiggerStates(5);
toPrintSmallStates(5);
toPrintLengthNameByState('A');
toPrintLengthNameByState('D');
toPrintLengthName('A');
toPrintLengthName('D');

function createFileFromJson(json, path) {
  fs.writeFile(path, JSON.stringify(json), (err) => {
    if (err) throw err;
  });
}

function createFileStates(state, path) {
  let filteredCities = cities.filter((city) => {
    if (city.Estado === state) {
      return true;
    } else {
      return false;
    }
  });
  createFileFromJson(filteredCities, path);
}

function countCities(state) {
  let path = `../files/${state}.json`;
  data = JSON.parse(fs.readFileSync(path, 'utf8'));

  return data.reduce((acumulator, city) => {
    return acumulator + 1;
  }, 0);
}

function totalCitiesAscendingOrder() {
  const list = totalByStates();
  return list.sort((a, b) => {
    return a.totalCities - b.totalCities;
  });
}

function totalCitiesDescendingOrder() {
  const list = totalByStates();
  console.log(typeof list);
  return list.sort((a, b) => {
    return b.totalCities - a.totalCities;
  });
}

function totalByStates() {
  let totalByStates = [];
  states.forEach((state, index) => {
    totalByStates.push({
      state: state.Sigla,
      totalCities: countCities(state.Sigla),
    });
  });
  return totalByStates;
}

function toPrintBiggerStates(amount) {
  const data = totalCitiesDescendingOrder();
  console.log('\nEstados com MAIOR quantidade de cidades');
  for (let i = 0; i < data.length; i++) {
    if (i < amount) {
      console.log(data[i]);
    }
  }
}

function toPrintSmallStates(amount) {
  const data = totalCitiesAscendingOrder();
  console.log('\nEstados com MENOR quantidade de cidades');
  for (let i = 0; i < data.length; i++) {
    if (i < amount) {
      console.log(data[i]);
    }
  }
}

function lengthNameCities(order) {
  let lengthNameCities = [];
  cities.forEach((city, index) => {
    lengthNameCities.push({
      name: city.Nome,
      length: city.Nome.length,
      state: getState(city.Estado).Sigla,
    });
  });
  return lengthNameCities.sort((a, b) => {
    if (order === 'A') {
      return a.length - b.length;
    }
    return b.length - a.length;
  });
}

function getState(id) {
  return states.find((state) => state.ID === id);
}

function toPrintLengthName(order) {
  if (order === 'A') {
    console.log('\nCidade de MENOR nome');
  } else {
    console.log('\nCidade de MAIOR nome');
  }
  let lengthName = lengthNameCities(order);
  const filter = lengthName[0].length;
  console.log(
    lengthName
      .filter((city) => city.length === filter)
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      })[0]
  );
}

function toPrintLengthNameByState(order) {
  if (order === 'A') {
    console.log('\nCidade de MENOR nome por ESTADO');
  } else {
    console.log('\nCidade de MAIOR nome por ESTADO');
  }
  let lengthName = lengthNameCities(order);
  let lengthNameByStates = [];
  states.forEach((state, index) => {
    console.log(
      lengthNameCities(order).filter((city) => city.state === state.Sigla)[0]
    );
  });
}
