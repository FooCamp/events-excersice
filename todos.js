// Add todos code
const sampleToDo = document.querySelector('.sample');
const addToDo = document.querySelector('.add');
const toDoList = document.querySelector('.todos');
const titleTxt = document.querySelector('#title');
const contentTxt = document.querySelector('#content');

// Create a shadow root
let shadowDiv = document.createElement("div");
let shadow = shadowDiv.attachShadow({mode: 'closed'});

addToDo.addEventListener('click', (ev) => {
    const newToDo = sampleToDo.cloneNode(true);
    newToDo.classList.remove('hide', 'sample');
    
    const title = newToDo.querySelector('.title');
    title.innerText = titleTxt.value;
    
    const text = newToDo.querySelector('.contents__text');
    text.innerText = contentTxt.value;

    toDoList.appendChild(newToDo);
    addToDoListeners(newToDo);
    ev.preventDefault();
})

const addToDoListeners = (toDo) => {
    let isExpanded = false;
    let isPublished = false;
    let isDestroyed = false;
    let beforeDestroy = '';
        
    const controls = toDo.querySelector('.controls');
    const expandButton = toDo.querySelector('.expand-trigger');
    const publishButton = toDo.querySelector('.publish-trigger');
    const destroyButton = toDo.querySelector('.destroy-trigger');
    const linkTitle = toDo.querySelector('.trigger-link');
    const title = toDo.querySelector('.title');
    const contents = toDo.querySelector('.contents');
    const header = toDo.querySelector('.heading');
    
    const openContent = (ev) => {
        if(!isPublished){
            contents.classList.toggle('contents--open');
            isExpanded = !isExpanded;
            expandButton.innerText = isExpanded ? "collapse" : "expand";
        }
        if(ev){
            ev.preventDefault();
            ev.stopPropagation();
        }
    }
    expandButton.addEventListener('click', openContent);
    header.addEventListener('click', openContent);
    linkTitle.addEventListener('click', openContent);
    
    linkTitle.addEventListener('mouseenter', (ev) => {
        if(!isExpanded && !isPublished)
            contents.classList.add('contents--preview');
    })
    linkTitle.addEventListener('mouseleave', (ev) => {
        contents.classList.remove('contents--preview');
    })
    
    const copyCut = (ev) => {
        if(!isPublished){
            alert("I'm so sorry, but you can't copy. :(")
            ev.preventDefault();
        }
    }
    contents.addEventListener('copy', copyCut);
    contents.addEventListener('cut', copyCut);

    const focus = (ev) => {
        contents.style.background = "#287233";
        contents.style.color = "#fff";
        ev.stopPropagation();
    }
    const blur = (ev) => {
        contents.style.background = "";
        contents.style.color = "";
        ev.stopPropagation();
    }
    contents.addEventListener("focus", focus);    
    contents.addEventListener("blur", blur);    


    const publish = (ev) => {
        isPublished = true;
        publishButton.innerText = "published!";
        publishButton.disabled = true;
        toDo.classList.add("todo--published");
        if(ev){
            ev.stopPropagation();
        }
    }
    publishButton.addEventListener('click', publish);

    const destroy = (ev) => {
        isDestroyed = !isDestroyed;
        destroyButton.innerText = isDestroyed ? "Restore" : "X";
        toDo.classList.toggle("todo--destroyed");
        ev.stopPropagation();
        
        if(isDestroyed){
            if(isPublished){
                beforeDestroy = "Published";
                toDo.classList.remove("todo--published");
                isPublished = false;
            } 
            else if(isExpanded){
                beforeDestroy = "Open";
                contents.classList.remove('contents--open');
                isExpanded = false;
            }
            else {
                beforeDestroy = "";
            }
            shadow.appendChild(expandButton);
            shadow.appendChild(publishButton);
            shadow.appendChild(contents);
            shadow.appendChild(title);
        }
        else {
            if(beforeDestroy == "Published"){
                publish();
            } 
            else if(beforeDestroy == "Open"){
                openContent();
            }
            controls.insertBefore(publishButton, destroyButton);
            controls.insertBefore(expandButton, destroyButton);
            toDo.appendChild(contents);
            linkTitle.appendChild(title);
        }

    }
    destroyButton.addEventListener('click', destroy);
}

const hideSample = () => {
    shadow.appendChild(sampleToDo);
}
hideSample();