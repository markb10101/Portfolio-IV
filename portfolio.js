//import { projectsArr } from "./data.js";


const portfolio = {
    maxItemFrame: 12,
    itemFrame: 0,
    animStep: 0,
    animResolution: 0.0125

}

const balls = {
    redVal: 255,
    greenVal: 255,
    blueVal: 255,
    amplitude: 0.25,
    frequency: 0.25,
    offset: 0.5,
    transparency: 0.025,
    spread: 50
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

//////////////////////////////////////////////////////////////////////
// sine balls

const setupAnimatingElements = () => {
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
}


const setupAnimationOptions = () => {
    
    

    portfolio.animWindow = document.querySelector('.anim_options');
    console.log(portfolio.animWindow);

    const iconSettings = document.querySelector('.icon_settings');
    iconSettings.onclick = () => {
        portfolio.animWindow.style.display === "none" ? portfolio.animWindow.style.display = "block" : portfolio.animWindow.style.display = "none";

    };

    const sliderAmplitude = document.querySelector('.slider.amplitude');
    sliderAmplitude.oninput = () => {
        balls.amplitude = sliderAmplitude.value / 100;
    }
    const sliderFrequency = document.querySelector('.slider.frequency');
    sliderFrequency.oninput = () => {
        balls.frequency = sliderFrequency.value / 100;
    }
    const sliderOffset = document.querySelector('.slider.offset');
    sliderOffset.oninput = () => {
        balls.offset = sliderOffset.value / 100;
    }
    const sliderSpread = document.querySelector('.slider.spread');
    sliderSpread.oninput = () => {
        balls.spread = sliderSpread.value;
    }
    const sliderColRed = document.querySelector('.slider.red');
    sliderColRed.oninput = () => {
        balls.redVal = sliderColRed.value;
    }
    const sliderColGreen = document.querySelector('.slider.green');
    sliderColGreen.oninput = () => {
        balls.greenVal = sliderColGreen.value;
    }
    const sliderColBlue = document.querySelector('.slider.blue');
    sliderColBlue.oninput = () => {
        balls.blueVal = sliderColBlue.value;
    }
    
    const sliderColOpacity = document.querySelector('.slider.opacity');
    sliderColOpacity.oninput = () => {
        balls.transparency = (500 - sliderColOpacity.value) /1000;
    }

}

const animate = () => {
    const animObjects = document.querySelectorAll('.object');
    const pageWidth = document.body.clientWidth;
    animObjects.forEach((item, index) => {
        const position = (pageWidth * balls.amplitude) * Math.sin(portfolio.animStep + index * balls.frequency) + (pageWidth * balls.offset) - 20
        item.style.left = `${position}px`;
        item.style.top = `${balls.spread * index}px`;
        item.style.backgroundColor = `rgba(${balls.redVal},${balls.greenVal},${balls.blueVal},${0.5 - (balls.transparency)})`
    })
    portfolio.animStep += portfolio.animResolution;
}

document.addEventListener('DOMContentLoaded', () => {

    
    setupAnimatingElements();
    

    setupAnimationOptions();


    setInterval(animate, 5);
})






//////////////////////////////////////////////////////////////////////