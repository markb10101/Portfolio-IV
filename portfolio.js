//import { projectsArr } from "./data.js";


const portfolio = {
    timer: 0,
    maxItemFrame: 50,
    itemFrame: 50
}

//////////////////////////////////////////////////////////////////////
// add span tags to characters in h1
const h1El = document.querySelector('h1');
const h1Text = h1El.innerHTML;
const h1Arr = h1Text.split("");

let h1SpanArr = [];

h1Arr.forEach((char) => {
    h1SpanArr.push(`<span class="h1Char">${char}</span>`);
});

h1El.innerHTML = h1SpanArr.join("");



//////////////////////////////////////////////////////////////////////
// update active navbar link when in associated section
const navbarClassArr = ['.menu_home', '.menu_portfolio', '.menu_about', '.menu_contact'];
const navbarLinksArr = [];

const handleMenuChoice = (e) => {
    navbarLinksArr.forEach((link) => {
        if (link.classList.contains('current')) link.classList.remove('current');
    })
    e.classList.add('current')
}

navbarClassArr.forEach((link, index) => {
    navbarLinksArr.push(document.querySelector(navbarClassArr[index]));
    navbarLinksArr[index].addEventListener("click", e => { handleMenuChoice(e.currentTarget) });
});


const animate = () => {
    const animObjects = document.querySelectorAll('.object');
    const pageWidth = document.body.clientWidth;
    animObjects.forEach((item, index) => {
        item.style.left = `${(pageWidth/4) * Math.sin(portfolio.itemFrame + index/4) + (pageWidth/2)-20}px`;
        item.style.top = `${40 * index}px`;
        item.style.backgroundColor = `rgba(255,255,255,${0.5-(0.025*index)})`
    })
    portfolio.itemFrame -= 0.0125;
    if (portfolio.itemFrame <= 0) portfolio.itemFrame = portfolio.maxItemFrame;
}

//////////////////////////////////////////////////////////////////////
// div test


document.addEventListener('DOMContentLoaded', () => {

    portfolio.pageTop = document.querySelector('.pageTop');
    let objectsArr = [];
    for (i = 0; i < 20; i++) {
        let newObject = document.createElement('div');
        newObject.style.display = "block";
        newObject.style.zIndex = "999";
        newObject.style.position = "absolute";
        newObject.style.top = "100px";
        newObject.style.left = "200px";
        //newObject.innerHTML = `${i}`;
        newObject.classList.add('circle', 'object');
        objectsArr.push(newObject);
        portfolio.pageTop.append(objectsArr[i]);
    }



//     let newObject[i] = document.createElement('div');
//         newObject.style.display = "block";
//         newObject.style.zIndex = "999";
//         newObject.pageTop.append(testObject);
//         newObject.style.position = "absolute";
//         newObject.style.top = "0px";
//         newObject.style.left = "100px";
//         testObject.push()
//         document.createElement('div');
// //testObject.innerHTML = "TESTING";
//     

    


    setInterval(animate, 5);
})






//////////////////////////////////////////////////////////////////////