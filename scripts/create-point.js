
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';

    fetch(url)
        .then(res => res.json())
        .then(states => {
            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=cityId]");
    const stateInput = document.querySelector("input[name=state]");
    const cityInput = document.querySelector("input[name=city]");
    cityInput.value = "";

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const uf = event.target.value;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`;

    citySelect.innerHTML = `<option value"">Selecione a cidade</option>`;

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}

function cityInputSelected(event) {
    const cityInput = document.querySelector("input[name=city]");
    const indexOfSelectedCity = event.target.selectedIndex;
    cityInput.value = event.target.options[indexOfSelectedCity].text;
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

document
    .querySelector("select[name=cityId]")
    .addEventListener("change", cityInputSelected)