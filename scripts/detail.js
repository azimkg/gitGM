document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const currentImage = document.getElementById('currentImage');
    const mainImgHref = document.getElementById('mainImgHref');

    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const visibleItems = 3;
    let currentIndex = 0;

    function getData() {
        fetch(`http://185.4.180.174/encar/encars/${id}`)
            .then(response => response.json())
            .then(data => {
                let objData = data.encar;
                document.getElementById('nameautoStrong').textContent = objData.model.brand.name + " " + objData.model.model_name
                document.getElementById('mainName').textContent = objData.model.brand.name + " " + objData.model.model_name

                if (objData && objData.model.brand.name) {
                    document.title = "Обзор " + objData.model.brand.name + " " + objData.model.model_name;
                } else {
                    document.title = 'Обзор авто';
                }

                document.getElementById('miles').textContent = objData.mileage + ' км'
                document.getElementById('kpp').textContent = objData.transmission
                document.getElementById('fluels').textContent = objData.fuel
                document.getElementById('mainPrice').textContent = Math.ceil(objData.price).toLocaleString('en-US').split(",").join(" ") + ' рублей'
                document.getElementById('detailMiles').textContent = objData.mileage + ' км'
                document.getElementById('detailEngancy').textContent = objData.engine_capacity
                document.getElementById('detailYear').textContent = objData.vehicle_manufacture_date
                document.getElementById('detailFuel').textContent = objData.fuel
                document.getElementById('detailKpp').textContent = objData.transmission
                document.getElementById('detailPrivod').textContent = objData.drive_unit

                objData.img.forEach((img) => {
                    let div = document.createElement('div');
                    div.classList = 'carousel-item max-w-[176px] max-h-[136px]';
                    div.innerHTML = `
                    <img
                        src="${img}"
                        class="w-[176px] h-[136px] object-cover rounded-md thumbnail opacity-50 cursor-pointer"
                        alt="" />
                `;
                    document.getElementById("carsCarousel").appendChild(div);
                });

                objData.img.slice(1).forEach((img) => {
                    let div = document.createElement('a');
                    div.classList = 'carousel-item max-w-[176px] max-h-[136px]';
                    div.href = img
                    div.setAttribute('data-fancybox', 'gallery')
                    div.innerHTML = `
						<img
							src="${img}"
							class="w-[176px] h-[136px] object-cover rounded-md opacity-50"
							alt="" />
                `;
                    document.getElementById("hiddenCarsImg").appendChild(div);
                });

                document.getElementById('condition').src = "https://encar.ab-korea.ru" + objData.img_2

                const list = data.encar.loegend.split('\n')
                const listOptions = data.encar.options.split('\n')
                const mid = Math.floor(listOptions.length / 2);
                list.forEach(defect => {
                    const listItem = document.createElement('li');
                    listItem.textContent = defect.trim();
                    document.getElementById('defektList1').appendChild(listItem);
                });

                listOptions.slice(0, mid).forEach(defect => {
                    const listItem = document.createElement('li');
                    listItem.textContent = defect.trim();
                    document.getElementById('optionAuto1').appendChild(listItem);
                });

                listOptions.slice(mid).forEach(defect => {
                    const listItem = document.createElement('li');
                    listItem.textContent = defect.trim();
                    document.getElementById('optionAuto2').appendChild(listItem);
                });

                // Обновление переменной thumbnails после добавления новых элементов
                const thumbnails = document.querySelectorAll('.thumbnail');
                initializeThumbnails(thumbnails);

                // Устанавливаем первую миниатюру как выбранную по умолчанию
                if (thumbnails.length > 0) {
                    thumbnails[0].classList.add('border-2', 'border-blue-500', 'opacity-100');
                    thumbnails[0].classList.remove('opacity-50');
                    currentImage.src = thumbnails[0].src;
                    mainImgHref.href = thumbnails[0].src;
                }

                // Обновление общего количества элементов
                totalItems = document.querySelectorAll('.carousel-item').length;
                updateCarousel();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function initializeThumbnails(thumbnails) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function () {
                // Убираем выделение со всех миниатюр
                thumbnails.forEach(thumb => {
                    thumb.classList.remove('border-2', 'border-blue-500', 'opacity-100');
                    thumb.classList.add('opacity-50');
                });

                // Добавляем выделение кликнутой миниатюре
                this.classList.add('border-2', 'border-blue-500', 'opacity-100');
                this.classList.remove('opacity-50');

                // Меняем изображение в основном окне на изображение кликнутой миниатюры
                currentImage.src = this.src;
                mainImgHref.href = this.src;
            });
        });
    }

    function updateCarousel() {
        const offset = -currentIndex * (100 / visibleItems);
        carousel.style.transform = `translateX(${offset}%)`;
    }

    document.getElementById('prev').addEventListener('click', function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - visibleItems;
        updateCarousel();
    });

    document.getElementById('next').addEventListener('click', function () {
        currentIndex = (currentIndex < totalItems - visibleItems) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    getData();


    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });


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

    fetch(`http://185.4.180.174/encar/encars/${id}`)
        .then(response => response.json())
        .then(data => {
            const randomElements = getThreeRandomElements(data.simular_cars);
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
});