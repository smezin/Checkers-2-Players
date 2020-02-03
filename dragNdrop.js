
onmousedown1 = function(event, id) { 

    console.log(`calling select with `, document.getElementById(id).occupant);
    selectAction(id);
    let checker = document.getElementById(id).firstChild;
    if (checker == null) {
      return;
    }  
    checker.ondragstart = function() {   //Disable default behavior
      return false;
    };
    
    checker.id = id;
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

  checker.hidden = true;  //take a peek under the checker
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  checker.hidden = false;

  let board = document.getElementById(`checkers_board`);
  if (!elemBelow) return;
  if (Number.isInteger(parseInt(elemBelow.id)))
    board.hoveringOverId = elemBelow.id;  
}

  // move the checker on mousemove
document.addEventListener('mousemove', onMouseMove);
 
checker.onmouseup = function() {  

  checker.parentElement.removeChild(checker);
  checker.style.left = `auto`;
  checker.style.top = `auto`;
  checker.setAttribute(`class`, `piece`);
  document.getElementById(checker.id).appendChild(checker);
  //document.getElementById(checker.id).occupant = checker;
  let board = document.getElementById(`checkers_board`);  
 
  if (parseInt(board.hoveringOverId) != NaN && board.hoveringOverId) 
    if (board.hoveringOverId != checker.id) {
      console.log(`up with `, board.hoveringOverId);
      selectAction(parseInt(board.hoveringOverId));  
    }
    

  clearPaths();
  document.removeEventListener('mousemove', onMouseMove);
  checker.onmouseup = null;
  
  };
};

