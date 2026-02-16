// 1. ฟังก์ชันคุมธีม (ห้ามลบ)
function applyTheme(theme) {
    const modeToggle = document.getElementById('mode-toggle');
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        if (modeToggle) modeToggle.textContent = '☀️';
    } else {
        document.body.classList.remove('light-mode');
        if (modeToggle) modeToggle.textContent = '🌙';
    }
}

// 2. รันระบบเมื่อเปิดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    // โหลดโหมดที่บันทึกไว้
    applyTheme(localStorage.getItem('theme') || 'dark');

    // ตั้งค่าปุ่มกด
    const btn = document.getElementById('mode-toggle');
    if (btn) {
        btn.onclick = () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            applyTheme(isLight ? 'light' : 'dark');
        };
    }

    // ระบบสไลด์ (ถ้าหน้านั้นมีสไลด์ ให้เริ่มทำงาน)
    if (document.getElementsByClassName("slide").length > 0) {
        startSlides();
    }
});

// 3. ระบบสไลด์ (ใช้ Logic เดิมของคุณ)
let slideIndex = 1;
function startSlides() {
    showSlides(slideIndex);
    setInterval(() => { showSlides(slideIndex += 1); }, 5000);
}

function currentSlide(n) { showSlides(slideIndex = n); }

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (!slides.length) return;
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    for (let i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");
    slides[slideIndex-1].style.display = "block";
    if (dots[slideIndex-1]) dots[slideIndex-1].className += " active";
}
// --- ระบบค้นหาข้อมูลนวัตกรรม (ตรวจจับคำสำคัญข้ามหน้า) ---
function searchInno() {
    const input = document.getElementById('innovativeSearch');
    const query = input.value.toLowerCase().trim();
    
    if (!query) return;

    // --- ส่วนที่ 1: ตรวจจับคำในหน้า Innovations ---
    const innoKeywords = [
        'innovation', 'นวัตกรรม', 'it', 'gartner', 'mckinsey', 
        'predictive', 'analytics', 'visual inspection', 'blockchain', 
        'iot', 'robotic', 'agv', 'sparrow', 'amazon'
    ];

    // --- ส่วนที่ 2: ตรวจจับคำในหน้า Case Studies ---
    const caseKeywords = [
        'case', 'กรณีศึกษา', 'tesco', 'walmart', 'หุ่นยนต์', 
        'timeline', 'วิวัฒนาการ', 'global', 'hub', 'returns'
    ];

    // เช็คว่าคำที่พิมพ์ตรงกับกลุ่มไหน
    const isInno = innoKeywords.some(keyword => query.includes(keyword));
    const isCase = caseKeywords.some(keyword => query.includes(keyword));

    if (isInno) {
        // ถ้าเจอคำเกี่ยวกับนวัตกรรม ให้เด้งไปหน้านั้น
        window.location.href = 'innovations.html';
    } 
    else if (isCase) {
        // ถ้าเจอคำเกี่ยวกับกรณีศึกษา ให้เด้งไปหน้านั้น
        window.location.href = 'case-studies.html';
    } 
    else {
        // ถ้าไม่ตรงกับคำสำคัญหน้าไหนเลย ให้ค้นหาคำในหน้าปัจจุบัน (Highlight)
        if (!window.find(query)) {
            alert("ไม่พบข้อมูล '" + query + "' ลองค้นหาด้วยคำว่า AI, Walmart หรือ Tesco");
        }
    }
}

// ข้อมูลสรุป AI Insights เจาะลึกรายเดือน
const dashData = {
    all: {
        c: "78.64%", w: "8.55%",
        summary: "ระบบรักษามาตรฐานได้ที่ 78-80% โดยมีเดือนมีนาคมทำผลงานได้ยอดเยี่ยมที่สุด",
        risk: "พบปัญหาค้างชำระในเดือนมิถุนายนสูงถึง 12.40% แนะนำให้เร่งติดตามผล"
    },
    mar: {
        c: "84.31%", w: "5.88%",
        summary: "ประสิทธิภาพสูงสุดในไตรมาส อัตราการจัดการสำเร็จอยู่ในระดับดีเยี่ยม",
        risk: "ความเสี่ยงต่ำมาก สัดส่วนการรอชำระเงินอยู่ในเกณฑ์ปกติที่ 5.88%"
    },
    apr: {
        c: "79.58%", w: "7.65%",
        summary: "ประสิทธิภาพคงที่ตามมาตรฐาน การดำเนินงานเป็นไปตามแผนที่วางไว้",
        risk: "ควรเริ่มติดตามกลุ่มลูกค้าที่ค้างชำระเพื่อไม่ให้สะสมในเดือนถัดไป"
    },
    may: {
        c: "79.89%", w: "7.62%",
        summary: "เป็นเดือนที่มีปริมาณงานสูงสุด แต่ยังรักษามาตรฐานความเร็วในการจัดการได้ดี",
        risk: "ปริมาณงานที่มากอาจส่งผลต่อการติดตามหนี้สิน แนะนำให้ใช้ AI ช่วยแจ้งเตือน"
    },
    jun: {
        c: "73.65%", w: "12.40%",
        summary: "ประสิทธิภาพการจัดการสำเร็จลดลงต่ำสุดในไตรมาสที่ 73.65%",
        risk: "วิกฤตความเสี่ยง: พบปัญหาค้างชำระสูงสุดถึง 12.40% ต้องเร่งติดตามผลทันที"
    }
};

function updateDash() {
    const val = document.getElementById('monthSelector').value;
    const item = dashData[val];

    // อัปเดตตัวเลขในการ์ด
    document.getElementById('compVal').innerText = item.c;
    document.getElementById('waitVal').innerText = item.w;

    // อัปเดตส่วนสรุป AI Data Insights ให้เปลี่ยนตามเดือน
    const insightContent = document.getElementById('insightContent');
    insightContent.innerHTML = `
        <div class="insight-item">
            <strong>สรุปประสิทธิภาพ:</strong>
            <p>${item.summary}</p>
        </div>
        <div class="insight-item">
            <strong>การวิเคราะห์ความเสี่ยง:</strong>
            <p>${item.risk}</p>
        </div>
    `;

    // เปลี่ยนสีตัวเลขเตือนความเสี่ยง (ถ้าเป็นเดือนมิถุนายนให้เป็นสีแดง)
    document.getElementById('waitVal').style.color = (val === 'jun' || val === 'all') ? '#ff4757' : '#2ecc71';
    
    // เรียกฟังก์ชันอัปเดตกราฟ (ถ้ามี)
    updateChart(val); 
}