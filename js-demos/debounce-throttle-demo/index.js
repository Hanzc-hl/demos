function debounce(fn, delay = 0) {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
        fn.apply(this, arguments);
    }, delay)
  }
}

function throttle(fn, delay = 0){
    let canRun = true;
    return function() {
        if (canRun) {
            canRun = false;
            fn.apply(this, arguments)
            setTimeout(() => {
                canRun = true
            }, delay)
        }
    }
}

function throttle(fn, delay = 0, isTail = false){
    let canRun = true;
    if(!isTail) {
        canRun = false;
        fn.apply(this, arguments)
        setTimeout(() => {
            canRun = true
        }, delay)
    }
    return function() {
        if (canRun) {
            canRun = false;
            fn.apply(this, arguments)
            setTimeout(() => {
                canRun = true
            }, delay)
        }
    }
}
