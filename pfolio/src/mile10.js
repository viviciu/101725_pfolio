import './style.css'
import { initNavbar } from './navbar.js'
initNavbar()

const modal = document.getElementById('modal')
const modalContent = document.getElementById('modal-content')

const mediaItems = []
document.querySelectorAll('[data-lightbox]').forEach((container) => {
  container.querySelectorAll('img, video').forEach((el) => {
    const isVideo = el.tagName === 'VIDEO'
    const src = isVideo ? el.querySelector('source')?.src : el.src
    const type = isVideo ? el.querySelector('source')?.type : null
    if (src) mediaItems.push({ src, isVideo, type })
  })
})

let currentIndex = 0

function openModal(index) {
  currentIndex = index
  const item = mediaItems[index]

  let media
  if (item.isVideo) {
    media = `<video
      class="max-h-[84vh]"
      autoplay loop muted playsinline
      id="modal-media"
    >
      <source src="${item.src}" type="${item.type}" />
    </video>`
  } else {
    media = `<img
      src="${item.src}"
      class="max-h-[84vh]"
      id="modal-media"
    />`
  }

  modalContent.innerHTML = media
  modal.classList.remove('hidden')
  modal.classList.add('flex')

  const el = document.getElementById('modal-media')
  el.style.cursor = 'e-resize'

  el.addEventListener('mousemove', (e) => {
    const half = el.clientWidth / 2
    const x = e.clientX - el.getBoundingClientRect().left
    el.style.cursor = x > half ? 'e-resize' : 'w-resize'
  })

  el.addEventListener('click', (e) => {
    e.stopPropagation()
    const half = el.clientWidth / 2
    const x = e.clientX - el.getBoundingClientRect().left
    if (x > half) {
      openModal((currentIndex + 1) % mediaItems.length)
    } else {
      openModal((currentIndex - 1 + mediaItems.length) % mediaItems.length)
    }
  })
}

function closeModal() {
  modal.classList.add('hidden')
  modal.classList.remove('flex')
  modalContent.innerHTML = ''
}

document.querySelectorAll('[data-lightbox]').forEach((container) => {
  container.addEventListener('click', (e) => {
    const target = e.target.closest('img, video')
    if (!target) return
    const isVideo = target.tagName === 'VIDEO'
    const src = isVideo ? target.querySelector('source')?.src : target.src
    const index = mediaItems.findIndex((item) => item.src === src)
    if (index !== -1) openModal(index)
  })
})

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal()
})

document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('flex')) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowRight') openModal((currentIndex + 1) % mediaItems.length)
  if (e.key === 'ArrowLeft') openModal((currentIndex - 1 + mediaItems.length) % mediaItems.length)
})
