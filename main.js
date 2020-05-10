// Rozwijane menu list

const allLists = [...document.querySelectorAll(".list")];
const allIcon = [...document.querySelectorAll(".icon")];
const allArrow = [...document.querySelectorAll(".arrow")];
const allBtn = [...document.querySelectorAll(".addBtn")];
const allInput = [...document.querySelectorAll(".input")];
const navButtons = [...document.querySelectorAll(".btnNav")];

const addKey = () => {
    allLists.forEach((list, key) => {
        list.dataset.keyLi = key;
    })

    allIcon.forEach((list, key) => {
        list.dataset.keyIcon = key;
    })

    allArrow.forEach((list, key) => {
        list.dataset.keyArr = key;
    })

    allBtn.forEach((list, key) => {
        list.dataset.keyBtn = key;
    })

    allInput.forEach((list, key) => {
        list.dataset.keyInput = key;
    })

    navButtons.forEach((list, key) => {
        list.dataset.keyNav = key;
    })
}

addKey();

const hideList = (e) => {
    let key = e.target.parentNode.dataset.keyArr;
    hide(key);
}

const hide = (key) => {
    const list = document.querySelector(`[data-key-li='${key}']`);
    const icon = document.querySelector(`[data-key-icon='${key}']`);
    const arrow = document.querySelector(`[data-key-arr='${key}']`);
    const arrowS = arrow.querySelector("i");

    // console.log(arrowS)
    if (list.style.display === "block" && icon.style.display === "block") {
        list.style.display = "none";
        icon.style.display = "none";
        arrowS.className = "fas fa-chevron-down"

    } else {
        list.style.display = "block";
        icon.style.display = "block";
        arrowS.className = "fas fa-chevron-up"
    }
}

for (let key = 0; key < allLists.length; key++) {
    document.querySelector(`[data-key-arr='${key}']`).addEventListener("click", hideList)
}

// Add to list


const test = [];
let theArr = [];

const createLiElem = (e) => {
    let key = e.target.dataset.keyBtn;
    let input = document.querySelector(`[data-key-input='${key}']`);
    const list = document.querySelector(`[data-key-li='${key}']`);

    const ul = list.querySelector("ul")
    const li = document.createElement('li');

    let liElem = document.createElement("span");
    liElem.className = "liElem";

    liElem.innerHTML = input.value
    if (liElem.innerHTML === "") {
        return;
    }

    li.appendChild(liElem);

    const label = document.createElement("label");
    label.className = "container";
    li.appendChild(label);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox"
    label.appendChild(checkbox);

    test.push(checkbox);
    console.log(test);
    // theArr = test.concat(checkboxAll);
   

    let checkmark = document.createElement("span");
    checkmark.className = "checkmark";
    label.appendChild(checkmark);

    ul.appendChild(li);
    input.value = "";
}



const addToList = (e) => {
    e.preventDefault();
    createLiElem(e);
    getLiArray();
   
}


for (let key = 0; key < allBtn.length; key++) {
    document.querySelector(`[data-key-btn='${key}']`).addEventListener("click", addToList)
}

// List eksport
const getLiArray = () => {
    for (let i = 0; i < allLists.length; i++) {
        const list = document.querySelector(`[data-key-li="${i}"`);
        let listLi = [...list.querySelectorAll("li")];
        let objArr = []
        let keyObj = `${i}obj`;

        listLi.forEach((element) => {
            const liSpan = element.querySelector(".liElem");
            let liText = liSpan.innerText;
            const checkbox = element.querySelector(".checkbox");
            let checkboxCheck = checkbox.checked;
            let obj = {
                text: liText,
                boolean: checkboxCheck,
            }
            objArr.push(obj);
            objArr = [...objArr];
        })
        saveToStorage(keyObj, objArr);
    }
}
const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}


// List Import

const listImport = () => {

    for (let key = 0; key < allLists.length; key++) {
        let storageKey = `${key}obj`;
        const getData = localStorage.getItem(storageKey);
        let importedList = JSON.parse(getData);

        importedList.forEach((element) => {
            createNewLiElem(element, key);
        })
    }
}

const removeChild = () => {
    for (let key = 0; key < allLists.length; key++) {
        const list = document.querySelector(`[data-key-li='${key}']`);
        const ul = list.querySelector("ul");
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    }
}

window.addEventListener('storage', removeChild())

const createNewLiElem = (element, key) => {
    const list = document.querySelector(`[data-key-li='${key}']`);
    const ul = list.querySelector("ul")
    const li = document.createElement('li');

    let liElem = document.createElement("span");
    liElem.className = "liElem";
    liElem.innerHTML = element.text;
    li.appendChild(liElem);

    const label = document.createElement("label");
    label.className = "container";
    li.appendChild(label);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox"
    checkbox.checked = element.boolean;
    label.appendChild(checkbox);

    let checkmark = document.createElement("span");
    checkmark.className = "checkmark";
    label.appendChild(checkmark);
    ul.appendChild(li);
}

window.addEventListener('load', listImport())

// Progress bar status

const checkbox = document.querySelector(".checkbox");
const checkboxAll = [...document.querySelectorAll(".checkbox")];
const progressBar = document.querySelector("#bar");
const statusVal = document.querySelector(".status");


// console.log(theArr)

const checkBoxCheck = (element) => {

    const checkboxChecked = [];
    checkboxAll.forEach((element) => {
        let boolean;
        if (element.checked) {
            boolean = true;
            checkboxChecked.push(boolean);
        }
    })
    // console.log(checkboxChecked.length);
    const status = (checkboxChecked.length / checkboxAll.length) * 100;
    progressBar.value = Math.floor(status);
    statusVal.innerText = `${progressBar.value}%`;
    // console.log(status);
    getLiArray();
  
}

window.addEventListener('load', checkBoxCheck)

checkboxAll.forEach((element) => {
    element.addEventListener('click', checkBoxCheck);
})

// console.log(checkboxAll)
// menu btns

navButtons.forEach((element) => {
    
    element.addEventListener("click", (e) => {
        let key = e.target.dataset.keyNav;
        hide(key);
    } )
  
})

// window.addEventListener('load',() => {
//     localStorage.clear()
// })