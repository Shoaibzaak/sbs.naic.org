
// Show advanced fields
document.getElementById("advanced-criteria-link").addEventListener("click", function(event) {
    event.preventDefault();
    const advancedFields = document.getElementById("advanced-fields");
    advancedFields.style.display = (advancedFields.style.display === "none") ? "block" : "none";
});

const searchSelect = document.getElementById("search");
const entitySelect = document.getElementById("entity");
const fieldContainer2 = document.getElementById("field-container2");
const fieldContainer = document.getElementById("field-container");
const entityContainer = document.querySelector('.entity-container'); // Assuming this wraps around the entity select and field containers

searchSelect.addEventListener("change", function() {
    const selectedValue = searchSelect.value;
    
    // Show the entity container if a valid search type is selected
    if (selectedValue) {
        entityContainer.style.display = "block"; // Show Entity Type
    } else {
        entityContainer.style.display = "none"; // Hide Entity Type
        fieldContainer2.style.display = "none"; // Hide both field containers
        fieldContainer.style.display = "none";
    }

    // Reset entity type selection
    entitySelect.value = ""; 
});

entitySelect.addEventListener("change", function() {
    const selectedValue = entitySelect.value;
    
    if (selectedValue === "businessEntity") {
        fieldContainer.style.display = "block"; // Show business entity fields
        fieldContainer2.style.display = "none"; // Hide individual fields
    } else if (selectedValue === "Individual") {
        fieldContainer.style.display = "none"; // Hide business entity fields
        fieldContainer2.style.display = "block"; // Show individual fields
    } else {
        fieldContainer.style.display = "none"; // Hide both fields if no valid entity type is selected
        fieldContainer2.style.display = "none";
    }
});
document.getElementById("states").addEventListener("click",function(event){
    event.preventDefault(); 
    const searchSelect = document.getElementById("search");
    if(searchSelect){
        searchSelect.style.display="block"
    }
})

document.getElementById("states").addEventListener("change", function(event) {
    const selectedValue = this.value; // Get the selected state
    const searchSelect = document.getElementById("search");
    Array.from(searchSelect.options).forEach(option => {
        option.style.display = "none"; // Hide all options initially
    });
    console.log(selectedValue,"selectedValue")
    if (selectedValue) {      
            searchSelect.options[1].style.display = "block"; // Show License
            searchSelect.options[2].style.display = "block"; // Show Company
            searchSelect.options[3].style.display = "block"; // Show Course or Provider
    } 
});