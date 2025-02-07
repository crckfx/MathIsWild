  const lachie = document.querySelectorAll(".lachie");
        const playButton = document.querySelector(".playButton");

        playButton.addEventListener("click", () => {
            lachie.forEach((span, index) => {
                span.style.opacity = "0";
                span.style.transform = "translateY(-30px)";
                span.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
            });

            setTimeout(() => {
                lachie.forEach((span, index) => {
                    setTimeout(() => {
                        span.style.opacity = "1";
                        span.style.transform = "translateY(0)";
                    }, index * 200);
                });
            }, 300);
        });