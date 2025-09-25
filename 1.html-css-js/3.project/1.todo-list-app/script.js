const tasks = [];
let btnAdd = document.querySelector(".btn-add");
let listHtml = document.querySelector(".list-tasks");
let listStatus = document.querySelector(".list-status");
let task = {
    name: '',
    status: true
};
let indexGlobal;

// tạo sự kiến lắng nghe cho input 
document.querySelector("#input-text").addEventListener('input', function () {
    task.name = this.value;
})

// sự kiện add task vào list
btnAdd.addEventListener('click', function () {
    tasks.push({ name: task.name, status: false })
    renderHtmlList(tasks)
})
// render list 
const renderHtmlList = (tasks, globalStatus = 'all') => {
    listHtml.innerText = '';
    tasks.map((item, index) => {
        renderHtmlItem(item.name, item.status, index, globalStatus);
    })
}
// render html 
const renderHtmlItem = (content, status, index, globalStatus) => {
    // tạo li 
    let li = document.createElement("li");
    // tạo thẻ a và btn - delete 
    let a = document.createElement("a");
    let btn = document.createElement("button");
    let input = document.createElement("input");
    input.type = 'checkbox';
    a.innerText = content;
    btn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    btn.classList = 'btn-remove'
    btn.addEventListener('click', function () {
        deleteItemByIndex(index)
    })
    if (status) {
        input.checked = true;
        li.classList.add('finished');
    } else {
        li.classList.remove('finished');
        input.checked = false;
    }
    input.addEventListener('change', function () {
        setNewStatus(index);
    })
    if (globalStatus === 'finished') {
        if (status !== true) {
            li.style.display = "none";
        }
    }
    if (globalStatus === 'unfinished') {
        if (status !== false) {
            li.style.display = "none";
        }
    }
    li.appendChild(input);
    li.appendChild(a)
    li.appendChild(btn)
    listHtml.appendChild(li);
}
// delete task
const deleteItemByIndex = (index) => {
    tasks.splice(index, 1);
    renderHtmlList(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// đổi trạng thái task
const setNewStatus = (index) => {
    let toggle = tasks[index].status;
    let newStatus = !toggle;
    tasks[index].status = newStatus;
    renderHtmlList(tasks);
}

// render status
const renderStatus = () => {
    let btn1 = document.createElement("button")
    let btn2 = document.createElement("button")
    let btn3 = document.createElement("button")
    // gán nội dung 
    btn1.innerText = 'all'
    btn2.innerText = 'finished'
    btn3.innerText = 'unfinished'
    // gán sự kiện
    btn1.addEventListener('click', function () {
        // sử lý lọc
        btn1.style.backgroundColor = 'green'
        btn2.style.backgroundColor = 'red'
        btn3.style.backgroundColor = 'red'
        renderHtmlList(tasks, this.innerText.trim())
    })

    btn2.addEventListener('click', function () {
        // sử lý học finished  <=> true
        btn2.style.backgroundColor = 'green'
        btn1.style.backgroundColor = 'red'
        btn3.style.backgroundColor = 'red'
        renderHtmlList(tasks, this.innerText.trim())
    })
    btn3.addEventListener('click', function () {
        // sử lý học unfinished  <=> false
        btn1.style.backgroundColor = 'red'
        btn2.style.backgroundColor = 'red'
        btn3.style.backgroundColor = 'green'
        renderHtmlList(tasks, this.innerText.trim())
    })
    listStatus.appendChild(btn1)
    listStatus.appendChild(btn2)
    listStatus.appendChild(btn3)
}


renderStatus();