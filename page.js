// Show advanced fields
document.getElementById("advanced-criteria-link").addEventListener("click", function(event) {
    event.preventDefault();
    const advancedFields = document.getElementById("advanced-fields");
    advancedFields.style.display = (advancedFields.style.display === "none") ? "block" : "none";
});

const searchSelect = document.getElementById("search");
const entitySelect = document.getElementById("entity");
const fieldContainer2 = document.getElementById("field-container2");
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
    } else if (selectedValue === "course") {
        courseContainer.style.display = "block";
        hyperLink.style.display="none"
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
