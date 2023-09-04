const listStyleChangeStart = 373;
const listStyleChangeEnd = 1585;

const listItems = document.querySelectorAll('.list-item');

const division = (listStyleChangeEnd - listStyleChangeStart) / listItems.length;

window.addEventListener('scroll', () => {
  if (document.getElementById('on')) {
    document.getElementById('on').removeAttribute('id');
  }
  if (window.scrollY > listStyleChangeStart && window.scrollY < listStyleChangeEnd) {
    const index = Math.floor((window.scrollY - listStyleChangeStart) / division);
    listItems[index].setAttribute('id', 'on');
  }
});
