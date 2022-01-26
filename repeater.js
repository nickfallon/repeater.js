
// lightweight superfast repeater
// supports recursed property names eg. {grandparent.parent.propertyname}
// supports recursed array collections
// nick fallon 2020

// example:
// <div id="repeater1">
//     <div>{foo}</div>
//     <div>{bar.what}</div>
//     <div id="alpha.{index}">
//         {alpha.beta}
//     </div>
// </div>

// var array1 = [
//     { foo: 'test1',  bar: { what: 1 }, alpha: [ {beta: 1}, {beta: 2}, {beta: 3} ] },
//     { foo: 'test2',  bar: { what: 2 }, alpha: [ {beta: 4}, {beta: 5}, {beta: 6} ] },
//     { foo: 'test3',  bar: { what: 3 }, alpha: [ {beta: 7}, {beta: 8}, {beta: 9} ] }
// ];

// let repeater1 = new Repeater("repeater1");
// let rules = [];
// repeater1.render(rules, array1);

// you can override default field replace operations with a rules array like this:
// let rules = [
//     (property, value) => {
//         if (property != "some_property_name") return value;
//         if (value == 'some_property_value') return "alternative value";
//         return "";
//     }
// ];


// render an array into an HTML template.
// jsonarray = any object array
// id = any DOM id acting as a container.

// fields are property names in brackets like this: {propertyname}.
// to access sub-objects chain names like this: {grandparent.parent.propertyname}.

// repeaters can be nested if the jsonarray contains a child array at any level.
// nested repeaters should have an id="childarrayname.{index}"


function Repeater(id) {
    this.id = id;
    this.root = document.getElementById(id);
    this.jsonarray = [];
    this.template = null;
    this.children = [];
    // nested arrays need the array name as a prefix so that
    // non-unique property names work correctly
    this.prefix = '';
    if (id.indexOf('.')) {
        this.prefix = id.split('.')[0] + '.';
    }
}

Repeater.prototype.render = function (rules, jsonarray) {

    this.children = [];

    if (!this.root) {
        console.log('INFO: repeater render exiting - no id ' + this.id);
        return;
    }

    let t0 = window.performance.now();

    this.jsonarray = jsonarray;
    var f = Repeater.recurse;
    var r = this.root;
    var template;
    var frag = document.createDocumentFragment();
    //grab the template if first time
    if (!this.template) {
        this.template = r.cloneNode(true);
    }
    template = this.template;
    //wipe all contents
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

        //remove prefix (if exists)
        html = html.split(this.prefix).join('');

        //recurse field replacements
        html = f(html, record, '', rules, i, this);

        clone.innerHTML = html;
        //attach the clone to the fragment
        var children = clone.childNodes;
        var j = children.length;
        while (j--) {
            frag.appendChild(children[0]);
        }
    }
    //attach fragment to DOM
    r.appendChild(frag);

    // recurse arrays
    var childrens = this.children.length;
    for (var j = 0; j < childrens; j++) {
        var c = this.children[j];
        var r = new Repeater(c.id);
        r.render(rules, c.jsonarray);
    }

    let t1 = window.performance.now();
    if (this.id.indexOf('.') < 0) {
        // console.log(`${this.id} rendered in ${t1 - t0} milliseconds.`);
    }

}

//evaluate deep property paths.
Repeater.recurse = function (html, record, propx, rules, ordinal, repeater) {

    // sub-arrays will be rendered in a second pass after this render operation is complete
    if (Array.isArray(record)) {
        let sa = { id: propx + ordinal, jsonarray: record };
        repeater.children.push(sa);
    }

    for (prop in record) {

        //prop '0' causes a stack overflow, but it is a legitimate value when iterating arrays
        if ((Array.isArray(record) == false) && (prop == '0')) {
            break;
        }

        // transform record[prop] value according to rules
        // propx is optional for rules!
        var value = record[prop];
        rules.forEach(rulef => {
            value = rulef(prop, value, propx);
        });

        // HTML transforms property names to lowercase so we do the same
        // to make sure they are replaced correctly
        var proppath = (propx + prop).toLowerCase();
        html = html.split("{" + proppath + "}").join(value);

        // convert references of index to ordinal
        html = html.split("{index}").join(ordinal);
        html = html.split("{index1}").join(ordinal + 1);

        // recurse property path
        if ((prop == 'location') || (prop == 'ownerDocument')) {
            // ignore this prop - self-referencing items cause overflow
        }
        else {
            // recurse properties eg. {parent.property}
            html = Repeater.recurse(html, record[prop], proppath + '.', rules, ordinal, repeater);
        }
    }
    return html;
}

