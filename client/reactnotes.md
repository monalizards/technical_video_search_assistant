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

## Creating a reusable configurable component

1. Identify the JSX that appears to be duplicated
1. What is the purpose of that block of JSX? Think of a descriptive name for what it does
1. Create a new file to house this new component - it should have the same name as the component
1. Create a new component in the new file, paste the JSX into it
1. Make the new component configurable by using React's 'props' system

## Component hierarchy

- Parent & child components
- https://reactjs.org/docs/thinking-in-react.html

## Props

- System for passing data from a parent component to a child component
- Goal is to customise or configure a child component
- https://reactjs.org/docs/composition-vs-inheritance.html
- containment: `props.children`
- specialisation: `<Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />`
- Default props:
  ```jsx
  export default function Loader({ msg }) {
    return (
      <div className="ui active dimmer">
        <div className="ui big text loader">{msg}</div>
      </div>
    );
  }
  ```

Loader.defaultProps = {
msg: "Loading...",
};

````

## React history

- How React Used to Be

- Functinoal Components
  - Can produce JSX to show content to the user
- Class Components
  - Can produce JSX to show content to the user
  - Can use the Lifecycle Method system to run code at specific points in time
  - Can use the 'state' system to update content on the screen

- How React is Now
- Class Components:
  - Can produce JSX to show content to the user
  - Can use the Lifecycle Method system to run code at specific points in time
  - Can use the 'state' system to update content on the screen
- Function Components (Hooks System)
  - Can produce JSX to show content to the user
  - Can use hooks to run code at specific points in time
  - Can use hooks to access state system and update content on the screen

## Class Components

- Must be a JavaScript Class
- Must extend (subclass) React.Component
- Must define a render method that returns some JSX

```jsx
class App extends React.Component {
constructor(props) {
  super(props);
  this.state = { lat: null };
  window.navigator.geolocation.getCurrentPosition(
    (position) => this.setState({ lat: position.coords.latitude }),
    (err) => console.log(err)
  );
}

render() {
  return <div>Latitude: {this.state.lat}</div>;
}
}
````

## State

- Only usable with class components (technically can be used with functional components using the hooks system)
- You will confuse props with state
- State is a JS object that contains data relevant to a component
- Updating state on a component causes the component to (almost) instantly rerender
- State must be initalised when a component is created
- State can only be updated using the function setState

## Lifecycle methods

### Component Lifecycle

1. constructor
   -> Good place to do one time setup
1. render
   -> Avoid doing anything besides returning JSX
   -> content visible on screen
1. ComponentDidMount
   -> Good place to do data loading
   -> sit and wait for updates
1. ComponentDidUpdate
   -> Good place to do more data loading when state/props change
   -> sit and wait until this component is not longer shown
1. ComponentWillUnmount
   -> Good place to do cleanup (esp for non React stuff)
1. Other lifecycle methods (rarely used):
   1. ShouldComponentUpdate
   1. getDeprivedStateFromProps
   1. getSnapshotBeforeUpdate

```jsx
class App extends React.Component {
  state = { lat: null, errMsg: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errMsg: err.message })
    );
  }

  render() {
    let content = <div>Loading!</div>;
    if (this.state.errMsg && !this.state.lat) {
      content = <div>Error: {this.state.errMsg}</div>;
    }

    if (!this.state.errMsg && this.state.lat) {
      content = <div>Latitude: {this.state.lat}</div>;
    }

    return content;
  }
}
```

## Controlled component

- Flow:
  - user types in input
  - callback gets invoked
  - we call setstate with the new value
  - component rerenders
  - input is told what its value is (coming from state)

```jsx
import React, { useState } from "react";

export default function SearchBar() {
  // const query =

  // const onInputChange = (e) => {
  //   console.log(e.target.value);
  // };
  const [term, setTerm] = useState("");
  return (
    <div className="ui segment">
      <form className="ui form">
        <div className="field">
          <label>Image Search</label>
          <input
            type="text"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
        </div>
      </form>
    </div>
  );
}
```

## Axios

- https://github.com/axios/axios

## React Refs

- Give access to a single DOM element
- We create refs in the constructor, assign them to instance variables, then pass to a paritcular JSX element as props

#####

######
