const buttonArea = document.getElementById('buttonArea')
const button = document.getElementById('button')

const maxDistance = 300 // Adjust this value to set the maximum distance
const moveDistance = 300 // Adjust this value to set the distance at which the button starts moving

let isButtonMoving = false

buttonArea.addEventListener('mousemove', event => {
  const rect = button.getBoundingClientRect()
  const buttonX = rect.left + rect.width / 2
  const buttonY = rect.top + rect.height / 2
  const cursorX = event.clientX
  const cursorY = event.clientY
  const offsetX = buttonX - cursorX
  const offsetY = buttonY - cursorY

  const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2)

  if (!isButtonMoving && distance <= moveDistance) {
    isButtonMoving = true
    button.style.pointerEvents = 'none' // Disable pointer events on the button
  }

  if (isButtonMoving && distance <= maxDistance) {
    const angle = Math.atan2(offsetY, offsetX)
    const moveX = Math.cos(angle) * (maxDistance - distance)
    const moveY = Math.sin(angle) * (maxDistance - distance)
    button.style.transform = `translate(${moveX}px, ${moveY}px)`
  }
})

buttonArea.addEventListener('mouseleave', () => {
  if (isButtonMoving) {
    button.style.transform = 'translate(0, 0)'
    button.style.pointerEvents = 'auto' // Enable pointer events on the button
    isButtonMoving = false
  }
})
