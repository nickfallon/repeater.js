
#repeater.js

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
