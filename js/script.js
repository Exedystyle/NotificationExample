let notifWindow = document.getElementById("notification");

notifWindow.innerHTML = `
        <div class="notif--main">
            <div class="notif--info">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, eveniet.</div>
            <span class="notif--close"></span>
        </div>
        <div class="notif--control">
            <div class="box">
                <input type="checkbox" id="disabler">
                disable it?
            </div>
            <div class="notif--slide">
                <div class="button b-left"><div class="arrow left"></div></div>
                 <div class="slider">
                    <div class="slide current-slide"></div>
                    <div class="slide"></div>
                    <div class="slide"></div>
                    <div class="slide"></div>
                    <div class="slide"></div>
                    <div class="slide"></div>
                </div>
                <div class="button b-right"><div class="arrow right"></div></div>
        </div>
    </div>
`
let closeButton = document.querySelector(".notif--close");
let leftButton = document.querySelector(".b-left");
let rightButton = document.querySelector(".b-right");
let textField = document.querySelector(".notif--info");
let slideList = document.querySelectorAll(".slide");
let clearlocal = document.querySelector(".res");
let disabler = document.getElementById("disabler");
let information = ["You are on the 1 slide. Lorem ipsum dolor sit amet.","There is 2 slide. Lorem ipsum dolor sit amet, consectetur adipisicing.",
"Do you want to see 3 slide? There is Lorem ipsum dolor sit amet, consectetur.","May i show you 4 slide? Still Lorem ipsum dolor sit amet, consectetur adipisicing elit.","This 5 slide is the same.  Lorem ipsum dolor sit amet.","6 slide is still like others. Again Lorem ipsum dolor sit amet."];

clearlocal.addEventListener("click", function(){localStorage.clear()});

if (localStorage.getItem("notif") != "disable"){
    setTimeout(function(){
        notifWindow.classList.remove('hide');
    }, 1500);

disabler.addEventListener("click", function(){
  localStorage.setItem("notif", "disable");  
});    
    

let fillTheField = function(num){
    textField.innerHTML = information[num];
}

let currentSlide = 0;
for(let i=0; i < slideList.length; i++){
    if(slideList[i].classList.contains("current-slide")){
        currentSlide = i;
    }
};

fillTheField(currentSlide); //set start slide

let closeWindow = function(){
    notifWindow.classList.add('hide');
}

let slideLeft = function(){
    let oldSlide = currentSlide;
    currentSlide -= 1;
    if(currentSlide < 0) currentSlide = slideList.length-1;
    slideList[oldSlide].classList.remove("current-slide");
    slideList[currentSlide].classList.add("current-slide");
    fillTheField(currentSlide);
}

let slideRight = function(){
    let oldSlide = currentSlide;
    currentSlide += 1;
    if(currentSlide > 5) currentSlide = 0;
    slideList[oldSlide].classList.remove("current-slide");
    slideList[currentSlide].classList.add("current-slide");
    fillTheField(currentSlide);
}

let arrowClick = function(keyNum){
    if(keyNum == 37) slideLeft();
    if(keyNum == 39) slideRight();
}

closeButton.addEventListener("click", closeWindow);
leftButton.addEventListener("click", slideLeft);
rightButton.addEventListener("click", slideRight);

document.addEventListener("keydown", function(event){
    if(event.keyCode === 27) closeWindow();
    if(event.keyCode === 37) arrowClick(event.keyCode); //left
    if(event.keyCode === 39) arrowClick(event.keyCode); //right
});
    
}