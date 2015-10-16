
#repeater.js
===

A fast, lightweight pure javascript Repeater. You supply a container DIV Id containing your template HTML, and an array of objects.
The Repeater will repeat the template HTML within the container for each object in the array and replace any {fields} surrounded by curly braces with the data found in the current object, if it can match the field name with a property.

If you want to do something more complex, you can pass an (optional) function as an argument to the render method (see below in Extended Usage).

If you want multiple Repeaters on a page, create a new instance for each one, so that each instance can encapsulate the template HTML and re-render it if the data-source changes. It does not listen for data changes, so if the data source changes, you need to call render() to refresh the HTML.

This code is simple but runs quickly - approximately 4 times faster than Angular **ng-repeat**.

Contact the author: nick.fallon@centralfax.co.uk

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
// render() method can accept an *optional* input function (optionalReplaceFunction) as a parameter,
// which expects 2 arguments:
// - the html for a single record
// - data object for a single record

// The optionalReplaceFunction must return the modified HTML source as output. 

function myCustomReplace(html, data) {
    for (prop in record) {
        html = html.replace("{" + prop + "}", record[prop]);
    }
    return html;
}
 var x = new Repeater(id, array);
 x.render(myCustomReplace);
```

---
**Example:**

```

<script src="repeater.js"></script>

<div id="list1">
    <div class="listitem">
        <a href="{url}">{title}</a>
    </div>       
</div>

<script>
        var data = [
            { "title": "History page", "url": "/history.html" },
            { "title": "Science page", "url": "/science.html" }
        ];
            
        var x = new Repeater("list1", data);
        x.render();
</script>
```

