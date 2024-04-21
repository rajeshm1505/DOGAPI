// To Fetch the Bread and Sub-breeds using the Public API

const BreadAPI = "https://dog.ceo/api/breeds/list";
const subBreedsAPI = "https://dog.ceo/api/breed/";
const DomSelect = document.querySelector('select');
const divContainer = document.getElementById('breads-container');



async function FetchData(id) {
    try {
      const response = await fetch(`${BreadAPI}`);
      const BreedJSON = await response.json();
      const breedsData = BreedJSON.message;
      
      let optionElement = "";
      let SubBreedName = "";
      for (let breed in breedsData) {
         
      
        const BreadsName = breedsData[breed];
       
        const responseSubbreads = await fetch(`${subBreedsAPI}${BreadsName}/list`);
        const responseSubBreadData = await responseSubbreads.json();
        const SbuBreaddata = JSON.parse(JSON.stringify(responseSubBreadData));
        const subBreedsName = SbuBreaddata.message;
        
        if (subBreedsName.length == 0 ){
          addSelectionDropdown(BreadsName, BreadsName);
        }

        for (let i = 0 ; i < subBreedsName.length;i++){
          SubBreedName = BreadsName.concat(" ",subBreedsName[i]);
            let breedId = SubBreedName.replace(" ", "/"); 
            addSelectionDropdown(breedId, SubBreedName);
        }
        
      }
    } catch (error) {
      console.log(error);
    }
  }

async function getSelectedOption(option)
{
  try {
    const res = await fetch(`https://dog.ceo/api/breed/${option}/images/random/alt `, {
      method: "GET",
      
    });
    const data1 = await res.json();
    divContainer.innerHTML = `<img id="dogimage" src=${data1.message} alt="Image Not Found" />`;
  } catch(error) {
    console.log(error);
  }
}

function addSelectionDropdown(Breadid ,BreadName){

          let optionElement = document.createElement('option');
          optionElement.id = Breadid;
          optionElement.value = BreadName; // Set the value of the option
          optionElement.textContent = BreadName; // Set the text content of the option
          DomSelect.appendChild(optionElement); // Append the option to the select element
}

function optionChanged() {
  var selectElement = DomSelect;
  var selectedOption = selectElement.options[selectElement.selectedIndex].id;
  getSelectedOption(selectedOption);
}

FetchData();
