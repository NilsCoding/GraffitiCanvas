//
// Graffiti Canvas - a Canvas demo
//

/**
 * Sets the data attribute on the given element
 * @param {HTMLElement} elem element to set data on
 * @param {string} name data name
 * @param {object} val data value
 */
function gc_setData(elem, name, val) {
    elem.setAttribute('data-' + name, val);
}

/**
 * Gets a data attribute from the given element
 * @param {HTMElement} elem element to get data from
 * @param {string} name data name
 */
function gc_getData(elem, name) {
    return elem.getAttribute('data-' + name);
}

/**
 * Gets the mouse position relative to the given element
 * @param {HTMLElement} elem element to get relative mouse position of
 * @param {Event} evt mouse event
 */
function gc_getMousePosition(elem, evt) {
    var rect = elem.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

/**
 * Starts the drawing inited by mouse action
 * @param {Event} evnt event data
 */
function gc_startDrawingMouse(evnt) {
    evnt.preventDefault();
    var elem = this;
    var mousePos = gc_getMousePosition(elem, evnt);
    gc_setData(elem, 'active', true);
    gc_setData(elem, 'lastX', mousePos.x);
    gc_setData(elem, 'lastY', mousePos.y);
}

/**
 * Processes the ongoing drawing by mouse movement
 * @param {Event} evnt event data
 */
function gc_whileDrawingMouse(evnt) {
    evnt.preventDefault();
    var elem = this;
    if (gc_getData(elem, 'active') !== 'true') {
        return;
    }
    var mousePos = gc_getMousePosition(elem, evnt);
    var x = mousePos.x;
    var y = mousePos.y;
    var fromX = gc_getData(elem, 'lastX');
    var fromY = gc_getData(elem, 'lastY');
    var ctx = elem.getContext("2d");
    ctx.strokeStyle = gc_getData(elem, 'strokestyle') || 'black';
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(x, y);
    ctx.stroke();
    gc_setData(elem, 'lastX', x);
    gc_setData(elem, 'lastY', y);
}

/**
 * Ends the drawing by mouse action
 * @param {Event} evnt event data
 */
function gc_endDrawingMouse(evnt) {
    evnt.preventDefault();
    var elem = this;
    gc_setData(elem, 'active', false);
    gc_setData(elem, 'lastX', null);
    gc_setData(elem, 'lastY', null);
}

/**
 * Starts the drawing inited by touch event
 * @param {Event} e event data
 */
function gc_startDrawingTouch(evnt) {
    var x, y;
    if ((evnt.clientX) && (evnt.clientY)) {
        x = evnt.clientX;
        y = evnt.clientY;
    } else if (evnt.targetTouches) {
        x = evnt.targetTouches[0].clientX;
        y = evnt.targetTouches[0].clientY;
        evnt.preventDefault();
    }
    var elem = this;
    gc_setData(elem, 'active', true);
    gc_setData(elem, 'lastX', x);
    gc_setData(elem, 'lastY', y);
}

/**
 * Processes the ongoing drawing by touch movement
 * @param {Event} evnt event data
 */
function gc_whileDrawingTouch(evnt) {
    var x, y;
    if ((evnt.clientX) && (evnt.clientY)) {
        x = evnt.clientX;
        y = evnt.clientY;
    } else if (evnt.targetTouches) {
        x = evnt.targetTouches[0].clientX;
        y = evnt.targetTouches[0].clientY;
        evnt.preventDefault();
    }
    var elem = this;
    if (gc_getData(elem, 'active') !== 'true') {
        return;
    }
    var fromX = gc_getData(elem, 'lastX');
    var fromY = gc_getData(elem, 'lastY');
    var ctx = elem.getContext("2d");
    ctx.strokeStyle = gc_getData(elem, 'strokestyle') || 'black';
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(x, y);
    ctx.stroke();
    gc_setData(elem, 'lastX', x);
    gc_setData(elem, 'lastY', y);
}

/**
 * Inits the canvas by element selector
 * @param {string} elemSelector element selector
 * @param {string} strokeStyle  stroke stype
 */
function gc_init(elemSelector, strokeStyle) {
    var foundElem = document.querySelectorAll(elemSelector);
    if (!foundElem) {
        return;
    }
    var canvas = foundElem[0];
    if (canvas) {
        canvas.addEventListener('mousedown', gc_startDrawingMouse);
        canvas.addEventListener('mouseup', gc_endDrawingMouse);
        canvas.addEventListener('mousemove', gc_whileDrawingMouse);
        canvas.addEventListener('touchstart', gc_startDrawingTouch, false);
        canvas.addEventListener('touchmove', gc_whileDrawingTouch, false);
        gc_setData(canvas, 'lastX', null);
        gc_setData(canvas, 'lastY', null);
        if (strokeStyle) {
            gc_setData(canvas, 'strokestyle', strokeStyle);
        }
    }
}
