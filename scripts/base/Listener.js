const GestureListener = GestureDetector.GestureListener;

let events = [];
const EVENT_TAP = 0;
const EVENT_PAN = 1;
const EVENT_PAN_STOP = 2;
const EVENT_LONG_PRESS = 3;
const EVENT_TOUCH_UP = 4;
const EVENT_TOUCH_DOWN = 5;

let inputListener = new JavaAdapter(InputProcessor, GestureListener, {
    tap(x, y, count, keyCode){
        fireEvent(EVENT_TAP, {
            x: x, 
            y: y, 
            count: count, 
            keyCode: keyCode
        });
        return false;
    },
    
    pan(x, y, deltaX, deltaY){
        fireEvent(EVENT_PAN, {
            x: x, 
            y: y, 
            deltaX: deltaX, 
            deltaY: deltaY
        });
        return false;
    },
    
    panStop(x, y, pointer, keyCode){
        fireEvent(EVENT_PAN_STOP, {
            x: x, 
            y: y, 
            pointer: pointer, 
            keyCode: keyCode
        });
        return false;
    },
    
    longPress(x, y){
        fireEvent(EVENT_LONG_PRESS, {
            x: x,
            y: y
        });
        return false;
    },
    
    touchUp(screenX, screenY, pointer, keyCode){
        fireEvent(EVENT_TOUCH_UP, {
            x: screenX,
            y: screenY,
            pointer: pointer,
            keyCode: keyCode
        });
        return false;
    },
    
    touchDown(screenX, screenY, pointer, keyCode){
        fireEvent(EVENT_TOUCH_DOWN, {
            x: screenX,
            y: screenY,
            pointer: pointer,
            keyCode: keyCode
        });
        return false;
    },
})

/** 
* public GestureDetector(float halfTapSquareSize, float tapCountInterval, float longPressDuration, float maxFlingDelay,
*                           GestureListener listener)
*/
let detector = new GestureDetector(20, 0.5, 0.3, 0.15, inputListener);

Events.on(ClientLoadEvent, e => {
    Core.input.addProcessor(detector);
    Core.input.addProcessor(inputListener);
})

function fireEvent(eventID, args){
    let seq = events[eventID];
    
    if(seq != null && seq.any()){
        seq.each(event => event.fire(args));
    }
}

module.exports = {
    EVENT_TAP: EVENT_TAP,
    EVENT_PAN: EVENT_PAN,
    EVENT_PAN_STOP: EVENT_PAN_STOP,
    EVENT_LONG_PRESS: EVENT_LONG_PRESS,
    EVENT_TOUCH_UP: EVENT_TOUCH_UP,
    EVENT_TOUCH_DOWN: EVENT_TOUCH_DOWN,
    
    addEvent(eventID, listener){
        if(!events[eventID]){
            events[eventID] = new Seq();
        }
        
        let seq = events[eventID];
        
        let event = {
            id: eventID,
            listener: listener,
            
            cancel(){
                seq.remove(this);
            },
            
            fire(args){
                this.listener(args);
            },
        }
        
        seq.add(event);
    },
}