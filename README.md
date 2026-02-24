1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
   Answer:
   getElementById selects a element by it's id. We can select just one element.
   getElementByClassName selects all the elements by the specified class name. We can select all the elements by a specific class name.
   querySelector selects the first element of the specified query. We can select only the first element, we do also specify classes/id properly, meaning we need to use the css selectors . and # for ids and classes.
   querySelectorAll selects all of the elements by the specified query. Similar to the querySelector method but selects all the elements.

2. How do you create and insert a new element into the DOM?
   Answer:
   We need to create an element first by using the createElement method. Then we need to add content to it. After that we will have to use appendChild method to insert in into the DOM.
   Example - let div = createElement("div");
   div.innerHTML = "<div>This is Siam the div.</div>"
   const parentContainer = document.getElementById("#parent-container");
   parentContainer.appendChild(div);

3. What is Event Bubbling? And how does it work?
   Answer: When we click/or perform any other events to a child element the event climbs upwards the DOM till it reaches the html element. So, if a we click on a child element the event (clicking) will happen for the parent and then the parent of the parent and will move upward like so. This is called event bubbling.

4. What is Event Delegation in JavaScript? Why is it useful?
   Answer:
   Event delegation is the process where we set a event listener to just the parent element instead of using event listener to each and all the child elements. We can just set a event listener to the parent and then can handle all the events of the childs. This is helpful because we don't need to set event listeners for each child. This improves performance and consumes less resources.

5. What is the difference between preventDefault() and stopPropagation() methods?
   Answer:
   preventDefault() prevents the default browser behaviour on an event where stopPropogation() method stops events from bubbling.
