import { projectsArr } from "./data.js";

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
    if(link.classList.contains('current')) link.classList.remove('current');
    })
    e.classList.add('current')
}

navbarClassArr.forEach((link,index) => {
    navbarLinksArr.push(document.querySelector(navbarClassArr[index]));
    navbarLinksArr[index].addEventListener("click", e => {handleMenuChoice(e.currentTarget)});
}); 

















//////////////////////////////////////////////////////////////////////