
onmousedown1 = function(event, id) { 
    selectAction(id);
    let checker = document.getElementById(id).firstChild;
    if (checker == null) {
      return;
    }  
    checker.ondragstart = function() {   //Disable default behavior
      return false;
    };

    checker.id = id;
    console.log(`picking: `, id);
    checker.setAttribute(`class`, `piece picked`);
    let shiftX = event.clientX - checker.getBoundingClientRect().left;
    let shiftY = event.clientY - checker.getBoundingClientRect().top;
    
    checker.style.position = 'absolute';
    checker.style.zIndex = 1000;
    document.body.append(checker);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      checker.style.left = pageX - shiftX + 'px';     // moves the checker at (pageX, pageY) coordinates
      checker.style.top = pageY - shiftY + 'px';      // taking initial shifts into account
    }

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  checker.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  checker.hidden = false;
  
  let board = document.getElementById(`checkers_board`);
  board.hoveringOverId = elemBelow.id;
  console.log(board.hoveringOverId);
  if (!elemBelow) return;
}

  // move the checker on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the checker, remove unneeded handlers
checker.onmouseup = function() {  
  console.log(checker.id);
  checker.parentElement.removeChild(checker);
  checker.style.left = `auto`;
  checker.style.top = `auto`;
  checker.setAttribute(`class`, `piece`);
  document.getElementById(checker.id).appendChild(checker);
  let board = document.getElementById(`checkers_board`);
  
  console.log(`landing on `, board.hoveringOverId);
  if (board.hoveringOverId != null && board.hoveringOverId) 
    if (board.hoveringOverId != checker.id) 
      selectAction(board.hoveringOverId);
  

  clearPaths();
  document.removeEventListener('mousemove', onMouseMove);
  checker.onmouseup = null;
  
  };
};

