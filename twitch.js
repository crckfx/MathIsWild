const twitchContainerLink = document.querySelector('.skyriacContainer')
const twitchLogoLink = document.querySelector('.skyriacLink')
const twitchTextLink = document.querySelector('.skyriacText')

twitchContainerLink.addEventListener('mouseover', () => {
    twitchTextLink.style.opacity = '1';
    twitchTextLink.style.transform = 'translateY(0)';
    twitchTextLink.style.pointerEvents = 'auto';  // Re-enable interaction
});

twitchContainerLink.addEventListener('mouseleave', () => {
    twitchTextLink.style.opacity = '0';
    twitchTextLink.style.transform = 'translateY(10px)';
    twitchTextLink.style.pointerEvents = 'none';  // Disable interaction when hidden
});
