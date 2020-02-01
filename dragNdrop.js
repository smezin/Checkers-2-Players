
onmousedown1 = function(event, id) { // (1) start the process

  let ball = document.getElementById(id).firstChild;
  let currentDroppable = null;
  ball.ondragstart = function() {
    return false;
  };
  ball.setAttribute(`class`, `piece1`);
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
  }
/*
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }
*/
function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  ball.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  ball.hidden = false;

  // mousemove events may trigger out of the window (when the ball is dragged off-screen)
  // if clientX/clientY are out of the window, then elementFromPoint returns null
  if (!elemBelow) return;

  // potential droppables are labeled with the class "droppable" (can be other logic)
  let droppableBelow = elemBelow.closest('.droppable');
  console.log(elemBelow.id);
  if (currentDroppable != droppableBelow) {
    // we're flying in or out...
    // note: both values can be null
    //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
    //   droppableBelow=null if we're not over a droppable now, during this event

    if (currentDroppable) {
      // the logic to process "flying out" of the droppable (remove highlight)
      leaveDroppable(currentDroppable);
    }
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      // the logic to process "flying in" of the droppable
      enterDroppable(currentDroppable);
    }
  }
}
  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

