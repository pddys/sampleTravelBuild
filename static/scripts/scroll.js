const pixelsTag = document.querySelector('div.pixel')
const progressTag = document.querySelector("div.progress")
const bodyTag = document.querySelector("body")
const sections = document.querySelectorAll("section")
const clientTag = document.querySelector("div.client")
const pageTag = document.querySelector("div.page")
const headerTag = document.querySelector("header")

// When we scroll the page, update the pixels tag to show how far we've scrolled
document.addEventListener('scroll', function() {
  const pixels = window.pageYOffset  
  pixelsTag.innerHTML = pixels
})

// when we scroll the page, make a progress bar that keeps track of the distance

document.addEventListener('scroll', function() {
  const pixels = window.pageYOffset
  const pageHeight = bodyTag.getBoundingClientRect().height
  const totalScrollableDistance = pageHeight - window.innerHeight
  const percentage = pixels / totalScrollableDistance
 
  progressTag.style.width = `${100 * percentage}%`
})

// When we scroll the page, see how far down the page we have scrolled,
// then for each section check whether we've passed it,
// and if we have.. update the text in the header

document.addEventListener('scroll', function() {
	const pixels = window.pageYOffset
  sections.forEach(section => {
    if (section.offsetTop <= pixels ) {
        clientTag.innerHTML = section.getAttribute('data-client')
      	pageTag.innerHTML = section.getAttribute('data-page')
      
      if (section.hasAttribute('data-dark')) {
          headerTag.classList.add('white')
          progressTag.classList.add('white')
          } else {
            headerTag.classList.remove('white')
            progressTag.classList.remove('white')
          }
      }
  }) 
})


// When we scroll, make things parallax
// We want to move certain tags based on how far away they are from an anchor point
// The anchor point is the middle of the section
// how far should we parallax?
// it's a ratio of the scroll from the middle point

document.addEventListener('scroll', function() {
  const topViewport = window.pageYOffset
  const midViewport = topViewport + (window.innerHeight / 2)
  
  sections.forEach (section => {
    const topSection = section.offsetTop
    const midSection = topSection + (section.offsetHeight / 2)
    const distanceToSection = midViewport - midSection
    
    const parallaxTags = section.querySelectorAll('[data-parallax]')
    
    // loop over each parallaxed tag
    
    parallaxTags.forEach(tag => {
      const speed = parseFloat(tag.getAttribute('data-parallax'))
      tag.style.transform = `translate(0, ${distanceToSection * speed}px)`                
    })
    
    const tag = section.querySelector('div.square')

  })
})

//
// Fade in images once they appear in the viewport
//
const animatedTags = document.querySelectorAll("img")

// Fade out on load
animatedTags.forEach(tag => {
  tag.style.opacity = 0
})

const fadeIn = function () {
  let delay = 0.25
  // Look through all the animated tags and see with the
  // getBoundingClientRect if it's in the window
  animatedTags.forEach(tag => {
    const tagTop = tag.getBoundingClientRect().top
    const tagBottom = tag.getBoundingClientRect().bottom
    
    if (tagTop < window.innerHeight && tagBottom > 0) {
      tag.style.animation = `fadein 1s ${delay}s both`
      delay = delay + 0.25
      } else {
        tag.style.opacity = 0
        tag.style.animation = ""
      }
  })
}
  

// on load run fade in
fadeIn()

// on scroll run fade in
document.addEventListener('scroll', function () {
  fadeIn()
})

// on browser resize run fade in
window.addEventListener('resize', function() {
  fadeIn()
})