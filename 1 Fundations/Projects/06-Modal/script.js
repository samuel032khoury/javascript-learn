'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');
const showBtn = document.querySelectorAll('.show-modal');

const toggle = (hide, effectElements) => {
    effectElements.forEach(effectElement => {
        hide ?
            effectElement.classList.add('hidden') :
            effectElement.classList.remove('hidden');
    })
}

const toggleModal = (hide) => toggle(hide, [modal, overlay])

/*Add eventListener to the trigger, to toggle element display status*/
// const toggleDisplay = (trigger, hide, effectElements) => {
//
//
//     trigger.addEventListener('click', () => {
//         effectElements.forEach((element) => {
//             toggle(element)
//         })
//     })
// }
// const toggleDisplayDefaults = (trigger, hide) => toggleDisplay(trigger, hide, [modal, overlay])
/*Less abstraction - but more straightforward*/


for (let i = 0; i < showBtn.length; i++) {
    // const helper = function () {
    //     console.log(this)
    //     toggleModal(false)
    // }
    // showBtn[i].addEventListener('click', helper)
    showBtn[i].addEventListener('click', () => {
        // console.log(i) This works because of the snippet above (a function is created within the for scope)
        toggleModal(false)
    })
}
closeBtn.addEventListener('click', () => {
    toggleModal(true)
})
overlay.addEventListener('click', () => {
    toggleModal(true)
})

document.addEventListener('keydown', (evt)=> {
    if (evt.key === 'Escape' && !modal.classList.contains('hidden')) {
        toggleModal(true)
    }
})