document.getElementById('openText').addEventListener('click', () => {
    if (document.getElementById('text').classList.contains('hidden')) {
        document.getElementById('text').classList.remove('hidden')
        document.getElementById('text').classList.add('visibles')
        document.getElementById('text').classList.add('hiddens')
        document.getElementById('tiggleImg').src = 'images/open.svg'
    } else {
        document.getElementById('text').classList.add('hiddens')
        document.getElementById('text').classList.remove('visibles')
        document.getElementById('text').classList.add('hidden')
        document.getElementById('tiggleImg').src = 'images/plus.svg'
    }
})

document.getElementById('openText1').addEventListener('click', () => {
    if (document.getElementById('text1').classList.contains('hidden')) {
        document.getElementById('text1').classList.remove('hidden')
        document.getElementById('text1').classList.add('visibles')
        document.getElementById('text1').classList.add('hiddens')
        document.getElementById('tiggleImg2').src = 'images/open.svg'
    } else {
        document.getElementById('text1').classList.add('hiddens')
        document.getElementById('text1').classList.remove('visibles')
        document.getElementById('text1').classList.add('hidden')
        document.getElementById('tiggleImg2').src = 'images/plus.svg'
    }
})

document.getElementById('openText2').addEventListener('click', () => {
    if (document.getElementById('text2').classList.contains('hidden')) {
        document.getElementById('text2').classList.remove('hidden')
        document.getElementById('text2').classList.add('visibles')
        document.getElementById('text2').classList.add('hiddens')
        document.getElementById('tiggleImg3').src = 'images/open.svg'
    } else {
        document.getElementById('text2').classList.add('hiddens')
        document.getElementById('text2').classList.remove('visibles')
        document.getElementById('text2').classList.add('hidden')
        document.getElementById('tiggleImg3').src = 'images/plus.svg'
    }
})

document.getElementById('openText3').addEventListener('click', () => {
    if (document.getElementById('text3').classList.contains('hidden')) {
        document.getElementById('text3').classList.remove('hidden')
        document.getElementById('text3').classList.add('visibles')
        document.getElementById('text3').classList.add('hiddens')
        document.getElementById('tiggleImg4').src = 'images/open.svg'
    } else {
        document.getElementById('text3').classList.add('hiddens')
        document.getElementById('text3').classList.remove('visibles')
        document.getElementById('text3').classList.add('hidden')
        document.getElementById('tiggleImg4').src = 'images/plus.svg'
    }
})

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
