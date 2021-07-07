# React

## App

- App
  - A React component
    - Produces JSX and handles user events
    - Returns JSC
- JSX
  - Set of instructions to tell React what content we want to show on the screen
    - Tell React to create a normal HTML element or
    - Tell React to show another component
- React
  - knows how to work with components
  - called a reconciler
- ReactDOM

  - knows how to take instructions on what we want to show and turn it into HTML
  - called a renderer

- useState

  - Function for working with React's state system
  - State is used to keep track of data that changes over time
  - Used to make React update the HTML on the Screen

- create react app `npx create-react-app my-app`

```jsx
import React from "react";
import ReactDOM from "react-dom";
// import: We want to get code from some other file or dependency,
// React: The variable we want to assign this import to,
// from: We are about to specify the name of the library of file we are importing from,
// 'react': The name of the dependency or path to the file we are importing

ReactDOM.render(<App />, document.querySelector("#root"));
```

- A component is a
  - Function or
  - Class
  - that produces HTML to show the user
    - Using JSX
  - and handles feedback from the user
    - Using Event Handlers

```jsx
const App = () => {
  return <div>Hello world!</div>;
};
```

```html
<!-- Semantic UI -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
/>
```

```jsx

```

```jsx

```

```jsx

```

## JSX vs HTMl

- Adding custom styling to an element uses different syntax
  - HTML `<div style="background-color: blue; color: white;"></div>`
  - JSX `<div style={{ backgroundColor: 'blue', color: 'white' }}></div>`
- Adding a class to an element uses different syntax
  - HTML `<div class="label"></div>`
  - JSX `<div className="label"></div>`
- JSX can reference JS variables using {}
  - exception: JavaScript Object
- Other differences: for -> htmlFor, etc (use console to see Error)

## Props

- Components
  - Component Nesting
    - A component can be shown inside of another
  - Component Resuability
    - We want to make components that can be easily reused through out application
  - Component Configuration
    - We should be able to configure a component when it is created

##

##

##

##

##

##

##

##

##

###

####

#####

######
