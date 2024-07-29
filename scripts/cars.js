document.getElementById('openBurger').addEventListener('click', () => {
    if (document.getElementById('burger').classList.contains('hidden')) {
        document.getElementById('burger').classList.remove('hidden')
        document.getElementById('burger').classList.add('flex')
        document.getElementById('blockBeurger').classList.add('visibles')
        document.getElementById('blockBeurger').classList.remove('hiddens')
    } else {
        document.getElementById('blockBeurger').classList.add('hiddens')
        document.getElementById('blockBeurger').classList.remove('visibles')
        document.getElementById('burger').classList.add('hidden')
        document.getElementById('burger').classList.remove('flex')
    }
})


function hideBurgerMenu() {
    const burger = document.getElementById('burger');
    burger.classList.add('hidden');
    document.getElementById('burger').classList.remove('flex')
}

document.getElementById('closeBurger').addEventListener('click', hideBurgerMenu);

const menuLinks = document.querySelectorAll('#blockBeurger a');
menuLinks.forEach(link => {
    link.addEventListener('click', hideBurgerMenu);
});

document.addEventListener('DOMContentLoaded', function (event) {
    const inputField = document.getElementById('openFilterPrice');
    const dropdown = document.getElementById('filterPrice');
    const lists = document.getElementById('dropdown');
    const closeFilterPrice = document.getElementById('closeFilterPrice');
    const listItems = lists.querySelectorAll('li');
    let selectedItem = null;

    let selectedMarkValues = [];
    let selectedModelValues = [];
    let selectedKomValues = [];
    let selectedTransValues = [];
    let selectedPrValues = [];
    let selectedToplivoValues = [];

    let datas = {}

    document.getElementById('openFilter').addEventListener('click', () => {
        document.getElementById('filterBlock').classList.remove('hidden')
    })

    document.getElementById('closeFilter').addEventListener('click', () => {
        document.getElementById('filterBlock').classList.add('hidden')
    })

    inputField.addEventListener('click', function () {
        dropdown.classList.remove('hidden');
    });


    closeFilterPrice.addEventListener('click', function () {
        dropdown.classList.add('hidden');
    });

    function collectModelNames(data) {
        let allModelNames = [];
        data.forEach(item => {
            item.models.forEach(model => {
                allModelNames.push({ model_name: model.model_name, id: model.id });
            });
        });
        return allModelNames;
    }

    function collectEquipmentNames(data) {
        let allModelNames = [];
        data.forEach(item => {
            item.equipment.forEach(model => {
                allModelNames.push({
                    equipment_name: model.equipment_name, id: model.id
                });
            });
        });
        return allModelNames;
    }

    // Марка авто
    document.getElementById('btnMark').addEventListener('click', () => {
        document.getElementById('markLists').classList.toggle("hidden")
        document.getElementById('modelLists').classList.add("hidden")
        document.getElementById('komLists').classList.add("hidden")
        document.getElementById('transLists').classList.add("hidden")
        document.getElementById('prLists').classList.add("hidden")
        document.getElementById('topLists').classList.add("hidden")
        getMarks()
    })

    document.getElementById('btnMarkM').addEventListener('click', () => {
        document.getElementById('markListsM').classList.toggle("hidden")
        document.getElementById('modelListsM').classList.add("hidden")
        document.getElementById('komListsM').classList.add("hidden")
        document.getElementById('transListsM').classList.add("hidden")
        document.getElementById('prListsM').classList.add("hidden")
        document.getElementById('topListsM').classList.add("hidden")
        getMarks()
    })

    function cleanMarksValue() {
        if (selectedMarkValues.length > 0) {
            const brands_car = selectedMarkValues.map((item) => item.name);
            document.getElementById('markValue').textContent = brands_car.join(', ')
            document.getElementById('markValueM').textContent = brands_car.join(', ')
        } else {
            selectedModelValues = [];
            selectedKomValues = []
            selectedTransValues = []
            selectedPrValues = []
            selectedToplivoValues = []
            cleanModelsValue()
            cleanKomValue()
            cleanTransValue()
            cleanPrValue()
            cleanTopValue()
            document.getElementById('markValue').textContent = "Марка"
            document.getElementById('markValueM').textContent = "Марка"
        }
    }

    document.getElementById('closeMarkLists').addEventListener('click', () => {
        document.getElementById('markLists').classList.toggle("hidden")
        cleanMarksValue()
    })

    document.getElementById('closeMarkListsM').addEventListener('click', () => {
        document.getElementById('markListsM').classList.toggle("hidden")
        cleanMarksValue()
    })

    function getMarks() {
        const url = 'http://185.4.180.174/encar/brands';
        document.getElementById('markListChange').innerHTML = '';
        document.getElementById('markListChangeM').innerHTML = '';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                data.forEach((item, index) => {
                    if (!item.name) return;
                    const li = document.createElement('li');
                    const uniqueId = `checkbox${index}`;
                    const isChecked = selectedMarkValues.some(selectedItem => selectedItem.id === item.id);

                    li.innerHTML = `
                    <label for="${uniqueId}" class="checkbox-label">
                        <input
                            value="${item.id}"
                            type="checkbox"
                            id="${uniqueId}"
                            class="checkbox" ${isChecked ? 'checked' : ''} />
                        <span class="checkbox-view text-[#6E778D]">
                            <svg
                                class="checkbox-icon"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.16797 11.6641L7.08464 14.5807L15.8346 5.41406"
                                    stroke="#1C3269"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            ${item.name}
                        </span>
                    </label>`;

                    const checkbox = li.querySelector('input[type="checkbox"]');
                    checkbox.addEventListener('change', (event) => {
                        const itemObject = { name: item.name, id: item.id };
                        if (event.target.checked) {
                            selectedMarkValues.push(itemObject);
                        } else {
                            const index = selectedMarkValues.findIndex(obj => obj.id === item.id);
                            if (index > -1) {
                                selectedMarkValues.splice(index, 1);
                            }
                        }
                    });

                    document.getElementById('markListChange').appendChild(li);
                });

                data.forEach((item, index) => {
                    if (!item.name) return;
                    const li = document.createElement('li');
                    const uniqueId = `checkboxM${index}`;
                    const isChecked = selectedMarkValues.some(selectedItem => selectedItem.id === item.id);

                    li.innerHTML = `
                    <label for="${uniqueId}" class="checkbox-label">
                        <input
                            value="${item.id}"
                            type="checkbox"
                            id="${uniqueId}"
                            class="checkbox" ${isChecked ? 'checked' : ''} />
                        <span class="checkbox-view text-[#6E778D]">
                            <svg
                                class="checkbox-icon"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.16797 11.6641L7.08464 14.5807L15.8346 5.41406"
                                    stroke="#1C3269"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            ${item.name}
                        </span>
                    </label>`;

                    const checkbox = li.querySelector('input[type="checkbox"]');
                    checkbox.addEventListener('change', (event) => {
                        const itemObject = { name: item.name, id: item.id };
                        if (event.target.checked) {
                            selectedMarkValues.push(itemObject);
                        } else {
                            const index = selectedMarkValues.findIndex(obj => obj.id === item.id);
                            if (index > -1) {
                                selectedMarkValues.splice(index, 1);
                            }
                        }
                    });

                    document.getElementById('markListChangeM').appendChild(li);
                });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }


    // Модель авто
    document.getElementById('btnModel').addEventListener('click', () => {
        document.getElementById('modelLists').classList.toggle("hidden")
        document.getElementById('markLists').classList.add("hidden")
        document.getElementById('komLists').classList.add("hidden")
        document.getElementById('transLists').classList.add("hidden")
        document.getElementById('prLists').classList.add("hidden")
        document.getElementById('topLists').classList.add("hidden")
        getModels()
    })

    document.getElementById('btnModelM').addEventListener('click', () => {
        document.getElementById('modelListsM').classList.toggle("hidden")
        document.getElementById('markListsM').classList.add("hidden")
        document.getElementById('komListsM').classList.add("hidden")
        document.getElementById('transListsM').classList.add("hidden")
        document.getElementById('prListsM').classList.add("hidden")
        document.getElementById('topListsM').classList.add("hidden")
        getModels()
    })

    document.getElementById('closeModelListsM').addEventListener('click', () => {
        document.getElementById('modelListsM').classList.toggle("hidden")
        cleanModelsValue()
    })

    function cleanModelsValue() {
        if (selectedModelValues.length > 0) {
            const brands_car = selectedModelValues.map((item) => item.name);
            document.getElementById('modelValue').textContent = brands_car.join(', ')
            document.getElementById('modelValueM').textContent = brands_car.join(', ')
        } else {
            document.getElementById('modelValue').textContent = "Модель"
            document.getElementById('modelValueM').textContent = "Модель"
        }
    }

    document.getElementById('closeModelLists').addEventListener('click', () => {
        document.getElementById('modelLists').classList.toggle("hidden")
        cleanModelsValue()
    })

    function getModels() {
        const url = 'http://185.4.180.174/encar/get_models/';
        const brands_car = selectedMarkValues.map((item) => parseInt(item.id));
        document.getElementById('modelListChange').innerHTML = ""
        document.getElementById('modelListChangeM').innerHTML = ""

        let obj = {
            brands: brands_car
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                let allModelNames = collectModelNames(data);
                allModelNames.forEach((item, index) => {
                    if (!item.model_name) return;
                    const li = document.createElement('li');
                    const uniqueId = `checkboxModel${index}`;
                    const isChecked = selectedModelValues.some(selectedItem => selectedItem.id === item.id);
                    li.innerHTML = `
                <label for="${uniqueId}" class="checkbox-label">
                    <input
                        value="${item.name}"
                        type="checkbox"
                        id="${uniqueId}"
                        class="checkbox" ${isChecked ? 'checked' : ''} />
                    <span class="checkbox-view text-[#6E778D]">
                        <svg
                            class="checkbox-icon"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.16797 11.6641L7.08464 14.5807L15.8346 5.41406"
                                stroke="#1C3269"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        ${item.model_name}
                    </span>
                </label>`;

                    const checkbox = li.querySelector('input[type="checkbox"]');
                    checkbox.addEventListener('change', (event) => {
                        const itemObject = { name: item.model_name, id: item.id };
                        if (event.target.checked) {
                            selectedModelValues.push(itemObject);
                        } else {
                            const index = selectedModelValues.findIndex(obj => obj.id === item.id);
                            if (index > -1) {
                                selectedModelValues.splice(index, 1);
                            }
                        }
                    });

                    document.getElementById('modelListChange').appendChild(li);
                });

                allModelNames.forEach((item, index) => {
                    if (!item.model_name) return;
                    const li = document.createElement('li');
                    const uniqueId = `checkboxModelM${index}`;
                    const isChecked = selectedModelValues.some(selectedItem => selectedItem.id === item.id);
                    li.innerHTML = `
                <label for="${uniqueId}" class="checkbox-label">
                    <input
                        value="${item.name}"
                        type="checkbox"
                        id="${uniqueId}"
                        class="checkbox" ${isChecked ? 'checked' : ''} />
                    <span class="checkbox-view text-[#6E778D]">
                        <svg
                            class="checkbox-icon"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.16797 11.6641L7.08464 14.5807L15.8346 5.41406"
                                stroke="#1C3269"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        ${item.model_name}
                    </span>
                </label>`;

                    const checkbox = li.querySelector('input[type="checkbox"]');
                    checkbox.addEventListener('change', (event) => {
                        const itemObject = { name: item.model_name, id: item.id };
                        if (event.target.checked) {
                            selectedModelValues.push(itemObject);
                        } else {
                            const index = selectedModelValues.findIndex(obj => obj.id === item.id);
                            if (index > -1) {
                                selectedModelValues.splice(index, 1);
                            }
                        }
                    });

                    document.getElementById('modelListChangeM').appendChild(li);
                });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    // Комплектация авто
    document.getElementById('btnKom').addEventListener('click', () => {
        document.getElementById('komLists').classList.toggle("hidden")
        document.getElementById('markLists').classList.add("hidden")
        document.getElementById('modelLists').classList.add("hidden")
        document.getElementById('transLists').classList.add("hidden")
        document.getElementById('prLists').classList.add("hidden")
        document.getElementById('topLists').classList.add("hidden")
        getKom()
    })

    function cleanKomValue() {
        if (selectedKomValues.length > 0) {
            const brands_car = selectedKomValues.map((item) => item.name);
            document.getElementById('komValue').textContent = brands_car.join(', ')
            document.getElementById('komValueM').textContent = brands_car.join(', ')
        } else {
            document.getElementById('komValue').textContent = "Комплектация"
            document.getElementById('komValueM').textContent = "Комплектация"
        }
    }

    document.getElementById('closeKomLists').addEventListener('click', () => {
        document.getElementById('komLists').classList.toggle("hidden")
        cleanKomValue()
    })

    document.getElementById('btnKomM').addEventListener('click', () => {
        document.getElementById('komListsM').classList.toggle("hidden")
        document.getElementById('markListsM').classList.add("hidden")
        document.getElementById('modelListsM').classList.add("hidden")
        document.getElementById('transListsM').classList.add("hidden")
        document.getElementById('prListsM').classList.add("hidden")
        document.getElementById('topListsM').classList.add("hidden")
        getKom()
    })

    document.getElementById('closeKomListsM').addEventListener('click', () => {
        document.getElementById('komListsM').classList.toggle("hidden")
        cleanKomValue()
    })

    function getKom() {
        const url = 'http://185.4.180.174/encar/get_equipment/';
        const brands_car = selectedModelValues.map((item) => parseInt(item.id));
        document.getElementById('komListChange').innerHTML = ""
        document.getElementById('komListChangeM').innerHTML = ""

        let obj = {
            models: brands_car
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                let allModelNames = collectEquipmentNames(data);
                allModelNames.forEach((item, index) => {
                    if (!item.equipment_name) return;
                    const li = document.createElement('li');
                    const uniqueId = `checkboxKom${index}`;
                    const isChecked = selectedKomValues.some(selectedItem => selectedItem.id === item.id);
                    li.innerHTML = `
                <label for="${uniqueId}" class="checkbox-label">
                    <input
                        value="${item.name}"
                        type="checkbox"
                        id="${uniqueId}"
                        class="checkbox" ${isChecked ? 'checked' : ''} />
                    <span class="checkbox-view text-[#6E778D]">
                        <svg
                            class="checkbox-icon"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.16797 11.6641L7.08464 14.5807L15.8346 5.41406"
                                stroke="#1C3269"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        ${item.equipment_name}
                    </span>
                </label>`;

                    const checkbox = li.querySelector('input[type="checkbox"]');
                    checkbox.addEventListener('change', (event) => {
                        const itemObject = { name: item.equipment_name, id: item.id };
                        if (event.target.checked) {
                            selectedKomValues.push(itemObject);
                        } else {
                            const index = selectedKomValues.findIndex(obj => obj.id === item.id);
                            if (index > -1) {
                                selectedKomValues.splice(index, 1);
                            }
                        }
                    });


                    document.getElementById('komListChange').appendChild(li);
                });

                allModelNames.forEach((item, index) => {
                    if (!item.equipment_name) return;
                    const li = document.createElement('li');
                    const uniqueId = `checkboxKomM${index}`;
                    const isChecked = selectedKomValues.some(selectedItem => selectedItem.id === item.id);
                    li.innerHTML = `
                <label for="${uniqueId}" class="checkbox-label">
                    <input
                        value="${item.name}"
                        type="checkbox"
                        id="${uniqueId}"
                        class="checkbox" ${isChecked ? 'checked' : ''} />
                    <span class="checkbox-view text-[#6E778D]">
                        <svg
                            class="checkbox-icon"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.16797 11.6641L7.08464 14.5807L15.8346 5.41406"
                                stroke="#1C3269"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        ${item.equipment_name}
                    </span>
                </label>`;

                    const checkbox = li.querySelector('input[type="checkbox"]');
                    checkbox.addEventListener('change', (event) => {
                        const itemObject = { name: item.equipment_name, id: item.id };
                        if (event.target.checked) {
                            selectedKomValues.push(itemObject);
                        } else {
                            const index = selectedKomValues.findIndex(obj => obj.id === item.id);
                            if (index > -1) {
                                selectedKomValues.splice(index, 1);
                            }
                        }
                    });


                    document.getElementById('komListChangeM').appendChild(li);
                });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    // Трансмиссия авто
    document.getElementById('btnTrans').addEventListener('click', () => {
        document.getElementById('transLists').classList.toggle("hidden")
        document.getElementById('markLists').classList.add("hidden")
        document.getElementById('modelLists').classList.add("hidden")
        document.getElementById('komLists').classList.add("hidden")
        document.getElementById('prLists').classList.add("hidden")
        document.getElementById('topLists').classList.add("hidden")
        getTrans()
    })

    function cleanTransValue() {
        if (selectedTransValues.length > 0) {
            const brands_car = selectedTransValues.map((item) => item.name);
            document.getElementById('transValue').textContent = brands_car.join(', ')
            document.getElementById('transValueM').textContent = brands_car.join(', ')
        } else {
            document.getElementById('transValue').textContent = "Трансмиссия"
            document.getElementById('transValueM').textContent = "Трансмиссия"
        }
    }

    document.getElementById('closeTransLists').addEventListener('click', () => {
        document.getElementById('transLists').classList.toggle("hidden")
        cleanTransValue()
    })

    document.getElementById('btnTransM').addEventListener('click', () => {
        document.getElementById('transListsM').classList.toggle("hidden")
        document.getElementById('markListsM').classList.add("hidden")
        document.getElementById('modelListsM').classList.add("hidden")
        document.getElementById('komListsM').classList.add("hidden")
        document.getElementById('prListsM').classList.add("hidden")
        document.getElementById('topListsM').classList.add("hidden")
        getTrans()
    })

    document.getElementById('closeTransListsM').addEventListener('click', () => {
        document.getElementById('transListsM').classList.toggle("hidden")
        cleanTransValue()
    })

    function getTrans() {
        const url = 'http://185.4.180.174/encar/get_transmission/';
        const brands_car = selectedModelValues.map((item) => parseInt(item.id));
        document.getElementById('transListChange').innerHTML = ""
        document.getElementById('transListChangeM').innerHTML = ""

        let obj = {
            models: brands_car
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                data.forEach((item, index) => {
                    if (!item) return;
                    const li = document.createElement('li');
                    const uniqueId = `checkboxTrans${index}`;
                    const isChecked = selectedTransValues.some(selectedItem => selectedItem.name === item);
                    li.innerHTML = `
                <label for="${uniqueId}" class="checkbox-label">
                    <input
                        value="${item}"
                        type="checkbox"
                        id="${uniqueId}"
                        class="checkbox" ${isChecked ? 'checked' : ''} />
                    <span class="checkbox-view text-[#6E778D]">
                        <svg
                            class="checkbox-icon"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.16797 11.6641L7.08464 14.5807L15.8346 5.41406"
                                stroke="#1C3269"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        ${item}
                    </span>
                </label>`;

                    const checkbox = li.querySelector('input[type="checkbox"]');
                    checkbox.addEventListener('change', (event) => {
                        const itemObject = { name: item };
                        if (event.target.checked) {
                            selectedTransValues.push(itemObject);
                        } else {
                            const index = selectedTransValues.findIndex(obj => obj.name === item);
                            if (index > -1) {
                                selectedTransValues.splice(index, 1);
                            }
                        }
                    });


                    document.getElementById('transListChange').appendChild(li);
                });

                data.forEach((item, index) => {
                    if (!item) return;
                    const li = document.createElement('li');
                    const uniqueId = `checkboxTransM${index}`;
                    const isChecked = selectedTransValues.some(selectedItem => selectedItem.name === item);
                    li.innerHTML = `
                <label for="${uniqueId}" class="checkbox-label">
                    <input
                        value="${item}"
                        type="checkbox"
                        id="${uniqueId}"
                        class="checkbox" ${isChecked ? 'checked' : ''} />
                    <span class="checkbox-view text-[#6E778D]">
                        <svg
                            class="checkbox-icon"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.16797 11.6641L7.08464 14.5807L15.8346 5.41406"
                                stroke="#1C3269"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        ${item}
                    </span>
                </label>`;

                    const checkbox = li.querySelector('input[type="checkbox"]');
                    checkbox.addEventListener('change', (event) => {
                        const itemObject = { name: item };
                        if (event.target.checked) {
                            selectedTransValues.push(itemObject);
                        } else {
                            const index = selectedTransValues.findIndex(obj => obj.name === item);
                            if (index > -1) {
                                selectedTransValues.splice(index, 1);
                            }
                        }
                    });


                    document.getElementById('transListChangeM').appendChild(li);
                });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }


    // Привод авто
    document.getElementById('btnPr').addEventListener('click', () => {
        document.getElementById('prLists').classList.toggle("hidden")
        document.getElementById('markLists').classList.add("hidden")
        document.getElementById('modelLists').classList.add("hidden")
        document.getElementById('komLists').classList.add("hidden")
        document.getElementById('transLists').classList.add("hidden")
        document.getElementById('topLists').classList.add("hidden")
        getPrivod()
    })

    function cleanPrValue() {
        if (selectedPrValues.length > 0) {
            const brands_car = selectedPrValues.map((item) => item.name);
            document.getElementById('prValue').textContent = brands_car.join(', ')
            document.getElementById('prValueM').textContent = brands_car.join(', ')
        } else {
            document.getElementById('prValue').textContent = "Привод"
            document.getElementById('prValueM').textContent = "Привод"
        }
    }

    document.getElementById('closePrLists').addEventListener('click', () => {
        document.getElementById('prLists').classList.toggle("hidden")
        cleanPrValue()
    })

    document.getElementById('btnPrM').addEventListener('click', () => {
        document.getElementById('prListsM').classList.toggle("hidden")
        document.getElementById('markListsM').classList.add("hidden")
        document.getElementById('modelListsM').classList.add("hidden")
        document.getElementById('komListsM').classList.add("hidden")
        document.getElementById('transListsM').classList.add("hidden")
        document.getElementById('topListsM').classList.add("hidden")
        getPrivod()
    })

    document.getElementById('closePrListsM').addEventListener('click', () => {
        document.getElementById('prListsM').classList.toggle("hidden")
        cleanPrValue()
    })

    function getPrivod() {
        const url = 'http://185.4.180.174/encar/get_drive_unit/';
        const brands_car = selectedModelValues.map((item) => parseInt(item.id));
        document.getElementById('prListChange').innerHTML = ""
        document.getElementById('prListChangeM').innerHTML = ""

        let obj = {
            models: brands_car
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                data.forEach((item, index) => {
                    if (!item) return;
                    const li = document.createElement('li');
                    const uniqueId = `checkboxPr${index}`;
                    const isChecked = selectedPrValues.some(selectedItem => selectedItem.name === item);
                    li.innerHTML = `
                <label for="${uniqueId}" class="checkbox-label">
                    <input
                        value="${item}"
                        type="checkbox"
                        id="${uniqueId}"
                        class="checkbox" ${isChecked ? 'checked' : ''} />
                    <span class="checkbox-view text-[#6E778D]">
                        <svg
                            class="checkbox-icon"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.16797 11.6641L7.08464 14.5807L15.8346 5.41406"
                                stroke="#1C3269"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        ${item}
                    </span>
                </label>`;

                    const checkbox = li.querySelector('input[type="checkbox"]');
                    checkbox.addEventListener('change', (event) => {
                        const itemObject = { name: item };
                        if (event.target.checked) {
                            selectedPrValues.push(itemObject);
                        } else {
                            const index = selectedPrValues.findIndex(obj => obj.name === item);
                            if (index > -1) {
                                selectedPrValues.splice(index, 1);
                            }
                        }
                    });


                    document.getElementById('prListChange').appendChild(li);
                });

                data.forEach((item, index) => {
                    if (!item) return;
                    const li = document.createElement('li');
                    const uniqueId = `checkboxPrM${index}`;
                    const isChecked = selectedPrValues.some(selectedItem => selectedItem.name === item);
                    li.innerHTML = `
                <label for="${uniqueId}" class="checkbox-label">
                    <input
                        value="${item}"
                        type="checkbox"
                        id="${uniqueId}"
                        class="checkbox" ${isChecked ? 'checked' : ''} />
                    <span class="checkbox-view text-[#6E778D]">
                        <svg
                            class="checkbox-icon"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.16797 11.6641L7.08464 14.5807L15.8346 5.41406"
                                stroke="#1C3269"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        ${item}
                    </span>
                </label>`;

                    const checkbox = li.querySelector('input[type="checkbox"]');
                    checkbox.addEventListener('change', (event) => {
                        const itemObject = { name: item };
                        if (event.target.checked) {
                            selectedPrValues.push(itemObject);
                        } else {
                            const index = selectedPrValues.findIndex(obj => obj.name === item);
                            if (index > -1) {
                                selectedPrValues.splice(index, 1);
                            }
                        }
                    });


                    document.getElementById('prListChangeM').appendChild(li);
                });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    // Топливо авто
    document.getElementById('btnTop').addEventListener('click', () => {
        document.getElementById('topLists').classList.toggle("hidden")
        document.getElementById('markLists').classList.add("hidden")
        document.getElementById('modelLists').classList.add("hidden")
        document.getElementById('komLists').classList.add("hidden")
        document.getElementById('transLists').classList.add("hidden")
        document.getElementById('prLists').classList.add("hidden")
        getToplivo()
    })

    function cleanTopValue() {
        if (selectedToplivoValues.length > 0) {
            const brands_car = selectedToplivoValues.map((item) => item.name);
            document.getElementById('topValue').textContent = brands_car.join(', ')
            document.getElementById('topValueM').textContent = brands_car.join(', ')
        } else {
            document.getElementById('topValue').textContent = "Топливо"
            document.getElementById('topValueM').textContent = "Топливо"
        }
    }

    document.getElementById('closeTopLists').addEventListener('click', () => {
        document.getElementById('topLists').classList.toggle("hidden")
        cleanTopValue()
    })

    document.getElementById('btnTopM').addEventListener('click', () => {
        document.getElementById('topListsM').classList.toggle("hidden")
        document.getElementById('markListsM').classList.add("hidden")
        document.getElementById('modelListsM').classList.add("hidden")
        document.getElementById('komListsM').classList.add("hidden")
        document.getElementById('transListsM').classList.add("hidden")
        document.getElementById('prListsM').classList.add("hidden")
        getToplivo()
    })

    document.getElementById('closeTopListsM').addEventListener('click', () => {
        document.getElementById('topListsM').classList.toggle("hidden")
        cleanTopValue()
    })

    function getToplivo() {
        const url = 'http://185.4.180.174/encar/get_fuel/';
        const brands_car = selectedModelValues.map((item) => parseInt(item.id));
        document.getElementById('topListChange').innerHTML = ""
        document.getElementById('topListChangeM').innerHTML = ""

        let obj = {
            models: brands_car
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                data.forEach((item, index) => {
                    if (!item) return;
                    const li = document.createElement('li');
                    const uniqueId = `checkboxTop${index}`;
                    const isChecked = selectedToplivoValues.some(selectedItem => selectedItem.name === item);
                    li.innerHTML = `
                <label for="${uniqueId}" class="checkbox-label">
                    <input
                        value="${item}"
                        type="checkbox"
                        id="${uniqueId}"
                        class="checkbox" ${isChecked ? 'checked' : ''} />
                    <span class="checkbox-view text-[#6E778D]">
                        <svg
                            class="checkbox-icon"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.16797 11.6641L7.08464 14.5807L15.8346 5.41406"
                                stroke="#1C3269"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        ${item}
                    </span>
                </label>`;

                    const checkbox = li.querySelector('input[type="checkbox"]');
                    checkbox.addEventListener('change', (event) => {
                        const itemObject = { name: item };
                        if (event.target.checked) {
                            selectedToplivoValues.push(itemObject);
                        } else {
                            const index = selectedToplivoValues.findIndex(obj => obj.name === item);
                            if (index > -1) {
                                selectedToplivoValues.splice(index, 1);
                            }
                        }
                    });


                    document.getElementById('topListChange').appendChild(li);
                });

                data.forEach((item, index) => {
                    if (!item) return;
                    const li = document.createElement('li');
                    const uniqueId = `checkboxTopM${index}`;
                    const isChecked = selectedToplivoValues.some(selectedItem => selectedItem.name === item);
                    li.innerHTML = `
                <label for="${uniqueId}" class="checkbox-label">
                    <input
                        value="${item}"
                        type="checkbox"
                        id="${uniqueId}"
                        class="checkbox" ${isChecked ? 'checked' : ''} />
                    <span class="checkbox-view text-[#6E778D]">
                        <svg
                            class="checkbox-icon"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.16797 11.6641L7.08464 14.5807L15.8346 5.41406"
                                stroke="#1C3269"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        ${item}
                    </span>
                </label>`;

                    const checkbox = li.querySelector('input[type="checkbox"]');
                    checkbox.addEventListener('change', (event) => {
                        const itemObject = { name: item };
                        if (event.target.checked) {
                            selectedToplivoValues.push(itemObject);
                        } else {
                            const index = selectedToplivoValues.findIndex(obj => obj.name === item);
                            if (index > -1) {
                                selectedToplivoValues.splice(index, 1);
                            }
                        }
                    });


                    document.getElementById('topListChangeM').appendChild(li);
                });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    document.getElementById('btnClean').addEventListener('click', () => {
        selectedModelValues = [];
        selectedKomValues = []
        selectedTransValues = []
        selectedPrValues = []
        selectedToplivoValues = []
        selectedMarkValues = []
        cleanMarksValue()
        cleanModelsValue()
        cleanKomValue()
        cleanTransValue()
        cleanPrValue()
        cleanTopValue()
        document.getElementById('price_to').value = ''
        document.getElementById('price_from').value = ''
    })

    document.getElementById('btnCleanM').addEventListener('click', () => {
        selectedModelValues = [];
        selectedKomValues = []
        selectedTransValues = []
        selectedPrValues = []
        selectedToplivoValues = []
        selectedMarkValues = []
        cleanMarksValue()
        cleanModelsValue()
        cleanKomValue()
        cleanTransValue()
        cleanPrValue()
        cleanTopValue()
        document.getElementById('price_toM').value = ''
        document.getElementById('price_fromM').value = ''
    })

    let carData = {
        page: 1
    }
    document.getElementById('filterPriceText2')

    document.getElementById('searchBtn').addEventListener('click', () => {
        const brands_car = selectedMarkValues.map((item) => item.name);
        const models_car = selectedModelValues.map((item) => item.name);
        const koms_car = selectedKomValues.map((item) => item.name);

        let obj = {
            ordering: '',
            brand: brands_car.join(','),
            model: models_car.join(','),
            equipment: koms_car.join(','),
            transmission: selectedTransValues.join(','),
            drive_unit: selectedPrValues.join(','),
            fuel: selectedToplivoValues.join(','),
            page: 1,
            price_min: document.getElementById('price_to').value,
            price_max: document.getElementById('price_from').value,
        }

        getData(obj, obj.page)
        datas = obj
    })

    document.getElementById('searchBtnM').addEventListener('click', () => {
        const brands_car = selectedMarkValues.map((item) => item.name);
        const models_car = selectedModelValues.map((item) => item.name);
        const koms_car = selectedKomValues.map((item) => item.name);

        let obj = {
            ordering: '',
            brand: brands_car.join(','),
            model: models_car.join(','),
            equipment: koms_car.join(','),
            transmission: selectedTransValues.join(','),
            drive_unit: selectedPrValues.join(','),
            fuel: selectedToplivoValues.join(','),
            page: 1,
            price_min: document.getElementById('price_toM').value,
            price_max: document.getElementById('price_fromM').value,
        }

        getData(obj, obj.page)
        datas = obj
    })

    let currentData = {};

    function getData(datas, page = 1) {
        datas.page = page;
        currentData = { ...datas };
        document.getElementById('blockList').innerHTML = '';

        const queryString = new URLSearchParams(currentData).toString();
        const url = `https://thecarkorea.ru/encar/encars?${queryString}`;

        fetch(url)
            .then(response => response.json())
            .then((data) => {
                // Заполнение контейнеров новыми элементами
                if (data && data.results && data.results.length > 0) {
                    data.results.forEach((item) => {
                        let div = document.createElement('div')
                        div.classList = "w-full sm:w-[48.5%] lg:w-[47%] xl:w-[30%] overflow-hidden rounded-xl flex flex-col shadow-lg"
                        div.innerHTML = `
							<a
								href="/detail.html"
								class="w-full">
								<img
									class="h-[250px] sm:h-[160px] w-full object-cover"
									src="${item.img[0]}"
									alt="" />
							</a>
							<div class="p-3 lg:p-5 flex flex-col gap-2 lg:gap-3">
								<a href='/detail.html?id=${item.id}'>
									<h2
										class="text-lg font-medium uppercase">
										${item.model.brand.name} ${item.model.model_name}
									</h2>
								</a>
								<span
									class="rounded-lg poppins-medium flex items-center gap-3"
									><span
										class="px-[7px] bg-[#C11800] rounded-md text-white poppins-medium text-lg"
										>${Math.ceil(item.price).toLocaleString('en-US').split(",").join(" ")} рублей</span
									></span
								>
								<div
									class="text-[#191A1B] flex items-center gap-4 lg:gap-2 xl:gap-4 text-sm">
									<span>${item.transmission}</span>
									<span>${item.mileage} км</span>
									<span>${item.vehicle_manufacture_date.split('').slice(0, 4).join('')}</span>
								</div>
							</div>
                    `
                        document.getElementById('blockList').appendChild(div)
                    })
                } else {
                    // Если данных нет, можно показать сообщение
                    document.getElementById('blockList').innerHTML = '<p>Нет данных для отображения.</p>';
                }

                // Общее количество страниц
                const totalPages = Math.ceil(data.count / 10);

                // Обновление состояния кнопок навигации
                document.getElementById('prevPage').disabled = page <= 1;
                document.getElementById('nextPage').disabled = page >= totalPages;

                // Обновление информации о пагинации
                document.getElementById('pagination').dataset.currentPage = page;
                document.getElementById('pagination').dataset.totalPages = totalPages;
                document.getElementById('pagination').textContent = `Страница ${page} из ${totalPages}`;
            })
            .catch(error => console.error('Ошибка:', error));
    }

    // кнопки пагинации
    document.getElementById('nextPage').addEventListener('click', () => {
        const currentPage = parseInt(document.getElementById('pagination').dataset.currentPage);
        const totalPages = parseInt(document.getElementById('pagination').dataset.totalPages);
        if (currentPage < totalPages) {
            getData({ ...currentData }, currentPage + 1);  // передаем новую страницу
        }
    });

    document.getElementById('prevPage').addEventListener('click', () => {
        const currentPage = parseInt(document.getElementById('pagination').dataset.currentPage);
        if (currentPage > 1) {
            getData({ ...currentData }, currentPage - 1);  // передаем новую страницу
        }
    });

    // Начальная загрузка данных
    getData(carData, carData.page);

    listItems.forEach(function (item) {
        item.addEventListener('click', function () {
            if (selectedItem) {
                selectedItem.classList = "p-2 poppins-normal text-[#6E778D] text-sm cursor-pointer hover:bg-[#F7F7F7]";
            }
            document.getElementById('filterPriceText').textContent = item.textContent;
            document.getElementById('filterPriceText2').textContent = item.textContent;
            dropdown.classList.add('hidden');
            item.classList = "p-2 poppins-normal text-[#C11800] text-sm cursor-pointer bg-[#F7F7F7] hover:bg-[#F7F7F7]"
            selectedItem = item;
            if (item.textContent.trim() === 'Цена: по возрастанию') {
                datas.ordering = 'price'
            } else if (item.textContent.trim() === 'Цена: по убыванию') {
                datas.ordering = '-price'
            } else if (item.textContent.trim() === 'Пробег: по возрастанию') {
                datas.ordering = 'mileage'
            } else if (item.textContent.trim() === 'Пробег: по убыванию') {
                datas.ordering = '-mileage'
            } else if (item.textContent.trim() === 'Год: по возрастанию') {
                datas.ordering = 'vehicle_manufacture_date'
            } else {
                datas.ordering = '-vehicle_manufacture_date'
            }
            getData(datas)
        });
    });
});