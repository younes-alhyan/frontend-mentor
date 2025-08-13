document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const Queries = document.getElementsByName('query');
    const message = document.getElementById('message');
    const checkBox = document.getElementById('contacted');
    const validMessage = document.getElementById('valid-message');
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function isValidString(string) {
        return string.trim() !== '';
    }

    function isValidRadio(radio) {
        let valid = false;
        radio.forEach(element => {
            if (element.checked) {
                valid = true;
                return;
            }
        });
        return valid;
    }

    function handleTextInputError(inputText, inputCard) {
        if (isValidString(inputText)) {
            inputCard.classList.remove('input-card-error');
            return true;
        }
        inputCard.classList.add('input-card-error');
        return false;
    }



    function firstNameCheck() {
        const firstNameInput = document.getElementById('first-name-input');
        const firstNameText = firstName.value;
        return handleTextInputError(firstNameText, firstNameInput);
    }

    function lastNameCheck() {
        const lastNameInput = document.getElementById('last-name-input');
        const lastNameText = lastName.value;
        return handleTextInputError(lastNameText, lastNameInput);
    }

    function emailCheck() {
        const emailInput = document.getElementById('email-input');
        if (isValidEmail(email.value)) {
            emailInput.classList.remove('input-card-error');
            return true;
        }
        emailInput.classList.add('input-card-error');
        return false;
    }

    function QuerySelectionCheck() {
        const QueryInput = document.getElementById('query-input');
        if (isValidRadio(Queries)) {
            QueryInput.classList.remove('input-card-error');
            return true;
        }
        QueryInput.classList.add('input-card-error');
        return false;
    }

    function MessageCheck() {
        const messageInput = document.getElementById('message-input');
        const messageText = message.value;
        return handleTextInputError(messageText, messageInput);
    }

    function checkBoxCheck() {
        const checkBoxInput = document.getElementById('checkbox-input');
        if (checkBox.checked) {
            checkBoxInput.classList.remove('input-card-error');
            return true;
        }
        checkBoxInput.classList.add('input-card-error');
        return false;
    }

    function clearInputs() {
        // Clear all input fields
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        message.value = '';
        checkBox.checked = false;

        // Reset radio buttons (assuming they are in a group)
        Queries.forEach(query => {
            query.checked = false;
        });
        updateQueryContainers();
    }
    form.addEventListener('submit', (event) => {

        event.preventDefault();
        const isFirstNameValid = firstNameCheck();
        const isLastNameValid = lastNameCheck();
        const isEmailValid = emailCheck();
        const isQueryValid = QuerySelectionCheck();
        const isMessageValid = MessageCheck();
        const isCheckBoxValid = checkBoxCheck();

        if (isFirstNameValid && isLastNameValid && isEmailValid && isQueryValid && isMessageValid && isCheckBoxValid) {
            validMessage.classList.add('show');
            validMessage.classList.remove('hide');

            setTimeout(() => {
                validMessage.classList.add('hide');
                validMessage.classList.remove('show');
            }, 2000);
            //clear inputs
            clearInputs();
            //send Data
        }

    });
    const queryRadios = document.querySelectorAll('input[name="query"]');

    // Function to apply 'active' class to parent container if radio is checked
    function updateQueryContainers() {
        queryRadios.forEach(function (radio) {
            const parentContainer = radio.parentElement;
            if (radio.checked) {
                parentContainer.classList.add('active');
            } else {
                parentContainer.classList.remove('active');
            }
        });
    }

    // Add event listener to each radio button
    queryRadios.forEach(function (radio) {
        radio.addEventListener('change', updateQueryContainers);
    });

    // Initial check on page load
    updateQueryContainers();
});

