document.getElementById('generateBtn').addEventListener('click', generateCoverPage);
document.getElementById('downloadPdfBtn').addEventListener('click', downloadPDF);
document.getElementById('downloadImgBtn').addEventListener('click', downloadImage);

function generateCoverPage() {
  // ইনপুট ফিল্ড থেকে তথ্য সংগ্রহ
  const logoFile = document.getElementById('logoInput').files[0];
  const courseName = document.getElementById('courseName').value;
  const courseCode = document.getElementById('courseCode').value;
  const subject = document.getElementById('subject').value;
  const studentName = document.getElementById('studentName').value;
  const studentID = document.getElementById('studentID').value;
  const department = document.getElementById('department').value;
  const teacherName = document.getElementById('teacherName').value;
  const teacherDesignation = document.getElementById('teacherDesignation').value;
  const submissionDate = document.getElementById('submissionDate').value;
  
  // কভার পেজে তথ্য বসানো
  document.getElementById('courseNamePreview').innerText = courseName;
  document.getElementById('courseCodePreview').innerText = courseCode ? "কোর্স কোড: " + courseCode : "";
  document.getElementById('subjectPreview').innerText = subject ? "বিষয়বস্তু: " + subject : "";
  document.getElementById('studentNamePreview').innerText = "ছাত্র/ছাত্রীর নাম: " + studentName;
  document.getElementById('studentIDPreview').innerText = studentID ? "স্টুডেন্ট আইডি: " + studentID : "";
  document.getElementById('departmentPreview').innerText = department ? "বিভাগ: " + department : "";
  document.getElementById('teacherNamePreview').innerText = teacherName ? "শিক্ষকের নাম: " + teacherName : "";
  document.getElementById('teacherDesignationPreview').innerText = teacherDesignation ? "শিক্ষকের পদবী: " + teacherDesignation : "";
  document.getElementById('submissionDatePreview').innerText = submissionDate ? "জমাদানের তারিখ: " + submissionDate : "";
  
  // লোগো আপলোড থাকলে সেট করা
  if (logoFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const logoPreview = document.getElementById('logoPreview');
      logoPreview.src = e.target.result;
      logoPreview.style.display = "block";
    };
    reader.readAsDataURL(logoFile);
  }
  
  // কভার পেজ তৈরি হয়ে গেলে ডাউনলোড বাটনগুলো দেখান
  document.getElementById('downloadPdfBtn').style.display = "inline-block";
  document.getElementById('downloadImgBtn').style.display = "inline-block";
}

function downloadPDF() {
  const coverElement = document.getElementById('coverPage');
  // html2canvas ব্যবহার করে coverElement কে ক্যানভাসে রূপান্তর
  html2canvas(coverElement).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    // jsPDF এর UMD বিল্ড ব্যবহার করে PDF তৈরি
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    // ইমেজের সাইজ নির্ধারণ (অতিরিক্ত মার্জিন সহ)
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    pdf.save('cover_page.pdf');
  });
}

function downloadImage() {
  const coverElement = document.getElementById('coverPage');
  html2canvas(coverElement).then(canvas => {
    // ইমেজ ডাউনলোড করার জন্য লিঙ্ক তৈরি
    const link = document.createElement('a');
    link.download = 'cover_page.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}
