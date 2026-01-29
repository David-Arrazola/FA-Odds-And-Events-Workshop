let bankArr = [];
const oddsArr = [];
const evensArr = [];

function addToBank(numToAdd) {
  bankArr.push(`${numToAdd}` + " ");
  render();
}

const sortNum = (currNum) => {
  Number(currNum) % 2 === 0
    ? evensArr.push(`${currNum}` + " ")
    : oddsArr.push(`${currNum}` + " ");
};

const sortOne = () => {
  if (bankArr.length === 0) return;
  sortNum(bankArr[0]);
  bankArr.shift();
  render();
};

const sortAll = () => {
  bankArr.map(sortNum);
  bankArr = [];
  render();
};

// COMPONENT
function InputForm() {
  const $bankForm = document.createElement("form");
  $bankForm.innerHTML = `
    <label>Add a number to the bank</label>
    <input type="number" name="inputNum" min="1" />
    <button type="submit">Add to bank</button>
    <button type="button" id="sort1Button" onClick="sortOne()">Sort 1</button>
    <button type="button" id="sortAllButton" onClick="sortAll()">Sort all</button>
    `;

  //EventListener function to make code look cleaner
  const bankHandler = (htmlForm) => {
    const formData = new FormData(htmlForm);
    const userInput = formData.get("inputNum");
    addToBank(Number(userInput));
  };

  $bankForm.addEventListener("submit", () => bankHandler($bankForm));
  //! this doesn't work because this form hasn't been added to DOM yet. DOM can't see button yet
  //document.querySelector("#sort1Button").addEventListener("click", sortOne);
  return $bankForm;
}

//COMPONENT
function Bank() {
  const $section = document.createElement("section");
  $section.replaceChildren(...bankArr);
  //   $section.classList.add("bankSection");
  return $section;
}

//COMPONENT
function Odds() {
  const $section = document.createElement("section");
  $section.replaceChildren(...oddsArr);
  //   $section.classList.add("bankSection");
  return $section;
}

//COMPONENT
function Evens() {
  const $section = document.createElement("section");
  $section.replaceChildren(...evensArr);
  return $section;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odds and Events</h1>
    <InputForm></InputForm>
    <h2>BANK</h2>
    <BankComponent></BankComponent>
    <h2>ODDS</h2>
    <OddComponent></OddComponent>
    <h2>EVENS</h2>
    <EvenComponent></EvenComponent>
    `;
  $app.querySelector("InputForm").replaceWith(InputForm());
  $app.querySelector("BankComponent").replaceWith(Bank());
  $app.querySelector("OddComponent").replaceWith(Odds());
  $app.querySelector("EvenComponent").replaceWith(Evens());
}
render();
