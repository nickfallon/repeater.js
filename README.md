
#repeater.js
===

A fast, lightweight pure javascript Repeater. You supply a container DIV ID containing your template HTML, and an array of objects.
The Repeater will repeat all HTML within the container for each object in the array and replace any {fields} surrounded by curly braces with the data found in the current object, if it can match the field name with a property.



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

