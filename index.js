const grandparent = document.querySelector(".grandparent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

// Base usage

grandparent.addEventListener("click", (event) => {
    console.log(event);
});

// Default (Bubbling)
// grandparent.addEventListener('click', (e) => {
//   console.log("grandparent");
// });

// const onClickFunc = (event) => {
//   console.log("grandparent onclick");
// };

// grandparent.onclick = onClickFunc;

// grandparent.onclick = null;

// parent.addEventListener('click', (e) => {
//   console.log("parent");
// });

// child.addEventListener('click', (e) => {
//   e.stopPropagation()
//   e.stopImmediatePropagation()
//   console.log("child");
// });

// child.addEventListener('click', (e) => {

//     console.log("child2");
// });

// Capturing

// grandparent.addEventListener('click', (e) => {
//   console.log("grandparent capture");
//   // e.stopPropagation()
// }, {
//   capture: true
// });

// parent.addEventListener('click', (e) => {
//   console.log("parent capture");
// }, {
//   capture: true
// });

// child.addEventListener('click', (e) => {
//   console.log("child capture");
// }, {
//   capture: true
// });

// Run once (auto remove)
// parent.addEventListener('click', (e) => {
//   console.log("parent capture");
// }, {
//   once: true
// });

// Remove listeners

// bad

// child.removeEventListener('click', (e) => {
//   console.log("child");
// });

// good

// const reportChild = (e) => {
//   console.log("child");
// }

// child.addEventListener('click', reportChild);

// child.removeEventListener('click', reportChild);

// setTimeout(() => {
//   child.removeEventListener('click', reportChild);
// }, 3000);

// // Timing is key
// const divs = document.querySelectorAll('div')

// divs.forEach(div => {
//   div.addEventListener('click', () => {
//     console.log('div clicked');
//   })
// });

// const newDiv = document.createElement('div');
// newDiv.classList.add('new-div');
// document.body.appendChild(newDiv)

// // Delagation
// document.addEventListener('click', (e) => {
//   if (e.target.matches('div')) {
//     console.log('div clicked');
//   }
// });
