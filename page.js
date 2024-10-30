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
        const companyType = document.getElementById("company-type");
        // Clear existing options
        licenseTypeSelect.innerHTML = '<option value=""></option>';
        licenseStatusSelect.innerHTML = '<option value=""></option>';
        businessStateSelect.innerHTML = '<option value=""></option>';
        countySelect.innerHTML = '<option value=""></option>';
        companyType.innerHTML = '<option value=""></option>';
        
        // Check if the selected state is Alabama
        if (selectedValue === "AL") {
            // Populate license types
            AlabamaData.licenseTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.code;
                option.textContent = type.name;
                licenseTypeSelect.appendChild(option);
            });

            // Populate license statuses
            AlabamaData.licenseStatuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status.code;
                option.textContent = status.name;
                licenseStatusSelect.appendChild(option);
            });

            // Populate states and provinces
            AlabamaData.statesAndProvinces.forEach(state => {
                const option = document.createElement('option');
                option.value = state.code;
                option.textContent = state.name;
                businessStateSelect.appendChild(option);
            });

            // Populate counties
            AlabamaData.counties.forEach(county => {
                const option = document.createElement('option');
                option.value = county.name;
                option.textContent = county.name;
                countySelect.appendChild(option);
            });
            AlabamaData.companyTypes.forEach(county => {
                const option = document.createElement('option');
                option.value = county.name;
                option.textContent = county.name;
                companyType.appendChild(option);
            });
        }
    });
    
    // Show Line of Authority options based on selected license type
    document.getElementById("license-type").addEventListener("change", function() {
        const selectedType = this.value;
        const loaSelect = document.getElementById("line-of-authority");
         console.log(loaSelect,"loaSelect")
        // Clear existing options in LOA dropdown
        loaSelect.innerHTML = '<option value="">Select Line of Authority</option>';

        // Find the selected license type and populate LOA options
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
    // document.getElementById("company-type").addEventListener("change", function() {
    //     const selectedType = this.value;
    //     console.log(selectedType, "selectedType"); // Log selected type for debugging
    
    //     const lobSelect = document.getElementById("line-of-business");
    //     console.log(lobSelect, "lobSelect"); // Check the dropdown element
    
    //     lobSelect.innerHTML = '<option value="">Select Line of Business</option>'; // Clear existing options
    
    //     // Check the AlabamaData structure
    //     console.log(AlabamaData.companyTypes, "companyTypes"); // Log the companyTypes array
    
    //     // Find the selected company type in AlabamaData
    //     const companyType = AlabamaData.companyTypes.find(type => type.code === selectedType);
    //     console.log(companyType, "companyType"); // Check if companyType is found
    
    //     // If the company type exists and has lobTypes, populate the line-of-business dropdown
    //     if (companyType && companyType.lobTypes) {
    //         companyType.lobTypes.forEach(lob => {
    //             const option = document.createElement('option');
    //             option.value = lob.code; // Assuming lob has a code
    //             option.textContent = lob.name; // Assuming lob has a name
    //             lobSelect.appendChild(option);
    //         });
    //     } else {
    //         // Handle the case where no line of business types are found
    //         const noLobOption = document.createElement('option');
    //         noLobOption.value = ""; // Ensure the value is empty
    //         noLobOption.textContent = "No Lines of Business Available"; // Placeholder text
    //         lobSelect.appendChild(noLobOption);
    //     }
    // });
    
});
