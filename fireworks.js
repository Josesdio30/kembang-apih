const colors = [
	"#ff6f91",
	"#ff9671",
	"#ffc75f",
	"#f9f871",
	"#ff4c4c",
	"#ffcc00"
];
const letters = "I LOVE YOU";
let letterIndex = 0;

function getSequentialLetter() {
	const letter = letters.charAt(letterIndex);
	letterIndex = (letterIndex + 1) % letters.length;
	return letter;
}

function createFirework(x, y) {
	const launchHeight =
		Math.random() * (window.innerHeight / 4) + window.innerHeight / 4;
	const projectile = document.createElement("div");
	projectile.classList.add("projectile");
	document.body.appendChild(projectile);
	projectile.style.left = `${x}px`;
	projectile.style.top = `${y}px`;

	anime({
		targets: projectile,
		translateY: -launchHeight,
		duration: 1200,
		easing: "easeOutQuad",
		complete: () => {
			projectile.remove();
			createBurst(x, y - launchHeight);
		}
	});
}

function createBurst(x, y) {
	const numLetters = letters.length; // Jumlah huruf berdasarkan panjang string
	const numSparkles = 50;
	const radius = 100; // Radius lingkaran untuk huruf

	// Tambahkan teks "Fayza" di tengah ledakan
	const centerText = document.createElement("div");
	centerText.classList.add("center-text");
	centerText.textContent = "Fayza";
	centerText.style.color = "#ff6f91"; // Warna teks
	centerText.style.fontSize = "24px"; // Ukuran teks
	centerText.style.fontWeight = "bold"; // Gaya teks
	centerText.style.position = "absolute";
	centerText.style.left = `${x}px`;
	centerText.style.top = `${y}px`;
	centerText.style.transform = "translate(-50%, -50%)"; // Memposisikan di tengah
	document.body.appendChild(centerText);

	// Hilangkan teks setelah beberapa saat
	setTimeout(() => {
		centerText.remove();
	}, 2000); // Durasi teks muncul di layar

	// Letters in a circle
	for (let i = 0; i < numLetters; i++) {
		createCircularParticle(x, y, i, radius); // Posisi huruf melingkar
	}

	// Sparkles
	for (let i = 0; i < numSparkles; i++) {
		createParticle(x, y, true); // Sparkles tetap acak
	}
}

function createCircularParticle(centerX, centerY, index, radius) {
	const angle = (index / letters.length) * (2 * Math.PI); // Sudut setiap huruf
	const posX = centerX + Math.cos(angle) * radius; // Posisi x
	const posY = centerY + Math.sin(angle) * radius; // Posisi y

	const el = document.createElement("div");
	el.classList.add("particule");
	el.textContent = letters[index]; // Huruf sesuai urutan dalam string
	el.style.color = colors[Math.floor(Math.random() * colors.length)];
	el.style.left = `${posX}px`;
	el.style.top = `${posY}px`;

	document.body.appendChild(el);

	animateParticle(el, false);
}

function createParticle(x, y, isSparkle) {
	const el = document.createElement("div");
	el.classList.add(isSparkle ? "sparkle" : "particule");

	if (!isSparkle) {
			el.textContent = getSequentialLetter();
			el.style.color = colors[Math.floor(Math.random() * colors.length)];
	} else {
			el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
	}

	el.style.left = `${x}px`;
	el.style.top = `${y}px`;
	document.body.appendChild(el);

	animateParticle(el, isSparkle);
}

function animateParticle(el, isSparkle) {
	const angle = Math.random() * Math.PI * 2;
	const distance = anime.random(100, 200);
	const duration = anime.random(1200, 2000);
	const fallDistance = anime.random(20, 80);
	const scale = isSparkle ? Math.random() * 0.5 + 0.5 : Math.random() * 1 + 0.5;

	anime
		.timeline({
			targets: el,
			easing: "easeOutCubic",
			duration: duration,
			complete: () => el.remove()
		})
		.add({
			translateX: Math.cos(angle) * distance,
			translateY: Math.sin(angle) * distance,
			scale: [0, scale],
			opacity: [1, 0.9]
		})
		.add({
			translateY: `+=${fallDistance}px`,
			opacity: [0.9, 0],
			easing: "easeInCubic",
			duration: duration / 2
		});
}

document.addEventListener("click", (e) => {
	// Hilangkan instructions saat klik pertama
	const instructions = document.getElementById("instructions");
	if (instructions) {
			instructions.style.display = "none";
	}

	// Jalankan efek kembang api
	createFirework(e.clientX, e.clientY);
});

window.onload = function () {
	const centerX = window.innerWidth / 2;
	const centerY = window.innerHeight / 2;
	createFirework(centerX, centerY);
};