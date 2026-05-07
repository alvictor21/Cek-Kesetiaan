
let checbox1 = document.getElementById("cb1")
let checbox2 = document.getElementById("cb2")
let form = document.getElementById("formUtama")
let failPopUp = document.getElementById("gagal")
let results = document.getElementById("res")
let tombol = document.getElementById("gamau")
let currentIndex = 0;
let score = 0;
let answered = false;
let questionContainer = document.getElementById("questcontainer")
let tombolAkhir = document.getElementById("backmenu")
let kataRomantis = document.getElementById("end")

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("Service Worker aktif"))
        .catch(err => console.log(err));
}

const bgMusic = new Audio("musicBG.mp3");
bgMusic.loop = true;   // ulang terus
bgMusic.volume = 0.5;  // volume 0.0 - 1.0

const WrongSFX = new Audio("wrong.mp3")
WrongSFX.volume = 0.3
const CorrectSFX = new Audio("correct.mp3")
WrongSFX.volume = 0.3

window.addEventListener("DOMContentLoaded", () => {
    bgMusic.play().catch((err) => {
        console.log("Autoplay ditolak browser:", err);
    });
});

let cewe_gua = [
    {
        namaCewe: "Nadia Putri Ameliya",
        password: "akuimut123"
    }
]

const questions = [
  {
    soal: "Pada tanggal berapakah Pictor nembak Amel tapi ditolak? Gausa Ketawa! 😾😾",
    pilihan: ["12 Desember 2024", "13 Desember 2024", "23 Desember 2024", "11 Desember 2024"],
    kunci: 1  
  },
  {
    soal: "Apa Hobi Pictor Yg Sesungguhnya?",
    pilihan: ["Bangun Pagi ", "Main Cewe", "Mancing", "Ngoding, Ngegame, Nonton"],
    kunci: 3  
  },
  {
    soal: "Kenapa Pictor Lebih Suka Cewe Kemasan Sachet + Chubby?",
    pilihan: ["Karena Itu Aku😽", "Karena Pictor Make", "Karena Pictor P*do (parah sih klo tega jawab ini😾)  ", "Karena Gabut  "],
    kunci: 0  // index jawaban yang benar
  },
  {
    soal: "Apa Cita Cita Pictor?",
    pilihan: ["Programmer", "Editor Berkelas", "CEO Software", "Semuanya Pilihan"],
    kunci: 3  
  },
  {
    soal: "Pada Kelas Berapa Pictor Kenal Amel Pertama Kali?",
    pilihan: ["1 SMA", "2 SMA", "Kelas King🫳🫴👍", "1 SD"],
    kunci: 0  
  },
  {
    soal: "Apa HairStyle Favorit Pictor?",
    pilihan: ["Belah Tengah (Piak Sylyt)", "French Crop", "Mullet Kopros", "Burst Fade"],
    kunci: 0  
  },
  {
    soal: "Seberapa Sayang Pictor Sama Amel?",
    pilihan: ["Sayang Biasa", "Gak Sayang!", "Sayangg Banget", "Sayang Banget Banget Pro Max"],
    kunci: 3  
  },
  {
    soal: "Pada Tanggal Berapa Pictor Pertama Kali Nekat Manggil Sayang Ke Amel? btw pas itu aku takut kmu ilfeel😭😭",
    pilihan: ["7 Juni 2025", "13 Juni 2025", "9 Juni 2025", "18 Juni 2025"],
    kunci: 2  
  },
  {
    soal: "Apa Serial Film Favorit Pictor?",
    pilihan: ["Upin Ipin", "Boboiboy The Movie", "Penthouse", "Stranger Things"],
    kunci: 3  
  },
  {
    soal: "Apa Yg Dipengenin Pictor Dari Amel Tapi Lebih Susah Daripada Bikin Aplikasi Kompleks Dalam 1 Hari?",
    pilihan: ["Disayang n Dicintai", "Didengerin Klo Lagi Cerita", "Dimasakin Chef Amel", "Call (mwehehe)"],
    kunci: 3  
  }
 
];

const pindahButton = () => {
   
    let randomX = Math.random() * 300
    let randomY = Math.random() * 500

    tombol.style.left = randomX + "px"
    tombol.style.top = randomY + "px"
}

const startGame = () =>{
    questionContainer.classList.remove("hidden")
}

const backToForm = () => {
    form.style.display = ""
    failPopUp.classList.add("hidden")
}

const handleLogin = ()=> {
    let userInput = document.getElementById("nama").value.trim()
    let userPass= document.getElementById("password").value.trim()

    const masuk = cewe_gua.find(cewe =>
        cewe.namaCewe === userInput && cewe.password === userPass
    )
    const checkboxHandle = checbox1.checked || checbox2.checked

    if(masuk && !checkboxHandle){
        results.innerText = "Berhasil Login"
        window.location.href = "page1.html"
        console.log("Berhasil Login")
    }else{
        failPopUp.classList.remove("hidden")
        console.log("Gagal")
    }
}

const okeSiap = () => {
    window.location.href = "pertanyaan.html"
    bgMusic.play();
}

function renderQuestion() {
  const q = questions[currentIndex];
  answered = false;

  document.getElementById("nomor").textContent = `Pertanyaan Ke-${currentIndex + 1}`;
  document.getElementById("soal").textContent = q.soal;

  const container = document.getElementById("pilihan-container");
  container.innerHTML = "";

  q.pilihan.forEach((teks, i) => {
    const btn = document.createElement("button");
    btn.textContent = teks;
    btn.className = "flex justify-center items-center h-16 w-40 bg-blue-500 rounded-xl font-bold text-amber-200 text-center text-sm hover:bg-blue-600 active:scale-95 transition-all duration-150 cursor-pointer";
    btn.onclick = () => checkAnswer(i);
    container.appendChild(btn);
  });

  document.getElementById("btn-next").style.display = "none";
}

function checkAnswer(selected) {
  const kunci = questions[currentIndex].kunci;

  if (selected === kunci) {
    // Benar → langsung lanjut, tanpa delay
    CorrectSFX.play()
    currentIndex++;
    if (currentIndex < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  } else {
    // Salah → tampilkan popup
    WrongSFX.play()
    failPopUp.classList.remove("hidden");
  }
}

const backToQuestion = () => {
  failPopUp.classList.add("hidden");
  // Tidak perlu renderQuestion() lagi karena pertanyaan
  // yang sama masih tampil di background
};

function showResult() {
  kataRomantis.classList.remove("hidden")
}

function backMenu(){
    window.location.href = "page1.html"
}

renderQuestion();