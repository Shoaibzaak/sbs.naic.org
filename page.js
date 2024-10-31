import { states } from "./statesData.js";
import { AlabamaData } from "./albama.js";

document.getElementById("advanced-criteria-link").addEventListener("click", function(event) {
    event.preventDefault();
    const advancedFields = document.getElementById("advanced-fields");
    advancedFields.style.display = (advancedFields.style.display === "none") ? "block" : "none";
});

const searchSelect = document.getElementById("search");
const entitySelect = document.getElementById("entity");
const fieldContainer2 = document.getElementById("field-container2");
const fieldContainer1 = document.querySelector(".field-container1");
const hyperLink = document.querySelector(".advanced-criteria");
const fieldContainer = document.getElementById("field-container");
const entityContainer = document.querySelector('.entity-container');
const companyContainer = document.querySelector('.company-container');
const courseContainer = document.querySelector('.course-container');

// Show search type options based on state selection
document.getElementById("states").addEventListener("click", function(event) {
    event.preventDefault();
    if (searchSelect) {
        searchSelect.style.display = "block";
    }
});

document.getElementById("states").addEventListener("change", function(event) {
    const selectedValue = this.value;
    Array.from(searchSelect.options).forEach(option => {
        option.style.display = "none";
    });
    if (selectedValue) {
        searchSelect.options[1].style.display = "block"; // Show License
        searchSelect.options[2].style.display = "block"; // Show Company
        searchSelect.options[3].style.display = "block"; // Show Course or Provider
    }
});
document.getElementById("states").addEventListener("change", function() {
    const stateSelected = this.value !== "";
    searchSelect.style.display = stateSelected ? "block" : "none";
});
// Handle search type selection and show relevant container
searchSelect.addEventListener("change", function() {
    const selectedValue = searchSelect.value;
    
    // Hide all containers initially
    entityContainer.style.display = "none";
    fieldContainer2.style.display = "none";
    fieldContainer.style.display = "none";
    companyContainer.style.display = "none";
    courseContainer.style.display = "none";
    // Show appropriate container based on the selection
    if (selectedValue === "license") {
        entityContainer.style.display = "block";
        fieldContainer2.style.display = "block";
        hyperLink.style.display="block"
    } else if (selectedValue === "company") {
        companyContainer.style.display = "block";
        hyperLink.style.display="none"
        fieldContainer1.style.display="none"
    } else if (selectedValue === "course") {
        courseContainer.style.display = "block";
        hyperLink.style.display="none"
        fieldContainer1.style.display="none"
    }
});

