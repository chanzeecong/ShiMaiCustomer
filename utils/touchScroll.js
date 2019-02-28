let time = 0;
let interval = {};
let touchDotX = 0;
let touchDotY = 0;

const touchStart = (e) =>{
  if (e.changedTouches[0].pageX){
    touchDotX = e.changedTouches[0].pageX;
    touchDotY = e.changedTouches[0].pageY;

    interval = setInterval(() => {
      time++;
    }, 100)
  }
}

const touchEnd = (e) => {
  let touchMoveX = e.changedTouches[0].pageX;
  let touchMoveY = e.changedTouches[0].pageY;

  let tmX = touchMoveX - touchDotX;
  let tmY = touchMoveY - touchDotY;

  let flag = 0;
  
  if( time<20 ){
    let absX = Math.abs(tmX);
    let absY = Math.abs(tmY);
    // console.log(absX, absY);
    if (absX > 2 * absY) {
      if (tmX < 0) {
        flag = 1;
        // console.log("左滑=====")
      } else {
        flag = 2;
        // console.log("右滑=====")
      }
    }

    if (absY > absX * 2 && tmY < 0) {
      // console.log("上滑动=====")
    } 
    else if (absY > absX * 2 && tmY > 0) {
      // console.log("下滑动=====")
      // flag = 3;
    }
  }
  // console.log('flag', flag);
  clearInterval(interval);
  time = 0;

  return flag
}

module.exports = {
  touchStart: touchStart,
  touchEnd: touchEnd
}