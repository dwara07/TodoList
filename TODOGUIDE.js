const toolTipElements = [
    { selector: "#h1-ele", description: "This is your main heading.", offset: { top: -266, left: -70}},
    { selector: "#taskPriority", description: "Here you can set the task priority.", offset: { top: -200, left: -500 } },
    { selector: "#taskDescription.text", description: "Here you have to give what to do that have to store here..", offset: { top: -200, left: -250 } },
    { selector: "#taskDescription", description: "Describe your task here.", offset: { top: -50, left: -200 } },
    { selector: "#addTaskButton", description: "Click here to add the task.", offset: { top: -266, left: -350 } },
    { selector: "#wrapper" , description: "Okay let start the TODO..." , offset: {top: -60 , left: -300}}
];

let currentStep = 0;

function showToolTip(step) {
    const element = document.querySelector(toolTipElements[step].selector);
    const description = toolTipElements[step].description;
    const customOffset = toolTipElements[step].offset;

    if (element) {
        const rect = element.getBoundingClientRect();
        const toolTip = document.getElementById("tourContainer");
        const tourBackground = document.getElementById("tourBackground");
        const nextButton = document.getElementById("nextButton");

        let tooltipLeft = rect.left + window.scrollX + (customOffset.left || 0);
        let tooltipTop = rect.top + window.scrollY + (customOffset.top || 0);

        if (tooltipTop < 0) {
            tooltipTop = rect.bottom + window.scrollY ;
        }

        toolTip.style.left = `${tooltipLeft}px`;
        toolTip.style.top = `${tooltipTop}px`;
        document.getElementById("tourDescription").textContent = description;


        tourBackground.style.display = "block";
        toolTip.style.display = "block";


        document.querySelectorAll('.focusable').forEach(el => el.classList.add('blur'));
        element.classList.add('focused');

        document.getElementById("prevButton").disabled = step === 0;
        

      
        if (step === toolTipElements.length - 1) {
            nextButton.textContent = "Let's Go";
            nextButton.classList.add("nextBtn");

  
            nextButton.removeEventListener('click', nextStep);
            nextButton.addEventListener('click', endTour);
        }
         else {
            nextButton.textContent = "Next";
            nextButton.classList.remove("nextBtn");
            nextButton.removeEventListener('click', endTour);
            nextButton.addEventListener('click', nextStep);
        }
    }
}


function startTour() {
    currentStep = 0;
    showToolTip(currentStep);
}


function nextStep() {
    if (currentStep < toolTipElements.length - 1) {
        currentStep++;
        showToolTip(currentStep);
    } else {
        endTour();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showToolTip(currentStep);
    }
}

function endTour() {
    currentStep = 0; 
    document.querySelectorAll('.focusable').forEach(el => el.classList.remove('blur'));
    document.getElementById("tourContainer").style.display = "none";
    document.getElementById("tourBackground").style.display = "none";

}

function setupEventListeners() {
    document.getElementById("startTourButton").addEventListener("click", startTour);
    document.getElementById("nextButton").addEventListener("click", nextStep);
    document.getElementById("prevButton").addEventListener("click", prevStep);
    document.getElementById("tourBackground").addEventListener("click", endTour);
}

function initializeTour() {
    setupEventListeners(); 
    document.querySelectorAll('.focusable').forEach(el => el.classList.add('focusable'));
}


initializeTour();


