import { states } from "./api_data/statesData.js";
import { AlabamaData } from "./api_data/albama.js";
import {AlaskaData} from "./api_data/alaska.js"
import {ArizonaData} from "./api_data/arizona.js"
import {ArkansasData } from "./api_data/arkansas.js"
import {MarylandData } from "./api_data/maryland.js"
import { ConnecticutData } from "./api_data/connecticut.js";
import { DelawareData } from "./api_data/delaware.js";
import { DistrictofColumbiaData } from "./api_data/district-of-columbia.js";
import { GuamData } from "./api_data/guam.js";
import { HawaiiData } from "./api_data/hawaii.js";
import { IdahoData } from "./api_data/idaho.js";
import { IllinoisData } from "./api_data/illinois.js";
import { IowaData } from "./api_data/iowa.js";
import { KansasData } from "./api_data/kansas.js";
import { MassachusettsData } from "./api_data/massachusetts.js";
import { MissouriData } from "./api_data/missouri.js";
import { MontanaData } from "./api_data/montana.js";
import { NebraskaData } from "./api_data/nebraska.js";
import { WestVirginiaData } from "./api_data/west-virginia.js";
import { WisconsinData } from "./api_data/wisconsin.js";
const StateData = {
    AL: AlabamaData,
    AK: AlaskaData,
    AZ: ArizonaData,
    AR: ArkansasData,
    CT: ConnecticutData,
    DE: DelawareData,
    DC: DistrictofColumbiaData,
    GU: GuamData,
    HI: HawaiiData,
    ID: IdahoData,
    IL: IllinoisData,
    IA: IowaData,
    KS: KansasData,
    MD: MarylandData,
    MA: MassachusettsData,
    MI: MissouriData,
    MT: MontanaData,
    NE: NebraskaData,
    WV: WestVirginiaData,
    WI: WisconsinData,
};
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

    document.getElementById("states").addEventListener("change", function() {
        const selectedState = this.value; // e.g., "AL" for Alabama
        populateDropdownsForState(selectedState);
    });

    // Function to populate dropdowns dynamically for a given state
    function populateDropdownsForState(stateAbbreviation) {
        const stateData = StateData[stateAbbreviation]; // Get specific state data

        if (!stateData) {
            console.warn(`No data found for state: ${stateAbbreviation}`);
            return;
        }

        // Define dropdown elements
        const licenseTypeSelect = document.getElementById("license-type");
        const licenseStatusSelect = document.getElementById("license-status");
        const businessStateSelect = document.getElementById("business-states");
        const countySelect = document.getElementById("county");
        const companyTypeSelect = document.getElementById("company-type");
        const educationSelect = document.getElementById("education-type");
        const courseSelect = document.getElementById("course-method");
        const offeringSelect = document.getElementById("offering-state");
        const companyyStatus= document.getElementById("company-status");
        const companyMethods= document.getElementById("course-method");
        const companyGroups= document.getElementById("course-group");
        // Clear existing options in all dropdowns
        const selects = [companyGroups,companyMethods,companyyStatus,licenseTypeSelect, licenseStatusSelect, businessStateSelect, countySelect, companyTypeSelect, educationSelect, courseSelect, offeringSelect];
        selects.forEach(select => select.innerHTML = '<option value=""></option>');

        // Populate dropdowns with state-specific data
        populateSelect(licenseTypeSelect, stateData.licenseTypes);
        populateSelect(licenseStatusSelect, stateData.licenseStatuses);
        populateSelect(businessStateSelect, stateData.statesAndProvinces);
        populateSelect(countySelect, stateData.counties);
        populateSelect(companyTypeSelect, stateData.companyTypes);
        populateSelect(educationSelect, stateData.educationTypes);
        populateSelect(courseSelect, stateData.courseMethods);
        populateSelect(offeringSelect, stateData.states);
        populateSelect(companyyStatus, stateData.companyStatuses);
        populateSelect(companyMethods, stateData.courseMethods);
        populateSelect(companyGroups, stateData.courseGroups);
    }
 // Helper function to populate dropdown options
 function populateSelect(selectElement, dataList) {
    if (!dataList) return; // Handle cases where some data might be missing

    dataList.forEach(data => {
        const option = document.createElement('option');
        option.value = data.code || data.name;
        option.textContent = data.name;
        selectElement.appendChild(option);
    });
}
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
