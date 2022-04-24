console.log('funguju');

let player = 'circle';

const policko = document.querySelectorAll('.policko-btn');

const hraje = (event) => {
  event.target.classList.add('zahrany_tah');
  event.target.disabled = true;
  const playerIcon = document.querySelector('.ikony');
  event.target.style.backgroundImage = `url('${player}.svg')`;
  player = player === 'circle' ? 'cross' : 'circle';
  playerIcon.src = `${player}.svg`;
};

for (let i = 0; i < policko.length; i++) {
  policko[i].addEventListener('click', hraje);
}
