import { jsPDF } from 'jspdf'

/**
 * Generates the cover letter PDF on the fly, stamping the current date
 * (the date the visitor actually downloads it) instead of a hardcoded one.
 */
export function downloadCoverLetter() {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' })

  const pageWidth = doc.internal.pageSize.getWidth()
  const marginLeft = 72
  const marginRight = 72
  const usableWidth = pageWidth - marginLeft - marginRight
  let y = 72

  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // ── Header block ──
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text('Velitario, Chris Jasper B.', marginLeft, y)
  y += 16

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  doc.text('Blk 6 L 52 Grand Acacia Grove Subd. Brgy. Banay-Banay,', marginLeft, y)
  y += 13
  doc.text('City of Cabuyao Laguna 4025', marginLeft, y)
  y += 13
  doc.text('09513356849 | velitariochrisjasper69@gmail.com', marginLeft, y)
  y += 13
  // This line updates automatically to the date the visitor downloads the file
  doc.text(formattedDate, marginLeft, y)
  y += 30

  doc.text('Human Resources Department', marginLeft, y)
  y += 26

  doc.text('Dear HR Department,', marginLeft, y)
  y += 22

  const paragraphs = [
    "I am writing to express my sincere interest in any entry-level or fresh graduate position specifically for IT Support/Web Developer position within your esteemed organization. I am Chris Jasper Velitario, currently graduated of Bachelor of Science in Information Technology at the University of Cabuyao (UC-PnC), completed my degree in June 10, 2026. I am eager to contribute my skills, dedication, and academic background to a dynamic and growth-oriented team.",
    "Throughout my academic journey, I have consistently demonstrated commitment to excellence. These achievements reflect my strong work ethic and determination to perform at my best in all endeavors I undertake. In terms of technical proficiency, I have solid foundation in JavaScript, React, Laravel, HTML, and CSS, complemented by strong command of productivity tools such as Microsoft Excel, PowerPoint, Word, Canva, and Inkscape. I am also a certified Google Data Analytics professional and a HubSpot Data Integration certified, both earned in 2026. My capstone project involved developing a Web-Based Patient Information and Clinic Operations System for Clinica Laguna Multispecialty Center, where I optimized frontend interfaces, managed project documentation, and analyzed user workflows to propose effective system solutions.",
    "My practical experience includes a 400-hour IT Support and Web Development internship at the PESO Cabuyao Nutrition Office, where I developed an informational system for a Family Planning Guide, created community-use graphic maps, and provided technical support for office equipment. Beyond academics and IT, I have also gained valuable experience in fast-paced work environments through part-time roles in logistics and electrical installation, reinforcing my adaptability, teamwork, and commitment to meeting operational goals.",
    "I am confident that my technical knowledge, hands-on experience, and strong academic foundation make me a valuable addition to your team. I am a fast learner, detail-oriented, and highly motivated to grow professionally within a supportive and challenging environment. I welcome the opportunity to further discuss how I can contribute to your organization.",
    "Thank you for your time and consideration. I look forward to hearing from you at your earliest convenience.",
  ]

  const lineHeight = 14.5
  const paragraphGap = 12
  const pageBottomLimit = doc.internal.pageSize.getHeight() - 72

  paragraphs.forEach((paragraph) => {
    const lines = doc.splitTextToSize(paragraph, usableWidth)
    lines.forEach((line, idx) => {
      if (y > pageBottomLimit) {
        doc.addPage()
        y = 72
      }
      const isLastLineOfParagraph = idx === lines.length - 1
      if (isLastLineOfParagraph) {
        // Last line of a paragraph stays left-aligned (standard justify behavior)
        doc.text(line, marginLeft, y)
      } else {
        doc.text(line, marginLeft, y, { maxWidth: usableWidth, align: 'justify' })
      }
      y += lineHeight
    })
    y += paragraphGap
  })

  y += 8
  doc.text('Sincerely,', marginLeft, y)
  y += 30
  doc.setFont('helvetica', 'bold')
  doc.text('Chris Jasper B. Velitario', marginLeft, y)

  const fileDate = today.toISOString().slice(0, 10) // YYYY-MM-DD for the filename
  doc.save(`Velitario-Cover-Letter-${fileDate}.pdf`)
}
