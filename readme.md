# :rocket: REACT HOOKS EXAMPLES FOR EVERYONE !!!

## QUESTIONS:
1. What are React Hooks? (WHAT)
2. How to use? (HOW)
3. Who loves using Hooks? (WHO)
4. Why should you use Hooks? (WHY)

## ANSWERING:

### 1. WHAT ARE REACT HOOKS?
- A new available feature since React 16.8
- Build-in functions handle React State, Props, Life Cycle, Context
- Allow Function Component to use State, Props, Life Cycle same as Class Component and so on
- Make the Function Component more powerful

### 2. HOW TO USE?

#### useState(state): [state, setState]
- Allows Functional Component to use React State
- Input: initialState
- Output: [state, setState]
- REMEMBER:
  + State Replacing instead of State Merging (this.setState() in Class Component)
  + useState(state, () => {
    // processing ONLY at the first rendering
  })

#### useEffect(callback, dependencies)

- (*) Side-effect: all effects on component after it being mounted, such as:
    + Working with DOM
    + Asynchronous actions: fetching data, working with DOM, subscriptions, setTimeout, setInterval...
    + 2 TYPES:
        . Needn't to be cleaned up: calling API, working with DOM
        . Need to be cleaned up: subscriptions, setTimeout, setInterval

- Allows Functional Component todeeppink handle React Component Side-effect
- Will be called after the first rendering and RECALLED IF ITS DEPENDENCIES CHANGE

    useEffect(() => {
        // do your side-effect here ...

        return () => {
            // clean up here ...
            // executed before the next render or unmount
        }
    }, [])

    MOUNTING
    - rendering -> run useEffect()

    UPDATING
    - rendering -> run useEffect() CLEAN UP if the dependencies change
                   run useEffect() if the dependencies don't change

    UNMOUNTING
    - run useEffect() CLEAN UP

    DEPENDENCIES: 
        + No dependencies: useEffect() always runs after EVERY RE-RENDERING                         => EVERY
        + Empty dependencies []: useEffect() runs after the THE FIRST RENDERING ONLY                => ONCE
        + Not Empty dependencies [filters]: useEffect() runs after every the changing of `filters`  => DEPENDENCIES CHANGE

    // NO DEPENDENCIES
    useEffect(() => {
        // ComponentDidMount or ComponentDidUpdate
    })

    // EMPTY ARRAY and NEEDN'T CLEANING UP (ComponentDidMount)
    useEffect(() => {
        // ComponentDidMount
    }, []);

    // EMPTY ARRAY and NEED CLEANING UP (ComponentDidMount + ComponentWillUnmount)
    useEffect(() => {
        // ComponentDidMount

        return () => {
            // ComponentWillUnmount
        }
    }, []);

    // WITH DEPENDENCIES
    
#### Custom Hooks
- Separate the complex logical code from UI
- Reuse the logical code

### 3. WHO LOVES USING HOOKS?
- Functional Programmer

### 4. WHY SHOULD YOU USE HOOKS?
- No breaking changes
- It is possible to re-implement Class Component to Functional Component
- Avoiding OOP Programming (this, super(props))

:: REMEMBER:
- Hooks is a new available feature since React 16.8
- Allow Functional Component to use React State, Props, Life Cycle
- Hooks don't make all React Concept that you know about Class Component before change (No breaking change)
- You needn't to re-implement all your available code with Hooks


## COMPONENT ANALYSIS

### 1. Component Tree

App
|__ TodoForm
|__ TodoList


### 2. Component Analysis

TodoList
  - Props:
      + todoList: array
      + onTodoClick: func
  - State: NO
  - Render: ul.todo-list > li
  - Events:
      + onClick(todo): calling props.onTodoClick(todo)

TodoForm
  - Props:
      + onSubmitTodoForm: func
  - State: value
  - Render: form > input
  - Events:
      + handleSubmit: calling props.onSubmitTodoForm()

PostFilterForm:
    - Props:
        + onSubmitPostFilterForm
    - State: searchTerm
    - Render: form > input[type=text]
    - Using Debounce technique

## HIGHER ORDER COMPONENT (HOC)

#### Memoization in Javascript:
- A processing time optimization technique for an expensive function executed in many times
- Caching the result of a calculation and return the cached result if the calculation is executed again

    -- Example --

    function add(a, b) {
        // Init the cache
        if(!add.cache) {
            add.cache = {}
        }

        // Return the cached result if found
        const key = `${a}_{b}`;                 // the key as a list of params
        const symmetricKey = `${b}_${a}`;       // the symmetricKey as a reversed list of params 
        if(add.cache[key]) return add.cache[key];
        if(add.cache[symmetricKey]) return add.cache[symmetricKey];

        // Calculate and cache the result
        const sum = a + b;
        add.cache[key] = sum;
        add.cache[symmetricKey] = sum;
        return sum;
    }

#### React.memo()
- IS NOT a kind of React Hooks
- The same as Pure Component (used in Class Component)

     Pure Component: 
        + Is re-rendered ONLY when its Props change
        + handle life cycle ComponentShouldUpdate

- Is used in Functional Component
- Uses shallow comparison