// Handle entity type selection within 'license' search type
entitySelect.addEventListener("change", function() {
    const selectedValue = entitySelect.value;
    
    if (selectedValue === "businessEntity") {
        fieldContainer.style.display = "block"; // Show business entity fields
        fieldContainer2.style.display = "none"; // Hide individual fields
    } else if (selectedValue === "Individual") {
        fieldContainer.style.display = "none"; // Hide business entity fields
        fieldContainer2.style.display = "block"; // Show individual fields
    } else {
        fieldContainer.style.display = "none";
        fieldContainer2.style.display = "none";
    }
});
function populateStates() {
    const statesDropdown = document.getElementById('states');
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state.value;
        option.textContent = state.name;
        statesDropdown.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Populate the states dropdown
    populateStates();

    // Show license types based on state selection
    document.getElementById("states").addEventListener("change", function() {
        const selectedValue = this.value;
        const licenseTypeSelect = document.getElementById("license-type");
        const licenseStatusSelect = document.getElementById("license-status");
        const businessStateSelect = document.getElementById("business-states");
        const countySelect = document.getElementById("county");
        const companyTypeSelect = document.getElementById("company-type");
        const educationeSelect = document.getElementById("education-type");
        const courseSelect = document.getElementById("course-method");
        const offeringSelect = document.getElementById("offering-state");

        // Clear existing options
        licenseTypeSelect.innerHTML = '<option value=""></option>';
        licenseStatusSelect.innerHTML = '<option value=""></option>';
        businessStateSelect.innerHTML = '<option value=""></option>';
        countySelect.innerHTML = '<option value=""></option>';
        companyTypeSelect.innerHTML = '<option value=""></option>';
        educationeSelect.innerHTML = '<option value=""></option>';
        courseSelect.innerHTML = '<option value=""></option>';
        offeringSelect.innerHTML = '<option value=""></option>';

        // Check if the selected state is Alabama
        if (selectedValue === "AL") {
            AlabamaData.licenseTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.code;
                option.textContent = type.name;
                licenseTypeSelect.appendChild(option);
            });

            AlabamaData.licenseStatuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status.code;
                option.textContent = status.name;
                licenseStatusSelect.appendChild(option);
            });

            AlabamaData.statesAndProvinces.forEach(state => {
                const option = document.createElement('option');
                option.value = state.code;
                option.textContent = state.name;
                businessStateSelect.appendChild(option);
            });

            AlabamaData.counties.forEach(county => {
                const option = document.createElement('option');
                option.value = county.name;
                option.textContent = county.name;
                countySelect.appendChild(option);
            });

            AlabamaData.companyTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.code;
                option.textContent = type.name;
                companyTypeSelect.appendChild(option);
            });
            AlabamaData.educationTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.code;
                option.textContent = type.name;
                educationeSelect.appendChild(option);
            });
            AlabamaData.courseMethods.forEach(type => {
                const option = document.createElement('option');
                option.value = type.code;
                option.textContent = type.name;
                courseSelect.appendChild(option);
            });
            AlabamaData.states.forEach(type => {
                const option = document.createElement('option');
                option.value = type.code;
                option.textContent = type.name;
                offeringSelect.appendChild(option);
            });
        }
    });

    // Show Line of Authority options based on selected license type
    document.getElementById("license-type").addEventListener("change", function() {
        const selectedType = this.value;
        const loaSelect = document.getElementById("line-of-authority");
        loaSelect.innerHTML = '<option value="">Select Line of Authority</option>';

        const licenseType = AlabamaData.licenseTypes.find(type => type.code === selectedType);
        if (licenseType && licenseType.loaTypes) {
            licenseType.loaTypes.forEach(loa => {
                const option = document.createElement('option');
                option.value = loa.code;
                option.textContent = loa.name;
                loaSelect.appendChild(option);
            });
        }
    });

    // Show Line of Business options based on selected company type
    document.getElementById("company-type").addEventListener("change", function() {
        const selectedType = this.value;
        const lobSelect = document.getElementById("line-of-business");
        lobSelect.innerHTML = '<option value="">Select Line of Business</option>';

        const companyType = AlabamaData.companyTypes.find(type => type.code === selectedType);
        if (companyType && companyType.lobTypes) {
            companyType.lobTypes.forEach(lob => {
                const option = document.createElement('option');
                option.value = lob.code;
                option.textContent = lob.name;
                lobSelect.appendChild(option);
            });
        } else {
            const noLobOption = document.createElement('option');
            noLobOption.value = "";
            noLobOption.textContent = "No Lines of Business Available";
            lobSelect.appendChild(noLobOption);
        }
    });

    const providerInput = document.getElementById('provider-name');
    const suggestionsContainer = document.getElementById('provider-suggestions');

    // Function to display suggestions (filtered or full list)
    function displaySuggestions(providers) {
        suggestionsContainer.innerHTML = ''; // Clear previous suggestions

        providers.forEach(provider => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = provider.name;

            suggestionItem.addEventListener('click', function() {
                providerInput.value = provider.name; // Set input value to selected provider
                suggestionsContainer.innerHTML = ''; // Clear suggestions after selection
                suggestionsContainer.classList.remove('show'); // Hide suggestions
            });

            suggestionsContainer.appendChild(suggestionItem);
        });

        // Show or hide suggestions based on the list length
        if (providers.length > 0) {
            suggestionsContainer.classList.add('show');
        } else {
            suggestionsContainer.classList.remove('show');
        }
    }

    // Show full list on focus
    providerInput.addEventListener('focus', function() {
        displaySuggestions(AlabamaData.activeProviders);
    });

    // Filter and show suggestions on typing
    providerInput.addEventListener('input', function() {
        const query = providerInput.value.toLowerCase();
        const matchingProviders = AlabamaData.activeProviders.filter(provider =>
            provider.name.toLowerCase().includes(query)
        );
        displaySuggestions(matchingProviders);
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== providerInput && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.innerHTML = ''; // Clear suggestions if clicked outside
            suggestionsContainer.classList.remove('show'); // Hide suggestions
        }
    });
});
