
Checker.prototype.moveCheckerReturnIfConsecutive = function (targetId) {

    var thisLocation = document.getElementById(this.checkerId);
    var targetLocation = document.getElementById(targetId);
    
    thisLocation.occupant = null;
    thisLocation.removeChild(thisLocation.firstChild);    
  
    targetLocation.occupant = this;
    this.checkerId = targetId; 
    targetLocation.appendChild(this.iconImage);
    
    if (this.checkerType === (WHITE+PAWN) && Math.floor(targetId/8) === 0) {this.coronation();}
    if (this.checkerType === (BLACK+PAWN) && Math.floor(targetId/8) === 7) {this.coronation();}
       
    if(tryRemoveChecker(thisLocation.id, targetId)) {
        targetLocation.occupant.showPaths(true,true,true);
        if (isPathAvialable()) {
            this.allowOnlyPathsAndMe();
            this.isEatingNow = true;
            return true;
        }
    }
    clearPaths();
    return false;          
}

function retraceMove(originId, targetId) {

    var stepRetrace = targetId-originId;
    
    if (stepRetrace<0) {
        if (stepRetrace % UP_RIGHT === 0) { 
            stepRetrace = UP_RIGHT;            
        } else {
            if (stepRetrace % UP_LEFT === 0) {
                stepRetrace = UP_LEFT; 
            }
        }
    } else {
        if (stepRetrace % DOWN_RIGHT === 0 ) {
            stepRetrace = DOWN_RIGHT;
        } else {
            if (stepRetrace % DOWN_LEFT === 0) {
                stepRetrace = DOWN_LEFT;
            }
        }
    }   
    return (targetId-stepRetrace);
}
Checker.prototype.coronation = function() {

    var thisLocation = document.getElementById(this.checkerId);
    thisLocation.occupant = null;
    thisLocation.removeChild(thisLocation.firstChild);
    thisLocation.occupant=new Checker (this.checkerId, this.color, QUEEN);
}
function tryRemoveChecker (originId, targetId) {
    var checkerToRemoveLocaionId = retraceMove (originId, targetId);
    var removeLocation = document.getElementById(checkerToRemoveLocaionId);
    if (removeLocation.occupant) {
        removeLocation.occupant = null;       
        removeLocation.removeChild(removeLocation.firstChild); 
        updateDrawMovesCount (targetId, true);  
        return true;      
    }
    updateDrawMovesCount (targetId, false);  
    return false;
}