import { updateBird, setupBird, getBirdRect } from "./bird.js"
import {
    updatePipes,
    setupPipes,
    getPassedPipesCount,
    getPipeRects,
} from "./pipe.js"
document.addEventListener("keypress", handelStart, { once: true })
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

let lastTime
//function updateLoop(time) helps to skip the first render and then we start rendring from the next
function updateLoop(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime
    //time - lastTime =delta is the time between different animation frames
    updateBird(delta)
    updatePipes(delta)
    if (checkLose()) return handleLoose()//we are returning handleLoose so that we make sure that we don't update our request animation frame
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

function checkLose() {
    const birdRect = getBirdRect()
    const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect))
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    return outsideWorld || insidePipe
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}
function handelStart() {
    title.classList.add("hide")
    setupBird()
    setupPipes()
    lastTime = null
    window.requestAnimationFrame(updateLoop)
}
function handleLoose() {
    setTimeout(() => {
        title.classList.remove("hide")
        subtitle.classList.remove("hide")
        subtitle.textContent = `${getPassedPipesCount()} Pipes`
        document.addEventListener("keypress", handelStart, { once: true })
    }, 100)
}