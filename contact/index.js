// console.log("hello world")

// const state = {
//     taskList: [
//         {
//             url: "",
//             title: "",
//             type: "",
//             description: ""
//         },
//         {
//             url: "",
//             title: "",
//             type: "",
//             description: ""
//         },
//         {
//             url: "",
//             title: "",
//             type: "",
//             description: ""
//         }
//     ]
// }

const state = {
    taskList: []
}


const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal_body");
// console.log(taskModal)


const htmlTaskContent = ({id, url, title, description, type}) => `
    <div class="col-md-6 col-lg-4 mt-3" id="${id}" key="${id}">
      <div class="card">
        <div class="card-header d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-outline-primary" name="${id}">
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button type="button" class="btn btn-outline-danger" name="${id}" onclick="deleteTask.apply(this,arguments)">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        <div class="card-body">
          ${ url ? `<img
            src="${url}"
            alt="card-img-top"
            class="card-img-top"
          />`
        : `<img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScujirQqIFjN5GuM1565_-DIX6OyU_96HzNBl_BAX8GL0JzMs8&s"
            alt="card-img-top"
            class="card-img-top"
          />`
        }
          <h4 class="card-title">${title}</h4>
          <p class="card-text">${description}</p>
          <div class="tags d-flex flex-wrap">
            <span class="badge bg-primary m-1">${type}</span>
          </div>
        </div>
        <div class="card-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#showTask"
            onclick= "openTask.apply(this, arguments)"
            id=${id}
            >
            Open Task
          </button>
        </div>
      </div>
    </div>
`


const htmlModalContent = ({id, url, title, description}) => {
    const date = new Date();
    return `
        <div id=${id}>
            ${ url ? `<img
            src="${url}"
            alt="card-img-top"
            class="img-fluid"
          />`
            : 
            `<img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fionicframework.com%2Fdocs%2Fapi%2Fcard&psig=AOvVaw0JlW4DnlV_O7ot253adsOa&ust=1728319877953000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNi5sLab-ogDFQAAAAAdAAAAABAJ"
            alt="card-img-top"
            class="img-fluid"
          />`
        }
          <strong>Created on ${date.toDateString()}</strong>
          <h2>${title}</h2>
          <p>${description}</p>
        </div>
    `
}


const updateLocalStorage = () => {
    localStorage.setItem('task', JSON.stringify({
        tasks: state.taskList
    }))
}

const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);

    if(localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardData)=> {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData))
    })
}


const handleSbmitBtn = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById('imageUrl').value,
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        type: document.getElementById('tags').value,
    }

    if(input.title == "" || input.description == "" || input.type ==""){
        return alert("Pls fill out all the neceesary fields")
    }

    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent({...input, id})
)

state.taskList.push({...input, id})
updateLocalStorage()

}



const openTask = (e) => {
    if(!e) e = window.event;

    const getTask = state.taskList.find(({id})=> id === e.target.id)
    taskModal.innerHTML = htmlModalContent(getTask)
}

const deleteTask = (e) => {
    if(!e) e = window.event;
    const targetId = e.target.getAttribute("name");
    const type = e.target.tagName;
    // console.log(type)

    const removeTask = state.taskList.filter(({id})=> id!== targetId)
    state.taskList = removeTask

    updateLocalStorage();
    if(type == "BUTTON"){
        console.log(e.target.parentNode.parentNode.parentNode)
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        )
    }
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode.parentNode
    )
}   


// const editTask = (e) => {
//     if(!e) e = window.event;

// }    