import { projectsArr } from "./data.js";

const portfolio = {}

const balls = {
    amplitude: 0.1,
    frequency: 2,
    offsetX: 0.35,
    offsetY: 0,
    spread: 10.5,
    colorHex: '#FFFFFF',
    opacity: 0.5,
    fade: 0,
    size: 30,
    animStep: 0,
    animResolution: 0.0125,

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
    navbarLinksArr.forEach((link, index) => {
        if (link.classList.contains('current')) link.classList.remove('current');
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

    portfolio.animWindow = document.querySelector('.animOptions');

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
        console.log(balls.offsetX);
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
    const sliderSize = document.querySelector('.slider.size');
    sliderSize.defaultValue = balls.size;
    sliderSize.oninput = () => {
        balls.size = sliderSize.value;
    }
}

const animate = () => {
    const animObjectsArr = document.querySelectorAll('.object');
    const pageWidth = document.body.clientWidth;
    animObjectsArr.forEach((item, index) => {
        const sinVal = Math.sin(balls.animStep + index * balls.frequency)
        const position = pageWidth/2 + ((pageWidth * balls.amplitude) * sinVal + (pageWidth * balls.offsetX) - 20)
        item.style.zIndex = "1";
        item.style.left = `${position}px`;
        item.style.top = `${(balls.offsetY * 2810) + (balls.spread * index)}px`;
        item.style.backgroundImage = `radial-gradient(circle at 100%,
                                    ${hexToRGB(portfolio.colorSelectorEl.value, balls.opacity + (sinVal * balls.fade))},
                                    ${hexToRGB("#ffffff", 0)})`;
        // item.style.width = `calc(8rem * ${balls.size}%)`;
        item.style.width = `${balls.size/100 * 6}rem`;
        item.style.height = `${balls.size/100 * 6}rem`;
    })
    balls.animStep += balls.animResolution;
}

//////////////////////////////////////////////////////////
// project cards
const setupProjectCards = () => {
    portfolio.cardContainerEl = document.querySelector('.cardContainer');
    portfolio.numOfprojects = projectsArr.length;

    let cardHTML = "";
    projectsArr.forEach((project) => {
        cardHTML += `<div class="card ${project.title}"><h3>${project.title}</h3><img src="${project.imgSrc}" alt="${project.alt}"/><p class="info">${project.description}</p><div class="projectLinks"><span><a href="${project.liveSrc}" alt="Run it">Live</a></span><span><a href="${project.codeSrc}" alt="View the code">Code</a></span></div></div>`;

    });
    portfolio.cardContainerEl.innerHTML = cardHTML;
}

document.addEventListener('DOMContentLoaded', () => {

    setupProjectCards();
    setupAnimatingElements();
    setupAnimationOptions();
 
    setInterval(animate, 5);
})






//////////////////////////////////////////////////////////////////////