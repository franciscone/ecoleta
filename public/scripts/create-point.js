
function populateUFs() {
    const ufSelect = document
        .querySelector("select[name = uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {

                ufSelect.innerHTML += `<option value= "${state.id}">${state.nome}</option>`
            }


        })
}
populateUFs()


function getCities(event) {
    const citySelect = document
        .querySelector("select[name = city]")
    const stateInput = document
        .querySelector("input[name = state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = false

    fetch(url)
        .then(res => res.json())
        .then(cities => {


            for (const city of cities) {

                citySelect.innerHTML += `<option value= "${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false

        })

}

document
    .querySelector("select[name = uf]")
    .addEventListener("change", getCities)

// itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name = items]")

//adicionar a seleção dos itens de coleta
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //console.log('ITEM ID: ', itemId)

    //verificar se existem items selecionados, se sim
    //pegar os items selecionados
    const alreaadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })

    //se ja estiver selecionado, 
    if (alreaadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        //atualizar a variavel após o filtro
        selectedItems = filteredItems
    } else {
        //se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }

    //console.log('selectedItems: ',selectedItems)

    //atualizar o campo escondido com os items selecionados
    collectedItems.value = selectedItems


}

