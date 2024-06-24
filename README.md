
#repeater.js
===

A fast, lightweight pure javascript Repeater. You supply a container DIV ID containing your template HTML, and an array of objects.
The Repeater will repeat all HTML within the container for each object in the array and replace any {fields} surrounded by curly braces with the data found in the current object, if it can match the field name with a property.

Supports recursed property names eg. {grandparent.parent.propertyname}.
Supports recursed array collections.

Example:

```
 <div id="repeater1">
     <div>{foo}</div>
     <div>{bar.what}</div>
     <div id="alpha.{index}">
         {alpha.beta}
     </div>
 </div>

 var array1 = [
     { foo: 'test1',  bar: { what: 1 }, alpha: [ {beta: 1}, {beta: 2}, {beta: 3} ] },
     { foo: 'test2',  bar: { what: 2 }, alpha: [ {beta: 4}, {beta: 5}, {beta: 6} ] },
     { foo: 'test3',  bar: { what: 3 }, alpha: [ {beta: 7}, {beta: 8}, {beta: 9} ] }
 ];

 let repeater1 = new Repeater("repeater1");
 let rules = [];
 repeater1.render(rules, array1);
```


You can override default field replace operations with a rules array like this:

```
 let rules = [
     (property, value) => {
         if (property != "some_property_name") return value;
         if (value == 'some_property_value') return "alternative value";
         return "";
     }
 ];
```


Fields are property names in brackets like this: {propertyname}.
To access sub-objects chain names like this: {grandparent.parent.propertyname}.

Repeaters can be nested if the jsonarray contains a child array at any level.
Nested repeaters should have an id="childarrayname.{index}"



