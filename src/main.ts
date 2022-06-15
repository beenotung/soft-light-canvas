console.log('source code available on: https://github.com/beenotung/soft-light-canvas')

const { random, floor, min, max, sqrt, pow, exp, E, log } = Math
const win = window as any

const R = 0
const G = 1
const B = 2
const A = 3

const canvas = win.main as HTMLCanvasElement
const rect = canvas.getBoundingClientRect()

const scale = 25
const w = floor(rect.width / scale)
const h = floor(rect.height / scale)
const n = w * h

canvas.width = w
canvas.height = h

const context = canvas.getContext('2d')!
const imageData = context.getImageData(0, 0, w, h)
const data = imageData.data
const len = w * h * 4

for (let i = 0; i < len; i += 4) {
  data[i + R] = 0
  data[i + G] = 0
  data[i + B] = 0
  data[i + A] = 255
}

function tick() {
  // TODO write your logic here
  let offset = floor(random() * n) * 4
  for (let i = 0; i < 3; i++) {
    data[offset + i] = min(
      255,
      max(
        0,
        data[offset + i] + floor(((random() * 2 - 1) * 256) / 4 / sqrt(batch))
      )
    )
  }
}

const batch = sqrt(w * h)

function loop() {
  for (let i = 0; i < batch; i++) {
    tick()
  }
  context.putImageData(imageData, 0, 0)
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)

Object.assign(win, {
  canvas,
  context,
  imageData,
  loop,
  data,
  w,
  h,
  n,
  len,
})
