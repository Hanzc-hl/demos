const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.status = PENDING
    typeof executor === 'function' && executor(this.resolve, this.reject)
  }

  status = null
  value = null
  reason = null
  fulfilledCallbacks = []
  rejectedCallbacks = []

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      while (this.fulfilledCallbacks.length) {
        this.fulfilledCallbacks.shift()(value)
      }
    }
  }

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      while (this.rejectedCallbacks.length) {
        this.rejectedCallbacks.shift()(reason)
      }
    }
  }

  then = (fulfilled, rejected) => {
    const rFulfilled =
      typeof fulfilled === 'function' ? fulfilled : (value) => value
    const rRejected =
      typeof rejected === 'function' ? rejected : (reason) => reason

    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = (value) => {
        queueMicrotask(() => {
          try {
            const result = rFulfilled(value)
            resolvePromise(promise2, result, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      const rejectedMicrotack = (reason) => {
        queueMicrotask(() => {
          try {
            const result = rRejected(reason)
            resolvePromise(promise2, result, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.status === PENDING) {
        this.fulfilledCallbacks.push(fulfilledMicrotask)
        this.rejectedCallbacks.push(rejectedMicrotack)
      } else if (this.status === FULFILLED) {
        fulfilledMicrotask(this.value)
      } else if (this.status === REJECTED) {
        rejectedMicrotack(this.reason)
      }
    })

    return promise2
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    else {
      return new Promise(resolve => {
        resolve(value)
      })
    }
  }

  static reject(reason) {
    if (reason instanceof MyPromise) {
      return reason;
    }
    else {
      return new Promise((resolve, reject) => {
        reject(value)
      })
    }
  }
}

function resolvePromise(promise2, result, resolve, reject) {
  if (result === promise2) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    )
  }

  if (typeof result === 'object' || typeof result === 'function') {
    if (result === null) {
      return resolve(result)
    }

    if (result instanceof MyPromise) {
      result.then(resolve, reject)
    } else {
      resolve(result)
    }
  }
}

export default MyPromise
