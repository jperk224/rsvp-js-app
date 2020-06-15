// const global references
const FORM = document.getElementById('registrar');
const INPUT = FORM.querySelector('input');  // return the first input tag in the form

const UL = document.getElementById('invitedList');  // declared globally so its available in all functions

// Create an LI and return it to be appended to a ul
function createLI(text) {
    const LI = document.createElement('li');    // create a new li element to add the input to it
    // wrap the text content in a span for easier DOM manipulation on 'edit' button event
    const SPAN = document.createElement('span');
    SPAN.textContent = text;
    LI.appendChild(SPAN);
    // create a new checkbox to be included in the li
    // this is for the user to check when a list member has RSVP'd
    const LABEL = document.createElement('label');
    LABEL.textContent = 'confirmed';
    const CHECKBOX = document.createElement('input');
    CHECKBOX.type = 'checkbox';
    LABEL.appendChild(CHECKBOX);                // join the checkbox with its label
    LI.appendChild(LABEL);                      // join the checkbox and its label to the li we're pushing into the ul
    // add an edit button
    const EDIT_BUTTON = document.createElement('button');
    EDIT_BUTTON.textContent = 'Edit';
    LI.appendChild(EDIT_BUTTON);
    // add a button to remove the guest form the list
    const REMOVE_BUTTON = document.createElement('button');
    REMOVE_BUTTON.textContent = 'Remove';
    LI.appendChild(REMOVE_BUTTON);

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
    const CHECKED = CHECKBOX.checked;           // true/false based on checkbox state
    // traverse the DOM to the checkbox's grandparent element, the LI to manipulate it
    const LIST_ITEM = CHECKBOX.parentNode.parentNode;

    // if the box is checked, add the 'responded' class
    if (CHECKED) {
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
        if(BUTTON.textContent === 'Remove') {
            UL.removeChild(LI);
        } else if (BUTTON.textContent === 'Edit') {
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
        } else if (BUTTON.textContent === 'Save') {
            const INPUT = LI.querySelector('input');
            const SPAN = document.createElement('span');
            SPAN.textContent = INPUT.value;
            // add the span element in front of the input and remove the input
            LI.insertBefore(SPAN, INPUT);
            LI.removeChild(INPUT);
            // change the 'save' to an 'edit' button
            BUTTON.textContent = 'Edit';
        }
    }
});
