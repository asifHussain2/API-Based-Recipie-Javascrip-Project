let itemContainer = document.querySelector(".container");

function searchRecipie() {
  let input = document.querySelector("#searchInput").value;
  itemContainer.innerHTML = "";
  fetchData(input);
}

async function fetchData(input) {
  let query = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}
`;
  let response = await fetch(query);
  if (!response.ok) {
    console.log(response.status);
  }
  let data = await response.json();
  let meals = data.meals;
  console.log(meals[0]);
  let innerHtml = "";
  meals.forEach((item) => {
    let recipieItem = document.createElement("div");
    recipieItem.classList.add("item");
    recipieItem.innerHTML = `
    <img src='${item.strMealThumb}'></img>
    <h3>${item.strMeal}</h3>
     <p>${item.strArea}</p>
    <p>Category:${item.strCategory}</p>
   
    `;

    let viewButton = document.createElement("button");
    viewButton.textContent = "View Recipie";
    viewButton.classList.add("viewBtn");
    recipieItem.appendChild(viewButton);
    itemContainer.appendChild(recipieItem);

    viewButton.addEventListener("click", () => {
      view(item);
    });
  });
}

function view(item) {
  let recipieDetail = document.querySelector(".recipieDetail");
  let container = document.createElement("div");
  container.classList.add("itemContainer");
  let result = fetchIngredients(item);
  container.innerHTML = `
    <h2>${item.strMeal}</h2>
    <ul>${result}<ul>
    <h2>Instructions</h2>
    <p>${item.strInstructions}</p>
  `;
  recipieDetail.appendChild(container);
  recipieDetail.style.display = "Block";
}

function fetchIngredients(item) {
  let result = "";
  for (let i = 1; i <= 20; i++) {
    let ingredient = item[`strIngredient${i}`];
    if (ingredient) {
      let measure = item[`strMeasure${i}`];
      result += `<li>${ingredient}  ${measure}</li>`;
    } else {
      break;
    }
  }
  console.log(result);
  return result;
}

document.querySelector(".closeBtn").addEventListener("click", () => {
  let recipieDetail = document.querySelector(".recipieDetail");
  recipieDetail.style.display = "None";
  let child = document.querySelector(".itemContainer");
  recipieDetail.removeChild(child);
});
