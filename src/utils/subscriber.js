const sub = function (countStr) {
    const count = parseInt(countStr, 10);
  
    if (count >= 10000) {
      const value = count / 10000;
      const formatted = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
      return `${formatted}만 명`;
    } else if (count >= 1000) {
      const value = count / 1000;
      const formatted = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
      return `${formatted}천 명`;
    } else {
      return `${count}명`;
    }
  }

  export default sub