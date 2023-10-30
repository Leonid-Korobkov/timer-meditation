class App {
  constructor() {
    this.timer.timer_form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    })
  }

  timer = {
    timer_form: document.querySelector('#form'),
    min_tens: document.querySelector('#min_tens'),
    min: document.querySelector('#min'),
    sec_tens: document.querySelector('#sec_tens'),
    sec: document.querySelector('#sec')
  }

  #interval

  submit() {
    const formData = new FormData(this.timer.timer_form)
    const time = formData.get('time')
    this.#clearTimer()
    this.#startTimer(time)
  }

  #clearTimer() {
    if (this.#interval) {
      clearInterval(this.#interval)
    }
    this.#setTimer({
      min_tens: 0,
      min: 0,
      sec_tens: 0,
      sec: 0
    })
  }

  #startTimer(time) {
    const end = Date.now() + time * 1000 * 60

    this.#interval = setInterval(() => {
      const now = Date.now()
      const delta = end - now
      if (delta < 0) {
        clearInterval(this.#interval)
        return
      }

    this.#setTimer({
      min_tens: Math.floor(delta / 1000 / 60 / 10),
      min: Math.floor((delta / 1000 / 60) % 10),
      sec_tens: Math.floor(delta % 60000 / 10000),
      sec: Math.floor((delta % 60000 / 1000) % 10)
    })
    }, 500)
  }

  #setTimer({min_tens, min, sec_tens, sec}) {
    this.timer.min_tens.innerText = min_tens
    this.timer.min.innerText = min
    this.timer.sec_tens.innerText = sec_tens
    this.timer.sec.innerText = sec
  }
}


const app = new App()
