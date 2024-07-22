document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const currentImage = document.getElementById('currentImage');

    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const visibleItems = 3;
    let currentIndex = 0;

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
        });
    });

    // Устанавливаем первую миниатюру как выбранную по умолчанию
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('border-2', 'border-blue-500', 'opacity-100');
        thumbnails[0].classList.remove('opacity-50');
        currentImage.src = thumbnails[0].src;
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

    updateCarousel();

    const container = document.getElementById("myCarousel");
    const options = {
        infinite: true,
        Autoplay: {
            timeout: 1000,
        },
    };

    new Carousel(container, options);
    const container2 = document.getElementById("myCarousel2");


    new Carousel(container2, options);
    const containers = document.getElementById("myCarousels");


    new Carousel(containers, options);
    const containerses = document.getElementById("myCarouseler");


    new Carousel(containerses, options);

    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });
});