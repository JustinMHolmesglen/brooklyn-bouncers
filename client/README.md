# [B3] COMPLEX COMPONENTS: REACT DATA FLOW

  - **NEW FOCUS:** This **B3** section will shift to how components interact with each other & the wider application, finalising with React Hooks & API data mapping

  - **NEXT FOCUS:** The **B4** & **B5** sections will shift to understanding standard client-side architecture for React & wider CSS integrations.  

&nbsp;

## E. LIFTING STATE UP / SINGLE SOURCE OF TRUTH

**CORE:** As discussed in slides, we need to lift our state up to a common parent component to manage multiple childs & coordinate their actions using shared state

  - **NOTE:** As discussed in [react.dev](https://react.dev/learn/sharing-state-between-components#a-single-source-of-truth-for-each-state), many components will still have their own state despite "lifting state up"

  - This principle more is about making sure that, for each piece of state, you need to choose the component that "owns" it 

**RULE IN SUMMARY:** For each piece of state, there is a specific component that should hold that piece of information. 

  - **KEY:** Instead of duplicating shared state between components, lift it up to their COMMON SHARED PARENT, and pass it down to the children that need it!

  - **EXAMPLE:** We will need `auth` & `cartProducts` details at root level in App.jsx, as they will pass to various children all thoughout our app.

  - **EXAMPLE 2:** The state `productData` will be held at the parent component `ProductMenu.jsx` and passed to its descendent children.  NOT needed at root level!

**DOCS:**

  - **See "React Components" Slideshow, Slide 7!**

  - [Lifting state up @ react.dev](https://react.dev/learn/sharing-state-between-components)

  - [Single source of truth @ old reactjs.org](https://legacy.reactjs.org/docs/lifting-state-up.html#:~:text=There%20should%20be%20a%20single,to%20their%20closest%20common%20ancestor.)

&nbsp;

### 1. LIFTING STATE UP TO `TodosPage.jsx`

**MAIN PROCESS:** We will need the todos data to be hoisted at the closest common parent = this could be `TodosList.jsx` 

  - BUT as we will build other components, `TodosPage` is actually a better long term target! 
  
  - **MOREOVER** - `todos` (or `products`) state could eventually be needed higher at our very root `App.jsx` if we need to move these state values to more diverse components in our app

  - **EXAMPLE:** We want to display the number of `products` in our cart, in our `Header.jsx` = move state to `App.jsx`

**STEPS:**

  - (a) We need to remove the "local" state from our `TodoItem.jsx` & `TodosList.jsx` and pass them up to `TodosPage.jsx`

  - (b) We will only need to pass data, via props, to these two components now!

  - (c) **KEY** - If we need to modify data, we will use events to modify the data in the parents state = child component will have no state but rather getting all its data from the parent
  
  - (d) Go to `TodoItem.jsx` inside `/components/features/todos`

&nbsp;

### CHALLENGE: PRODUCT PAGE

**1. LIFT STATE UP TO `ProductsPage.jsx`**

  - (i) Remove the local state in `ProductItem` and replace with props values

  - (ii) Move the local state + methods in `ProductsList` into `ProductsPage` and replace with props values

  - (iii) Ensure you have passed the new state & methods as props correctly to the children component `ProductsList` (which flows into `ProductItem`)