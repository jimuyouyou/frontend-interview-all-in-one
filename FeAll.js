(function(){
  function debounce(func, delay=300) {
    let timer; // using closure to keep only one been executed

    return (...args) => { // the new func accepts same args with been doubounced one
      clearTimeout(timer);
      timer = setTimeout(()=> {
        return func.appy(this, args);
      }, delay);
    };
  }

  function throttle(func, delay=300) {
    let prev = 0;
    return (...args) => {
      const now = new Date.getTime();
      const duration = now - prev;
      if (duration >= delay) {
        prev = now;
        return func.apply(this, args); // same as 1) func(args) 2) func.call(this, ...args)
      }
    };
  }

  function memo(func) {
    const m = {};
    return (...args) => {
      const params = JSON.stringify(args);
      if (m[params]) return m[params];

      const res = func.apply(this, args);
      m[params] = res;
      return res;
    }
  }

  function count(arr) {
    return arr.reduce((res, it)=> {res[it] = (res[it] || 0) + 1; return res;}, {});
  }

  class FA {
    debounce() {
     console.log('deb'); 
    }

    throttle() {
      console.log('thro');
    }

    memo() {
      console.log('memo');
    }
  }

  FA.prototype._debounce = debounce;
  FA.prototype._throttle = throttle;
  FA.prototype._count = count;

  globalThis.FA = new FA();
})();

// FA.debounce();
// FA.throttle();
// FA.memo();
console.log(FA._count([1, 2, 3, 5, 2, 3, 1]));
