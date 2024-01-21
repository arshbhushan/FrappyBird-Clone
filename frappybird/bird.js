const birtElem = document.querySelector("[data-bird]")
const BIRD_SPEED =0.5 //this is bird speed
const JUMP_DURATION=135 //125 m/s is the time one jump will last...
let timeSinceJump= Number.POSITIVE_INFINITY 


//start function
export function setupBird(){
    setTop(window.innerHeight/2)
    document.removeEventListener('keydown',handleJump)
    document.addEventListener('keydown',handleJump)
}

export function updateBird(delta){
    if (timeSinceJump<JUMP_DURATION) {
        setTop(getTop() - BIRD_SPEED * delta)
    }
    else{
        setTop(getTop() + BIRD_SPEED * delta)

    }
    timeSinceJump+=delta
}
//will return the position of the bird on the screen
export function getBirdRect(){
    return birtElem.getBoundingClientRect()
}
//in order to set the birdElem. which we have in css as .bird 
//we will create some helper functions

//1. Setting the top
function setTop(top){
birtElem.style.setProperty("--bird-top",top)
}
function getTop(){
    return parseFloat(getComputedStyle(birtElem).getPropertyValue
    ("--bird-top"))

}
function handleJump(e){
    if (e.code!=="Space") 
        return
    timeSinceJump=0
}