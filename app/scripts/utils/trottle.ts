const throttle = function throttle(func: (...arg: any[]) => void, limit: number) {
  let inThrottle: boolean = false;

  return (...args: any[]) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};


export default throttle;
