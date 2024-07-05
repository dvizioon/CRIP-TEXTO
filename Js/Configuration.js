
const checkboxes = document.querySelectorAll(".configuration-content input[type='checkbox']");

checkboxes.forEach(checkbox => {
    checkbox.checked = true;
});

const logCheckedCheckboxes = () => {
    const checkboxStates = {};
    checkboxes.forEach(checkbox => {
        // console.log(`${checkbox.id} => ${checkbox.checked}`);
        checkboxStates[checkbox.id] = checkbox.checked;
    });

    options = {
        numbers: checkboxStates.numeros || false,
        letters: checkboxStates.letras || false,
        specials: checkboxStates.simbolos || false
    };

    return JSON.stringify(checkboxStates);
};

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const jsonSelect = logCheckedCheckboxes();
        // console.log(jsonSelect);
    });
});



