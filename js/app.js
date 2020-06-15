// wrap all the code in DOMContentLoaded to ensure the DOM is ready for 
// selection and manipulation
document.addEventListener('DOMContentLoaded', function() {

    // const global references
    const FORM = document.getElementById('registrar');
    const INPUT = FORM.querySelector('input');  // return the first input tag in the form
    const MAIN_DIV = document.querySelector('.main');
    const UL = document.getElementById('invitedList');  // declared globally so its available in all functions

    // constants needed to add the filter checkbox to the UI via JS; this was part of the exercise
    // TODO: refactor this to use more HTML/CSS
    const FILTER_DIV = document.createElement('div');
    const FILTER_LABEL = document.createElement('label');
    const FILTER_CHECKBOX = document.createElement('input');

    FILTER_LABEL.textContent = "Hide those who haven't responded";
    FILTER_CHECKBOX.type = 'checkbox';
    FILTER_DIV.appendChild(FILTER_LABEL);
    FILTER_DIV.appendChild(FILTER_CHECKBOX);
    MAIN_DIV.insertBefore(FILTER_DIV, UL);

    // filter checkbox event listener to filter confirmed respondents
    FILTER_CHECKBOX.addEventListener('change', function(e) {
        const IS_CHECKED = FILTER_CHECKBOX.checked;            // true/false based on checkbox state
        const LIS = UL.children;

        if (IS_CHECKED) {
            // traverse each LI and hide the non-confirmed cases
            for (let i = 0; i < LIS.length; i++) {
                let li = LIS[i];
                if (li.className === 'responded') {
                    li.style.display = '';  // empty string allows it to pick up previous style
                } else {
                    li.style.display = 'none';
                }
            }
        } else {
            for (let i = 0; i < LIS.length; i++) {
                let li = LIS[i];
                li.style.display = '';      // display all lis
            }
        }
    });

    // Create an LI and return it to be appended to a ul
    function createLI(text) {
        const LI = document.createElement('li');    // create a new li element to add the input to it

        // create an element based on the type, property, and value given
        function createElement(elementName, property, value) {
            const ELEMENT = document.createElement(elementName);
            ELEMENT[property] = value;
            return ELEMENT;
        }

        function appendToLI(elementName, property, value) {
            const ELEMENT = createElement(elementName, property, value);    
            LI.appendChild(ELEMENT);
            return ELEMENT;
        }

        // wrap the text content in a span for easier DOM manipulation on 'edit' button event
        appendToLI('span', 'textContent', text);
        // create a new checkbox to be included in the li
        // this is for the user to check when a list member has RSVP'd
        const LABEL = appendToLI('label', 'textContent', 'confirmed');
        const CHECKBOX = createElement('input', 'type', 'checkbox');
        LABEL.appendChild(CHECKBOX);                // join the checkbox with its label
        // add an edit button
        appendToLI('button', 'textContent', 'Edit');
        // add a button to remove the guest form the list
        appendToLI('button', 'textContent', 'Remove');
        return LI;
    }

    // form submit handler- captures all paths to form submission
    FORM.addEventListener('submit', function(e) {   // a shorthand arrow funciton could also be used here
        e.preventDefault();                         // cancel the default submit behavior for the form
        // create a list item to hold the form input submission and append it to the list
        const TEXT = INPUT.value;
        INPUT.value = '';                           // clear the input field
        const LI = createLI(TEXT);
        UL.appendChild(LI);                         // place the new li in the ul
    });

    // delegated checkbox handler
    // when the checkbox is checked, add the 'responded' class 
    // leverages li event bubbling by placing it on the parent ul element
    // uses checkbox change event- we're focused on whether the state of the checkbox has changed
    UL.addEventListener('change', function(e) {
        const CHECKBOX = e.target;
        const IS_CHECKED = CHECKBOX.checked;           // true/false based on checkbox state
        // traverse the DOM to the checkbox's grandparent element, the LI to manipulate it
        const LIST_ITEM = CHECKBOX.parentNode.parentNode;

        // if the box is checked, add the 'responded' class
        if (IS_CHECKED) {
            LIST_ITEM.className = 'responded';
        } else {
            LIST_ITEM.className = '';
        }
    });

    // delegated removal handler
    // remove the LI when the 'remove' button is clicked
    // leverages event bubbling up to the ul
    UL.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const BUTTON = e.target;
            const LI = BUTTON.parentNode;
            const UL = LI.parentNode;
            const ACTION = BUTTON.textContent;
            const NAME_ACTIONS = {
                Remove: () => {
                    UL.removeChild(LI);
                },
                Edit: () => {
                    // the name in the span is the first element in the li
                    const SPAN = LI.firstElementChild;
                    const INPUT = document.createElement('input');
                    INPUT.type = 'text';
                    INPUT.value = SPAN.textContent;
                    // add the input element in front of the span and remove the span
                    // so the user can edit the input field
                    LI.insertBefore(INPUT, SPAN);
                    LI.removeChild(SPAN);
                    // change the 'edit' to a 'save' button
                    BUTTON.textContent = 'Save';
                },
                Save: () => {
                    const INPUT = LI.querySelector('input');
                    const SPAN = document.createElement('span');
                    SPAN.textContent = INPUT.value;
                    // add the span element in front of the input and remove the input
                    LI.insertBefore(SPAN, INPUT);
                    LI.removeChild(INPUT);
                    // change the 'save' to an 'edit' button
                    BUTTON.textContent = 'Edit';
                }
            };
            // select and run action matching button's name/textContent
            NAME_ACTIONS[ACTION]();
        }
    });
});