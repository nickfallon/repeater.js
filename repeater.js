//repeater.js

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

//Quick Use:

//var x = new Repeater("your_container_id", some_array_of_objects);
//x.render();


//id = any DOM id acting as a container
//jsonarray = any object array
function Repeater(id, jsonarray) {
    this.root = document.getElementById(id);
    this.jsonarray = jsonarray;
    this.template = null;
}

//if optionalReplaceFunction is not supplied, the default behaviour is used,
//eg. angular-style property replacement of {placeholders}.

Repeater.prototype.render = function (optionalReplaceFunction) {        
    var f = null || optionalReplaceFunction;
    if (!f) {
        f = Repeater.defaultReplace;
    }
    var r = this.root;
    var frag = document.createDocumentFragment();
    //grab the template if first time
    if (!this.template) {
        this.template = r.cloneNode(true);
    }
    //wipe all contents 
    var template = this.template;
    while (r.firstChild) {
        r.removeChild(r.firstChild);
    }
    //for each data item
    var len = this.jsonarray.length;
    for (var i = 0; i < len; i++) {
        //clone the template
        var clone = template.cloneNode(true);
        var html = clone.innerHTML;
        var record = this.jsonarray[i];
        //execute replace function (user can override)
        html = f(html, record);
        clone.innerHTML = html;
        //attach the clone to the frag
        var children = clone.childNodes;
        var j = children.length;
        while (j--) {
            frag.appendChild(children[0]);
        }
    }
    //attach frag to DOM
    r.appendChild(frag);
}

//default replace function used by the repeater.
//to override this behaviour, pass a function to render().
Repeater.defaultReplace = function (html, record) {
    for (prop in record) {
        html = html.replace("{" + prop + "}", record[prop]);
    }
    return html;
}

