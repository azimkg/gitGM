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


document.addEventListener('DOMContentLoaded', function () {
    function getThreeRandomElements(arr) {
        if (arr.length < 3) {
            throw new Error("Array must have at least 3 elements");
        }

        let copy = arr.slice();

        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }

        return copy.slice(0, 3);
    }

    fetch('http://185.4.180.174/encar/encars/')
        .then(response => response.json())
        .then(data => {
            const randomElements = getThreeRandomElements(data.results);
            console.log(randomElements);
            randomElements.forEach((element) => {
                let div = document.createElement('div');
                div.classList = 'rounded-xl shadow-xl min-w-[300px] w-[440px] overflow-hidden menu--item';
                div.innerHTML = `
                            <a href="/detail.html?id=${element.id}">
                                <div class="f-carousel h-[230px]" id="myCarousel${element.id}">
                                    <img class="f-carousel__slide object-cover" src="${element.img[0]}" alt="" />
                                    <img class="f-carousel__slide object-cover" src="${element.img[1]}" alt="" />
                                    <img class="f-carousel__slide object-cover" src="${element.img[2]}" alt="" />
                                </div>
                            </a>
                            <div class="p-3 lg:p-4 xl:p-6 flex flex-col gap-4">
                                <a href="/detail.html?id=${element.id}">
                                    <h2 class="text-xl lg:text-[22px] text-[#191A1B] font-medium hover:text-[#C11800]">${element.model.brand.name} ${element.model.model_name}</h2>
                                </a>
                                <div class="flex items-center justify-between">
                                    <span class="text-[#191A1B]">${element.vehicle_manufacture_date}</span>
                                    <span class="bg-[#F7F7F7] p-2 rounded-lg poppins-medium flex items-center gap-3 pl-5">
                                        <span class="px-[7px] bg-[#C11800] rounded-md text-white poppins-medium">${Math.ceil(element.price).toLocaleString('en-US').split(",").join(" ")} рублей</span>
                                    </span>
                                </div>
                                <div class="flex flex-col gap-3">
                                    <div class="text-lg flex items-center justify-between">
                                        <span class="font-semibold md:text-sm lg:text-base xl:text-lg">Пробег :</span>
                                        <span class="text-sm lg:text-base">${element.mileage} км</span>
                                    </div>
                                    <div class="text-lg flex items-center justify-between">
                                        <span class="font-semibold md:text-sm lg:text-base xl:text-lg">Мощность :</span>
                                        <span class="text-sm lg:text-base">${element.engine_capacity}</span>
                                    </div>
                                    <div class="text-lg flex items-center justify-between">
                                        <span class="font-semibold md:text-sm lg:text-base xl:text-lg">Коробка :</span>
                                        <span class="text-sm lg:text-base">${element.transmission}</span>
                                    </div>
                                    <div class="text-lg flex items-center justify-between mb-4">
                                        <span class="font-semibold md:text-sm lg:text-base xl:text-lg">Топливо :</span>
                                        <span class="text-sm lg:text-base">${element.fuel}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                document.getElementById("myCar").appendChild(div);

                // Инициализация карусели
                const container = document.getElementById(`myCarousel${element.id}`);
                const options = {
                    infinite: true,
                    Autoplay: {
                        timeout: 1000,
                    },
                };
                new Carousel(container, options);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function showAlertName() {
        Swal.fire({
            title: 'Введите ваше имя',
            text: 'Мы хотим обращаться к вам по имени при обратной связи',
            icon: 'error',
            confirmButtonText: 'Ок'
        });
    }

    function showAlertEmail() {
        Swal.fire({
            title: 'Введите ваш Email',
            text: 'Ваш email потребуется для обратной связи',
            icon: 'error',
            confirmButtonText: 'Ок'
        });
    }

    function generateWhatsAppLink() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name) {
            showAlertName()
            return;
        } else if (!email) {
            showAlertEmail()
            return;
        }

        let obj = {
            name, email, message
        }

        fetch("https://submit-form.com/SLsLXm0b0", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(obj),
        })
            .then(function (response) {
                console.log(response);
                window.location.href = '/success.html'
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    document.getElementById('btn_submit').addEventListener('click', generateWhatsAppLink);
});