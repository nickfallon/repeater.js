
#repeater.js
===

A fast, lightweight pure javascript Repeater. You supply a container DIV ID containing your template HTML, and an array of objects.
The Repeater will repeat the template HTML within the container for each object in the array and replace any {fields} surrounded by curly braces with the data found in the current object, if it can match the field name with a property.

To do something more complex (other than just replace found fields), you can optionally pass a function as an argument to the render method (see below in Extended Usage), which means you can perform your own logic for each item rendered. 

To show multiple Repeaters on a page, create a new instance for each one, so that each instance can encapsulate the template HTML and re-render it if the data-source changes. It does not listen for data changes, so if the data source changes, you need to call render() to refresh the HTML.

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
// The render() method can accept an optional function as a parameter, 
// which will be called with 2 arguments: optionalReplaceFunction(html, data)
// html - the html for a single record
// data - data object for a single record

// The optionalReplaceFunction must return the modified HTML source as output. 

// This example shows how to provide your own optionalReplaceFunction().

function myCustomReplace(html, data) {
    for (prop in record) {
        html = html.replace("{" + prop + "}", record[prop]);
        
        //do something custom here!
        
    }
    return html;
}
 var x = new Repeater(id, array);
 x.render(myCustomReplace);
```

---
**EXAMPLE CODE:**

```

<script src="repeater.js"></script>

<div id="container">
    <div class="listitem">
        <a href="{url}">{title}</a>
    </div>       
</div>

<script>
        var data = [
            { "title": "History page", "url": "/history.html" },
            { "title": "Science page", "url": "/science.html" }
        ];
            
        var x = new Repeater("container", data);
        x.render();
</script>
```

**EXAMPLE OUTPUT:**
```
<div id="container">
    <div class="listitem">
        <a href="/history.html">History page</a>
    </div>       
    <div class="listitem">
        <a href="/science.html">Science page</a>
    </div>       
</div>
```

