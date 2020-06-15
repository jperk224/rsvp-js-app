// form submit handler- captures all paths to form submission
// const references to the form and input box
const FORM = document.getElementById('registrar');
const INPUT = FORM.querySelector('input');  // return the first input tag in the form

const UL = document.getElementById('invitedList');  // declared globally so its available in all functions

function createLI(text) {
    const LI = document.createElement('li');    // create a new li element to add the input to it
    LI.textContent = text;

    // create a new checkbox to be included in the li
    // this is for the user to check when a list member has RSVP'd
    const LABEL = document.createElement('label');
    LABEL.textContent = 'confirmed';
    const CHECKBOX = document.createElement('input');
    CHECKBOX.type = 'checkbox';
    LABEL.appendChild(CHECKBOX);                // join the checkbox with its label
    LI.appendChild(LABEL);                      // join the checkbox and its label to the li we're pushing into the ul
    // add a button to remove the guest form the list
    const BUTTON = document.createElement('button');
    BUTTON.textContent = 'Remove';
    LI.appendChild(BUTTON);

    return LI;
}


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
// remove the LI when the 'remove button is clicked
// also leverages event bubbling up to the ul
UL.addEventListener('click', function(e) {
    // filter out elements that aren't buttons
    if (e.target.tagName === 'BUTTON') {
        // remove the parent li
        const LI = e.target.parentNode;
        const UL = LI.parentNode;
        UL.removeChild(LI);
    }
});
