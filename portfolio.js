import { projectsArr } from "./data.js";

const portfolio = {}

const balls = {
    amplitude: 0.1,
    frequency: 2,
    offsetX: 0.8,
    offsetY: 0,
    spread: 10,
    colorHex: '#FFFF32',
    opacity: 0.8,
    fade: 0.5,
    animStep: 0,
    animResolution: 0.025,

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
//const navbarEl = document.querySelector('.navbar');


const handleMenuChoice = (e) => {
    navbarLinksArr.forEach((link, index) => {
        if (link.classList.contains('current')) link.classList.remove('current');
        if (link === e) {
            //move animation window 
            //portfolio.animWindow.style.top = `${60 + (935 * index)}px`;
            // attach to navbar
            //portfolio.pageTop.appendChild(portfolio.animWindow);
            portfolio.animWindow.style.position = "fixed";
            // portfolio.animWindow.style.top = 20px; //`${60 + (935 * index)}px`;
        }
    })
    e.classList.add('current')
}

navbarClassArr.forEach((link, index) => {
    navbarLinksArr.push(document.querySelector(navbarClassArr[index]));
    navbarLinksArr[index].addEventListener("click", e => { handleMenuChoice(e.currentTarget) });
});

const hexToRGB = (hexVal, alpha = 1.0) => {

    const redVal = parseInt(hexVal.slice(1, 3), 16);
    const greenVal = parseInt(hexVal.slice(3, 5), 16);
    const blueVal = parseInt(hexVal.slice(5, 7), 16);

    return `rgba(${redVal},${greenVal},${blueVal},${alpha})`;
  
}

//////////////////////////////////////////////////////////////////////
// sine balls

const setupAnimatingElements = () => {
    portfolio.pageTop = document.querySelector('.pageTop');
    let objectsArr = [];
    for (let i = 0; i < 80; i++) {
        let newObject = document.createElement('div');
        newObject.style.display = "block";
        newObject.style.zIndex = "999";
        newObject.style.position = "absolute";
        newObject.style.top = "100px";
        newObject.style.left = "200px";
        newObject.classList.add('circle', 'object');
        objectsArr.push(newObject);
        portfolio.pageTop.append(objectsArr[i]);
    }
}


const setupAnimationOptions = () => {

    portfolio.animWindow = document.querySelector('.anim_options');

    const closeButton = document.querySelector('.close');
    closeButton.innerText = 'X';
    closeButton.onclick = () => {
        portfolio.animWindow.style.display = "none";
    };

    const iconSettings = document.querySelector('.icon_settings');
    iconSettings.onclick = () => {
        portfolio.animWindow.style.display === "none" ? portfolio.animWindow.style.display = "block" : portfolio.animWindow.style.display = "none";
    };

    const sliderAmplitude = document.querySelector('.slider.amplitude');
    sliderAmplitude.defaultValue = balls.amplitude * 100;
    sliderAmplitude.oninput = () => {
        balls.amplitude = sliderAmplitude.value / 100;
    }
    const sliderFrequency = document.querySelector('.slider.frequency');
    sliderFrequency.defaultValue = balls.frequency * 100;
    sliderFrequency.oninput = () => {
        balls.frequency = sliderFrequency.value / 100;
    }
    const sliderOffsetX = document.querySelector('.slider.offsetX');
    sliderOffsetX.defaultValue = balls.offsetX * 100;
    sliderOffsetX.oninput = () => {
        balls.offsetX = sliderOffsetX.value / 100;
    }
    const sliderOffsetY = document.querySelector('.slider.offsetY');
    sliderOffsetY.defaultValue = balls.offsetY * 100;
    sliderOffsetY.oninput = () => {
        balls.offsetY = sliderOffsetY.value / 100;
    }
    const sliderSpread = document.querySelector('.slider.spread');
    sliderSpread.defaultValue = balls.spread;
    sliderSpread.oninput = () => {
        balls.spread = sliderSpread.value;
    }

    portfolio.colorSelectorEl = document.querySelector('.colorSelector');
    portfolio.colorSelectorEl.value = balls.colorHex;
   
    const sliderColOpacity = document.querySelector('.slider.opacity');
    sliderColOpacity.defaultValue = balls.opacity * 1000;
    sliderColOpacity.oninput = () => {
        balls.opacity = sliderColOpacity.value / 1000;
    }
    const sliderColFade = document.querySelector('.slider.fade');
    sliderColFade.defaultValue = balls.fade * 500;
    sliderColFade.oninput = () => {
        balls.fade = 1.0 * sliderColFade.value / 500;
    }
    const sliderSpeed = document.querySelector('.slider.speed');
    sliderSpeed.defaultValue = balls.animResolution * 1000;
    sliderSpeed.oninput = () => {
        balls.animResolution = sliderSpeed.value / 1000;
    }
}

const animate = () => {
    const animObjectsArr = document.querySelectorAll('.object');
    const pageWidth = document.body.clientWidth;
    animObjectsArr.forEach((item, index) => {
        const sinVal = Math.sin(balls.animStep + index * balls.frequency)
        const position = (pageWidth * balls.amplitude) * sinVal + (pageWidth * balls.offsetX) - 20
        item.style.zIndex = "1";
        item.style.left = `${position}px`;
        item.style.top = `${(balls.offsetY * 2810) + (balls.spread * index)}px`;
        item.style.backgroundImage = `radial-gradient(
                                    ${hexToRGB(portfolio.colorSelectorEl.value, balls.opacity + (sinVal * balls.fade))} ,
                                    ${hexToRGB("#ffffff", 0)} )`;
    })
    balls.animStep += balls.animResolution;
}

//////////////////////////////////////////////////////////
// project cards
const setupProjectCards = () => {
    const numOfprojects = projectsArr.length;
    const carouselEl = document.querySelector('.carousel');
    let carouselHTML = "";
    projectsArr.forEach((project) => {
        carouselHTML += `<div class="carousel__cell"><h3>${project.title}</h3><img src="${project.imgSrc}" alt="${project.alt}"/><p>${project.description}</p><p><a href="${project.liveSrc}">Live</a></p><p><a href="${project.codeSrc}">Code</a></p></div><!--test-->`;
    });
    carouselEl.innerHTML = carouselHTML;
}

document.addEventListener('DOMContentLoaded', () => {


    setupProjectCards();
    setupAnimatingElements();
    setupAnimationOptions();


    setInterval(animate, 5);
})






//////////////////////////////////////////////////////////////////////