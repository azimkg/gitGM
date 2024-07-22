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
console.log(menuLinks)
menuLinks.forEach(link => {
    link.addEventListener('click', hideBurgerMenu);
});

document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('openFilterPrice');
    const dropdown = document.getElementById('filterPrice');
    const lists = document.getElementById('dropdown');
    const closeFilterPrice = document.getElementById('closeFilterPrice');
    const listItems = lists.querySelectorAll('li');
    let selectedItem = null;

    inputField.addEventListener('click', function () {
        dropdown.classList.remove('hidden');
    });


    closeFilterPrice.addEventListener('click', function () {
        dropdown.classList.add('hidden');
    });

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
            console.log(item)
        });
    });

    document.getElementById('btnMark').addEventListener('click', () => {
        document.getElementById('markLists').classList.toggle("hidden")
    })

    document.getElementById('closeMarkLists').addEventListener('click', () => {
        document.getElementById('markLists').classList.toggle("hidden")
    })
});