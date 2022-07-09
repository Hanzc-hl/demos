function CountUp({ start, end, duration, format }) {
  const { value } = CountUpHook({ start, end, duration, format })

  return e('div', { className: 'count-up-container' }, value)
}

// 用hook实现逻辑，用组件方便使用
function CountUpHook({ start, end, duration, format }) {
  const [value, setValue] = useState(format(start))
  const startTime = useRef(new Date().valueOf())
  const range = end - start
  function updateValue() {
    requestAnimationFrame(() => {
      const curTime = new Date().valueOf()
      const timeMove = curTime - startTime.current

      if (timeMove >= duration * 1000) {
        setValue(end)
      } else {
        setValue(format(start + (range * timeMove) / duration / 1000))
      }

      updateValue()
    })
  }

  useEffect(() => {
    updateValue()
  }, [])

  function valueDigitals() {
    return String(value).split('')
  }

  return { value, digitals: valueDigitals() }
}
