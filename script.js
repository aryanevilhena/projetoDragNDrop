let areas = {
    a: null,
    b: null,
    c: null
}


document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
})

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver) // vai ser rodada sempre que arrastar o item e ele passar por cima da área que passou o evento
    area.addEventListener('dragleave', dragLeave) // 
    area.addEventListener('drop', drop)
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral)
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral)
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral)


// funções de itens
function dragStart(e){
    e.currentTarget.classList.add('dragging')
}

function dragEnd(e){
    e.currentTarget.classList.remove('dragging')
}

// Funções de área
function dragOver(e){
    if(e.currentTarget.querySelector('.item') === null){
    e.preventDefault()
    e.currentTarget.classList.add('hover')
    }
}

function dragLeave(e){
    e.currentTarget.classList.remove('hover')
}

function drop(e){
    e.currentTarget.classList.remove('hover')

    if(e.currentTarget.querySelector('.item') === null){
        let dragItem = document.querySelector('.item.dragging')
        e.currentTarget.appendChild(dragItem) // entrar dentro deste elemento e adicionar mais um item no final
        updateAreas()
    }
}

function dragOverNeutral(e){
    e.preventDefault()
    e.currentTarget.classList.add('hover')
}

function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover')
}

function dropNeutral(e){
    e.currentTarget.classList.remove('hover')
    let dragItem = document.querySelector('.item.dragging')
    e.currentTarget.appendChild(dragItem)
    updateAreas()
}

// funções de lógica do processo
function updateAreas(){
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name')

        if(area.querySelector('.item') !== null){
            areas[name] = area.querySelector('.item').innerHTML
        } else{
            areas[name] = null
        }
    })

    if(areas.a === '1' && areas.b === '2' && areas.c === '3' || areas.a === '3' && areas.b === '2' && areas.c === '1'){
        document.querySelector('.areas').classList.add('correct')
    } else{
        document.querySelector('.areas').classList.remove('correct')

    }
}