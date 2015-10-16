
#repeater.js
===

A fast, lightweight pure javascript Repeater. Give it a DIV ID containing your template HTML, and an array of objects.
The Repeater will repeat your template HTML once for each object in the array and replace any {fields} surrounded by curly braces with the data found in the current object.

If you want to do something more complex, you can pass an (optional) function as an argument to the render method (see below in Extended Usage).

This code is approximately 4 times faster than Angular **ng-repeat**. 

---
**SIMPLE USAGE:**

```
// where id is any DOM id, a container
// array is any array of objects, a data-source

var x = new Repeater(id, array);
x.render();
```


---
**EXTENDED USAGE:**

```
// render() method can accept an optional input function (optionalReplaceFunction) as a parameter,
// which expects 2 arguments:
// - the html for a single record
// - data object for a single record

function myCustomReplace(html, data) {
    for (prop in record) {
        html = html.replace("{" + prop + "}", record[prop]);
    }
    return html;
}
 var x = new Repeater(id, array);
 x.render(myCustomReplace);
```
