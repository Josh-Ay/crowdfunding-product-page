// jshint esversion:6
const progress = document.querySelector(".progress-bar-status");
const bookmarkBtn = document.querySelector(".bookmark-btn");
const moneyRaised = document.querySelector(".money-left");
const totalMoneyTarget = 100000;
const backProjectBtn = document.querySelector("button.back_this_project");
const closeProjectPopupBtn = document.querySelector(".selection-modal-close");
const backProjectContainer = document.querySelector(".selection-modal");
const pledgeContainer = document.querySelectorAll(".pledge-container");
const bambooRewardBtn = document.querySelector(".select_reward_1");
const blackEditionRewardBtn = document.querySelector(".select_reward_2");
const successModalContainer = document.querySelector(".success-modal");
const finishBtn = document.querySelector("button.cyan-btn.finish");
const hamburger = document.querySelector(".hamburger-icon");
const navLinks = document.querySelector("ul.navigation-links");
const hamburgerImgs = ["images/icon-hamburger.svg", "images/icon-close-menu.svg"];
const bookmarkBtnSpan = document.querySelector(".bookmark-btn span");
const continueBtn = document.querySelectorAll(".make-pledge button.continue-btn");
const radioBtn = $("input[name=pledgeSelection]");
const moneyBtn = document.querySelectorAll("button.money-btn");
let count = 1;
let mql = window.matchMedia("(max-width: 767px)");
let isOkayToPost = false;


radioBtn.prop("checked", false);
setProgressBarDatasize();

// To set the datasize of the progress bar
function setProgressBarDatasize() {
    let moneyRaisedText = moneyRaised.textContent;//gives $89,914
    let moneyRaisedTextValue = moneyRaisedText.split("$")[1];//to get only the 89,914
    moneyRaisedTextValue = moneyRaisedTextValue.replace(/\,/g,'');//to format it to 89914 
    
    let moneyRaisedIntValue = parseInt(moneyRaisedTextValue);
    
    let result = Math.round((moneyRaisedIntValue/totalMoneyTarget) * 100 );
    
    progress.dataset.size = result;
    const size = progress.dataset.size;
    progress.style.width = `${size}%`;        
}


// To open/close up/down the "options for funding the project" div pop-up
backProjectBtn.addEventListener("click", function () {
    backProjectContainer.classList.add("fade-in-3");
    backProjectContainer.style.display = "block";
    
});
closeProjectPopupBtn.addEventListener("click", function () {
    backProjectContainer.classList.remove("fade-in-3");
    backProjectContainer.style.display = "none";
});
window.addEventListener("keyup", function (e) {
    if (e.key === "Escape") {
        backProjectContainer.style.display = "none";
    }
});


// Changes the styling of the bookmark button when clicked
bookmarkBtn.addEventListener("click", function () {
    if (bookmarkBtn.classList.contains("bookmarked")) {
        bookmarkBtn.classList.remove("bookmarked");
        changeBookmarkText("Bookmark");
    } else {
        bookmarkBtn.classList.add("bookmarked");
        changeBookmarkText("Bookmarked"); 
    }
});

// Function that changes the text of the bookmark button to a given 'textValue'
const changeBookmarkText = function(textValue) {
    if (mql.matches) {
        bookmarkBtnSpan.setAttribute("data-before", "");
    }else{
        bookmarkBtnSpan.setAttribute("data-before", textValue);
    }
};

setTimeout(changeBookmarkText("Bookmark"), 100);



// To convert the pledgeContainer Nodelist to an array
let pledgeContainerAsArray = Array.prototype.slice.call(pledgeContainer);
let pledgeContainerArray = pledgeContainerAsArray.slice(0, -1) //excluding the last one i.e. Mahogany edition

pledgeContainerArray.forEach(element => {
    window.addEventListener('click', function(e){   
        if (element.contains(e.target)){
          // Clicked in box
          element.children[0].children[0].checked = true;
            if (element.children[3]) {
                element.children[3].style.display = "block"
                element.children[2].style.top = "18.1%"
            }
        } else{
          // Clicked outside the box
          if (element.children[3]) {
            element.children[3].style.display = "none"
            element.children[2].style.top = "25.8%"
            }
        }
    });

});


// To open/close up/down and scroll to the "bamboo option for funding the project" div pop-up
bambooRewardBtn.addEventListener("click", function () {
    scrollToPledgeElement(pledgeContainerArray[1])
})

// To open/close up/down and scroll to the "blackEdition option for funding the project" div pop-up
blackEditionRewardBtn.addEventListener("click", function () {
    scrollToPledgeElement(pledgeContainerArray[2])
});


// Function to scroll to a pledge option 
const scrollToPledgeElement = function(elementToScrollTo) {
    backProjectContainer.classList.add("fade-in-3");
    backProjectContainer.style.display = "block";

    elementToScrollTo.focus();

    elementToScrollTo.children[0].children[0].checked = true;
    // elementToScrollTo.children[3].style.display = "block";
    // elementToScrollTo.children[2].style.top = "18.1%";
    let offsetPosition = elementToScrollTo.offsetTop;
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
};


// HAMBURGER BUTTON 
hamburger.addEventListener("click", function () {
    if (count % 2 === 0) {
        $(this).addClass("fade-in-3");
        $(this).find("img").attr("src", hamburgerImgs[0]);
        navLinks.classList.remove("open", "fade-in-3");
        
    } else {
        $(this).addClass("fade-in-3");
        $(this).find("img").attr("src", hamburgerImgs[1]);
        navLinks.classList.add("open", "fade-in-3");
    }
    count++;
})


// Function to make sure the inputted pledge is a number
const checkIfItsANumber = function (variable) {
    if (variable === "") {
        return false;
    }else if (isNaN(variable)) {
        return false;
    }else{
        return true;
    }
}

pledgeContainer.forEach(element=>{
    if (element.children[3]) {
        let inputDiv = element.children[3].children[1];
        let errorDiv = element.children[3].children[4];
        let moneyBtn = element.children[3].children[2];

        inputDiv.addEventListener("keyup", function () {
            if (checkIfItsANumber(inputDiv.value) === false){
                errorDiv.innerText = "Please enter a number";
                errorDiv.style.display = "block";
                isOkayToPost = false;
            }else{
                errorDiv.style.display = "none";
                
                const checkValueEntered = function (valueToCheck, whatToCheckAgainst) {
                    if (valueToCheck < whatToCheckAgainst) {
                        errorDiv.innerText = "Please enter a value greater than "+whatToCheckAgainst+".";
                        errorDiv.style.display = "block";
                        isOkayToPost = false;
                    }else{
                        errorDiv.style.display = "none";
                        isOkayToPost = true;
                    }
                };

                if (inputDiv.name === "pledgeValue1") {
                    let valueEntered = inputDiv.value;
                    checkValueEntered(valueEntered, 25);
                } else if (inputDiv.name === "pledgeValue2") {
                    let valueEntered = inputDiv.value;
                    checkValueEntered(valueEntered, 75);
                }
            }

            
        });
        moneyBtn.addEventListener("click", function () {
            let moneyAmount = moneyBtn.children[1].textContent;
            inputDiv.value = moneyAmount;
            isOkayToPost = true;
        })
    }
})


continueBtn.forEach(element =>{
    element.addEventListener("click", function (e) {
        e.preventDefault();
        if (isOkayToPost === true) {
            document.pledgeForm.submit();
        }
    })
})

function closeSuccessContainer() {
    successModalContainer.style.display = "none";
};