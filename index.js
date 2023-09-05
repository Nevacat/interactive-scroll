const listStyleChangeStart = 373;
const listStyleChangeEnd = 1585;

const listItems = document.querySelectorAll('.list-item');

const division = (listStyleChangeEnd - listStyleChangeStart) / listItems.length;
const panel1Img = document.getElementById('panel1-img');
const flyingSanta = document.getElementById('flying-santa');

const videoPlayBack = 500;

const videoEl = document.getElementById('video');
const videoSection = document.getElementById('video-section');

const fixed = document.getElementById('fixed-wrapper');
const fixedDesc = document.getElementById('fixed-description');

const fixedDescScrollTiming = 3470;
const fixedDescScrollTimingEnd = 3800;

function centerEl(elementId, video) {
  const el = document.getElementById(elementId);
  const parent = el.parentElement;
  if (window.scrollY > parent.offsetTop - (document.documentElement.clientHeight - el.offsetHeight) / 2) {
    el.style.position = 'fixed';
    el.style.top = '50%';
    el.style.left = '50%';
    el.style.transform = 'translate(-50%, -50%)';
    if (video) {
      video.currentTime =
        (window.scrollY - parent.offsetTop + (document.documentElement.clientHeight - el.offsetHeight) / 2) /
        videoPlayBack;
    }
  } else {
    el.style.position = 'relative';
    el.style.top = '0';
    el.style.left = '0';
    el.style.transform = 'translate(0, 0)';
  }
}

videoEl.addEventListener('loadedmetadata', () => {
  document.getElementById('video-section').style.height = videoEl.duration * videoPlayBack + 'px';
});

window.addEventListener('scroll', () => {
  if (document.getElementById('on')) {
    document.getElementById('on').removeAttribute('id');
  }
  if (window.scrollY > listStyleChangeStart && window.scrollY < listStyleChangeEnd) {
    const index = Math.floor((window.scrollY - listStyleChangeStart) / division);
    listItems[index].setAttribute('id', 'on');
  }

  const scrollYBottom = window.scrollY + document.documentElement.clientHeight;
  if (scrollYBottom > panel1Img.offsetTop && scrollYBottom < panel1Img.offsetTop + panel1Img.offsetHeight + 100) {
    const translateX = 80 - (80 * (scrollYBottom - panel1Img.offsetTop)) / (panel1Img.offsetHeight + 100);
    const translateY = -13 + (13 * (scrollYBottom - panel1Img.offsetTop)) / (panel1Img.offsetHeight + 100);
    const rotationDegree = 24 - (24 * 3 * (scrollYBottom - panel1Img.offsetTop)) / (panel1Img.offsetHeight + 100);

    flyingSanta.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotationDegree}deg)`;
  }
  centerEl('fixed-wrapper', videoEl);
  if (
    window.scrollY >
    videoSection.offsetTop +
      videoSection.offsetHeight -
      (fixed.offsetHeight + (document.documentElement.clientHeight - fixed.offsetHeight) / 2)
  ) {
    fixed.style.position = 'relative';
    fixed.style.top = 'initial';
    fixed.style.left = 'initial';
    fixed.style.transform = `translateY(${videoSection.offsetHeight - fixed.offsetHeight}px)`;
  }
  if (window.scrollY > fixedDescScrollTiming && window.scrollY < fixedDescScrollTimingEnd) {
    fixedDesc.style.transform = `translateY(${fixedDescScrollTimingEnd - window.scrollY}px)`;
    fixedDesc.style.opacity = `${
      (window.scrollY - fixedDescScrollTiming) / (fixedDescScrollTimingEnd - fixedDescScrollTiming)
    }`;
  } else if (window.scrollY > fixedDescScrollTimingEnd) {
    fixedDesc.style.transform = `translateY(0)`;
    fixedDesc.style.opacity = `1`;
  } else {
    fixedDesc.style.transform = `translateY(100px)`;
    fixedDesc.style.opacity = `0`;
  }
  centerEl('bank-beyond');
});
