'use strict'

const e = React.createElement

const { useState, useRef, useEffect } = React

function App() {
  const [seconds, setSeconds] = useState(0)

  const timer = useRef(new Timer())

  useEffect(() => {
    const timeId = setInterval(() => {
      const curSeconds = timer.current.getSeconds()
      if (curSeconds > 10) {
        clearInterval(timeId)
      } else {
        setSeconds(timer.current.getSeconds())
      }
    }, 1000)
  }, [])

  return e('div', null, [
    e('div', { key: 0 }, seconds),
    e(
      CountUp,
      {
        key: 1,
        start: 100,
        end: 1000,
        duration: 10,
        format: (value) => value.toFixed(0),
      },
      null
    ),
  ])
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(e(App))
