/**
 * createSquareDiv() - Method to create a div (square) with background-color.
 * 
 */

function createSquareDiv(color, width, height) {
    var div = document.createElement("div");
    div.setAttribute('style', 'background-color:' + color + ';width:' + width + 'px;height:' + height + 'px;position:relative;float:left;');
    return div;
}

/**
 * createHexagonDiv() - Method to create a div (hexagon) with background-color.
 * 
 */

function createHexagonDiv(color, width, height) {   
    //var ratio = (width > 50) ? strip(width) / strip(50) : strip(50) / strip(width);
    var ratio = (width / 50);
    var heightNew = (strip(height) * ratio);

    //Container
    var divContainer = document.createElement("div");
    divContainer.setAttribute('class', 'hex');
    divContainer.setAttribute('style', 'width:' + width + 'px;height:' + heightNew + 'px;');

    //Top of Hexagon
    var divTop = document.createElement("div");
    divTop.setAttribute('class', 'hex-top');
    divTop.setAttribute('style', 'border-bottom:' + GetPreparedStyle(color, 14, ratio, false) + 'border-left:' + GetPreparedStyle('transparent', 25, ratio, true) + 'border-right:' + GetPreparedStyle('transparent', 25, ratio, true));

    //Middle of Hexagon
    var divMiddle = document.createElement("div");
    divMiddle.setAttribute('class', 'hex-middle');
    divMiddle.setAttribute('style', 'background-color:rgb(' + color + ');width:' + width + 'px;height:' + (29 * ratio) + 'px');

    //Bottom of Hexagon
    var divBottom = document.createElement("div");
    divBottom.setAttribute('class', 'hex-bottom');
    divBottom.setAttribute('style', 'border-top:' + GetPreparedStyle(color, 14, ratio, false) + 'border-left:' + GetPreparedStyle('transparent', 25, ratio, true) + 'border-right:' + GetPreparedStyle('transparent', 25, ratio, true));

    //Append: Top, Middle and Bottom to: Container.
    divContainer.appendChild(divTop);
    divContainer.appendChild(divMiddle);
    divContainer.appendChild(divBottom);

    return divContainer;
}

/**
 * AddChildToContent() - Method do append element (div).
 * 
 */

function AddChildToContent(div) {
    document.getElementById("content").appendChild(div);
}

/**
 * RemoveAllChildren() - Method to remove all content.
 * 
 */

function RemoveAllChildren() {
    document.getElementById("content").innerHTML = '';
}

/**
 * strip() - Method to return a more precise double.
 * 
 */

function strip(number) {
    return (parseFloat(number).toPrecision(12));
}

/**
 * GetPreparedStyle() - Method to return a CSS-line.
 *
 */

function GetPreparedStyle(color, size, ratio, useColorName) {
    if (useColorName) {
        return (size * ratio) + 'px solid ' + color + ';';
    }

    return (size * ratio) + 'px solid ' + 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ');';
}

/**
 * CreateStyleElement() - Method to create style-element.
 *
 */

function CreateStyleElement(marginTop, marginLeftAndRight) {
    //Remove previous.
    var previousStyle = document.getElementById("custom_style");

    if (previousStyle != null || previousStyle != undefined) {
        document.getElementsByTagName("body")[0].removeChild(previousStyle);
    }

    var styleElement = document.createElement("style");

    var css = '.hex-row-odd-first {'
        + 'margin-left:' + marginLeftAndRight + 'px;'
        + 'margin-top:' + marginTop + 'px;'
        + '}'
        + '.hex-row-odd {'
        + 'margin-top:' + marginTop + 'px;'
        + '}'
        + '.hex-row-even {'
        + 'margin-top:' + marginTop + 'px;'
        + '}'
        + '.hex-row-even-last {'
        + 'margin-right:' + marginLeftAndRight + 'px;'
        + '}';

    styleElement.type = 'text/css'

    styleElement.innerHTML = css;
    styleElement.id = 'custom_style';

    document.getElementsByTagName("body")[0].appendChild(styleElement);
}